import * as RadixTabs from "@radix-ui/react-tabs";
import { Tag } from "../tag";
import { Text } from "../text";
import type { TabsProps } from "./tabs.interface";
import { tabs as tabsStyles } from "./tabs.styles";

export const Tabs = ({
  tabs,
  "aria-label": ariaLabel,
  defaultTab = tabs[0]?.id,
  onChange,
}: TabsProps) => {
  const { base, list, tab, text, panel } = tabsStyles();

  return (
    <RadixTabs.Root
      className={base()}
      defaultValue={defaultTab}
      onValueChange={onChange}
    >
      <RadixTabs.List className={list()} aria-label={ariaLabel}>
        {tabs.map(({ id, label, subtitle, count }) => (
          <RadixTabs.Trigger key={id} value={id} className={tab()}>
            <span className={text()}>
              <Text as="span">{label}</Text>
              {subtitle && (
                <Text as="span" variant="caption" color="muted">
                  {subtitle}
                </Text>
              )}
            </span>
            {count !== undefined && (
              <Tag color="primary" size="md">
                {count}
              </Tag>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map(({ id, children }) => (
        <RadixTabs.Content key={id} value={id} className={panel()}>
          {children}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
