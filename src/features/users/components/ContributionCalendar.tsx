import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import type { ContributionCalendar as Calendar, ContributionDay, ContributionLevel } from "@/lib/github/types";
import { useThemeColors } from "@/theme/useThemeColors";

const LEVEL_ALPHA = ["", "4D", "80", "BF", "FF"];
const DAYS_PER_WEEK = 7;
const GAP_RATIO = 0.2;
const SKELETON_WEEKS: null[][] = Array.from({ length: 53 }, () => Array<null>(DAYS_PER_WEEK).fill(null));

type CalendarGridProps = {
  weeks: (ContributionDay | null)[][];
  cellColor: (day: ContributionDay | null) => string;
  accessibilityLabel: string;
};

function CalendarGrid({ weeks, cellColor, accessibilityLabel }: CalendarGridProps) {
  const [gridWidth, setGridWidth] = useState(0);

  const step = gridWidth / (weeks.length - GAP_RATIO);
  const gap = step * GAP_RATIO;
  const cell = step - gap;
  const radius = cell * 0.2;

  return (
    <View
      style={{
        flexDirection: "row",
        gap,
        aspectRatio: (weeks.length - GAP_RATIO) / (DAYS_PER_WEEK - GAP_RATIO),
      }}
      onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityLabel={accessibilityLabel}
    >
      {gridWidth > 0 &&
        weeks.map((week, i) => (
          <View key={i} style={{ gap }}>
            {week.map((day, j) => (
              <View
                key={day?.date ?? j}
                style={{
                  width: cell,
                  height: cell,
                  borderRadius: radius,
                  backgroundColor: cellColor(day),
                }}
              />
            ))}
          </View>
        ))}
    </View>
  );
}

export function ContributionCalendar({ calendar }: { calendar: Calendar }) {
  const colors = useThemeColors();

  const levelColor = (level: ContributionLevel) =>
    level === 0 ? colors.muted : colors.primary + LEVEL_ALPHA[level];

  return (
    <View style={{ alignSelf: "stretch", gap: 8 }}>
      <CalendarGrid
        weeks={calendar.weeks}
        cellColor={(day) => (day ? levelColor(day.level) : "transparent")}
        accessibilityLabel={`${calendar.total} contribuições no último ano`}
      />
    </View>
  );
}

export function ContributionCalendarSkeleton() {
  const colors = useThemeColors();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.set(withRepeat(withTiming(0.4, { duration: 800 }), -1, true));
  }, [opacity]);

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.get() }));

  return (
    <Animated.View style={[{ alignSelf: "stretch" }, pulse]}>
      <CalendarGrid
        weeks={SKELETON_WEEKS}
        cellColor={() => colors.muted}
        accessibilityLabel="Carregando contribuições"
      />
    </Animated.View>
  );
}
