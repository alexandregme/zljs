import { StatsCardProps } from "./stats-card.interface";

const colorClasses = {
  blue: {
    card: "bg-blue-100",
    label: "text-blue-800",
    value: "text-blue-900",
  },
  red: {
    card: "bg-red-100",
    label: "text-red-800",
    value: "text-red-900",
  },
  yellow: {
    card: "bg-yellow-100",
    label: "text-yellow-800",
    value: "text-yellow-900",
  },
  green: {
    card: "bg-green-100",
    label: "text-green-800",
    value: "text-green-900",
  },
  gray: {
    card: "bg-gray-100",
    label: "text-gray-600",
    value: "text-gray-900",
  },
  orange: {
    card: "bg-orange-100",
    label: "text-orange-800",
    value: "text-orange-900",
  },
};

export const StatsCard = ({ label, value, color }: StatsCardProps) => {
  const styles = colorClasses[color];

  return (
    <div data-testid="stats-card" className={`${styles.card} p-4 rounded-lg`}>
      <p className={`text-sm ${styles.label}`}>{label}</p>
      <p className={`text-3xl font-bold ${styles.value}`}>{value}</p>
    </div>
  );
};
