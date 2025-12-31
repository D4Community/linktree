"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  MessageCircle,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Users,
  UserPlus,
  Send,
  Code,
  Terminal,
  Cpu,
  Database,
  Zap,
  Rocket,
  Monitor,
  Smartphone,
} from "lucide-react";

import d4logo from "@/app/assets/images/d4logo.png";

// --- CUSTOM SLOW SMOOTH SCROLL LOGIC ---
const useSlowScroll = () => {
  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    const speed = 0.05;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY;
    };

    const update = () => {
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
      );
      currentScroll += (targetScroll - currentScroll) * speed;
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(update);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    const animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationId);
    };
  }, []);
};

// --- SPARK TYPES ---
interface Spark {
  id: string;
  x: number;
  y: number;
  angle: number;
}

// --- THE SPARK EFFECT (8 LINES BURST) ---
const SparkEffect = () => {
  const [clicks, setClicks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const burst = Array.from({ length: 8 }).map((_, i) => ({
        id: `${id}-${i}`,
        x: e.clientX,
        y: e.clientY,
        angle: i * 45,
      }));

      setClicks((prev) => [...prev, ...burst]);
      setTimeout(() => {
        setClicks((prev) =>
          prev.filter((item) => item.id.split("-")[0] !== id.toString())
        );
      }, 500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {clicks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ width: 0, opacity: 1 }}
            animate={{
              width: [0, 24, 0],
              opacity: [1, 1, 0],
              x: Math.cos(spark.angle * (Math.PI / 180)) * 45,
              y: Math.sin(spark.angle * (Math.PI / 180)) * 45,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute h-[3px] bg-[#ec5745] rounded-full origin-left shadow-[#ec5745]"
            style={{
              left: spark.x,
              top: spark.y,
              rotate: `${spark.angle}deg`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- FLOATING ELEMENT TYPES ---
interface FloatingElementProps {
  children: React.ReactNode;
  delay: number;
  x: string;
  y: string;
  size?: number;
}

// --- BACKGROUND DECORATION ---
const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay, x, y, size = 1 }) => (
  <motion.div
    animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none opacity-[0.07] text-white"
    style={{ left: x, top: y, scale: size }}
  >
    {children}
  </motion.div>
);

interface DoodleShapesProps {
  x: string;
  y: string;
  color: string;
}

const DoodleShapes: React.FC<DoodleShapesProps> = ({ x, y, color }) => (
  <div className="absolute opacity-10 blur-[1px]" style={{ left: x, top: y }}>
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <path d="M10 50 Q 25 25 50 50 T 90 50" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="70" cy="40" r="3" fill={color}/>
    </svg>
  </div>
);

const DoodleShape: React.FC<DoodleShapesProps> = ({ x, y, color }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute opacity-[0.08] blur-[0.5px]"
    style={{ left: x, top: y }}
  >
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
      <path
        d="M20 80 Q 40 20 80 80"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="40" cy="40" r="4" fill={color} />
      <circle cx="65" cy="35" r="4" fill={color} />
    </svg>
  </motion.div>
);

export default function LinkPool() {
  useSlowScroll();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[#07060a] text-white relative selection:bg-[#ec5745]/30 overflow-x-hidden">
      <SparkEffect />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ec5745] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#ec5745]/05 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full" />
        
        <FloatingElement x="5%" y="15%" delay={0}>
          <Code size={35} />
        </FloatingElement>
        <FloatingElement x="85%" y="10%" delay={1}>
          <Terminal size={28} />
        </FloatingElement>
        <FloatingElement x="12%" y="70%" delay={2}>
          <Cpu size={32} />
        </FloatingElement>
        <FloatingElement x="88%" y="80%" delay={3}>
          <Zap size={30} />
        </FloatingElement>
        <FloatingElement x="50%" y="90%" delay={1.5}>
          <Database size={30} />
        </FloatingElement>
        <DoodleShape x="25%" y="20%" color="#ec5745" />
        <DoodleShape x="75%" y="45%" color="#f43f5e" />
        <DoodleShapes x="40%" y="80%" color="#a855f7" />
        <DoodleShapes x="90%" y="25%" color="#f97316" />
        <DoodleShapes x="12%" y="35%" color="#3b82f6" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="w-full max-w-xl py-16">
          <Header />
          <LinkButtons />

          <footer className="mt-20 text-center pb-12 opacity-50">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold flex flex-wrap justify-center gap-2">
              <span>Built by</span>
              <a
                href="https://github.com/d4community"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#ec5745] transition-colors"
              >
                D4 Web Team
              </a>
              <span className="text-[#ec5745]">&</span>
              <a
                href="https://github.com/ayush24k"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#ec5745] transition-colors"
              >
                ayush24k
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const fullForm = ["Discite", "Develop", "Debug", "Deploy"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center mb-16 flex flex-col items-center"
    >
      <div className="relative mb-8 group">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-5 border border-dashed border-[#ec5745]/30 rounded-full"
        />

        <a
          href="https://d4community.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-block"
        >
          <Image
            src={d4logo}
            alt="d4logo"
            className="w-28 transition-transform group-hover:scale-110 cursor-pointer"
          />
        </a>
      </div>

      <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#ec5745] via-[#f43f5e] to-purple-500 mb-6">
        D4 Community
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {fullForm.map((word, i) => (
          <React.Fragment key={word}>
            <span className="text-slate-200 font-bold tracking-widest text-xs md:text-sm uppercase">
              {word}
            </span>
            {i < 3 && <span className="text-slate-700">•</span>}
          </React.Fragment>
        ))}
      </div>
      <p className="text-slate-400 font-medium tracking-wide text-sm md:text-base">
        An Open-Source Tech Community
      </p>

      <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#ec5745] to-transparent mb-8" />
      <p className="text-slate-300 font-semibold text-lg tracking-wide italic">"For the Developers • By the Developers"</p>
    </motion.div>
  );
}

interface LinkItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  brand: string;
}

function LinkButtons() {
  const links: LinkItem[] = [
    {
      label: "WhatsApp Group",
      icon: <MessageCircle size={20} />,
      link: "https://chat.whatsapp.com/Khwy3LEyjdX4Kx8VJ1MXmW",
      brand: "#25D366",
    },
    {
      label: "WhatsApp Channel",
      icon: <Send size={20} />,
      link: "https://whatsapp.com/channel/0029Va8QbTU8V0trPdleNl2I",
      brand: "#4ADE80",
    },
    {
      label: "LinkedIn",
      icon: <Linkedin size={20} />,
      link: "https://www.linkedin.com/company/d4community",
      brand: "#0077B5",
    },
    {
      label: "Github",
      icon: <Github size={20} />,
      link: "https://github.com/D4Community",
      brand: "#FFF",
    },
    {
      label: "Twitter / X",
      icon: <Twitter size={20} />,
      link: "https://twitter.com/D4community",
      brand: "#1DA1F2",
    },
    {
      label: "Instagram",
      icon: <Instagram size={20} />,
      link: "https://www.instagram.com/d4community",
      brand: "#E4405F",
    },
    {
      label: "YouTube",
      icon: <Youtube size={20} />,
      link: "https://www.youtube.com/@d4-community",
      brand: "#FF0000",
    },
    {
      label: "Commudle",
      icon: <Globe size={20} />,
      link: "https://www.commudle.com/communities/d4-community",
      brand: "#F97316",
    },
    {
      label: "Discord Server",
      icon: <Users size={20} />,
      link: "https://discord.com/invite/RPpYB8JpUQ",
      brand: "#5865F2",
    },
    {
      label: "Apply to be a Volunteer",
      icon: <UserPlus size={20} />,
      link: "https://forms.gle/CY8eDostKx2t8Wx49",
      brand: "#ec5745",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {links.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            duration: 0.9,
            delay: idx * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.02,
            x: 10,
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            borderColor: item.brand,
            boxShadow: `0 0 20px ${item.brand}20`
          }}
          className="flex items-center p-5 bg-white/[0.03] border border-white/10 rounded-2xl transition-all group backdrop-blur-sm"
        >
          <div
            style={{ color: item.brand }}
            className="mr-5 group-hover:rotate-[360deg] transition-transform duration-700"
          >
            {item.icon}
          </div>
          <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
            {item.label}
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all">
            <Send size={14} className="text-slate-500" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}