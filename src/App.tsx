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
  MessageSquare
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

// --- Data from CV ---
const DATA = {
  name: "Muhammad Shibghotul 'Adalah",
  title: "IT Support Operations & Application Support",
  location: "Binong, Curug, Kabupaten Tangerang",
  phone: "+62 8138 2876 886",
  email: "halo.shibghotul@gmail.com",
  linkedin: "https://linkedin.com/in/halo-shibghotul",
  summary: "IT Support & Application Support professional with 3+ years of experience supporting end-users and business applications in enterprise environments. Strong communication skills with a customer-oriented mindset and ability to translate technical issues into clear solutions. Currently exploring AI-driven development (vibe coding), Supabase, and modern deployment workflows to optimize technical operations.",
  education: {
    school: "Telkom University",
    degree: "Diploma of Information System",
    gpa: "3.2/4.0",
    period: "2018–2021",
    location: "Bandung, Indonesia"
  },
  currentFocus: [
    { name: "AI Tools", desc: "Leveraging AI for vibe coding and workflow automation." },
    { name: "Modern Stack", desc: "Exploring Supabase, GitHub, and Vercel for web projects." }
  ],
  experience: [
    {
      role: "IT Support",
      company: "PT Aeronusa Inti Raya",
      period: "Jul 2025 – Present",
      location: "Jakarta, Indonesia",
      description: [
        "Provided daily technical and application support for internal users across head office and branch locations.",
        "Handled user-reported issues related to system access, applications, and devices through remote and onsite support.",
        "Managed user access, including account provisioning, password resets, and access control configuration (NAS & internal systems).",
        "Conducted routine CCTV monitoring and data extraction to support security and operational needs.",
        "Built simple reporting workflows using Google Forms and Looker Studio for device and system status tracking.",
        "Logged, tracked, and updated support tasks using Jira."
      ]
    },
    {
      role: "Application Support",
      company: "Telkom Indonesia",
      period: "Jan 2022 – Mar 2025",
      location: "Jakarta, Indonesia",
      description: [
        "Handled 300+ application incidents per month and managed escalations from Level 1 support teams.",
        "Provided application support for MyIndiHome (mobile & web platform), handling incidents related to user access, payment features, and service activation across Android and iOS.",
        "Resolved approximately 90% of escalated incidents within SLA through effective troubleshooting and coordination.",
        "Provided application support for business users, including issue clarification, user guidance, and workaround solutions.",
        "Performed application error analysis and root cause investigation using log monitoring tools (Kibana, OKD/OCP).",
        "Collaborated with developers and vendors for bug fixes, application improvements, and post-release evaluation.",
        "Prepared incident, complaint, and service reports to support operational monitoring and management review.",
        "Documented recurring issues and solutions to improve support efficiency and knowledge sharing."
      ]
    }
  ] as Experience[],
  internships: [
    {
      role: "Partnership Acquisition – Marketing Department",
      company: "PT Inovasi Digital Inklusi",
      period: "Nov 2021 – Feb 2022",
      location: "Jakarta, Indonesia",
      description: ["Streamlined partner workflows and supported national campaign events."]
    },
    {
      role: "IT Evaluation",
      company: "Bandung Digital Academy (BADAMI), Dinas Kominfo",
      period: "Jan 2021 – Jun 2021",
      location: "Bandung, Indonesia",
      description: ["Managed content publishing and coordinated event reporting."]
    },
    {
      role: "Mentorship Division",
      company: "PT Cicil Solusi Mitra Teknologi",
      period: "Feb 2020 – Oct 2020",
      location: "Bandung, Indonesia",
      description: ["Supported student mentorship programs across multiple regions."]
    }
  ] as Experience[],
  certifications: [
    { name: "Web Programming", issuer: "Wahidev Academy", period: "Dec 2025 – Present", status: "Ongoing" },
    { name: "Google IT Support", issuer: "Coursera", period: "Nov 2024 – Mar 2025", url: "https://coursera.org/verify/professional-cert/PIXF1CZY3LI7" },
    { name: "Desain UX Google", issuer: "Coursera", period: "Apr 2024 – Sep 2024", url: "https://coursera.org/verify/professional-cert/KRELKLLPHU28" },
    { name: "Belajar Dasar Visualisasi Data", issuer: "Dicoding", period: "Mar 2024 – Apr 2024", url: "https://www.dicoding.com/certificates/QLZ971YL2P5D" },
    { name: "Quality Assurance Engineer", issuer: "Binar Academy", period: "Mei 2023 – Sep 2023" },
    { name: "Complete Beginner QA Engineer: E2E Testing with Cypress", issuer: "BuildWithAngga", period: "Nov 2024 – Feb 2023" }
  ] as Certification[],
  skills: {
    technical: ["End-User & Application Support", "Incident Handling & Troubleshooting", "Ticketing Systems", "User Access Management", "Remote Support Tools (AnyDesk, UltraViewer)"],
    tools: ["Windows Operating System", "Microsoft Office", "Google Workspace"],
    soft: ["Communication & Customer Handling", "Problem Solving & Analytical Thinking", "Time Management & Organization", "Collaboration & Teamwork", "Stakeholder Communication", "Emotional Intelligence (EQ)"],
    languages: ["Bahasa Indonesia (Native)", "English (Conversational)"]
  }
};

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
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
        <p className="text-accent font-medium">{exp.company}</p>
      </div>
      <div className="text-sm text-gray-500 mt-1 md:mt-0">
        <span className="block md:text-right">{exp.period}</span>
        <span className="block md:text-right flex items-center md:justify-end">
          <MapPin size={12} className="mr-1" /> {exp.location}
        </span>
      </div>
    </div>
    <ul className="space-y-2">
      {exp.description.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-400 flex items-start">
          <ChevronRight size={16} className="mt-1 mr-2 text-accent shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
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

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'About', href: '#about' },
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
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

      {/* Marquee */}
      <div className="py-10 bg-primary text-white overflow-hidden whitespace-nowrap border-y border-white/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex space-x-12 text-4xl md:text-6xl font-display font-bold uppercase italic opacity-50"
        >
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="flex items-center">
              {DATA.title} <span className="mx-8 text-accent">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white dark:bg-primary transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="A dedicated professional with a customer-oriented mindset.">
                About Me
              </SectionHeading>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>{DATA.summary}</p>
                <div className="pt-8 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-primary dark:text-white font-bold mb-2">Education</h4>
                    <p className="text-sm">{DATA.education.school}</p>
                    <p className="text-xs text-gray-500">{DATA.education.degree} ({DATA.education.period})</p>
                  </div>
                  <div>
                    <h4 className="text-primary dark:text-white font-bold mb-2">Location</h4>
                    <p className="text-sm">{DATA.location}</p>
                    <p className="text-xs text-gray-500">Available for Onsite/Remote</p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h4 className="text-primary dark:text-white font-bold mb-4">Current Focus</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DATA.currentFocus.map((focus, i) => (
                      <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-bold text-accent mb-1">{focus.name}</p>
                        <p className="text-xs text-gray-500">{focus.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Cpu />, title: "IT Operations", desc: "Managing enterprise systems and infrastructure." },
                { icon: <Layout />, title: "App Support", desc: "Resolving complex application-level incidents." },
                { icon: <ShieldCheck />, title: "Access Mgmt", desc: "Provisioning and securing user accounts." },
                { icon: <MessageSquare />, title: "Communication", desc: "Translating tech issues for non-tech users." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-transparent hover:border-accent/30 transition-all"
                >
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-accent mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Comprehensive toolkit for enterprise IT and application support.">
            My Expertise
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
                <Terminal size={24} className="mr-3 text-accent" /> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {DATA.skills.technical.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl text-sm font-medium shadow-sm border border-gray-100 dark:border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
                <Layout size={24} className="mr-3 text-accent" /> Tools & OS
              </h3>
              <div className="flex flex-wrap gap-3">
                {DATA.skills.tools.map((tool, i) => (
                  <span key={i} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl text-sm font-medium shadow-sm border border-gray-100 dark:border-gray-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
                <Award size={24} className="mr-3 text-accent" /> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {DATA.skills.soft.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl text-sm font-medium shadow-sm border border-gray-100 dark:border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
              
              <div className="mt-20">
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
                <h3 className="text-2xl font-bold font-display mb-6">Key Achievements</h3>
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
