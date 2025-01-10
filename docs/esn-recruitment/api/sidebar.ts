import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: "category",
            label: "Recruitment Period",
            items: [
                {
                    type: "doc",
                    id: "esn-recruitment/api/get-the-current-recruitment-period",
                    label: "Retrieve a resource",
                    className: "api-method get"
                },
                {
                    type: "doc",
                    id: "esn-recruitment/api/change-the-current-recruitment-period",
                    label: "Create a new resource",
                    className: "api-method post"
                }
            ]
        }
    ]
};

export default sidebar.apisidebar;
