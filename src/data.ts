/**
 * EDIT THIS FILE to update the whole site.
 * Empty strings ("") and empty lists ([]) are hidden from the page.
 */
export type Shot = { src: string; alt: string; caption?: string };
export type Stat = { value: number; suffix?: string; label: string };
export type Project = {
  id: string; name: string; tagline: string; tag: string; role: string;
  summary: string; problem: string; solution: string;
  contribution: string[]; features: string[]; stack: string[];
  stats?: Stat[]; terminal?: { title: string; lines: [string, string, number?][] }; shots?: Shot[]; shotStyle?: "phone" | "wide";
  logo?: string; accent: string;
  repo?: string; demo?: string; note?: string;
};

export const profile = {
  name: "Siyamthanda Mgqoboka",
  title: "Junior Software Developer | Full-Stack & Mobile | Computer Science Student",
  intro:
    "Final-year Computer Science and Application Development student at Emeris, with a Higher Certificate in Mobile Application and Web Development (with distinction). I build full-stack web and mobile apps end to end: Flutter and Android front ends, Node.js and .NET APIs, and the databases behind them. I have led a development team, owned APIs, and shipped work for real clients.",
  photo: "photo.jpg",
  photoAlt: "Siyamthanda Mgqoboka smiling in a black graduation gown and cap with a blue stole, holding a diploma tube against a blue backdrop",
  cv: "Siyamthanda-Mgqoboka-CV.pdf", // file lives in public/
  location: "South Africa",
  availability: "Available for remote or hybrid work, ready to start immediately.",
  availabilityExtra: "Flexible hours and happy to work across time zones (based in SAST, UTC+2).",
  openTo: ["Remote or hybrid developer roles", "Full-stack and mobile roles", "Internships and graduate programmes", "Contract and freelance work"],
};

export const roles = ["Full-stack developer", "Flutter & mobile developer", "API builder", "Lead developer", "Ironman finisher"];

export const highlights: Stat[] = [
  { value: 8, label: "Projects built" },
  { value: 102, label: "Automated tests on HustleHub+" },
  { value: 3, label: "Stacks: Flutter, MERN and .NET" },
];

export type Edu = { qualification: string; institution: string; place?: string; period: string; status: string; note?: string; image?: string; pdf?: string };
export const education: Edu[] = [
  { qualification: "Bachelor's degree in Computer Science and Application Development", institution: "Emeris", place: "South Africa", period: "Final year", status: "In progress" },
  { qualification: "Higher Certificate in Mobile Application and Web Development", institution: "IIE Varsity College", period: "Started 2023, awarded 31 December 2023", status: "Graduated", note: "With distinction",
    image: "certificates/higher-certificate.jpg", pdf: "certificates/higher-certificate.pdf" },
];

export const certifications = [
  { title: "Generic Management Level 4", type: "Learnership", issuer: "SpecCon Holdings", date: "30 September 2024", code: "EDhoGkxILm",
    image: "certificates/general-management-level-4.jpg", pdf: "certificates/general-management-level-4.pdf" },
];

export const about = {
  steps: ["Break it down", "Build one piece", "Test it", "Learn and adjust"],
  approach:
    "I plan in segments, a bit like cutting an elephant into small pieces: I break a requirement into small tasks, finish and test each one, then move to the next. When something breaks, I work through it step by step, reading the error, isolating the cause and confirming the fix with tests. On our group marketplace project I set up the database connection first and built the layers on top of it, and I treat every bug as feedback for the next piece.",
  leadership:
    "Leading the app development on Reggy, I set the technical direction, split the work across the team and kept the front end and back end moving together. I enjoy the planning side as much as the code: scoping features, agreeing API contracts early and keeping a project on track to deadline.",
  learning:
    "I do my best work inside a team: code reviews, shared standards and real production work. I take feedback openly and I'm keen to contribute reliably from day one.",
  life: [
    { title: "Ironman finisher", text: "I trained for and completed a full Ironman. The same discipline, planning and stamina go into my work." },
    { title: "Gym", text: "Training is part of my daily routine and keeps me focused and consistent." },
    { title: "Reading", text: "I read widely, and it keeps me curious and learning outside of code." },
  ],
};

// logo = a file in public/logos/
const L = (name: string, logo?: string) => ({ name, logo });
export const skills: { group: string; items: { name: string; logo?: string }[] }[] = [
  { group: "Languages", items: [L("Dart", "dart.svg"), L("Kotlin"), L("C#", "csharp.svg"), L("JavaScript", "javascript.svg"), L("TypeScript", "typescript.svg"), L("HTML5", "html5.svg"), L("CSS3", "css3.svg")] },
  { group: "Mobile and frontend", items: [L("Flutter", "flutter.svg"), L("Android"), L("React", "react.svg"), L("Vite"), L("Flame")] },
  { group: "Backend and APIs", items: [L("Node.js", "nodejs.svg"), L("Express", "express.svg"), L(".NET / ASP.NET Core", "dotnetcore.svg"), L("REST APIs"), L("JWT auth")] },
  { group: "Databases", items: [L("MongoDB", "mongodb.svg"), L("SQLite"), L("EF Core")] },
  { group: "Cloud, DevOps and tools", items: [L("Git", "git.svg"), L("GitHub", "github.svg"), L("GitHub Actions"), L("Docker", "docker.svg"), L("Railway", "railway.svg"), L("AWS", "aws.svg"), L("Azure", "azure.svg"), L("Postman")] },
  { group: "Testing", items: [L("Jest"), L("Vitest"), L("xUnit"), L("flutter_test"), L("Newman")] },
];

export const softSkills = [
  "Project management", "Strategic planning", "Technical leadership", "Team coordination",
  "Requirements analysis", "Client communication", "Problem solving",
];

export const projects: Project[] = [
  {
    id: "reggy", name: "Reggy", tag: "Led the app development · Team project",
    tagline: "Smart student registration and campus navigation for Emeris",
    role: "Led the app development, and worked as a full-stack developer (front end and back end)",
    summary: "A Flutter app that makes the Emeris registration system smarter, taking students from applicant to registered with a digital ID, document tracking, campus maps and an AI assistant.",
    problem: "Registration at Emeris meant queues, paperwork and students not knowing what step came next or where to go on campus.",
    solution: "Our team came in to make the registration system smarter. Reggy puts the whole journey in one app: progress tracking, document uploads, a scannable digital student ID, campus navigation and an AI assistant that answers questions on the spot.",
    contribution: [
      "Led the app development team: set the technical direction, split the work and kept delivery on track",
      "Built across the full stack, from the Flutter screens to the back-end logic and data models",
      "Shaped the app structure (screens, shared widgets, theme and data models) so the team could work in parallel",
    ],
    features: [
      "Applicant and student login",
      "Dashboard with a progress ring, next step and journey stepper",
      "Document upload status tracking",
      "Digital student ID with a real, scannable QR code",
      "Campus navigation map with nearby destinations",
      "AI assistant chat with quick-reply prompts",
    ],
    stack: ["Flutter", "Dart", "Material Design", "QR codes", "Google Fonts"],
    logo: "projects/reggy-logo.png", accent: "#F0B429",
    repo: "https://github.com/Siya23-maker/reggy_app",
  },
  {
    id: "impilo", name: "Impilo", tag: "API owner · Team project",
    tagline: "A mental health companion. Impilo is isiXhosa for \"life\" and \"health\"",
    role: "API developer: I designed and built the API behind the app",
    summary: "An Android mental health app that helps people check in with themselves, set small goals, break them into daily tasks and talk things through with a supportive AI companion.",
    problem: "Looking after your mental health can feel like one more chore, and many people don't know where to start when they feel overwhelmed.",
    solution: "Impilo keeps it gentle: one active goal, one small next step and a calm space to talk. Goals sync across Home, Tasks and Profile, and the AI companion helps users plan their week or reset when things feel heavy. It is clear that Impilo supports, and does not replace, professional care.",
    contribution: [
      "Owned the API: designed and built the back end the app relies on for its data and AI chat",
      "Connected the app to the API so goals and tasks stay in sync across every screen",
      "Hosted the API on Railway so the app works outside a local machine",
    ],
    features: [
      "Personalised home with today's active goal and next step",
      "Goals broken into small daily tasks with progress tracking",
      "AI chat companion with prompts like \"Feeling overwhelmed\" and \"Plan my week\"",
      "Automated insights suggesting one small action and one reflection per goal",
      "Profile and settings with journey progress",
      "Continuous integration build on GitHub Actions",
    ],
    stack: ["Android", "Kotlin", "REST API", "Railway", "GitHub Actions", "Gradle"],
    shotStyle: "phone", accent: "#14B8A6",
    shots: [
      { src: "projects/impilo-home.jpg", alt: "Impilo home screen showing today's active goal and quick access tiles", caption: "Home" },
      { src: "projects/impilo-tasks.jpg", alt: "Impilo tasks screen with the focus goal and smart next step", caption: "Tasks" },
      { src: "projects/impilo-chat.jpg", alt: "Impilo AI chat screen asking how it can help", caption: "AI chat" },
      { src: "projects/impilo-goals.jpg", alt: "Impilo goals screen with goal progress and an automated insight", caption: "Goals" },
      { src: "projects/impilo-profile.jpg", alt: "Impilo settings and profile screen with journey progress", caption: "Profile" },
    ],
    note: "Code is in a private university repository and can be shown on request.",
  },
  {
    id: "stacey", name: "Stacey", tag: "Developer · Connected to Impilo",
    tagline: "A personal companion that works alongside Impilo",
    role: "Developer",
    summary: "Stacey is a personal companion connected to Impilo. Where Impilo tracks goals and wellbeing, Stacey is the conversational side: a friendly companion people can talk to day to day.",
    problem: "Wellbeing apps often feel clinical. People open up more easily to something that feels personal.",
    solution: "Stacey gives Impilo a personal, conversational companion that links into the same user journey, so support feels like a conversation rather than a form.",
    contribution: ["Built Stacey as a personal companion connected to Impilo"],
    features: [], stack: [], accent: "#A78BFA",
  },
  {
    id: "hustlehub", name: "HustleHub+", tag: "Team project · Secure marketplace",
    tagline: "A secure freelancer marketplace built on the MERN stack",
    role: "Full-stack developer: database and back-end layers",
    summary: "Freelancers advertise gigs, clients browse and book them, every booking records a simulated payment, and freelancers track their income in rands. Security is built into every layer.",
    problem: "Freelancers need one trusted place to advertise, take bookings and keep track of what they earn, without exposing user data.",
    solution: "A React front end on a secured HTTPS Express API, with role-based access for clients, freelancers and admins, and booking and payment records kept in MongoDB.",
    contribution: [
      "Set up the MongoDB database connection first and built the service layers on top of it",
      "Built back-end layers on that foundation, following the routes, controller and service pattern",
    ],
    features: [
      "JWT authentication with bcrypt password hashing and a strong password policy",
      "Role-based access control for Client, Freelancer and Admin",
      "Gig management, browsing with filters and pagination, and booking",
      "Simulated payment transaction for every booking, with rollback on failure",
      "Income totals with a monthly breakdown in ZAR",
      "Rate limiting, input sanitisation, NoSQL-injection protection and Helmet security headers",
    ],
    stats: [
      { value: 64, label: "Back-end tests passing (Jest)" },
      { value: 38, label: "Front-end tests passing (Vitest)" },
      { value: 95, label: "API assertions passing (Newman)" },
    ],
    terminal: { title: "hustlehub-plus · test run", lines: [
      ["cmd", "npm test --prefix backend"],
      ["ok", "✓ 10 suites · 64 / 64 tests passed", 100],
      ["cmd", "npm test --prefix frontend"],
      ["ok", "✓ 10 files · 38 / 38 tests passed", 100],
      ["cmd", "newman run hustlehub-api.json --insecure"],
      ["ok", "✓ 64 requests · 95 assertions · 0 failed", 100],
      ["dim", "  rate limiting: 429 returned after 5 failed logins"],
      ["dim", "  helmet CSP, HSTS, nosniff headers on every response"],
      ["cmd", "npm run build --prefix frontend"],
      ["ok", "✓ built in production mode"],
    ] },
    stack: ["React", "Node.js", "Express", "MongoDB", "Vite", "JWT auth", "Jest", "Vitest", "Postman"],
    accent: "#7C3AED",
    note: "Code is in a private university repository and can be shown on request.",
  },
  {
    id: "smartx", name: "Smart-X Detecto", tag: "Sensor management · Simulation",
    tagline: "From ripple to response: real-time sensor management with a live fish simulation",
    role: "Full-stack developer",
    summary: "A sensor management system for Smart-X AquaVerse, an animated underwater world. Every sensor reading is queued, prioritised, stored and acted on in real time.",
    problem: "When many sensors report at once, urgent readings can get lost among routine ones.",
    solution: "Smart-X Detecto queues incoming readings, prioritises the urgent ones, keeps a history and triggers a response. An ASP.NET Core MVC and Web API back end drives a Flutter and Flame simulation where the fish and water react to the data.",
    contribution: [
      "Built the system end to end: the ASP.NET Core API that queues and prioritises readings, and the Flutter and Flame simulation that responds to them",
    ],
    features: [
      "Real-time sensor reading queue with prioritisation",
      "Reading history stored with SQLite and EF Core",
      "Live animated aquarium simulation",
      "Automated tests on both the API and the app",
    ],
    stack: [".NET / ASP.NET Core", "C#", "Flutter", "Flame", "SQLite", "EF Core", "xUnit", "flutter_test"],
    shotStyle: "wide", accent: "#38BDF8",
    shots: [{ src: "projects/smartx-banner.jpg", alt: "Smart-X Detecto banner with animated fish swimming underwater and the slogan From Ripple to Response" }],
  },
  {
    id: "upperroom", name: "The Upper Room", tag: "Client website · Live",
    tagline: "Gather together, brewing in unity: a marketplace for a church community",
    role: "Sole developer: design and build",
    summary: "A Christian multi-vendor marketplace where church-member businesses sell handcrafted decor, linen, drinkware and gifts, with customer, seller and admin dashboards.",
    problem: "Small businesses in the church community had no shared place to sell, and customers had no single place to find them.",
    solution: "One warm storefront for every member business, with a seller application flow, stock and order management for sellers, and an admin area to approve sellers and track payouts.",
    contribution: [
      "Designed and built the whole site myself, front to back",
      "Wrote a zero-dependency Node.js server so deep links work on refresh",
      "Deployed it live on GitHub Pages",
    ],
    features: [
      "Shop with search, categories, filters and sorting",
      "Product pages with size and colour options",
      "Cart drawer and demo checkout with success and decline flows",
      "Three-step Become a Seller application",
      "Customer, seller and admin dashboards",
      "Seller stock, orders, earnings and payout requests",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Node.js", "GitHub Pages"],
    shotStyle: "wide", accent: "#7A2E46", logo: "projects/upperroom-logo.jpg",
    shots: [
      { src: "projects/ur-home.jpg", alt: "The Upper Room home page with the headline Gather together, brewing in unity", caption: "Home" },
      { src: "projects/ur-seller.jpg", alt: "The Upper Room seller dashboard showing products, open orders and net earnings", caption: "Seller dashboard" },
      { src: "projects/ur-shop.jpg", alt: "The Upper Room shop page with product filters", caption: "Shop" },
      { src: "projects/ur-admin.jpg", alt: "The Upper Room admin dashboard", caption: "Admin dashboard" },
    ],
    demo: "https://siya23-maker.github.io/uppperroom/",
    repo: "https://github.com/Siya23-maker/uppperroom",
  },
  {
    id: "savora", name: "Savora", tag: "Developer · Personal finance",
    tagline: "A budgeting app that makes saving feel manageable",
    role: "Developer",
    summary: "Savora helps people plan a budget, track what they spend and see where their money goes, so saving feels manageable.",
    problem: "Many people don't know where their money goes each month until it's gone.",
    solution: "A simple budgeting app that makes spending visible and keeps users on top of their goals.",
    contribution: ["Built the budgeting features and the app experience"],
    features: [], stack: [], accent: "#22C55E",
  },
  {
    id: "bible", name: "Church Bible reading app", tag: "Built for my church",
    tagline: "A Bible reading plan customised for my church",
    role: "Developer",
    summary: "A Bible reading tool built specifically for my church, so the congregation can follow the same reading plan together.",
    problem: "Members needed a simple, shared way to stay on the same reading plan.",
    solution: "A reading experience shaped around my church's own plan and community.",
    contribution: ["Designed and built it for my church community"],
    features: [], stack: [], accent: "#F59E0B",
  },
];

export const contact = {
  email: "siyamthandamgqoboka185@gmail.com",
  linkedin: "", // full URL, e.g. https://www.linkedin.com/in/your-handle
  github: "https://github.com/Siya23-maker",
  phone: "+27 78 162 3153",
  whatsapp: "+27 73 041 6950",
};
