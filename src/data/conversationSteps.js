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
      <p class="cb-work-card__teaser">What started as a tech migration became a full redesign. 13% more users reached the quote stage.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Turning a manual process into a tool">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Turning a manual process into a tool</p>
      <p class="cb-work-card__teaser">Offer creation went from weeks to minutes. Around two months of labour saved a year.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Building an experimentation practice">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Building an experimentation practice</p>
      <p class="cb-work-card__teaser">Inherited Optimizely, built a lean process, taught the rest of the division to run with it.</p>
    </div>
  </button>
  <button class="cb-work-card" data-prompt="Making accessibility a culture, not a checkbox">
    <div class="cb-work-card__body">
      <p class="cb-work-card__title">Making accessibility a culture, not a checkbox</p>
      <p class="cb-work-card__teaser">Built an internal playbook and guild. Shared the stage with Dylan Alcott on International Accessibility Day.</p>
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
    response: `<p>The operations team was losing months each year to a manual, fragmented process for creating and fulfilling offers. Legacy tools, delayed campaigns, errors.</p>
<p>I designed a modern interface with the marketing team, running regular feedback sessions to make sure we were solving the right problem. I shaped the frontend architecture to simplify backend integration, and wrote production React to hit a tight deadline.</p>
<p>Offer creation dropped from weeks to minutes. Near-zero error rates. Roughly two months of labour saved a year.</p>
<p>One thing that stuck with me: a "best, better, good" framework made prioritisation conversations easy. Everyone could see the trade-offs between ideal and MVP without needing to argue for them.</p>
<figure class="cb-media"><img src="assets/Offers-Landing-Page.jpg" alt="Internal offer management dashboard" /><figcaption>Offer management dashboard</figcaption></figure>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Building an experimentation practice",
    response: `<p>When the experimentation team was disbanded, ownership of Optimizely was transferred to me.</p>
<p>Before taking it on, I sat down with the outgoing team to understand what worked, what didn't, and where the pain points were.</p>
<p>The biggest issue was velocity. Experiments took too long to plan, run, and learn from. Underneath that, the program was running half a dozen experiments a year, most of them disconnected from user problems or business value.</p>
<figure class="cb-media"><figcaption>Lean experimentation process overview.</figcaption></figure>
<p>I rebuilt the program from the ground up. A lean process designed for speed.</p>
<p>Identify issues through data (ContentSquare, Google Analytics), form a testable hypothesis tied to a business outcome, design and develop variants, and run.</p>
<p>I handle the full end-to-end. Analysis through to building variants in Optimizely using HTML, CSS, and JavaScript, or routing directly in React.</p>
<p>The process has since been adopted by other teams across the division, similar to the accessibility playbook. It gave people a framework they could run with independently.</p>
<p>One experiment stands out. I noticed high bounce rates and low scroll depth on our quote funnel entry point.</p>
<p>My hypothesis was that the value exchange wasn't clear enough and users saw too many fields before seeing products. I designed variations that addressed this.</p>
<p>The result was 13% more users reaching the quote stage.</p>
<figure class="cb-media"><figcaption>Data analysis using ContentSquare.</figcaption></figure>
<figure class="cb-media"><figcaption>Demo of an experimentation variant in Optimizely.</figcaption></figure>
<p>Rebuilding the program wasn't just process. It was cross-functional politics, broken relationships to mend, exec trust to earn, and a team to upskill.</p>
<p>I led all of that alongside running the experiments myself. The program now runs on industry best practices, has executive-level trust, and has driven meaningful growth for the business.</p>
<p>The bigger shift was what the program stands for. Hypothesis-led, fast to learn, focused on real user problems tied to real business outcomes. Not experiments for the sake of activity.</p>`,
    nextPrompts: ["What's your process?", "How can I contact you?"],
  },
  {
    prompt: "Making accessibility a culture, not a checkbox",
    response: `<p>Accessibility at nib was reactive. No standardised auditing, no measurement, no consistent process. This became a real problem when partner inquiries about compliance revealed gaps that put commercial relationships at risk.</p>
<p>I built an internal Playbook site with video tutorials and a framework teams could actually follow. To scale it, I launched a11ycats, an internal guild, and ran a company-wide roadshow to train teams on integrating accessibility into their workflow, not bolting it on at the end.</p>
<p>Multiple product teams now use the playbook as part of their process. I was invited to speak alongside Dylan Alcott on International Accessibility Day to share what we'd built.</p>
<p>The thing that shifted wasn't tooling. It was accessibility becoming a conversation, not a checkbox.</p>
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
<p>I'm also on <a href="https://www.linkedin.com/in/lukeylias/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://github.com/lukeylias" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>`,
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
  "Making accessibility a culture, not a checkbox",
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
