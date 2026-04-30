// Mock data for Muhammed Aman's portfolio

export const profile = {
    name: "Muhammed Aman",
    firstName: "Muhammed",
    lastName: "Aman",
    role: "Developer & Cyber Security Student",
    tagline: "I build things. Sometimes I break them to make them safer.",
    location: "India",
    email: "muhammed.aman@example.com",
    available: true,
    bio: "Second-year engineering student majoring in Cyber Security. My real obsession, though, is building — web apps, automation scripts, small tools that solve real problems. Security just sharpens the way I think about what I build.",
    longBio: "I'm a sophomore engineering student exploring the intersection of software development and security. I enjoy shipping side projects, experimenting with new stacks, and occasionally participating in a CTF when friends drag me in. Outside of code, I like reading long-form essays, sketching interfaces, and breaking down how my favourite apps are put together.",
    heroImage: "https://images.unsplash.com/photo-1617609277590-ec2d145ca13b",
    resumeUrl: "#",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
      email: "mailto:muhammed.aman@example.com"
    }
  };
  
  export const stats = [
    { label: "Year of Study", value: "2nd" },
    { label: "Projects Built", value: "14+" },
    { label: "Certifications", value: "06" },
    { label: "Tech Stacks", value: "10+" }
  ];
  
  export const skills = [
    { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "Go", "Bash"] },
    { category: "Web & App", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind", "MongoDB"] },
    { category: "Security", items: ["Burp Suite", "Wireshark", "Nmap", "Metasploit", "OWASP Top 10", "Linux Hardening"] },
    { category: "Tools", items: ["Git", "Docker", "Linux", "Figma", "Postman", "Notion"] }
  ];
  
  export const projects = [
    { id: "p1", title: "Sentry — Password Vault", year: "2025", category: "Full-stack",
      description: "End-to-end encrypted password manager with zero-knowledge architecture, built as a learning project to understand cryptography primitives in practice.",
      tech: ["Next.js", "FastAPI", "PostgreSQL", "AES-256"], href: "#", accent: "01" },
    { id: "p2", title: "LogLens — Log Anomaly Detector", year: "2025", category: "Security Tool",
      description: "A lightweight CLI that parses Linux auth and web server logs to flag suspicious patterns using statistical baselining.",
      tech: ["Python", "Pandas", "Rich"], href: "#", accent: "02" },
    { id: "p3", title: "Campus Bites", year: "2024", category: "Product",
      description: "A student-run food ordering app for our hostel mess. Handled orders, payments and a barebones kitchen display system.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"], href: "#", accent: "03" },
    { id: "p4", title: "PhishGuard — Chrome Extension", year: "2024", category: "Extension",
      description: "Warns users about look-alike domains and freshly registered sites before they submit credentials. Rule-based with a tiny ML classifier.",
      tech: ["JavaScript", "TensorFlow.js", "Chrome APIs"], href: "#", accent: "04" },
    { id: "p5", title: "Notestack", year: "2024", category: "Web App",
      description: "Markdown-first notes app with graph view, daily notes and keyboard-driven navigation. My daily driver for class notes.",
      tech: ["React", "Zustand", "IndexedDB"], href: "#", accent: "05" },
    { id: "p6", title: "CTF-Kit", year: "2023", category: "Open Source",
      description: "A collection of small scripts I keep reusing during CTFs — encoders, hash identifiers, a tiny web fuzzer. Packaged for my juniors.",
      tech: ["Python", "Typer", "Requests"], href: "#", accent: "06" }
  ];
  
  export const certifications = [
    { id: "c1", title: "Google Cybersecurity Professional Certificate", issuer: "Google / Coursera", year: "2025", credentialId: "GCC-8842-XZ" },
    { id: "c2", title: "CS50x: Introduction to Computer Science", issuer: "HarvardX", year: "2024", credentialId: "CS50-2024-AMN" },
    { id: "c3", title: "TryHackMe — Pre Security Path", issuer: "TryHackMe", year: "2024", credentialId: "THM-PRE-33921" },
    { id: "c4", title: "Meta Front-End Developer", issuer: "Meta / Coursera", year: "2024", credentialId: "MFE-2241-98" },
    { id: "c5", title: "MongoDB Associate Developer", issuer: "MongoDB University", year: "2023", credentialId: "MDB-ASC-5521" },
    { id: "c6", title: "Linux Foundation — Intro to Linux", issuer: "The Linux Foundation", year: "2023", credentialId: "LF-INTRO-1124" }
  ];
  
  export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Certs", href: "#certs" },
    { label: "Contact", href: "#contact" }
  ];