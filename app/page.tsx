"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
} from "framer-motion";
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
  ArrowUpRight,
} from "lucide-react";

import logoDark from "@/app/assets/images/d4logo-dark.webp";
import logoLight from "@/app/assets/images/d4logo-light.webp";
import ThemeToggle from "@/app/components/ThemeToggle";

// Accent used by the official D4 site's connect experience.
const CORAL = "#fd7d6e";

// --- CUSTOM SMOOTH SCROLL LOGIC ---
const useSlowScroll = () => {
  useEffect(() => {
    // We apply smooth scrolling via CSS for native feel
    // and handle hardware acceleration to prevent stuttering
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
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
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9999]"
    >
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
            className="absolute h-[3px] rounded-full origin-left"
            style={{
              left: spark.x,
              top: spark.y,
              rotate: `${spark.angle}deg`,
              backgroundColor: CORAL,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function LinkPool() {
  useSlowScroll();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-[#fd7d6e]/30">
        <SparkEffect />
        <motion.div
          aria-hidden
          className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[100]"
          style={{ scaleX, backgroundColor: CORAL }}
        />

        {/* THEME TOGGLE (same light/dark behaviour as the main D4 site) */}
        <div className="fixed right-4 top-4 z-50">
          <ThemeToggle />
        </div>

        {/* BACKGROUND: static take on the main site's hero grid */}
        <div
          aria-hidden
          className="d4-grid pointer-events-none fixed inset-0 z-0"
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <div className="w-full max-w-xl pt-20 pb-12 md:pt-24">
            <main>
              <Header />
              <LinkButtons />
            </main>

            <footer className="mt-16 pb-8 text-center">
              <p className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                <span>Built by</span>
                <a
                  href="https://github.com/d4community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-[#fd7d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  D4 Web Team
                </a>
                <span className="text-[#fd7d6e]">&</span>
                <a
                  href="https://github.com/ayush24k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-[#fd7d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  ayush24k
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

function Header() {
  const fullForm = ["Discite", "Develop", "Debug", "Deploy"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex flex-col items-center text-center"
    >
      <a
        href="https://d4community.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-block rounded-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {/* Official D4 logos: light-on-dark and dark-on-light variants */}
        <Image
          src={logoDark}
          alt="D4 Community logo"
          priority
          className="hidden w-32 h-auto md:w-36 dark:block"
        />
        <Image
          src={logoLight}
          alt="D4 Community logo"
          priority
          className="w-32 h-auto md:w-36 dark:hidden"
        />
      </a>

      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        D4 Community
      </h1>

      <div className="mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {fullForm.map((word, i) => (
          <React.Fragment key={word}>
            <span className="text-xs font-semibold uppercase tracking-widest md:text-sm">
              {word}
            </span>
            {i < 3 && (
              <span aria-hidden className="text-muted-foreground">
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="mb-6 text-sm text-muted-foreground md:text-base">
        An Open-Source Tech Community
      </p>

      <div className="mb-6 h-px w-32 bg-gradient-to-r from-transparent via-neutral-400 to-transparent dark:via-neutral-600" />

      <p className="text-base font-medium italic md:text-lg">
        "For the Developers • By the Developers"
      </p>
    </motion.div>
  );
}

interface LinkItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  brand: string;
  /** Presentation only: renders the card as the primary (inverted) action. */
  featured?: boolean;
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
      featured: true,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-3">
      {links.map((item, idx) => {
        // A pure-white brand colour (GitHub) would vanish on the light theme,
        // so it follows the theme's foreground instead.
        const tint =
          item.brand.toLowerCase() === "#fff" ? "var(--foreground)" : item.brand;

        return (
          <motion.a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ "--brand": tint } as React.CSSProperties}
            className={
              item.featured
                ? "group flex items-center gap-4 rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-3.5 text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                : "group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 text-card-foreground shadow-sm transition-all duration-200 hover:border-[color:var(--brand)] hover:bg-accent hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand)_12%,transparent)] focus-visible:border-[color:var(--brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            }
          >
            <span
              className={
                item.featured
                  ? "flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-transform duration-200 group-hover:scale-105 dark:border-black/10 dark:bg-black/5"
                  : "brand-chip flex size-10 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-105"
              }
            >
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            <ArrowUpRight
              aria-hidden
              size={16}
              className={
                item.featured
                  ? "ml-auto text-white/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-black/60"
                  : "ml-auto text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              }
            />
          </motion.a>
        );
      })}
    </div>
  );
}
