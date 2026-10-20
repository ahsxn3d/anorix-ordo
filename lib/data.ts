export type Layer = { slug: string; no: string; name: string; line: string; body: string; does: string[]; holds: string[]; cmd: string };
export const layers: Layer[] = [
  { slug: "planner", no: "L1", name: "Planner", line: "Brief in, mission out.", body: "Breaks a brief, a screenshot or a Figma link into a mission: steps, files in scope, approvals it will ask for and a written definition of done. When the brief changes, the plan changes with it and tells you what moved.", does: ["Drafts the mission and its steps", "Locks the files in scope", "Asks you when the brief is unclear", "Writes the definition of done"], holds: ["Scope changes", "Anything not in the brief"], cmd: "helm plan ./brief.md" },
  { slug: "builder", no: "L2", name: "Builder", line: "Small diffs you can read.", body: "Writes and edits code in your repo with your stack and your design tokens. Every change is a small, labelled diff, and new dependencies wait for your say-so.", does: ["Creates and edits components", "Reuses your tokens and patterns", "Keeps diffs small and labelled", "Runs your build after every step"], holds: ["New dependencies", "Files outside scope"], cmd: "helm build --mission 12" },
  { slug: "critic", no: "L3", name: "Critic", line: "A second opinion on every diff.", body: "Reviews each diff against the brief, the design and your house rules before anything reaches QA. It sends work back with a reason, never silently.", does: ["Checks diffs against the brief", "Flags contrast and duplicate UI", "Catches claims you didn't make", "Explains every send-back"], holds: ["Nothing; it only reviews"], cmd: "helm critique --diff 12" },
  { slug: "qa", no: "L4", name: "QA", line: "A real browser, four widths.", body: "Drives a real browser at 1440, 1024, 768 and 390 pixels. It looks for overlaps, console errors, broken hovers and slow frames, and attaches screenshots to every finding.", does: ["Tests at four widths", "Records console errors", "Checks every hover state", "Measures scroll frame rate"], holds: ["Nothing; it only reports"], cmd: "helm qa --widths 1440,1024,768,390" },
  { slug: "shipper", no: "L5", name: "Shipper", line: "Ready to ship. Waiting for you.", body: "Prepares commits, previews and deploys, and holds every outward step until you approve it. Deploys are off unless you turn them on.", does: ["Prepares commits and messages", "Runs local previews", "Queues pushes for approval", "Keeps a receipt for every step"], holds: ["git push", "Deploys", "Any spend"], cmd: "helm ship --hold" },
];
export const getLayer = (s: string) => layers.find((l) => l.slug === s);
export type Item = { id: string; kind: "plan" | "addon"; name: string; price: number; per: string; line: string; gets: string[] };
export const plans: Item[] = [
  { id: "solo", kind: "plan", name: "Solo", price: 19, per: "/mo", line: "One builder, one repo at a time.", gets: ["All five layers", "3 active missions", "Local previews", "Approvals and kill switch"] },
  { id: "studio", kind: "plan", name: "Studio", price: 49, per: "/mo", line: "Small teams shipping weekly.", gets: ["Everything in Solo", "15 active missions", "Shared house rules", "Overnight mission queue"] },
  { id: "agency", kind: "plan", name: "Agency", price: 149, per: "/mo", line: "Many clients, many repos.", gets: ["Everything in Studio", "Unlimited missions", "Per-client workspaces", "Audit log export"] },
];
export const addons: Item[] = [
  { id: "approvals", kind: "addon", name: "Approvals layer", price: 9, per: "/mo", line: "Approve from your phone, with rules per repo.", gets: ["Mobile approvals", "Rules per repo", "Approval history"] },
  { id: "killswitch-pro", kind: "addon", name: "Kill-switch pro", price: 12, per: "/mo", line: "A hardware-key stop and timed auto-pause.", gets: ["Hardware key support", "Auto-pause on budget", "Stop reports"] },
  { id: "design-review", kind: "addon", name: "Design-review agent", price: 15, per: "/mo", line: "Reviews spacing, type and rhythm against your design file.", gets: ["Spacing and type checks", "Figma comparison", "Visual diffs"] },
];
export const items = [...plans, ...addons];
export const docs: { slug: string; title: string; lead: string; body: [string, string][] }[] = [
  { slug: "getting-started", title: "Getting started", lead: "Install Helm, connect a repo and run your first mission.", body: [["Install", "npm i -g @helm/cli\nhelm login"], ["Connect a repo", "cd my-site\nhelm init   # writes helm.config.json, nothing else"], ["First mission", "helm plan \"Add a pricing page with three plans\"\nhelm run --mission 1"], ["Approve", "helm approvals   # see what is waiting\nhelm approve 3"]] },
  { slug: "layers", title: "Layers", lead: "Planner, Builder, Critic, QA and Shipper. Each one checks the last.", body: [["Turn a layer off", "helm layers disable critic   # not recommended"], ["House rules", "# .helm/rules.md\n- No new colours outside tokens.css\n- Headlines in sentence case"], ["QA widths", "helm qa --widths 1440,1024,768,390"]] },
  { slug: "missions", title: "Missions", lead: "A mission is a brief, a scope, a budget and a definition of done.", body: [["Scope", "helm plan brief.md --scope app/ components/"], ["Budget", "helm run --mission 4 --budget 2h"], ["Overnight", "helm queue add --mission 5 --at 23:00"], ["Receipts", "helm receipts --mission 4"]] },
  { slug: "api", title: "API", lead: "Start missions and read receipts from your own tools.", body: [["Start a mission", "POST /v1/missions\n{ \"brief\": \"Fix the nav overlap at 390px\", \"repo\": \"site\" }"], ["Read status", "GET /v1/missions/42\n→ { \"state\": \"waiting_approval\", \"step\": 6 }"], ["Stop everything", "POST /v1/kill\n→ { \"stopped\": 3 }"]] },
];
export const changelog: [string, string, string[]][] = [
  ["0.6", "Preview", ["Overnight mission queue", "Receipts now include screenshots", "Kill switch stops queued missions too"]],
  ["0.5", "Preview", ["Critic explains every send-back", "QA measures scroll frame rate", "House rules file (.helm/rules.md)"]],
  ["0.4", "Private build", ["Shipper holds pushes by default", "Approvals from the CLI", "Four-width QA"]],
  ["0.3", "Private build", ["First version of the mission loop", "Planner writes a definition of done"]],
];
export const faq: [string, string][] = [
  ["Is Helm available now?", "Helm is in private build. Checkout on this site is a demo; nothing is charged."],
  ["Will Helm push or deploy on its own?", "No. Pushes, deploys and spend always wait for your approval. Deploys are off unless you turn them on."],
  ["What does the kill switch do?", "It stops every running and queued agent at once and writes a stop report. One key, every time."],
  ["Which stacks does it work with?", "It is built for web projects: React, Next.js, Astro, plain HTML and CSS. It reuses what your repo already has."],
  ["Does my code leave my machine?", "Missions run against your local repo. What is sent for model calls is listed in each receipt."],
  ["Can I cancel?", "Yes, any time. Your missions, receipts and rules stay in your repo."],
];
