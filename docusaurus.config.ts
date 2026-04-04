import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'FIS Documentation',
  tagline: 'Faculty Information System — Complete Documentation',
  favicon: 'img/favicon.ico',
  url: 'https://kk1701.github.io',
  baseUrl: '/fis-docs/',
  organizationName: 'kk1701',
  projectName: 'fis-docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks:{
      onBrokenMarkdownLinks: 'warn'
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',       // docs at root
        },
        blog: false,                // disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'FIS Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/kk1701/fis-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Faculty Information System — Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'json', 'prisma'],
    },
  },
};

export default config;