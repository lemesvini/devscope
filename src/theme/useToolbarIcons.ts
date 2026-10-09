import { unstable_getMaterialSymbolSourceAsync, type AndroidSymbol, type SFSymbol } from "expo-symbols";
import { useEffect, useState } from "react";
import { Platform, type ImageSourcePropType } from "react-native";

export type ToolbarIconSpec = { sf: SFSymbol; md: AndroidSymbol };
export type ToolbarIcon = SFSymbol | ImageSourcePropType;

const ICON_SIZE = 24;
const materialCache = new Map<AndroidSymbol, ImageSourcePropType>();

function resolveIcons<K extends string>(specs: Record<K, ToolbarIconSpec>) {
  const entries = Object.entries(specs) as [K, ToolbarIconSpec][];
  return Object.fromEntries(
    entries.map(([key, { sf, md }]) => [key, Platform.OS === "android" ? materialCache.get(md) : sf]),
  ) as Record<K, ToolbarIcon | undefined>;
}

async function loadMaterialIcons(symbols: AndroidSymbol[]) {
  await Promise.allSettled(
    symbols.map(async (md) => {
      const source = await unstable_getMaterialSymbolSourceAsync(md, ICON_SIZE, "white");
      if (source) materialCache.set(md, source);
    }),
  );
}

export function useToolbarIcons<K extends string>(specs: Record<K, ToolbarIconSpec>) {
  const [icons, setIcons] = useState(() => resolveIcons(specs));

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const missing = Object.values<ToolbarIconSpec>(specs)
      .map(({ md }) => md)
      .filter((md) => !materialCache.has(md));
    if (missing.length === 0) return;

    let active = true;
    loadMaterialIcons(missing).then(() => {
      if (active) setIcons(resolveIcons(specs));
    });
    return () => {
      active = false;
    };
  }, [specs]);

  return icons;
}
