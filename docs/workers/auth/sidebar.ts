import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    authsidebar: [
        {
            type: "category",
            label: "API",
            items: require("./api/sidebar.ts")
        },
        {
            type: "doc",
            id: "workers/auth/entrypoints"
        }
    ]
};

export default sidebar.authsidebar;
