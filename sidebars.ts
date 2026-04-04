import type {SidebarsConfig} from '@docusaurus/types';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Faculty Guide',
      items: ['faculty-guide/registration'],
    },
    {
      type: 'category',
      label: 'Admin Guide',
      items: ['admin-guide/approvals'],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: ['api-reference/auth'],
    },
    {
      type: 'category',
      label: 'Analytics Reference',
      collapsed: true,
      items: ['analytics-reference/research-domains'],
    },
  ],
};


export default sidebars;