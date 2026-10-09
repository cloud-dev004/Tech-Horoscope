import UyirImg from "../assets/Uyir.webp";
import StockSenseImg from "../assets/stocksense.webp";
import MockVoiceImg from "../assets/Mockvoice.svg";

export const projects = [
  {
    id: "mockvoice",
    slug: "mockvoice",
    title: "MockVoice AI Interview Coach",
    category: "Full-stack",
    year: "2025",
    role: "Full-Stack & Speech AI Developer",
    description:
      "AI-powered mock interview platform designed to help candidates practice speaking, analyze their responses, and improve interview performance through speech AI.",
    image: MockVoiceImg,
    imgWidth: 1534,
    imgHeight: 897,
    tags: [
      "React",
      "FastAPI",
      "Faster-Whisper",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Speech AI",
    ],
    challenge:
      "Simulating realistic verbal interviews requires low-latency speech transcription, accurate prompt orchestration, and structured evaluations without dropping candidate audio feeds.",
    solution:
      "Implemented a dual-backend architecture: FastAPI with Faster-Whisper handles speech-to-text processing, while Node.js and Express coordinate dynamic interview sessions, question workflows, and MongoDB persistence.",
    outcome:
      "Delivered an automated interview coaching platform enabling real-time verbal practice sessions with candidate response metrics.",
    demoUrl: "#",
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004",
  },
  {
    id: "stocksense",
    slug: "stocksense",
    title: "StockSense",
    category: "Cloud",
    year: "2024",
    role: "Cloud & Backend Developer",
    description:
      "Cloud-based smart inventory management system for real-time stock tracking and automated supply alerts.",
    image: StockSenseImg,
    imgWidth: 1534,
    imgHeight: 897,
    tags: ["React", "Flask", "Python", "MySQL", "AWS RDS", "AWS EC2", "REST API"],
    challenge:
      "Small-to-medium operations frequently experience stock inconsistencies and slow audit cycles when tracking inventories across disparate systems.",
    solution:
      "Architected a modular Flask REST backend with structured MySQL schemas hosted on AWS RDS. Built a React dashboard for real-time inventory updates, automated minimum-stock warnings, and transaction audits.",
    outcome:
      "Created a scalable cloud deployment showcasing relational database architecture and automated stock monitoring on AWS.",
    demoUrl: "#",
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/Stocksense",
  },
  {
    id: "uyir",
    slug: "uyir",
    title: "Uyir Animal Rescue Platform",
    category: "Full-stack",
    year: "2024",
    role: "Full-Stack Developer",
    description:
      "Connecting communities to rescue, track, and care for animals through a unified digital platform.",
    image: UyirImg,
    imgWidth: 1897,
    imgHeight: 900,
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    challenge:
      "Animal rescue reporting is often fragmented across social networks with no central tracking of incident locations, rescue status, or available volunteers.",
    solution:
      "Built a full-stack MERN application that enables citizens to submit rescue reports with images and locations, and gives volunteers a real-time status dashboard to coordinate rescues.",
    outcome:
      "Deployed publicly on Netlify, providing an accessible communication and reporting channel for animal rescue efforts.",
    demoUrl: "https://uyir-animal-rescue-platform.netlify.app/",
    liveUrl: "https://uyir-animal-rescue-platform.netlify.app/",
    githubUrl: "https://github.com/cloud-dev004/uyir-animal-rescue-system",
  },
  {
    id: "locallens",
    slug: "locallens",
    title: "LocalLens Discovery Platform",
    category: "Frontend",
    year: "2024",
    role: "Frontend Developer",
    description:
      "Helping users discover nearby businesses and essential services through a location-aware digital platform.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
    imgWidth: 1400,
    imgHeight: 933,
    tags: ["JavaScript", "HTML5", "CSS3", "Geolocation API", "REST API"],
    challenge:
      "Users often need rapid lookup of neighborhood services on mobile connections without navigating heavy, bloated directory applications.",
    solution:
      "Developed a lightweight client-side application leveraging browser Geolocation APIs, fast DOM filtering, and responsive CSS to surface nearby essential services quickly.",
    outcome:
      "Created a responsive, zero-framework directory interface optimized for fast rendering on mobile devices.",
    demoUrl: "#",
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/locallens",
  },
];

export const projectMap = projects.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {});
