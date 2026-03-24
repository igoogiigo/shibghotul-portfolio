/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  ExternalLink,
  ChevronRight, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Layout, 
  Award,
  ArrowUpRight,
  Send,
  MessageSquare,
  Wallet,
  Languages,
  Sparkles,
  Gamepad2,
  School,
  Code2
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

interface Certification {
  name: string;
  issuer: string;
  period: string;
  url?: string;
  status?: string;
}

interface LabProject {
  title: string;
  category: string;
  desc: string;
  link: string;
  icon: string;
  tech: string[];
}

// --- Data from CV ---
const DATA = {
  name: "Muhammad Shibghotul 'Adalah",
  title: "IT Support Operations & Application Support",
  location: "Binong, Curug, Kabupaten Tangerang",
  phone: "+62 8138 2876 886",
  email: "halo.shibghotul@gmail.com",
  linkedin: "https://linkedin.com/in/halo-shibghotul",
  summary: "IT Support & Application Support professional with 3+ years of experience in enterprise environments. Expert in technical problem-solving, application troubleshooting (L2), and IT asset lifecycle management. Passionate about modernizing IT operations through AI-driven automation, data visualization, and streamlined SOPs.",
  education: {
    school: "Telkom University",
    degree: "Diploma of Information System",
    gpa: "3.2/4.0",
    period: "2018–2021",
    location: "Bandung, Indonesia"
  },
  currentFocus: [
    { name: "AI Automation", desc: "Building custom tools using AI and Google AppScript to automate IT reporting." },
    { name: "Modern Ops", desc: "Implementing Vibe Coding workflows for real-time system monitoring." }
  ],
  experience: [
    {
      role: "IT Support",
      company: "PT Aeronusa Inti Raya",
      period: "Jun 2025 – Present",
      location: "Jakarta, Indonesia",
      description: [
        "Managed IT Asset Lifecycle for 100+ devices, including hardware auditing (CPU, RAM, Storage), maintenance, and performance upgrades.",
        "Enforced IT SOPs through strategic negotiation and user education, ensuring device security and standardized backup procedures.",
        "Automated daily CCTV monitoring across HO and branches using Google Forms, GSheets, and Looker Studio dashboards.",
        "Administered User Access Management and file sharing protocols via QNAP NAS systems.",
        "Provided high-touch technical support, acting as the primary 'go-to' person for complex user issues due to strong communication skills.",
        "Coordinated with GA and cross-functional teams for seamless device onboarding and offboarding processes."
      ]
    },
    {
      role: "Application Support (L2)",
      company: "Telkom Indonesia (Digital Business Technology)",
      period: "Dec 2021 – Mar 2025",
      location: "Jakarta, Indonesia",
      description: [
        "Handled L2 application support for myIndiHome, resolving critical issues related to login failures, point redemption, and payment gateway sync.",
        "Performed deep-dive root cause analysis (RCA) using Kibana, ElasticSearch, and AppDynamics for real-time log tracing.",
        "Conducted data reconciliation between MariaDB and MongoDB to ensure consistency across enterprise business applications.",
        "Standardized operational workflows by co-creating the official L2 SOP Flow in Figma, adopted by the entire support team.",
        "Maintained a comprehensive RCA LogBook that served as a strategic knowledge base for recurring technical issues.",
        "Executed API testing and troubleshooting using Postman and Swagger to verify backend service integrity (GET/POST/UPDATE).",
        "Collaborated with developers to implement bug-fixes based on log analysis and user impact reports."
      ]
    }
  ] as Experience[],
  internships: [
    {
      role: "Partnership Acquisition",
      company: "PT Inovasi Digital Inklusi",
      period: "Nov 2021 – Feb 2022",
      location: "Jakarta, Indonesia",
      description: ["Streamlined partner workflows and supported national campaign events."]
    },
    {
      role: "IT Evaluation",
      company: "Bandung Digital Academy (BADAMI)",
      period: "Jan 2021 – Jun 2021",
      location: "Bandung, Indonesia",
      description: ["Managed content publishing and coordinated event reporting."]
    }
  ] as Experience[],
  certifications: [
    { name: "Web Programming", issuer: "Wahidev Academy", period: "Dec 2025 – Present", status: "Ongoing" },
    { name: "Google IT Support", issuer: "Coursera", period: "Nov 2024 – Mar 2025", url: "https://coursera.org/verify/professional-cert/PIXF1CZY3LI7" },
    { name: "Desain UX Google", issuer: "Coursera", period: "Apr 2024 – Sep 2024", url: "https://coursera.org/verify/professional-cert/KRELKLLPHU28" },
    { name: "Belajar Dasar Visualisasi Data", issuer: "Dicoding", period: "Mar 2024 – Apr 2024", url: "https://www.dicoding.com/certificates/QLZ971YL2P5D" },
    { name: "Quality Assurance Engineer", issuer: "Binar Academy", period: "Mei 2023 – Sep 2023" }
  ] as Certification[],
  skills: {
    enterprise: ["Application Support (L2)", "Incident Management", "Root Cause Analysis (RCA)", "SOP Standardization", "IT Asset Management"],
    technical: ["API Testing (Postman/Swagger)", "Log Analysis (Kibana/Elastic)", "Database (MariaDB/MongoDB)", "QNAP NAS Admin", "Networking & Hardware"],
    automation: ["AI-Assisted Development", "Prompt Engineering", "Google AppScript", "Looker Studio Dashboards", "Vibe Coding Workflows"],
    soft: ["Stakeholder Negotiation", "Technical Communication", "Problem Solving", "Extrovert & User-Centric Approach"]
  },
  labProjects: [
    {
      title: "Personal Finance Tracker",
      category: "Full-stack / Finance",
      desc: "A clean, minimal personal finance tracker with Supabase integration, real-time charts, and receipt management.",
      link: "https://personaltrackerfinance.vercel.app/",
      icon: "Wallet",
      tech: ["React", "Supabase", "Recharts", "Tailwind"]
    },
    {
      title: "Lingo AI",
      category: "AI / Education",
      desc: "AI-powered language learning app featuring Flashcards, Speaking practice, Grammar checks, and AI Chat integration.",
      link: "https://lingo-ai-omega.vercel.app/",
      icon: "Languages",
      tech: ["Next.js", "Gemini API", "Tailwind", "Vercel"]
    },
    {
      title: "InstaCaption AI",
      category: "Micro SaaS / Marketing",
      desc: "Micro SaaS web app that generates high-converting Instagram captions in Bahasa Indonesia for UMKM sellers.",
      link: "https://ai.studio/apps/d645cabe-8688-46d6-9f95-e9a8cd288ea4?fullscreenApplet=true",
      icon: "Sparkles",
      tech: ["AI Studio", "Prompt Engineering", "React"]
    },
    {
      title: "SD IT Darunnajah Ecosystem",
      category: "Web / Education",
      desc: "Comprehensive digital ecosystem including a custom CMS and official website for an Islamic elementary school in Bengkulu.",
      link: "https://ai.studio/apps/e0708996-bf91-4546-9fde-6a6a562fe2c0?fullscreenApplet=true",
      icon: "School",
      tech: ["React", "CMS", "Tailwind"]
    },
    {
      title: "Futuristic Esports Arena",
      category: "UI/UX / Gaming",
      desc: "Premium futuristic redesign for an esports arena and gaming cafe in Jakarta, featuring a high-tech aesthetic.",
      link: "https://ai.studio/apps/a1f475d0-cf07-4a7c-b834-db70d1bce3e1?fullscreenApplet=true",
      icon: "Gamepad2",
      tech: ["UI/UX", "React", "Framer Motion"]
    }
  ] as LabProject[],
  enterpriseProjects: [
    {
      title: "CCTV Sentinel Dashboard",
      category: "AI-Assisted Dev / Automation",
      desc: "Automated monitoring system for branch CCTV status using Google AppScript and Looker Studio. Reduced manual checking time by 85%.",
      link: "#",
      tech: ['Google AppScript', 'Looker Studio', 'GSheets API', 'Vibe Coding'],
      type: 'featured'
    },
    {
      title: "RCA LogBook & SOP Flow",
      category: "Process Design / Documentation",
      desc: "Standardized L2 support workflows at Telkom Indonesia. Created interactive SOP flows in Figma and a strategic knowledge base for rapid incident resolution.",
      link: "#",
      tech: ['Figma', 'Documentation', 'Process Design'],
      type: 'documentation'
    }
  ]
};

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ExperienceCard: React.FC<{ exp: Experience, index: number }> = ({ exp, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 pb-12 border-l border-gray-200 dark:border-gray-800 last:pb-0"
  >
    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-accent" />
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold font-display">{exp.role}</h3>
        <p className="text-accent font-medium text-sm">{exp.company}</p>
      </div>
      <div className="text-sm text-gray-500 mt-1 md:mt-0">
        <span className="block md:text-right">{exp.period}</span>
        <span className="block md:text-right flex items-center md:justify-end">
          <MapPin size={14} className="mr-1" /> {exp.location}
        </span>
      </div>
    </div>
    <ul className="space-y-3">
      {exp.description.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-400 text-base flex items-start">
          <ChevronRight size={16} className="mt-1 mr-2 text-accent shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeProjectTab, setActiveProjectTab] = useState<'enterprise' | 'lab'>('enterprise');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      try {
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
      } catch (e) {
        console.error('LocalStorage is not accessible', e);
      }
      return newMode;
    });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-white dark:bg-primary text-primary dark:text-white transition-colors duration-300">
      {/* Custom Cursor */}
      <motion.div 
        className="custom-cursor hidden md:block text-accent"
        animate={{ x: cursorPos.x - 10, y: cursorPos.y - 10 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-primary/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display font-bold tracking-tighter"
          >
            MS<span className="text-accent">.</span>ADALAH
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-primary border-b border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-display font-bold"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                  Available for Work
                </span>
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
                  {DATA.name.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-4">
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
                  {DATA.title}. Specialized in <span className="text-primary dark:text-white font-medium">Enterprise Support</span> & <span className="text-primary dark:text-white font-medium">Incident Resolution</span>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#contact" 
                    className="px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary font-bold rounded-full hover:scale-105 transition-transform flex items-center"
                  >
                    Get in Touch <ArrowUpRight size={20} className="ml-2" />
                  </a>
                  <a 
                    href="#experience" 
                    className="px-8 py-4 border border-gray-200 dark:border-gray-800 font-bold rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    View Experience
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-4 relative hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal size={120} className="text-accent/30" />
                </div>
              </motion.div>
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
              >
                <ShieldCheck className="text-accent mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">SLA Focused</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden group"
            >
              <img 
                src="https://picsum.photos/seed/tech-support/800/800" 
                alt="IT Support Professional" 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
            </motion.div>

            <div>
              <SectionHeading subtitle="Bridging the gap between complex technical issues and seamless user experiences.">
                The Support Specialist
              </SectionHeading>
              
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  With over 3 years of experience in the IT industry, I have developed a deep understanding of 
                  enterprise-level application support and IT infrastructure. My journey began at 
                  <span className="text-accent font-bold"> Telkom Indonesia</span>, where I mastered the art of 
                  L2 troubleshooting and root cause analysis for high-traffic mobile and web applications.
                </p>
                <p>
                  Currently, at <span className="text-accent font-bold">PT Aeronusa Inti Raya</span>, I focus on 
                  the full lifecycle of IT assets and operational efficiency. I believe that great support isn't 
                  just about fixing what's broken—it's about <span className="italic">negotiating better processes</span>, 
                  educating users, and automating the mundane to focus on high-impact solutions.
                </p>
                <p>
                  Beyond traditional support, I am an <span className="text-accent font-bold">AI-Native Builder</span>. 
                  I leverage modern "Vibe Coding" workflows to rapidly prototype and deploy digital products—from 
                  AI-powered language apps to personal finance trackers—proving that a support specialist can also 
                  be a high-velocity product creator.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8">
                  {DATA.currentFocus.map((focus) => (
                    <div key={focus.name} className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <h4 className="font-bold text-accent mb-2">{focus.name}</h4>
                      <p className="text-sm leading-relaxed">{focus.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading subtitle="A showcase of enterprise-level support systems and innovative AI-powered digital products.">
              Project Portfolio
            </SectionHeading>
            
            <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-2xl w-fit">
              <button 
                onClick={() => setActiveProjectTab('enterprise')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeProjectTab === 'enterprise' 
                    ? "bg-white dark:bg-gray-800 text-accent shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                Enterprise
              </button>
              <button 
                onClick={() => setActiveProjectTab('lab')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeProjectTab === 'lab' 
                    ? "bg-white dark:bg-gray-800 text-accent shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                AI Innovation Lab
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeProjectTab === 'enterprise' ? (
              <motion.div 
                key="enterprise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Project 1: CCTV Sentinel */}
                <motion.div 
                  className="lg:col-span-7 group relative bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-800"
                >
                  <div className="p-12 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <span className="px-3 py-1 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                          AI-Assisted Dev
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                          Automation
                        </span>
                      </div>
                      <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-accent transition-colors">
                        CCTV Sentinel Dashboard
                      </h3>
                      <p className="text-gray-400 text-lg max-w-md mb-8">
                        Automated monitoring system for branch CCTV status using Google AppScript and Looker Studio. 
                        Reduced manual checking time by 85%.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mb-8">
                        {['Google AppScript', 'Looker Studio', 'GSheets API', 'Vibe Coding'].map(tag => (
                          <span key={tag} className="text-xs font-mono text-gray-500">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-white font-bold group-hover:translate-x-2 transition-transform">
                        View Case Study <ArrowUpRight size={20} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Mockup Element */}
                  <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-[3rem] border-t border-l border-white/10 overflow-hidden translate-x-10 translate-y-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-20 h-2 bg-white/20 rounded-full" />
                        <div className="w-8 h-8 bg-accent rounded-full animate-pulse" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                        <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                      </div>
                      <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                    </div>
                  </div>
                </motion.div>

                {/* Project 2: RCA LogBook */}
                <motion.div 
                  className="lg:col-span-5 group relative bg-accent rounded-[3rem] overflow-hidden"
                >
                  <div className="p-12 h-full flex flex-col justify-between relative z-10 text-white">
                    <div>
                      <div className="mb-6">
                        <Layout size={40} className="opacity-50" />
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-4">
                        RCA LogBook & SOP Flow
                      </h3>
                      <p className="text-white/80 mb-8">
                        Standardized L2 support workflows at Telkom Indonesia. Created interactive SOP flows in Figma 
                        and a strategic knowledge base for rapid incident resolution.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Figma', 'Documentation', 'Process Design'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="inline-flex items-center font-bold border-b-2 border-white/30 hover:border-white transition-all pb-1">
                        Explore Documentation <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform">
                    <MessageSquare size={200} />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="lab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {DATA.labProjects.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-accent/30 transition-all hover:shadow-2xl hover:shadow-accent/5"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                        {project.icon === 'Wallet' && <Wallet size={24} />}
                        {project.icon === 'Languages' && <Languages size={24} />}
                        {project.icon === 'Sparkles' && <Sparkles size={24} />}
                        {project.icon === 'School' && <School size={24} />}
                        {project.icon === 'Gamepad2' && <Gamepad2 size={24} />}
                      </div>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-accent transition-colors"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    </div>

                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="A versatile toolkit combining enterprise-level support with modern automation capabilities.">
            Technical Arsenal
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(DATA.skills).map(([category, items], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800"
              >
                <div className="mb-6">
                  {category === 'enterprise' && <ShieldCheck className="text-accent" size={32} />}
                  {category === 'technical' && <Cpu className="text-accent" size={32} />}
                  {category === 'automation' && <Terminal className="text-accent" size={32} />}
                  {category === 'soft' && <Layout className="text-accent" size={32} />}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{category}</h3>
                <ul className="space-y-4">
                  {items.map((skill) => (
                    <li key={skill} className="font-bold text-lg tracking-tight">{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="A track record of supporting large-scale enterprise environments.">
            Work Experience
          </SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {DATA.experience.map((exp, i) => (
                  <ExperienceCard key={i} exp={exp} index={i} />
                ))}
              </div>
              
              <div className="mt-16">
                <h3 className="text-2xl font-bold font-display mb-12">Internship Experience</h3>
                <div className="space-y-4">
                  {DATA.internships.map((exp, i) => (
                    <ExperienceCard key={i} exp={exp} index={i + 2} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8 bg-accent text-white rounded-3xl">
                <h3 className="text-xl font-bold font-display mb-6">Key Achievements</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mr-4">
                      <span className="font-bold">90%</span>
                    </div>
                    <p className="text-sm opacity-90">Incident resolution rate within SLA for escalated cases at Telkom Indonesia.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mr-4">
                      <span className="font-bold">300+</span>
                    </div>
                    <p className="text-sm opacity-90">Monthly application incidents handled across mobile & web platforms.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mr-4">
                      <Award size={20} />
                    </div>
                    <p className="text-sm opacity-90">Built reporting workflows using Looker Studio for system status tracking.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 bg-gray-50 dark:bg-gray-900 px-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Continuously learning and expanding my technical expertise.">
            Certifications & Courses
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.certifications.map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-accent/10 text-accent rounded-lg">
                    <Award size={20} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{cert.period}</span>
                    {cert.status && (
                      <span className="mt-1 px-2 py-0.5 bg-accent text-[8px] font-bold text-white uppercase tracking-widest rounded-full">
                        {cert.status}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold mb-1 leading-tight group-hover:text-accent transition-colors">{cert.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{cert.issuer}</p>
                
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-bold text-accent hover:underline"
                  >
                    View Credential <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="Let's discuss how I can help your team with IT and application support.">
                Get In Touch
              </SectionHeading>
              
              <div className="space-y-8 mt-12">
                <a href={`mailto:${DATA.email}`} className="flex items-center group">
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Email Me</p>
                    <p className="text-xl font-display font-bold">{DATA.email}</p>
                  </div>
                </a>
                
                <a href={`tel:${DATA.phone.replace(/\s/g, '')}`} className="flex items-center group">
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Call Me</p>
                    <p className="text-xl font-display font-bold">{DATA.phone}</p>
                  </div>
                </a>

                <a 
                  href={DATA.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center group"
                >
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">LinkedIn</p>
                    <p className="text-xl font-display font-bold">Muhammad Shibghotul &apos;Adalah</p>
                  </div>
                </a>

                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Location</p>
                    <p className="text-xl font-display font-bold">{DATA.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <form 
                className="space-y-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const subject = formData.get('subject');
                  const message = formData.get('message');
                  const whatsappUrl = `https://wa.me/${DATA.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo Shibghotul, saya ${name}. \n\nSubjek: ${subject}\n\nPesan: ${message}`)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-transparent focus:border-accent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-transparent focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                  <input 
                    name="subject"
                    type="text" 
                    required
                    placeholder="Inquiry for IT Support"
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-transparent focus:border-accent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-transparent focus:border-accent outline-none transition-all resize-none"
                  />
                </div>
                <button type="submit" className="w-full py-5 bg-accent text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center">
                  Send Message <Send size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-20 w-full h-[400px] bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
            <iframe 
              title="Google Maps"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Binong, Curug, Kabupaten Tangerang&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none border-[20px] border-white dark:border-primary rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-display font-bold tracking-tighter mb-8 md:mb-0">
            MS<span className="text-accent">.</span>ADALAH
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Muhammad Shibghotul 'Adalah. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-8 md:mt-0">
            <a href="#about" className="text-sm text-gray-500 hover:text-accent">About</a>
            <a href="#experience" className="text-sm text-gray-500 hover:text-accent">Experience</a>
            <a href="#contact" className="text-sm text-gray-500 hover:text-accent">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
