/* ------------------------------------------------------------------
   EDIT ME. Everything on the page is generated from this file.
   Credential data below was transcribed from your LinkedIn Learning
   certificates. Themes / chapters / narrative are my groupings - change freely.
------------------------------------------------------------------- */

window.SITE = {
  name: "Shaun D. Jones",              // name as printed on the certificates
  tagline: "Learning & Development · Instructional Design · AI-assisted building",
  // Leave blank to hide. Fill in before publishing.
  contact: { email: "shaundesigner@gmail.com", linkedin: "https://www.linkedin.com/in/sdjoneschicago", website: "" },
};

// Fixed colour slot per theme (validated categorical order - never re-cycled).
window.THEMES = [
  { key: "id",   name: "Instructional Design",   slot: 1 },
  { key: "lnd",  name: "L&D Strategy",           slot: 2 },
  { key: "lead", name: "Leadership & Culture",   slot: 3 },
  { key: "comm", name: "Communication",          slot: 4 },
  { key: "inc",  name: "Inclusion & Bias",       slot: 5 },
  { key: "tech", name: "AI & Technology",        slot: 6 },
  { key: "brand",name: "Brand & Career",         slot: 7 },
  { key: "biz",  name: "Business & Systems",     slot: 8 },
];

// "What are you hiring for?" lenses -> themes that count as evidence.
window.LENSES = [
  { key: "design", label: "Training designed well",   themes: ["id", "lnd", "inc"],
    blurb: "Instructional design models, storyboarding, working with SMEs, program design and inclusive learning." },
  { key: "lead",   label: "A leader and communicator", themes: ["lead", "comm"],
    blurb: "Executive communication, psychological safety, credibility, listening and authentic leadership." },
  { key: "ai",     label: "AI and tech fluency",       themes: ["tech"],
    blurb: "Generative AI, Copilot, Python, vibe coding and interactive web storytelling." },
  { key: "grow",   label: "Strategy and growth",       themes: ["biz", "brand", "lnd"],
    blurb: "Systems thinking, customer experience and success, personal brand and L&D as competitive advantage." },
];

// Story chapters for the scrolling journey. 'to' is exclusive.
window.CHAPTERS = [
  { id: "c1", from: "2021-10-01", to: "2022-01-01", label: "2021", title: "It started with how adults learn",
    text: "Instructional design models, adult learning theory, working with SMEs, storyboarding and agile design, wrapped up with the full Instructional Designer learning path on Nov 14, 2021. I also took Scrollytelling and Systems Thinking, which still shape how I build things like this page." },
  { id: "c2", from: "2022-01-01", to: "2023-01-01", label: "2022", title: "From craft to strategy",
    text: "The busiest year. Two L&D learning paths (advancing as an L&D professional, then building a company program from scratch), a run of inclusion courses, and the soft skills that make training land: listening, questions, credibility. August 2022 alone: six credentials." },
  { id: "c3", from: "2023-01-01", to: "2024-01-01", label: "2023", title: "Leading, and meeting AI early",
    text: "Copilot in July, generative AI in November, Python in December, alongside leadership, psychological safety, storytelling and communicating with executives. I treat new tools as something to learn on the record, not something to wait for." },
  { id: "c4", from: "2024-01-01", to: "2025-01-01", label: "2024", title: "Unlearning on purpose",
    text: "A quieter year, and a deliberate one: learner engagement, customer experience, authentic leadership, and Learning to Unlearn - a course on questioning my own defaults." },
  { id: "c5", from: "2025-01-01", to: "2027-01-01", label: "2025 →", title: "Building with AI, grounded in learning science",
    text: "The future of workplace learning, structured vibe coding, deliberate networking, and applying learning science to training. The same arc that led to this page: learn it, practise it, ship it." },
];

/* t=title  d=date (UTC)  m=minutes  k=course|path  th=theme  sk=skills
   src=PDF stem  cr=professional-credit attestations on file (optional)   */
window.COURSES = [
  { t: "Advancing Your Skills As an L&D Professional", d: "2022-02-24", m: 320, k: "path", th: "lnd",  sk: ["L&D", "Employee Learning & Development"], src: "Advancing Your Skills As an LD Professional" },
  { t: "Agile Instructional Design", d: "2021-11-13", m: 57, k: "course", th: "id", sk: ["Agile Methodologies"], src: "Agile Instructional Design" },
  { t: "Applying Learning Science to Training and Development", d: "2026-01-22", m: 35, k: "course", th: "lnd", sk: ["Training and Development (HR)", "Learning Sciences", "Employee Learning & Development"], src: "Applying Learning Science to Training and Development" },
  { t: "Being Confident on Camera", d: "2022-01-08", m: 24, k: "course", th: "comm", sk: ["Public Speaking"], src: "Being Confident on Camera" },
  { t: "Bill George on Self-Awareness, Authenticity, and Leadership (2020)", d: "2023-11-14", m: 22, k: "course", th: "lead", sk: ["Interpersonal Leadership"], src: "Bill George on SelfAwareness Authenticity and Leadership 2020" },
  { t: "Brainstorming Tools", d: "2022-03-25", m: 70, k: "course", th: "biz", sk: ["Project Management", "Brainstorm Facilitation"], src: "Brainstorming Tools" },
  { t: "Build a Company Learning and Development Program", d: "2022-08-19", m: 430, k: "path", th: "lnd", sk: ["Training Program Design", "Employee Learning & Development"], src: "Build a Company Learning and Development Program" },
  { t: "Build Your Skills as an Instructional Designer", d: "2021-11-14", m: 463, k: "path", th: "id", sk: ["Training and Development (HR)", "Instructional Design", "Learning Analytics"], src: "Build Your Skills as an Instructional Designer" },
  { t: "Building an Audience on Instagram for Creators", d: "2022-01-09", m: 32, k: "course", th: "brand", sk: ["Online Branding", "Audience Development", "Instagram Marketing"], src: "Building an Audience on Instagram for Creators" },
  { t: "Communicate to Influence (Blinkist Summary)", d: "2023-11-14", m: 23, k: "course", th: "comm", sk: ["Communication"], src: "Communicate to Influence Blinkist Summary" },
  { t: "Communicating with Executives", d: "2023-09-15", m: 30, k: "course", th: "comm", sk: ["Professional Communication", "Leadership Communication"], src: "Communicating with Executives", cr: ["PMI 0.50 PDU"] },
  { t: "Converting Face-to-Face Training into Digital Learning", d: "2023-04-20", m: 63, k: "course", th: "id", sk: ["Instructional Design", "E-Learning"], src: "Converting FacetoFace Training into Digital Learning" },
  { t: "Creating Inclusive Learning Experiences", d: "2022-08-31", m: 47, k: "course", th: "inc", sk: ["Employee Learning & Development", "Diversity and Inclusion"], src: "Creating Inclusive Learning Experiences", cr: ["SHRM 0.75 PDC", "HRCI 0.75 credit"] },
  { t: "Customer Experience (CX) Trends", d: "2024-02-26", m: 47, k: "course", th: "biz", sk: ["Customer Experience"], src: "Customer Experience CX Trends" },
  { t: "Foundations of Learning Management Systems (LMS)", d: "2022-09-13", m: 39, k: "course", th: "id", sk: ["Learning Management Systems"], src: "Foundations of Learning Management Systems LMS" },
  { t: "Generative AI: The Evolution of Thoughtful Online Search", d: "2023-11-09", m: 31, k: "course", th: "tech", sk: ["AI Prompting", "AI for Business", "Generative AI"], src: "Generative AI The Evolution of Thoughtful Online Search" },
  { t: "How to Ask Productive Questions", d: "2022-02-08", m: 27, k: "course", th: "comm", sk: ["Productivity Improvement"], src: "How to Ask Productive Questions" },
  { t: "How to Build Credibility as a Leader", d: "2022-08-07", m: 16, k: "course", th: "lead", sk: ["Building Trust", "Leadership"], src: "How to Build Credibility as a Leader" },
  { t: "How to Network Smarter with Dorie Clark", d: "2025-12-05", m: 48, k: "course", th: "brand", sk: ["Professional Networking", "Personal Branding", "Building Connections"], src: "How to Network Smarter with Dorie Clark" },
  { t: "How to Resolve Conflict and Boost Productivity through Deep Listening", d: "2022-02-10", m: 26, k: "course", th: "comm", sk: ["Conflict Resolution", "Active Listening"], src: "How to Resolve Conflict and Boost Productivity through Deep Listening" },
  { t: "How to Run Efficient Hybrid Meetings: Nano Tips with Lorraine K. Lee", d: "2023-08-01", m: 16, k: "course", th: "comm", sk: ["Managing Meetings", "Video Conferencing"], src: "How to Run Efficient Hybrid Meetings Nano Tips with Lorraine K. Lee" },
  { t: "Inclusive Tech: Breaking Bias in Tech", d: "2022-10-14", m: 39, k: "course", th: "inc", sk: ["Tech Career Skills", "Diversity and Inclusion"], src: "Inclusive Tech Breaking Bias in Tech" },
  { t: "Instructional Design: Adult Learners", d: "2021-11-06", m: 45, k: "course", th: "id", sk: ["Instructional Design"], src: "Instructional Design Adult Learners" },
  { t: "Instructional Design Essentials: Models of ID", d: "2021-10-09", m: 45, k: "course", th: "id", sk: ["Instructional Design"], src: "Instructional Design Essentials Models of ID" },
  { t: "Instructional Design: Storyboarding", d: "2021-11-14", m: 74, k: "course", th: "id", sk: ["Storyboarding"], src: "Instructional Design Storyboarding" },
  { t: "Instructional Design: Working with SMEs", d: "2021-11-14", m: 59, k: "course", th: "id", sk: ["Instructional Design"], src: "Instructional Design Working with SMEs" },
  { t: "Leadership Principles for Emerging Leaders with Bill George", d: "2023-11-14", m: 40, k: "course", th: "lead", sk: ["Leadership Development"], src: "Leadership Principles for Emerging Leaders with Bill George", cr: ["PMI 0.50 PDU"] },
  { t: "Learning to Unlearn: A Revolutionary Way to Disrupt Bias", d: "2024-03-14", m: 58, k: "course", th: "inc", sk: ["Critical Thinking"], src: "Learning to Unlearn A Revolutionary Way to Disrupt Bias" },
  { t: "Nano Tips for Communicating with Confidence with Selena Rezvani", d: "2022-04-01", m: 11, k: "course", th: "comm", sk: ["Communication", "Self-confidence"], src: "Nano Tips for Communicating with Confidence with Selena Rezvani" },
  { t: "Nano Tips for Leading Authentically at Work with Luvvie Ajayi Jones", d: "2024-03-08", m: 6, k: "course", th: "lead", sk: ["Professional Conduct", "Leadership"], src: "Nano Tips for Leading Authentically at Work with Luvvie Ajayi Jones" },
  { t: "Nine Career Lessons You'll Wish You Learned Sooner", d: "2022-08-22", m: 35, k: "course", th: "brand", sk: ["Career Management"], src: "Nine Career Lessons Youll Wish You Learned Sooner" },
  { t: "Psychological Safety: Clear Blocks to Innovation, Collaboration, and Risk-Taking", d: "2023-11-30", m: 34, k: "course", th: "lead", sk: ["Building Trust", "Emotional Intelligence", "Open Innovation"], src: "Psychological Safety Clear Blocks to Innovation Collaboration and RiskTaking", cr: ["PMI 0.25 PDU"] },
  { t: "Python Quick Start", d: "2023-12-11", m: 107, k: "course", th: "tech", sk: ["Python (Programming Language)"], src: "Python Quick Start" },
  { t: "Refresh Your Workplace Social Skills", d: "2022-07-21", m: 46, k: "course", th: "comm", sk: ["Workplace Relationships"], src: "Refresh Your Workplace Social Skills" },
  { t: "Sales: Customer Success", d: "2022-07-01", m: 58, k: "course", th: "biz", sk: ["Customer Success"], src: "Sales Customer Success" },
  { t: "Scrollytelling: Creating a One-Page Web Experience", d: "2021-10-27", m: 78, k: "course", th: "tech", sk: ["Single Page Applications", "Interactive Web Content"], src: "Scrollytelling Creating a OnePage Web Experience" },
  { t: "Skills for Inclusive Conversations", d: "2022-08-22", m: 53, k: "course", th: "inc", sk: ["Interpersonal Communication", "Diversity and Inclusion"], src: "Skills for Inclusive Conversations" },
  { t: "Storytelling and Content Creation to Transform Your Personal Brand", d: "2023-11-14", m: 41, k: "course", th: "brand", sk: ["Storytelling", "Personal Branding", "Content Creation"], src: "Storytelling and Content Creation to Transform Your Personal Brand" },
  { t: "Streamlining Your Work with Copilot (formerly Bing Chat)", d: "2023-07-10", m: 35, k: "course", th: "tech", sk: ["AI for Business", "Microsoft Copilot"], src: "Streamlining Your Work with Copilot formerly Bing ChatBing Chat Enterprise" },
  { t: "Structure Vibe Coding to Save Build Time", d: "2025-10-22", m: 38, k: "course", th: "tech", sk: ["Vibe Coding", "Artificial Intelligence (AI)", "Generative AI"], src: "Structure Vibe Coding to Save Build Time" },
  { t: "Systems Thinking", d: "2021-12-02", m: 34, k: "course", th: "biz", sk: ["Systems Thinking"], src: "Systems Thinking" },
  { t: "Teaching Techniques: Blended Learning", d: "2022-09-06", m: 97, k: "course", th: "id", sk: ["Blended Learning"], src: "Teaching Techniques Blended Learning" },
  { t: "The Future of Workplace Learning", d: "2025-01-02", m: 39, k: "course", th: "lnd", sk: ["Training and Development (HR)", "Employee Learning & Development"], src: "The Future of Workplace Learning", cr: ["SHRM 0.50 PDC"] },
  { t: "Tips for Learner Engagement", d: "2024-02-20", m: 28, k: "course", th: "lnd", sk: ["Employee Engagement"], src: "Tips for Learner Engagement" },
  { t: "Your L&D Organization as a Competitive Advantage", d: "2022-08-29", m: 65, k: "course", th: "lnd", sk: ["Employee Learning & Development"], src: "Your LD Organization as a Competitive Advantage" },
];
