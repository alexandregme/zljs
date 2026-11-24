"use client";
import { Button } from "../../../../core/button";
import { themes, useTheme } from "../../hooks";
import type { Theme } from "../../hooks";
import { themeToggleIcons } from "./theme-toggle.const";
import type { ThemeToggleProps } from "./theme-toggle.interface";
import { themeToggle } from "./theme-toggle.styles";

export const ThemeToggle = ({
  label,
  iconOnly = false,
  size = "md",
  systemLabel = "System",
  lightLabel = "Light",
  darkLabel = "Dark",
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const labels: Record<Theme, string> = {
    system: systemLabel,
    light: lightLabel,
    dark: darkLabel,
  };

  const next = (): void => {
    setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]!);
  };

  if (iconOnly) {
    return (
      <Button
        color="ghost"
        size={size}
        icon={themeToggleIcons[theme]}
        aria-label={`${label}: ${labels[theme]}`}
        onClick={next}
      />
    );
  }

  return (
    <div role="group" aria-label={label} className={themeToggle()}>
      {themes.map((option) => {
        const select = (): void => {
          setTheme(option);
        };

        return (
          <Button
            key={option}
            color="ghost"
            size={size}
            icon={themeToggleIcons[option]}
            aria-label={labels[option]}
            aria-pressed={theme === option}
            onClick={select}
          />
        );
      })}
    </div>
  );
};
