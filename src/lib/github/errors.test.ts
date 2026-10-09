import type { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { describeError, toApiError } from "./errors";

const metaWithHeaders = (headers: Record<string, string>) =>
  ({ response: { headers: { get: (name: string) => headers[name] ?? null } } }) as unknown as FetchBaseQueryMeta;

describe("toApiError", () => {
  it("maps 404 to not-found", () => {
    expect(toApiError({ status: 404, data: null })).toEqual({ kind: "not-found" });
  });

  it("detects the GitHub rate limit and its reset time", () => {
    const meta = metaWithHeaders({ "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1700000000" });
    expect(toApiError({ status: 403, data: null }, meta)).toEqual({ kind: "rate-limit", resetAt: 1_700_000_000_000 });
  });

  it("treats a 403 with requests remaining as an unknown error", () => {
    const meta = metaWithHeaders({ "x-ratelimit-remaining": "10" });
    expect(toApiError({ status: 403, data: null }, meta)).toEqual({ kind: "unknown", status: 403 });
  });

  it("maps fetch failures to network errors", () => {
    expect(toApiError({ status: "FETCH_ERROR", error: "Network request failed" })).toEqual({ kind: "network" });
  });

  it("maps other statuses to unknown errors", () => {
    expect(toApiError({ status: 500, data: null })).toEqual({ kind: "unknown", status: 500 });
  });
});

describe("describeError", () => {
  it("returns null when there is no error", () => {
    expect(describeError(undefined)).toBeNull();
  });

  it("describes a not-found error", () => {
    expect(describeError({ kind: "not-found" })).toBe("Nada encontrado no GitHub com esse nome.");
  });

  it("describes a rate limit without a reset time", () => {
    expect(describeError({ kind: "rate-limit", resetAt: null })).toBe(
      "O GitHub limitou as buscas desta rede. Tente de novo em alguns minutos.",
    );
  });

  it("includes the reset time when available", () => {
    expect(describeError({ kind: "rate-limit", resetAt: Date.now() })).toMatch(/^O GitHub limitou as buscas desta rede\. Libera às/);
  });

  it("describes a network error", () => {
    expect(describeError({ kind: "network" })).toBe("Sem conexão com o GitHub. Confira a internet e tente de novo.");
  });

  it("falls back to a generic message for serialized errors", () => {
    expect(describeError({ message: "boom" })).toBe("Algo deu errado. Tente de novo.");
  });
});
