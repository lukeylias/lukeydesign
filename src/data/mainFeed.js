export default {
  id: 'main-feed',
  label: 'Main Feed',
  type: 'grid',
  defaultVisible: 3,
  items: [
    {
      slug: 'sa11y',
      headline: 'Sa11y',
      body: 'A web accessibility tool that translates WCAG guidelines into plain language. Built for non-experts who find standard auditing tools intimidating.',
      modalContent: [
        { type: 'text', value: 'I built Sa11y because accessibility auditing is intimidating for non-experts. Most tools assume you already understand WCAG. Sa11y explains what\'s wrong and why it matters in terms anyone can follow.' },
        { type: 'text', value: 'The site itself models best-in-class accessibility standards: semantic HTML, clear hierarchy, tested against the same criteria it checks for.' },
        { type: 'link', href: 'https://sa11y.com', label: 'sa11y.com' },
        { type: 'link', href: 'https://github.com/lukeylias/sa11y', label: 'GitHub' },
      ],
    },
    {
      slug: 'a11ycat',
      headline: 'a11ycat',
      body: 'An AI-powered accessibility auditor that scans code against WCAG standards using a custom MCP. Built to integrate accessibility checks into the QA workflow, not treat them as an afterthought.',
      modalContent: [
        { type: 'text', value: 'I wanted to integrate accessibility checks directly into the QA workflow rather than treating it as an afterthought. a11ycat uses a custom Model Context Protocol to connect an LLM to WCAG documentation, then scans code and flags issues with plain-language explanations.' },
        { type: 'text', value: 'Part of my broader exploration into how AI can remove friction from design operations without replacing the thinking.' },
        { type: 'link', href: 'https://github.com/lukeylias/a11ycat', label: 'GitHub' },
      ],
    },
    {
      slug: 'figma-plugins',
      headline: 'Figma Plugins',
      body: 'Three plugins built to reduce friction and speed up design workflows. File organisation, rapid UI patterns, and a Dynamic Type reference tool.',
      modalContent: [
        { type: 'text', value: 'Three plugins built to reduce friction in the design workflow.' },
        { type: 'text', value: 'DesignSync — standardises file organisation to reduce developer handoff friction and improve discoverability. Built with TypeScript and React.' },
        { type: 'link', href: 'https://github.com/lukeylias/designsync', label: 'DesignSync on GitHub' },
        { type: 'text', value: 'Playbook — generates key UI patterns instantly to accelerate prototyping for the wider design team.' },
        { type: 'text', value: 'iOS Dynamic Type Scale — a reference for designing with Apple\'s Dynamic Type system. Helps designers understand how text scales across accessibility sizes.' },
        { type: 'image', src: '/images/CleanShot_2025-12-17_at_10.26.46_2x-9ef7e969-729e-40b3-ac74-5883bfd8c85f.png', alt: 'Figma plugins' },
      ],
    },
  ],
};
