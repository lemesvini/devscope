import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export type ApiError =
  | { kind: 'not-found' }
  | { kind: 'rate-limit'; resetAt: number | null }
  | { kind: 'network' }
  | { kind: 'unknown'; status: number | string };

export function toApiError(error: FetchBaseQueryError, meta?: FetchBaseQueryMeta): ApiError {
  if (error.status === 404) return { kind: 'not-found' };

  const headers = meta?.response?.headers;
  const limited = error.status === 403 || error.status === 429;
  if (limited && headers && headers.get('x-ratelimit-remaining') === '0') {
    const reset = Number(headers.get('x-ratelimit-reset'));
    return { kind: 'rate-limit', resetAt: reset > 0 ? reset * 1000 : null };
  }

  if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
    return { kind: 'network' };
  }
  return { kind: 'unknown', status: error.status };
}

export function describeError(error: ApiError | SerializedError | undefined): string | null {
  if (!error) return null;
  if (!('kind' in error)) return 'Algo deu errado. Tente de novo.';

  switch (error.kind) {
    case 'not-found':
      return 'Nada encontrado no GitHub com esse nome.';
    case 'rate-limit': {
      if (!error.resetAt) return 'O GitHub limitou as buscas desta rede. Tente de novo em alguns minutos.';
      const time = new Date(error.resetAt).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `O GitHub limitou as buscas desta rede. Libera às ${time}.`;
    }
    case 'network':
      return 'Sem conexão com o GitHub. Confira a internet e tente de novo.';
    default:
      return 'O GitHub respondeu com um erro inesperado. Tente de novo.';
  }
}