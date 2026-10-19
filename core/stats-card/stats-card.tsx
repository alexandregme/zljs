import type { StatsCardProps } from "./stats-card.interface";
import { Text } from "../text";
import { statsCard } from "./stats-card.styles";

export const StatsCard = ({ label, value, color }: StatsCardProps) => {
  return (
    <div data-testid="stats-card" className={statsCard({ color })}>
      <Text variant="caption">{label}</Text>
      <Text variant="display">{value}</Text>
    </div>
  );
};
