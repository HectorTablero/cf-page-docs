import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: "doc",
            id: "workers/auth/api/redirect-to-googles-o-auth-page",
            label: "Redirect to Google's OAuth page",
            className: "api-method get"
        },
        {
            type: "doc",
            id: "workers/auth/api/handle-callbacks-from-google",
            label: "Handle callbacks from Google",
            className: "api-method get"
        },
        {
            type: "doc",
            id: "workers/auth/api/log-out-of-the-current-session",
            label: "Log out of the current session",
            className: "api-method get"
        }
    ]
};

export default sidebar.apisidebar;
