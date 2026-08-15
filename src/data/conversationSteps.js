// Conversation tree ported from lukeysite/js/portfolio-new.js
// Each step: { prompt, response (HTML string), nextPrompts }

const CURRENT_WORK = `<p>Currently heads-down on the IWHI funnel rebuild launch and building out my own Cowork plugin for daily ops. More soon.</p>`;

const conversationSteps = [
  {
    prompt: "Who are you?",
    response: `<p>Hey, I'm Luke. I'm a senior product designer at nib. I lead our experimentation practice, shape how the team designs and ships, and build my own AI tooling to extend what I can do.</p>
<p>I design, I code, and the work usually lands in front of the exec team as something that moves the business.</p>
<figure class="cb-media"><img src="assets/me.jpg" alt="Luke Ylias" /></figure>`,
    nextPrompts: ["What have you shipped?", "What's your process?", "What are you working on?"],
  },
  {
    prompt: "What have you shipped?",
    response: `<p>Here's a cross-section of my work at nib. Pick one to dig into.</p>
<div class="cb-card-grid" id="work-card-grid">
  <button class="cb-work-card" data-prompt="Redesigning a funnel inside a rebuild">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Redesigning a funnel inside a rebuild</p>
      <p class="cb-work-card__teaser">What started as a technical migration became a full redesign. Drop-off decreased by 18%, and mobile conversion increased by 11%.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Turning a manual process into a tool">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Turning a manual process into a tool</p>
      <p class="cb-work-card__teaser">A multi-tool process that took up to two months now takes around 30 minutes in one workspace.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Building an experimentation practice">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Building an experimentation practice</p>
      <p class="cb-work-card__teaser">Built a shared operating model for parallel and overlapping experiments.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Building accessibility capability">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Building accessibility capability</p>
      <p class="cb-work-card__teaser">Created practical guidance and a11ycats. My product team completed 45 accessibility tickets.</p>
    </div>
  </button>
</div>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Redesigning a funnel inside a rebuild",
    response: `<p>The International Workers Health Insurance funnel was being rebuilt from Next.js to Next. The scope was a straight technical lift, replicate what existed, no changes. I saw this as a missed opportunity. The funnel had known issues: drop-offs at key points, a mobile experience that was broken in places, a UI that hadn't been updated in years.</p>
<p>I asked the product manager whether we could use the rebuild to address this. The answer was yes.</p>
<figure class="cb-media"><figcaption>Before and after comparison of the original IWHI funnel versus the redesigned version.</figcaption></figure>
<p>I dug into ContentSquare and past research to ground the redesign. The existing funnel was built for users with high intent, which alienated anyone just shopping around for prices. I shaped a vision to simplify the visuals, improve content hierarchy, separate the quote experience from the join experience, and give users the content they needed upfront. Transparent pricing, clearer expectations, meaningful colour choices, and a responsive layout that actually worked.</p>
<figure class="cb-media"><figcaption>The redesigned IWHI product selection page, showing the new cover cards and layout.</figcaption></figure>
<p>Partway through, the dev team was short-staffed and at risk of missing the deadline. I jumped into the codebase. The existing implementation was inconsistent, so I built a layout component to standardise the experience across pages, and worked through the funnel to align typography, colour, and responsiveness with the design system.</p>
<p>I also prototyped a new carousel component in GitHub, then co-designed it with the design ops team to get it into the Mesh design system. It's now part of the new funnel.</p>
<figure class="cb-media"><figcaption>Short video or GIF of the carousel component in action, or a screenshot of the GitHub PR or Mesh documentation page.</figcaption></figure>
<p>Beyond unblocking the deadline, the code work set a foundation. The visual language and UX patterns were now easier for developers to extend, not harder.</p>
<p>The funnel has been live for months. Accessibility feedback from users with lived experience was positive, and the funnel has driven a meaningful uplift in sales. I'm continuing to run experiments to validate assumptions and carry those insights forward.</p>
<figure class="cb-media"><figcaption>Chart or callout showing the sales uplift, or a clean outro screenshot of the live funnel on mobile and desktop.</figcaption></figure>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Turning a manual process into a tool",
    response: `<p>The offer team relied on Excel sheets, Word documents, backend queries and a legacy portal. Work moved across several teams, and the process could take up to two months.</p>
<p>I mapped the workflow with the marketing and offer teams, then designed one workspace for creating offers, managing drafts, planning work and selecting audiences. I also contributed React to the initial implementation.</p>
<p>The core workflow now takes around 30 minutes. Manual processing errors have been eliminated, and teams spend less time coordinating files and handoffs.</p>
<figure class="cb-media"><img src="assets/Offers-Landing-Page.jpg" alt="Internal offer management dashboard" /><figcaption>Offer management dashboard</figcaption></figure>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Building an experimentation practice",
    response: `<p>At the end of 2025, ownership of Optimizely moved to my product team after a separate optimisation function was disbanded.</p>
<p>I interviewed the outgoing team, reviewed established experimentation programs, and delivered the first version of a new operating model within a month.</p>
<p>I combined three years of qualitative research with Contentsquare, Google Analytics, funnel drop-off analysis and competitor research. That work identified four shared problem areas for the program.</p>
<figure class="cb-media"><figcaption>Lean experimentation process overview.</figcaption></figure>
<p>The model ties each experiment to a problem area, a testable hypothesis and metrics connected to customer and business outcomes. It also supports parallel and overlapping experiments instead of assuming only one can run at a time.</p>
<p>I initially ran the work end to end, including analysis, hypotheses, design, development, QA, monitoring and reporting. I later upskilled developers and helped establish an internal server-side experimentation library.</p>
<p>A representative Welcome-page experiment replaced a seven-field form with a guided flow that asked one question at a time.</p>
<p>Across 40,630 visitors, it increased progression to Hospital by 14.16% and Quote Complete by 6.48%.</p>
<figure class="cb-media"><figcaption>Data analysis using Contentsquare.</figcaption></figure>
<figure class="cb-media"><figcaption>Demo of an experimentation variant in Optimizely.</figcaption></figure>
<p>The program now supports parallel and overlapping experiments and is being introduced to other teams as a shared standard.</p>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Building accessibility capability",
    response: `<p>I began this work independently in mid-2024, drawing on accessibility experience from my previous role.</p>
<p>I first created a single-page guide with ten common checks and a11ycats, an internal group that grew to around 40 members.</p>
<p>An external agency then audited products across the business. I used those findings to expand the guidance into an interactive playbook website.</p>
<p>I presented the playbook to around six product teams and helped each team use it to audit parts of its own application.</p>
<p>My product team completed 45 accessibility tickets, with two remaining items parked. Across the wider business, more than 80% of identified issues were addressed.</p>
<p>I later joined an International Accessibility Day panel alongside Dylan Alcott to share the approach. The work has since been handed to other teams to continue.</p>
<figure class="cb-media"><img src="assets/meatnib.jpeg" alt="International Accessibility Day presentation" /><figcaption>International Accessibility Day with Dylan Alcott</figcaption></figure>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "What's your process?",
    response: `<p>Placeholder response. Luke will provide full copy for this node separately. This is the merged ethos + AI + tools node, covering how Luke works: principles, approach, and the tools that support it.</p>`,
    nextPrompts: ["What have you shipped?", "What are you working on?", "How can I contact you?"],
  },
  {
    prompt: "What are you working on?",
    response: CURRENT_WORK,
    nextPrompts: ["What's your process?", "What have you shipped?", "How can I contact you?"],
  },
  {
    prompt: "What else should I know?",
    response: `<p>I live in Sydney. Married, no kids yet. I spend a lot of time on music, film, and anything that gets me away from a screen.</p>
<p>I've been into music since I was a teenager, both making and listening. I'll lose an afternoon to a new album. Film is the other one, I watch more than I should and think about it more than I admit.</p>`,
    nextPrompts: ["How can I contact you?"],
  },
  {
    prompt: "How can I contact you?",
    response: `<p>Easiest way is email: <a href="mailto:lukeylias@gmail.com">lukeylias@gmail.com</a></p>
<p>I'm also on <a class="external-link" href="https://www.linkedin.com/in/lukeylias/" target="_blank" rel="noopener noreferrer">LinkedIn<img class="external-link-icon" src="/icons/arrow-up-right.svg" width="16" height="16" alt="" aria-hidden="true"></a> and <a class="external-link" href="https://github.com/lukeylias" target="_blank" rel="noopener noreferrer">GitHub<img class="external-link-icon" src="/icons/arrow-up-right.svg" width="16" height="16" alt="" aria-hidden="true"></a>.</p>`,
    nextPrompts: [],
  },
];

export const initialPrompts = ["Who are you?"];

export const GUIDED_SEQUENCE = [
  "Who are you?",
  "What's your process?",
  "What are you working on?",
  "What else should I know?",
  "How can I contact you?",
];

// Prompts that should never appear as fallback chips (work card sub-nodes)
export const WORK_SUB_NODES = new Set([
  "Redesigning a funnel inside a rebuild",
  "Turning a manual process into a tool",
  "Building an experimentation practice",
  "Building accessibility capability",
]);

// Ordered fallback priority list
export const FALLBACK_PRIORITY = [
  "What have you shipped?",
  "What's your process?",
  "What are you working on?",
  "What else should I know?",
  "How can I contact you?",
];

export default conversationSteps;
