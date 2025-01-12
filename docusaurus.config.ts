// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import type * as SearchLocal from "@easyops-cn/docusaurus-search-local";

const config: Config = {
    title: "tablerus.es - Docs",
    tagline: "Dinosaurs are cool",
    favicon: "img/favicon.svg",
    url: "https://hectortablero.github.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    organizationName: "HectorTablero",
    projectName: "cf-page-docs",

    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    routeBasePath: "/",
                    docItemComponent: "../src/theme/ApiItem/index"
                },
                theme: {
                    customCss: "./src/css/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        docs: {
            sidebar: {
                hideable: true
            }
        },
        navbar: {
            title: "tablerus.es",
            logo: {
                alt: "My Site Logo",
                src: "img/logo.svg"
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "workersSidebar",
                    position: "left",
                    label: "Workers"
                },
                {
                    type: "docSidebar",
                    sidebarId: "esnRecruitmentSidebar",
                    position: "left",
                    label: "ESN Recruitment"
                },
                {
                    type: "docSidebar",
                    sidebarId: "qedSidebar",
                    position: "left",
                    label: "QED"
                },
                {
                    href: "https://github.com/HectorTablero/cf-page-docs",
                    position: "right",
                    className: "header-github-link",
                    "aria-label": "GitHub repository"
                }
                // {
                //     type: "localeDropdown",
                //     position: "right"
                // }
            ]
        }
        // footer: {
        //     style: "dark",
        //     copyright: `Copyright © ${new Date().getFullYear()} tablerus.es. Built with Docusaurus.`
        // }
    } satisfies Preset.ThemeConfig,

    plugins: [
        [
            "docusaurus-plugin-openapi-docs",
            {
                id: "openapi",
                docsPluginId: "classic",
                config: {
                    "esn-recruitment": {
                        specPath: "docs/esn-recruitment/api/openapi.yaml",
                        outputDir: "docs/esn-recruitment/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag"
                        },
                        hideSendButton: true
                    } satisfies OpenApiPlugin.Options,
                    "actions-worker": {
                        specPath: "docs/workers/actions/api/openapi.yaml",
                        outputDir: "docs/workers/actions/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag"
                        },
                        hideSendButton: true
                    } satisfies OpenApiPlugin.Options,
                    "auth-worker": {
                        specPath: "docs/workers/auth/api/openapi.yaml",
                        outputDir: "docs/workers/auth/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag"
                        },
                        hideSendButton: true
                    } satisfies OpenApiPlugin.Options,
                    "googleforms-worker": {
                        specPath: "docs/workers/googleforms/api/openapi.yaml",
                        outputDir: "docs/workers/googleforms/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag"
                        },
                        hideSendButton: true
                    } satisfies OpenApiPlugin.Options
                } satisfies Plugin.PluginOptions
            }
        ]
    ],

    themes: [
        "@docusaurus/theme-live-codeblock",
        "docusaurus-theme-openapi-docs",
        [
            "@easyops-cn/docusaurus-search-local",
            {
                indexBlog: false,
                docsRouteBasePath: "/",
                hashed: true
            } satisfies SearchLocal.PluginOptions
        ]
    ]
};

export default async function createConfig() {
    return config;
}
