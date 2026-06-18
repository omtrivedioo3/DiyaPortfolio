import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Mail, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Server, 
  Sparkles, 
  Cloud, 
  Database, 
  Cpu, 
  Menu, 
  X, 
  ArrowUpRight, 
  FileText, 
  Phone,
  CheckCircle,
  Copy,
  ChevronRight
} from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom typewriter hook
const useTypewriter = (words, typingSpeed = 80, deletingSpeed = 40, delayBetween = 1800) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return currentText;
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typewriterWords = [
    "Associate Full Stack Developer",
    "FastAPI & React Developer",
    "GenAI Explorer",
    "SSIP Hackathon Finalist"
  ];
  
  const currentRole = useTypewriter(typewriterWords);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Smooth scroll
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.a 
            href="#home" 
            onClick={(e) => handleScroll(e, 'home')}
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:opacity-85 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Diya Trivedi
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            {['home', 'experience', 'skills', 'projects', 'achievements', 'education', 'contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleScroll(e, item)}
                className="hover:text-blue-400 capitalize transition-colors duration-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Social Links & CTA - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/DiyaResume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 h-10 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-gray-200"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')}
              className="flex items-center gap-1.5 px-4 h-10 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-md shadow-blue-500/20 text-white"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-20 z-40 bg-[#030712]/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-6 space-y-6 text-lg font-medium text-gray-300">
              {['home', 'experience', 'skills', 'projects', 'achievements', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleScroll(e, item)}
                  className="hover:text-blue-400 capitalize transition-colors py-2 border-b border-white/5"
                >
                  {item}
                </a>
              ))}
              <div className="flex gap-4 pt-4">
                <a 
                  href="/DiyaResume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-semibold bg-white/5 border border-white/10 text-gray-200"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-lg text-sm font-semibold bg-blue-500 text-white font-medium"
                >
                  Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center gap-12 py-16 md:py-24">
          <div className="flex-1 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-blue-500/20 text-xs font-semibold text-blue-400 shadow-sm shadow-blue-500/5 glow-blue"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Stack Developer @ Fxis.ai</span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hi, I'm <span className="gradient-text">Diya Trivedi</span>
            </motion.h1>

            <motion.div 
              className="h-10 text-xl sm:text-2xl font-semibold text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I am an <span className="text-blue-400 border-r-2 border-blue-400/80 pr-1 animate-pulse">{currentRole}</span>
            </motion.div>

            <motion.p 
              className="text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Associate Full Stack Developer specialized in building secure, scalable multi-tenant platforms, FastAPI backends, and modular React frontends. Exploring LLM architectures, RAG pipelines, and automated processes.
            </motion.p>

            {/* Social Icons & CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
              >
                Let's Connect
              </a>
              <a 
                href="/DiyaResume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-gray-200"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                Download CV
              </a>
            </motion.div>

            <motion.div 
              className="flex items-center gap-5 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/diya-trivedi-879031256", name: "LinkedIn" },
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/diyatrivedi", name: "GitHub" },
                { icon: <Code className="w-5 h-5" />, url: "https://leetcode.com/u/tdiya5797/", name: "LeetCode" },
                { icon: <Server className="w-5 h-5" />, url: "https://www.codechef.com/users/diyaa22", name: "CodeChef" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Interactive IDE Terminal Column */}
          <div className="flex-1 flex justify-center items-center">
            <motion.div 
              className="relative w-full max-w-[460px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Spinning gradient border backdrop */}
              <div className="absolute inset-[-4px] rounded-2xl bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-pink-500/30 opacity-75 blur-lg animate-pulse-slow"></div>
              
              {/* Mock VS Code Window */}
              <div className="relative h-[360px] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col font-mono text-xs text-left">
                {/* Header / Window Controls */}
                <div className="h-10 bg-[#0c101d] px-4 flex items-center justify-between border-b border-white/5 select-none shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <div className="text-gray-400 text-[10px] font-semibold bg-[#030712] px-3 py-1 rounded border border-white/5">
                    diya_trivedi.js — developer-profile
                  </div>
                  <div className="w-12"></div> {/* Spacer for symmetry */}
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-5 overflow-auto bg-[#070b15]/90 leading-relaxed text-gray-300 text-[11px] sm:text-xs">
                  <div>
                    <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">name:</span> <span className="text-green-300">"Diya Trivedi"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">title:</span> <span className="text-green-300">"Associate Full Stack Developer"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">company:</span> <span className="text-green-300">"Fxis.ai"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">location:</span> <span className="text-green-300">"Gandhinagar, India"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">skills:</span> &#123;
                    <div className="pl-4">
                      <span className="text-gray-400">languages:</span> [<span className="text-green-300">"Java"</span>, <span className="text-green-300">"Python"</span>, <span className="text-green-300">"JavaScript"</span>, <span className="text-green-300">"C++"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-400">frameworks:</span> [<span className="text-green-300">"FastAPI"</span>, <span className="text-green-300">"React"</span>, <span className="text-green-300">"Node"</span>, <span className="text-green-300">"Express"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-400">devops:</span> [<span className="text-green-300">"Docker"</span>, <span className="text-green-300">"Celery"</span>, <span className="text-green-300">"RabbitMQ"</span>, <span className="text-green-300">"Redis"</span>]
                    </div>
                    &#125;,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">genAI:</span> [<span className="text-green-300">"RAG"</span>, <span className="text-green-300">"LLMs"</span>, <span className="text-green-300">"Ollama"</span>, <span className="text-green-300">"Hugging Face"</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">academicBTech:</span> <span className="text-amber-400">true</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">codechefStartersRank:</span> <span className="text-cyan-400">1335</span>
                  </div>
                  <div>&#125;;</div>
                  
                  <div className="mt-4">
                    <span className="text-blue-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-blue-400">developer</span>.<span className="text-purple-400">currentFocus</span>);
                  </div>
                  <div className="text-gray-500 italic mt-1">
                    // Output: Multi-tenant systems, secure RBAC, and RAG architectures
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="py-20 text-left relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Career History</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Work Experience</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs mt-2 md:mt-0">
              Developing production-grade Full Stack applications, secure REST APIs, and integrated AI features.
            </p>
          </div>

          <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12 ml-4">
            
            {/* Timeline Item 1: Fxis.ai Associate */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Pin */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border-2 border-blue-500 text-blue-400 font-bold text-sm shadow-md glow-blue">
                F
              </div>
              
              <div className="glass-panel border-blue-500/20 rounded-2xl p-6 sm:p-8 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all shadow-lg glow-blue">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Associate Full Stack Developer</h3>
                    <div className="text-sm text-blue-400 font-medium">Fxis.ai — The Original AI Company</div>
                  </div>
                  <div className="text-xs font-bold bg-blue-500/15 border border-blue-500/25 text-blue-300 px-3 py-1 rounded-full w-fit">
                    June 2025 – Present | Gandhinagar
                  </div>
                </div>

                <ul className="space-y-2.5 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Developed scalable full-stack applications using React.js, FastAPI, and MySQL, improving system efficiency and maintainability.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Architected a multi-tenant system with secure data isolation and implemented Role-Based Access Control (RBAC) for fine-grained permissions.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Built secure authentication systems using JWT and integrated Google reCAPTCHA v3.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Led development of an AI-powered HR recruitment portal with REST APIs, WebSocket-based real-time features, and responsive UI.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Integrated AWS cloud services and implemented Redis caching to optimize backend API performances.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Containerized full-stack services using Docker and followed Git-based collaborative development practices.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Timeline Item 2: Fxis.ai Intern */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Pin */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 border-2 border-purple-500 text-purple-400 font-bold text-xs shadow-md glow-purple">
                F
              </div>

              <div className="glass-panel border-white/5 rounded-2xl p-6 sm:p-8 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">FullStack Developer Intern</h3>
                    <div className="text-sm text-purple-400 font-medium">Fxis.ai</div>
                  </div>
                  <div className="text-xs font-bold bg-purple-500/15 border border-purple-500/25 text-purple-300 px-3 py-1 rounded-full w-fit">
                    June 2025 – Sept 2025 | Gandhinagar
                  </div>
                </div>

                <ul className="space-y-2.5 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Built a News API integration application using React.js and REST APIs.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Learned and implemented backend development using FastAPI framework.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Developed a Trello-style interactive task management dashboard using React.js, FastAPI, and SQL databases.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Contributed to internal business tools, making custom automation scripting in Zoho CRM.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Timeline Item 3: Knovos */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Pin */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-gray-500/15 border-2 border-gray-600 text-gray-400 font-bold text-xs shadow-md">
                K
              </div>

              <div className="glass-panel border-white/5 rounded-2xl p-6 sm:p-8 hover:border-gray-500/25 hover:bg-white/[0.04] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Java Developer Intern</h3>
                    <div className="text-sm text-gray-400 font-medium">Knovos India Pvt. Ltd.</div>
                  </div>
                  <div className="text-xs font-bold bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full w-fit">
                    Jan 2025 – Apr 2025 | Gandhinagar
                  </div>
                </div>

                <ul className="space-y-2.5 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span>Mastered Object-Oriented Programming (OOP), Threading, and Multithreading principles to build efficient, stable Java applications.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span>Gained foundational expertise in AI/ML, including Neural Network basics and Generative AI concepts.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span>Gained hands-on experience with Big Data systems: using Apache Hadoop for distributed storage and map-reduce processing.</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span>Leveraged Apache Lucene and Solr to develop advanced enterprise data search and text indexing configurations.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section id="skills" className="py-20 text-left">
          <div className="mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">My Toolbox</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "GenAI & LLM Architectures",
                icon: <Sparkles className="w-5 h-5 text-purple-400" />,
                color: "border-purple-500/20 shadow-purple-500/5 glow-purple",
                skills: ["Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "LLM Architecture Basics", "Hugging Face", "Ollama", "Prompt Engineering"]
              },
              {
                category: "Backend Development",
                icon: <Server className="w-5 h-5 text-blue-400" />,
                color: "border-blue-500/20 shadow-blue-500/5 glow-blue",
                skills: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Celery", "RabbitMQ", "Asynchronous Processing", "Rate Limiting"]
              },
              {
                category: "Databases & Caching",
                icon: <Database className="w-5 h-5 text-emerald-400" />,
                color: "border-emerald-500/20",
                skills: ["MongoDB", "SQL / MySQL", "Redis Caching", "Mongoose ORM"]
              },
              {
                category: "Programming Languages",
                icon: <Code className="w-5 h-5 text-amber-400" />,
                color: "border-amber-500/20",
                skills: ["Java (OOP, Threading)", "Python", "JavaScript", "C++", "HTML5 & CSS3"]
              },
              {
                category: "DevOps & Big Data",
                icon: <Cloud className="w-5 h-5 text-sky-400" />,
                color: "border-sky-500/20",
                skills: ["Docker Containers", "AWS Integration", "Apache Hadoop", "Apache Lucene", "Solr Search Engine", "Git & GitHub"]
              },
              {
                category: "Frontend & Mobile",
                icon: <Cpu className="w-5 h-5 text-rose-400" />,
                color: "border-rose-500/20",
                skills: ["React.js", "React Native (Mobile)", "WebSocket Features", "Tailwind CSS", "State Management"]
              }
            ].map((cat, index) => (
              <motion.div
                key={cat.category}
                className={`glass-panel rounded-2xl p-6 flex flex-col justify-between border ${cat.color} glass-panel-hover`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-white text-base">{cat.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 hover:text-blue-300 border border-white/5 hover:border-blue-500/20 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Recent Creations</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-1 max-w-full">
              {['all', 'web', 'tools'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                    activeTab === tab
                      ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: "chatapp",
                category: "web",
                title: "ChatApp",
                tagline: "WebSocket Chat Suite",
                desc: "Developed a real-time chat application using WebSockets for low-latency bidirectional communication. Implemented JWT authentication and authorization, enabling private messaging, and concurrent state management.",
                stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
                live: "https://chat-app-qs6f.onrender.com",
                github: "https://github.com/diyatrivedi",
                stars: "Active"
              },
              {
                id: "placement",
                category: "web",
                title: "Placement-Board",
                tagline: "Job Portal & Learning Suite",
                desc: "Built a job portal enabling students to apply for placement drives and track opportunities. Designed filtering and search tools based on location and package; integrated a learning module for technical prep.",
                stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Search Filters"],
                github: "https://github.com/omtrivedioo3/Placement-Board.git",
                stars: "Academic"
              },
              {
                id: "newsync",
                category: "tools",
                title: "NewsSync",
                tagline: "News aggregator & OTP verify",
                desc: "A MERN stack portal fetching real-time news data through APIs. Stores user data securely using bcrypt-encrypted passwords, and features OTP verification for password resets.",
                stack: ["React.js", "Node.js", "Express.js", "MongoDB", "News API", "OTP"],
                github: "https://github.com/omtrivedioo3/NewsSync.git",
                stars: "MERN Stack"
              },
              {
                id: "myfood",
                category: "web",
                title: "MyFood",
                tagline: "MERN Food Portal",
                desc: "Created a food ordering application allowing users to browse items, manage carts with quantity selections, view pricing aggregates, and review persistent order history.",
                stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cart State"],
                github: "https://github.com/omtrivedioo3/MyFood.git",
                stars: "Ordering Portal"
              }
            ]
            .filter(project => activeTab === 'all' || project.category === activeTab)
            .map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-blue-500/20 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                {/* Visual Header/Banner for the card */}
                <div className="h-44 bg-gradient-to-br from-blue-950/40 via-[#0a0f1d] to-[#030712] relative flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                  <div className="relative text-center z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      {project.stars}
                    </span>
                    <h4 className="text-2xl font-bold mt-2.5 text-white group-hover:scale-105 transition-transform duration-300">{project.title}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">{project.tagline}</p>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {project.desc}
                  </p>

                  <div className="space-y-4">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map(tech => (
                        <span key={tech} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-4 pt-2 border-t border-white/5 text-xs font-bold uppercase tracking-wider">
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Live Site
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
                      >
                        GitHub Link
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="py-20 text-left">
          <div className="mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Showcase</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Achievements & Metrics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Achievement 1: CodeChef */}
            <motion.div 
              className="glass-panel border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 hover:scale-[1.02] transition-all relative overflow-hidden group shadow-lg shadow-cyan-500/5 glow-blue"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Award className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300">
                  Rank 1335
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">CodeChef Starters 95</h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Achieved global rank 1335 in Starters-95 (Div-4) competitive programming contest.
              </p>
              <a 
                href="https://www.codechef.com/users/diyaa22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300 hover:text-cyan-200"
              >
                View Profile <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Achievement 2: SSIP Hackathon */}
            <motion.div 
              className="glass-panel border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 hover:scale-[1.02] transition-all relative overflow-hidden group shadow-lg shadow-purple-500/5 glow-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition-colors"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Code className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
                  Runners-up
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">SSIP Hackathon 2023</h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Secured Runners-up position in a state-level hackathon for government parking management.
              </p>
              <div className="mt-5 text-[10px] font-extrabold text-purple-300 uppercase tracking-widest">
                State-Level Grand Final
              </div>
            </motion.div>

            {/* Achievement 3: Algorithmic Contest solving */}
            <motion.div 
              className="glass-panel border-rose-500/20 rounded-2xl p-6 hover:border-rose-500/40 hover:scale-[1.02] transition-all relative overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-rose-500/5 blur-xl group-hover:bg-rose-500/10 transition-colors"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <Cpu className="w-6 h-6 text-rose-400" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-800/15 text-rose-300 border border-rose-500/20">
                  Active
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">Problem Solving</h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Solving logical challenges on Codeforces, CodeChef, and LeetCode to improve optimization.
              </p>
              <a 
                href="https://codeforces.com/profile/diyaa22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-300 hover:text-rose-200"
              >
                CF Profile <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
            
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-20 text-left">
          <div className="mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Qualifications</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Education Background</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            
            {/* Degree */}
            <motion.div 
              className="glass-panel border-white/5 rounded-2xl p-6 sm:p-8 hover:border-blue-500/25 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <h3 className="text-lg font-bold text-white leading-snug">B.Tech in Computer Engineering</h3>
                    <span className="text-xs font-bold bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full w-fit shrink-0">
                      2021 – 2025
                    </span>
                  </div>
                  <div className="text-sm text-blue-400 font-medium">LDRP Institute of Technology and Research</div>
                  <p className="text-xs text-gray-400">Gandhinagar, Gujarat, India</p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>CGPA: 8.48 / 10.0</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* School */}
            <motion.div 
              className="glass-panel border-white/5 rounded-2xl p-6 sm:p-8 hover:border-purple-500/25 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <h3 className="text-lg font-bold text-white leading-snug">12th Science</h3>
                    <span className="text-xs font-bold bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full w-fit shrink-0">
                      2019 – 2021
                    </span>
                  </div>
                  <div className="text-sm text-purple-400 font-medium">Bhulka Vihar School</div>
                  <p className="text-xs text-gray-400">Surat, Gujarat, India</p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Percentage: 87.69%</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* CONTACT ME */}
        <section id="contact" className="py-20 text-left">
          <div className="mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Me</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact cards info */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Have a job opportunity, a full-stack project in mind, or just want to chat databases, search indexing, or competitive programming? Feel free to reach out!
              </p>

              <div className="space-y-4">
                
                {/* Email Info */}
                <div className="glass-panel border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</div>
                      <div className="text-sm font-semibold text-white">tdiya5797@gmail.com</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('tdiya5797@gmail.com', 'email')}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    title="Copy Email"
                  >
                    {copiedText === 'email' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Info */}
                <div className="glass-panel border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Contact Number</div>
                      <div className="text-sm font-semibold text-white">+91 8200297363</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('+918200297363', 'phone')}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    title="Copy Phone"
                  >
                    {copiedText === 'phone' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Email form panel */}
            <div className="lg:col-span-7">
              <motion.div 
                className="glass-panel border-white/5 rounded-3xl p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-500/15 border border-green-500/35 flex items-center justify-center text-green-400">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">
                      Thank you for reaching out! I have received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      
                      const formData = new FormData(e.target);
                      const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message'),
                        _subject: `New Portfolio Message from ${formData.get('name')}`
                      };

                      try {
                        const response = await fetch("https://formsubmit.co/ajax/tdiya5797@gmail.com", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                          },
                          body: JSON.stringify(data)
                        });
                        
                        if (response.ok) {
                          setFormSubmitted(true);
                        } else {
                          alert("Oops! Something went wrong. Please try again.");
                        }
                      } catch (error) {
                        console.error(error);
                        alert("Oops! Failed to send the message. Please check your network and try again.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="form-name">Name</label>
                        <input 
                          type="text" 
                          id="form-name"
                          name="name" 
                          required 
                          disabled={isSubmitting}
                          placeholder="Your Name"
                          className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 focus:bg-[#070b19] outline-none text-sm text-white transition-all disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="form-email">Email</label>
                        <input 
                          type="email" 
                          id="form-email"
                          name="email" 
                          required 
                          disabled={isSubmitting}
                          placeholder="your.email@example.com"
                          className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 focus:bg-[#070b19] outline-none text-sm text-white transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="form-msg">Message</label>
                      <textarea 
                        id="form-msg"
                        name="message" 
                        required 
                        disabled={isSubmitting}
                        rows="4" 
                        placeholder="Hello Diya, I would like to connect with you regarding..."
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 focus:bg-[#070b19] outline-none text-sm text-white transition-all resize-none disabled:opacity-50"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#010409] py-12 relative z-10 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Diya Trivedi. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/diya-trivedi-879031256" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="https://github.com/diyatrivedi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://leetcode.com/u/tdiya5797/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LeetCode</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
