import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  focusOutlineContrast,
  hoverTextContrast,
  textContrast,
} from "@test-utils";
import { Heading, Text } from "@zljs/core";
import type { TabsItem } from "@zljs/core";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof Tabs>;

const TEXT_MINIMUM = 4.5;
const OUTLINE_MINIMUM = 3;

const TABS: TabsItem[] = [
  { id: "open", label: "Open", children: <Text>Open orders</Text> },
  { id: "sent", label: "Sent", children: <Text>Sent orders</Text> },
  { id: "done", label: "Done", children: <Text>Done orders</Text> },
];

const SUBTITLES: Record<string, string> = {
  open: "Waiting to be picked",
  sent: "On the way",
  done: "Delivered",
};

const COUNTS: Record<string, number> = { open: 4, sent: 12, done: 0 };

const TABS_WITH_SUBTITLES = TABS.map((tab) => ({
  ...tab,
  subtitle: SUBTITLES[tab.id],
}));

const TABS_WITH_COUNTS = TABS.map((tab) => ({
  ...tab,
  count: COUNTS[tab.id],
}));

const TABS_WITH_SUBTITLES_AND_COUNTS = TABS_WITH_SUBTITLES.map((tab) => ({
  ...tab,
  count: COUNTS[tab.id],
}));

type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Splits a page into panels and shows one at a time. Each tab has an `id`, a `label` and its panel, in `children`. Only the panel of the selected tab is rendered, so a panel loses its state when the user leaves it. A border goes around the tabs and the panel. The tabs share the width of the list, with a line between them, and the selected one is white, with a line under it and its label in the `primary` color, next to the gray ones. Selecting a tab changes nothing in the URL. In a parent with a height, `Tabs` takes it and the panel fills what the list leaves, so its content can take the rest of the page; with no height around it, the panel follows its content. `aria-label` names the list of tabs for screen readers. The arrow keys move between the tabs, and Tab goes from the selected tab to its panel. This story checks 4.5:1 on the text of every tab, also on hover, and 3:1 on the focus outline, because axe sees neither of those.",
      },
    },
  },
  args: {
    tabs: TABS,
    "aria-label": "Orders by state",
  },
  play: async ({ canvas }) => {
    const tabs = canvas.getAllByRole("tab");
    const unselected = tabs.filter(
      (tab) => tab.getAttribute("aria-selected") === "false",
    );
    const lowContrast = tabs
      .filter((tab) => textContrast(tab) < TEXT_MINIMUM)
      .map((tab) => tab.textContent);
    const lowHoverContrast = unselected
      .filter((tab) => hoverTextContrast(tab) < TEXT_MINIMUM)
      .map((tab) => tab.textContent);
    const lowFocusContrast = tabs
      .filter((tab) => focusOutlineContrast(tab) < OUTLINE_MINIMUM)
      .map((tab) => tab.textContent);

    await expect(lowContrast).toEqual([]);
    await expect(lowHoverContrast).toEqual([]);
    await expect(lowFocusContrast).toEqual([]);
  },
};

export const Subtitles: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`subtitle` shows under the `label` of a tab, in muted text, to say what its panel holds. It is part of the tab, so a click on it selects the tab. The list scrolls sideways when the tabs don't fit. This story checks 4.5:1 on every subtitle.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = Object.values(SUBTITLES)
      .map((subtitle) => canvas.getByText(subtitle))
      .filter((subtitle) => textContrast(subtitle) < TEXT_MINIMUM)
      .map((subtitle) => subtitle.textContent);

    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <Tabs tabs={TABS_WITH_SUBTITLES} aria-label="Orders by state" />
  ),
};

export const Counts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`count` shows a number in a `primary` `Tag` of size `md`, at the right edge of the tab and in the middle of its height, such as how many rows the panel has. This story checks 4.5:1 on every count. A count of 0 shows too: leave `count` out to show none.",
      },
    },
  },
  play: async ({ canvas }) => {
    const lowContrast = canvas
      .getAllByTestId("tag")
      .filter((count) => textContrast(count) < TEXT_MINIMUM)
      .map((count) => count.textContent);

    await expect(lowContrast).toEqual([]);
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>Label only</Heading>
      <Tabs tabs={TABS_WITH_COUNTS} aria-label="Orders by state" />
      <Heading level={2}>With subtitle</Heading>
      <Tabs
        tabs={TABS_WITH_SUBTITLES_AND_COUNTS}
        aria-label="Orders by state, with subtitles"
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`defaultTab` takes the `id` of the tab selected at first: here it is `sent`, and without it the first tab is selected. `onChange` is called with the `id` of the tab the user selects: use it to react to the change, such as to load the data of a panel. The selected tab is not controlled from outside.",
      },
    },
  },
  render: () => (
    <Tabs
      tabs={TABS}
      aria-label="Orders by state"
      defaultTab="sent"
      onChange={(id) => alert(`Selected ${id}!`)}
    />
  ),
};
