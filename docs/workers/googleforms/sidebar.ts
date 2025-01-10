import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    googleformssidebar: [
        {
            type: "category",
            label: "API",
            items: require("./api/sidebar.ts")
        },
        {
            type: "doc",
            id: "workers/googleforms/entrypoints"
        }
    ]
};

export default sidebar.googleformssidebar;
