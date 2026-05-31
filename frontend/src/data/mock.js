// Mock data for Muhammed Aman's portfolio

export const profile = {
  name: "Muhammed Aman",
  firstName: "Muhammed",
  lastName: "Aman",
  handle: "muhammedaman",
  role: "Developer & Cyber Security Student",
  tagline: "I build things. Sometimes I break them to make them safer.",
  location: "India",
  email: "poovathaman03@gmail.com",
  available: true,
  bio: "I’m a second-year engineering student majoring in Cyber Security, but my main focus is on development and database management. I enjoy building web apps, working with data, and creating automation tools that solve real problems. Cyber Security shapes how I approach everything I build, helping me think about reliability and edge cases. I’m also working towards competitive programming goals like ICPC, improving my problem-solving skills along the way.",
  longBio: "I’m an engineering student exploring where development, databases, and security meet. I didn’t start with a clear plan—just curiosity and a habit of trying to build things on my own. What began as small experiments slowly turned into a genuine interest in creating tools that actually solve problems.\n\nMost of my time now goes into building—web apps, automation scripts, and systems that are structured, efficient, and reliable. I enjoy working with data, trying out new stacks, and breaking things down to understand how they work under the hood. Security naturally became part of that journey, shaping how I think about edge cases, system behavior, and writing code that holds up beyond just the happy path.\n\nOutside of coding, I spend time sketching ideas, refining designs, and analyzing how real-world apps are built and scaled, always looking for ways to improve how I build and think.",
  heroImage: "/profile.png",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/mhmdaman",
    linkedin: "https://www.linkedin.com/in/muhammed-aman-2977ab32a/",
    twitter: "https://twitter.com/",
    email: "mailto:poovathaman03@gmail.com"
  }
};

export const interests = [
  { Item: "Development", Reality: "perfection > ship" },
  { Item: "Method", Reality: "rubber-ducking" },
  { Item: "Travel", Reality: "Beaches & Mountains" },
  { Item: "Lifestyle", Reality: "200 Sleep Ok" },
  { Item: "Sustainance", Reality: "siri open spotify" }
];

export const stats = [
  { label: "Year of Study", value: "2nd" },
  { label: "Projects Built", value: "10+" },
  { label: "Certifications", value: "01" },
  { label: "Tech Stacks", value: "10+" }
];

export const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "HTML", "CSS", "C", "Go", "Bash"] },
  { category: "Web & App", items: ["React", "Next.js", "Node.js", "Flask", "MySQL", "Three.js"] },
  { category: "Security", items: ["Wireshark", "TensorFlow", "Scapy"] },
  { category: "Tools", items: ["Git", "Docker", "Prometheus", "Grafana", "Linux"] }
];

export const projects = [
  {
    id: "p1", title: "Stardust", year: "2026", category: "Interactive Graphics",
    description: "Gesture-controlled interactive particle system hosted on GitHub Pages, utilizing hand tracking for an immersive experience.",
    tech: ["Three.js", "MediaPipe Hands", "JavaScript"], href: "https://github.com/mhmdaman/stardust", accent: "01"
  },
  {
    id: "p2", title: "Grumpy Duck", year: "2026", category: "Application interface Gateway",

    description: "Locally hosted API gateway featuring full observability through integrated metrics dashboards and performance monitoring.",
    tech: ["Docker Compose", "Prometheus", "Grafana"], href: "https://github.com/mhmdaman/grumpyduck", accent: "02"
  },
  {
    id: "p3", title: "MediCore", year: "2026", category: "HealthTech",
    description: "A comprehensive hospital patient record system with a secure relational schema and a modern web interface.",
    tech: ["Flask", "MySQL", "Vanilla JS"], href: "https://github.com/mhmdaman/medicore", accent: "03"
  },
  {
    id: "p4", title: "CaféCore", year: "2026", category: "Management System",
    description: "A streamlined canteen management system featuring custom theming, detailed ER diagrams, and robust operation logic.",
    tech: ["Flask", "MySQL", "CSS"], href: "https://github.com/mhmdaman/Caf-core", accent: "04"
  },
  {
    id: "p5", title: "Intrusion Detection System (IDS)", year: "2026", category: "Security / ML",
    description: "Network intrusion detector trained and benchmarked on the UNSW-NB15 dataset to identify malicious traffic patterns.",
    tech: ["Python", "TensorFlow", "Scikit-learn"], href: "https://github.com/mhmdaman/intrusion_detection", accent: "05"
  },
  {
    id: "p6", title: "Summerize", year: "2026", category: "AI / Automation",
    description: "An AI-powered YouTube video study notes generator. Paste any YouTube URL and get structured, exam-ready study notes — complete with key terms, examples, memory tricks, and practice questions.",
    tech: ["Python", "Transcript", "AI", "Vannila HTML/CSS"], href: "https://github.com/mhmdaman/summerize", accent: "06"
  },

  {
    id: "p7", title: "Emotion Detection", year: "2026", category: "AI / Vision",
    description: "Real-time facial emotion detection system using webcam feed to identify and categorize human expressions.",
    tech: ["Python", "OpenCV", "Haar Cascade"], href: "https://github.com/mhmdaman/emotions", accent: "07"
  },
  {
    id: "p8", title: "Terminal RPG Games", year: "2026", category: "Gaming",
    description: "Text-based role-playing games playable entirely in the terminal, featuring immersive ASCII visuals and logic.",
    tech: ["Python", "Curses", "ASCII Art"], href: "https://github.com/mhmdaman/RPG-", accent: "08"
  },
  {
    id: "p9", title: "Packet Sniffer", year: "2025", category: "Security Tool",
    description: "CLI utility designed to capture, dissect, and inspect live network packets for security analysis and troubleshooting.",
    tech: ["Python", "Scapy"], href: "https://github.com/mhmdaman/chickenwing", accent: "09"
  },
  {
    id: "p10", title: "Password Generator", year: "2025", category: "Utility",
    description: "A secure utility to generate strong, highly configurable passwords with custom entropy requirements.",
    tech: ["Python"], href: "https://github.com/mhmdaman/password-generator", accent: "10"
  },
  {
    id: "p11", title: "Freely", year: "2026", category: "web application",
    description: "Freely is a high-fidelity, tactile music streaming application built with React and the YouTube Iframe API.",
    tech: ["React", "Vannila CSS", "JavaScript", "YouTube Iframe API"], href: "https://github.com/mhmdaman/freely", accent: "11"
  }

];



export const certifications = [
  { id: "c1", title: "Linguaskill English Proficiency", issuer: "Cambridge University", year: "2025", credentialId: "GCC-8842-XZ" },

];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certs", href: "#certs" },
  { label: "Contact", href: "#contact" }
];