import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    actionssidebar: [
        {
            type: "category",
            label: "API",
            items: require("./api/sidebar.ts")
        },
        {
            type: "doc",
            id: "workers/actions/entrypoints"
        }
    ]
};

export default sidebar.actionssidebar;
