export default {
  id: 'stack',
  label: 'Stack',
  type: 'grid',
  defaultVisible: 7,
  items: [
    {
      slug: 'magic-patterns',
      headline: 'Magic Patterns',
      body: 'One of my favourite emerging design tools. Rapid prototyping, great interactions, diverge and converge on ideas quickly. Integrates with codebases and builds React. Genuinely exciting right now.',
      modalContent: [
        { type: 'text', value: 'One of my favourite emerging design tools. Rapid prototyping, great interactions, diverge and converge on ideas quickly. Integrates with codebases and builds React. Genuinely exciting right now.' },
        { type: 'link', href: 'https://www.magicpatterns.com', label: 'Visit Magic Patterns ↗' },
      ],
    },
    {
      slug: 'pi',
      headline: 'Pi',
      body: 'My own lightweight coding agent, built for purpose. Highly configurable, stripped back by design. The real value is that it helps me understand what the code is doing, not just ship it. Building it out is as fun as using it.',
      modalContent: [
        { type: 'text', value: 'My own lightweight coding agent, built for purpose. Highly configurable, stripped back by design. The real value is that it helps me understand what the code is doing, not just ship it. Building it out is as fun as using it.' },
        { type: 'link', href: 'https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent', label: 'Visit Pi on GitHub ↗' },
      ],
    },
    {
      slug: 'opencode',
      headline: 'OpenCode',
      body: 'CLI coding agent that lets me use work-approved models. Also configured as a research and analysis agent for delegating deep work. Set it up, point it at a problem, let it run.',
      modalContent: [
        { type: 'text', value: 'CLI coding agent that lets me use work-approved models. Also configured as a research and analysis agent for delegating deep work. Set it up, point it at a problem, let it run.' },
        { type: 'link', href: 'https://github.com/nicepkg/opencode', label: 'Visit OpenCode on GitHub ↗' },
      ],
    },
    {
      slug: 'claude',
      headline: 'Claude',
      body: 'Primary thinking partner. Always on, embedded across the whole workflow. Less a tool I pick up for a specific job, more a constant presence for thinking through problems and shaping ideas.',
      modalContent: [
        { type: 'text', value: 'Primary thinking partner. Always on, embedded across the whole workflow. Less a tool I pick up for a specific job, more a constant presence for thinking through problems and shaping ideas.' },
        { type: 'link', href: 'https://claude.ai', label: 'Visit Claude ↗' },
      ],
    },
    {
      slug: 'granola',
      headline: 'Granola',
      body: 'Captures meeting notes automatically. I query those meetings using the MCP with my agent. Simple, effective, means I never have to write notes manually again.',
      modalContent: [
        { type: 'text', value: 'Captures meeting notes automatically. I query those meetings using the MCP with my agent. Simple, effective, means I never have to write notes manually again.' },
        { type: 'link', href: 'https://www.granola.ai', label: 'Visit Granola ↗' },
      ],
    },
    {
      slug: 'wispr-flow',
      headline: 'Wispr Flow',
      body: 'Voice to text. More efficient, very accurate, cuts down on typing. Underrated.',
      modalContent: [
        { type: 'text', value: 'Voice to text. More efficient, very accurate, cuts down on typing. Underrated.' },
        { type: 'link', href: 'https://www.wispr.ai', label: 'Visit Wispr Flow ↗' },
      ],
    },
    {
      slug: 'figma',
      headline: 'Figma',
      body: 'The default. Deeply embedded in the company ecosystem and the approved tool. Been using it since launch.',
      modalContent: [
        { type: 'text', value: 'The default. Deeply embedded in the company ecosystem and the approved tool. Been using it since launch.' },
      ],
    },
  ],
};
