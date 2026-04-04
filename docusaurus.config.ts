import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "FIS Docs",
  tagline: "Faculty Information System",
  url: "https://example.com",
  baseUrl: "/",
  organizationName: "test",
  projectName: "fis-docs",
  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Faculty Information System - Documentation",
      items: [],
    },
    footer: {
      style: "dark",
      copyright: "FIS Documentation",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
