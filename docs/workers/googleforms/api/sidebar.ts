import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: "doc",
            id: "workers/googleforms/api/register-a-new-google-form",
            label: "Register a new Google Form",
            className: "api-method post"
        },
        {
            type: "doc",
            id: "workers/googleforms/api/validate-a-google-form-registration",
            label: "Validate a Google Form registration",
            className: "api-method post"
        },
        {
            type: "doc",
            id: "workers/googleforms/api/handle-form-submissions",
            label: "Handle form submissions",
            className: "api-method post"
        },
        {
            type: "doc",
            id: "workers/googleforms/api/serve-form-setup-page",
            label: "Serve form setup page",
            className: "api-method get"
        }
    ]
};

export default sidebar.apisidebar;
