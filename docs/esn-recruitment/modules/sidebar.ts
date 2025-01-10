import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: "category",
            label: "MISC",
            items: [
                {
                    type: "doc",
                    id: "esn-recruitment/modules/misc/global-functions"
                }
            ]
        }
    ]
};

export default sidebar.apisidebar;
