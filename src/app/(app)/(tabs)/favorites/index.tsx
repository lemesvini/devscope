import UserLinkCard from "@/features/users/components/UserLinkCard";
import { selectFavorites } from "@/features/users/store/favoritesSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useThemeColors } from "@/theme/useThemeColors";
import { FlatList, Text } from "react-native";

export default function FavoritesScreen() {
  const colors = useThemeColors();
  const favorites = useAppSelector(selectFavorites);

  return (
    <>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={favorites}
        keyExtractor={(item) => item.login}
        renderItem={({ item }) => <UserLinkCard user={item} />}
        ListEmptyComponent={
          <Text style={{ color: colors.mutedForeground, textAlign: "center", marginTop: 32 }}>
            Nenhum favorito ainda. Toque no marcador de um perfil para salvá-lo aqui.
          </Text>
        }
        contentContainerStyle={{ padding: 16, gap: 8 }}
      />
    </>
  );
}
