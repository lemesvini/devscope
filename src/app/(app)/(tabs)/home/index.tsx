import { ScrollView, Text } from "react-native";

import AboutCard from "@/features/about/components/AboutCard";
import { ABOUT_TOPICS } from "@/features/about/topics";
import { useThemeColors } from "@/theme/useThemeColors";

export default function HomeScreen() {
  const colors = useThemeColors();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, gap: 8 }}
    >
      <Text style={{ color: colors.secondaryForeground, fontSize: 16, lineHeight: 24, marginBottom: 8 }}>
        Busque desenvolvedores do GitHub, veja perfis e repositórios e salve seus favoritos.
      </Text>
      {ABOUT_TOPICS.map((topic) => (
        <AboutCard key={topic.key} topic={topic} />
      ))}
    </ScrollView>
  );
}
