import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Code2, Smartphone, Bot, Brain, Palette, Cloud,
  CheckCircle2, Zap, Shield, Globe, ChevronDown, Star, Users, TrendingUp, Hexagon, Sparkles, Megaphone
} from 'lucide-react';
import { useScrollAnimation, use3DTilt, useCountUp } from '../hooks/useAnimations';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../services/seo';
import { services } from '../data/services';
import { getTestimonials, type Testimonial, initialTestimonials } from '../services/contentService';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Happy Clients' },
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

const reasons = [
  { icon: Zap, title: 'Rapid Delivery', desc: 'Agile methodology ensures fast time-to-market.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Security-first approach in every solution we build.' },
  { icon: Globe, title: 'Global Reach', desc: 'Serving clients across 20+ countries worldwide.' },
];

function Floating3DShape({ shape, className }: { shape: 'cube' | 'ring' | 'diamond' | 'hex'; className?: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => { t += 0.008; setRotation({ x: Math.sin(t * 0.7) * 20, y: Math.cos(t * 0.5) * 25, z: Math.sin(t * 0.3) * 10 }); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  const transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;

  if (shape === 'cube') return (<div className={`perspective-1000 ${className}`}><div className="w-20 h-20 preserve-3d" style={{ transform }}><div className="absolute inset-0 border-2 border-primary-400/30 dark:border-primary-500/20 bg-primary-500/5 dark:bg-primary-500/5 rounded-lg backdrop-blur-sm" /><div className="absolute inset-0 border border-primary-400/10 dark:border-primary-500/10 bg-primary-600/3 rounded-lg" style={{ transform: 'translateZ(-40px)' }} /></div></div>);
  if (shape === 'ring') return (<div className={`perspective-1000 ${className}`}><div className="w-24 h-24 preserve-3d" style={{ transform }}><div className="absolute inset-0 rounded-full border-[3px] border-primary-400/30 dark:border-primary-500/20" /><div className="absolute inset-2 rounded-full border-2 border-primary-300/15 dark:border-primary-400/10" /></div></div>);
  if (shape === 'diamond') return (<div className={`perspective-1000 ${className}`}><div className="w-16 h-16 preserve-3d" style={{ transform }}><div className="absolute inset-0 border-2 border-primary-400/30 dark:border-primary-500/20 bg-primary-500/5 dark:bg-primary-500/5 rotate-45 backdrop-blur-sm" /></div></div>);
  return (<div className={`perspective-1000 ${className}`}><div className="w-20 h-20 preserve-3d" style={{ transform }}><Hexagon className="w-full h-full text-primary-400/20 dark:text-primary-500/15 stroke-[1.5]" /></div></div>);
}

function Hero3DObject() {
  const [rotation, setRotation] = useState({ x: 15, y: 0, z: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.006;
      setRotation({
        x: Math.sin(t * 0.4) * 8,
        y: (t * 20) % 360,
        z: Math.cos(t * 0.3) * 5
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;

  const edges = [
    // Outer cube edges
    { from: [-1, -1, -1], to: [1, -1, -1] },
    { from: [1, -1, -1], to: [1, 1, -1] },
    { from: [1, 1, -1], to: [-1, 1, -1] },
    { from: [-1, 1, -1], to: [-1, -1, -1] },
    { from: [-1, -1, 1], to: [1, -1, 1] },
    { from: [1, -1, 1], to: [1, 1, 1] },
    { from: [1, 1, 1], to: [-1, 1, 1] },
    { from: [-1, 1, 1], to: [-1, -1, 1] },
    { from: [-1, -1, -1], to: [-1, -1, 1] },
    { from: [1, -1, -1], to: [1, -1, 1] },
    { from: [1, 1, -1], to: [1, 1, 1] },
    { from: [-1, 1, -1], to: [-1, 1, 1] },
    // Inner pyramid connections
    { from: [0, 0, 0], to: [-1, -1, -1], color: 'cyan' },
    { from: [0, 0, 0], to: [1, -1, -1], color: 'cyan' },
    { from: [0, 0, 0], to: [1, 1, -1], color: 'cyan' },
    { from: [0, 0, 0], to: [-1, 1, -1], color: 'cyan' },
    { from: [0, 0, 0], to: [-1, -1, 1], color: 'cyan' },
    { from: [0, 0, 0], to: [1, -1, 1], color: 'cyan' },
    { from: [0, 0, 0], to: [1, 1, 1], color: 'cyan' },
    { from: [0, 0, 0], to: [-1, 1, 1], color: 'cyan' },
    // Diagonal cross connections
    { from: [-1, -1, -1], to: [1, 1, 1], color: 'magenta' },
    { from: [1, -1, -1], to: [-1, 1, 1], color: 'magenta' },
    { from: [1, 1, -1], to: [-1, -1, 1], color: 'magenta' },
    { from: [-1, 1, -1], to: [1, -1, 1], color: 'magenta' },
  ];

  return (
    <div ref={containerRef} className="absolute right-0 lg:right-[-5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.3, type: 'spring', stiffness: 60 }}
        className="relative w-full h-full preserve-3d"
        style={{ transform, perspective: '1500px' }}
      >
        {/* Glowing core sphere */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-80 blur-sm animate-pulse" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 dark:bg-white/70 blur-[2px] shadow-2xl shadow-cyan-400/50" />

        {/* SVG Wireframe */}
        <svg viewBox="-2 -2 4 4" className="absolute inset-0 w-full h-full preserve-3d" style={{ transform: 'scale(1.2)' }}>
          <defs>
            <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="magentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.03" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge, i) => {
            const z1 = edge.from[2] * 0.3 + 0.7;
            const z2 = edge.to[2] * 0.3 + 0.7;
            return (
              <line
                key={i}
                x1={edge.from[0] * z1}
                y1={edge.from[1] * z1}
                x2={edge.to[0] * z2}
                y2={edge.to[1] * z2}
                stroke={edge.color === 'cyan' ? 'url(#cyanGrad)' : edge.color === 'magenta' ? 'url(#magentaGrad)' : 'url(#cyanGrad)'}
                strokeWidth={edge.color ? '0.025' : '0.02'}
                opacity={edge.color ? 0.7 : 0.5}
                filter="url(#glow)"
              />
            );
          })}

          {/* Vertex points */}
          {[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map((v, i) => {
            const z = v[2] * 0.3 + 0.7;
            return (
              <circle
                key={i}
                cx={v[0] * z}
                cy={v[1] * z}
                r="0.04"
                fill="#06b6d4"
                opacity="0.9"
                filter="url(#glow)"
              />
            );
          })}
        </svg>

        {/* Orbiting rings */}
        {[0, 60, 120].map((offset, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-400/20 dark:border-cyan-400/15"
            animate={{ rotateZ: [offset, offset + 360] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            style={{ transform: `rotateX(${60 + i * 15}deg) rotateY(${i * 30}deg)` }}
          />
        ))}

        {/* Floating particles around object */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60 dark:bg-cyan-400/50"
            style={{
              left: `${50 + Math.cos(i * 0.5) * 35}%`,
              top: `${50 + Math.sin(i * 0.5) * 35}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glow behind */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-3xl" />
    </div>
  );
}

function HeroBannerImage() {
  return (
    <motion.div
      className="absolute hidden lg:block right-[6%] top-[40%] w-[380px] max-w-full z-30 perspective-1200 pointer-events-none"
      animate={{ y: [0, -10, 0], rotateZ: [0, 1.5, -1.5, 0], rotateX: [3, 0, 4, 3] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative w-full h-[520px] rounded-[2rem] border border-cyan-300/20 bg-slate-950/90 shadow-[0_40px_90px_rgba(14,165,233,0.18)] backdrop-blur-xl overflow-hidden"
        animate={{ rotateY: [2, -2, 2], rotateX: [4, 1, 4] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 hero-panel-screen" />
        <div className="absolute inset-4 rounded-[1.75rem] border border-cyan-400/10 bg-slate-950/60 backdrop-blur-2xl shadow-[inset_0_0_40px_rgba(14,165,233,0.12)] overflow-hidden">
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200/70 font-semibold">
            <span>Holographic display</span>
            <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">Live</span>
          </div>
          <div className="absolute inset-x-5 top-20 h-24 rounded-3xl bg-gradient-to-b from-cyan-400/15 via-transparent to-transparent border border-cyan-300/10" />
          <div className="absolute left-6 top-[12rem] right-6 h-[1px] bg-gradient-to-r from-cyan-400/30 via-transparent to-purple-400/20" />
          <div className="absolute left-6 top-[13.5rem] w-[70px] h-1 rounded-full bg-cyan-400/40 animate-pulse" />
          <div className="absolute left-8 top-[15rem] right-8 grid grid-cols-3 gap-3">
            {['AI', 'Cloud', 'Scale'].map((label, index) => (
              <div key={index} className="rounded-3xl border border-cyan-500/10 bg-slate-900/90 p-3 text-[0.76rem] text-cyan-100/80">
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="mt-2 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500/50" />
                <div className="mt-2 text-[0.68rem] text-cyan-200/60">Realtime stream</div>
              </div>
            ))}
          </div>

          <motion.div
            className="absolute inset-x-8 top-[10rem] h-[18rem] rounded-[2rem] border border-cyan-400/10 bg-cyan-500/5 overflow-hidden"
            animate={{ rotateY: [0, 5, 0, -5, 0], opacity: [0.8, 1, 0.8, 1, 0.8] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_48%)]" />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_40px_rgba(56,189,248,0.18)]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute left-[16%] top-[20%] h-[72px] w-[4px] rounded-full bg-cyan-400/30 blur-xl" />
            <div className="absolute right-[18%] top-[26%] h-[56px] w-[4px] rounded-full bg-purple-400/30 blur-xl" />
            <div className="absolute left-[20%] bottom-[18%] h-[6px] w-24 rounded-full bg-cyan-300/40 blur-sm" />
            <div className="absolute right-[20%] bottom-[22%] h-[6px] w-28 rounded-full bg-purple-300/40 blur-sm" />
            <div className="absolute inset-x-10 top-[12rem] h-px bg-gradient-to-r from-cyan-300/60 via-transparent to-purple-300/60" />
            <div className="absolute inset-x-12 top-[9rem] h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
            <div className="absolute inset-x-12 top-[14rem] h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />
          </motion.div>

          <div className="absolute left-7 bottom-20 w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-400/20 shadow-[0_0_30px_rgba(56,189,248,0.12)]" />
          <div className="absolute right-7 bottom-20 w-14 h-14 rounded-full bg-purple-500/15 border border-purple-400/15 shadow-[0_0_30px_rgba(168,85,247,0.12)]" />
          <div className="absolute left-10 bottom-8 right-10 h-16 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 rounded-3xl border border-cyan-300/10" />
        </div>
        <div className="absolute inset-x-10 top-6 h-1 rounded-full bg-gradient-to-r from-cyan-300/40 via-transparent to-purple-300/40 animate-pulse" />
      </motion.div>
    </motion.div>
  );
}

function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 text-cyan-400 animate-glitch1 opacity-70" aria-hidden="true">{children}</span>
      <span className="absolute inset-0 text-pink-400 animate-glitch2 opacity-70" aria-hidden="true">{children}</span>
    </span>
  );
}

function TechStackSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [typedText, setTypedText] = useState('AWS');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const techWords = ['AWS', 'GCP', 'GitHub', 'PHP', 'Laravel', 'React', 'TypeScript', 'FastAPI', 'Django', 'Go', 'MySQL', 'Azure', 'Redis'];

  useEffect(() => {
    const fullText = techWords[wordIndex % techWords.length];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 900);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((index) => index + 1);
      }
    }, isDeleting ? 70 : 110);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, techWords, wordIndex]);

  const techStack = [
    { name: 'React', color: '#61DAFB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
    { name: 'Next.js', color: '#000000', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    // { name: 'TypeScript', color: '#3178C6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
    { name: 'Node.js', color: '#339933', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    // { name: 'Python', color: '#3776AB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    // { name: 'AWS', color: '#FF9900', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg', fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    // { name: 'Docker', color: '#2496ED', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    // { name: 'Kubernetes', color: '#326CE5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'MongoDB', color: '#47A248', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', color: '#4169E1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'GraphQL', color: '#E10098', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    { name: 'Redis', color: '#DC382D', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    // { name: 'Vue.js', color: '#4FC08D', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    // { name: 'Angular', color: '#DD0031', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    // { name: 'Swift', color: '#F05138', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    // { name: 'Kotlin', color: '#7F52FF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'Flutter', color: '#02569B', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    // { name: 'TensorFlow', color: '#FF6F00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  //  { name: 'PyTorch', color: '#EE4C2C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  //  { name: 'OpenAI', color: '#412991', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg' },
   // { name: 'GCP', color: '#4285F4', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg', fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
   // { name: 'Jest', color: '#C21325', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
    // { name: 'Cypress', color: '#17202c', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-plain.svg' },
    { name: 'Playwright', color: '#000000', logo: 'https://playwright.dev/img/playwright-logo.svg' },
    { name: 'Selenium', color: '#43B02A', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
    // { name: 'Jenkins', color: '#D24939', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    // { name: 'GitHub Actions', color: '#2088FF', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg' },
    // { name: 'GitHub', color: '#181717', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'PHP', color: '#777BB4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg' },
  //  /{ name: 'Laravel', color: '#FF2D20', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg', fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg' },
    { name: 'JavaScript', color: '#F7DF1E', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
   // { name: 'FastAPI', color: '#009688', logo: 'https://raw.githubusercontent.com/tiangolo/fastapi/master/docs/img/logo-margin/logo-teal.png' },
   // { name: 'Django', color: '#092E20', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg', fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg' },
    // { name: 'Golang', color: '#00ADD8', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'MySQL', color: '#4479A1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Azure', color: '#0078D4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    // { name: 'Terraform', color: '#6D6DFF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  ];

  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section ref={ref} className="py-20 bg-gray-950 dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            <Code2 className="w-4 h-4" />
            Our Expertise
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tech Stack <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">We Work On</span>
          </h2>
          <div className="flex flex-col items-center gap-3">
            <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs font-semibold">
            
            </p>
            <p className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
              {typedText}
              <span className="inline-block w-1 h-7 ml-1 bg-cyan-300 animate-pulse align-middle" />
            </p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-4">
            We leverage cutting-edge technologies to build scalable, performant, and future-proof solutions.
          </p>
        </motion.div>
      </div>

      {/* First Row - Right to Left */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10" />

        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 whitespace-nowrap py-4"
        >
          {duplicatedStack.map((tech, i) => (
            <motion.div
              key={`row1-${i}`}
              className="flex items-center gap-4 px-6 py-4 bg-gray-900/80 border border-gray-800 rounded-2xl backdrop-blur-sm hover:border-cyan-500/50 transition-colors min-w-[180px] group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg overflow-hidden bg-white/5"
                style={{ background: `linear-gradient(135deg, ${tech.color}33, ${tech.color}11)` }}
              >
                {tech.logo ? (
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    data-fallback={tech.fallback || ''}
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; const fb = t.getAttribute('data-fallback'); if (fb) { t.onerror = null; t.src = fb; } }}
                  />
                ) : (
                  tech.name.charAt(0)
                )}
              </div>
              <div>
                <div className="text-white font-semibold group-hover:text-cyan-400 transition-colors">{tech.name}</div>
                <div className="text-gray-500 text-xs">Framework</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Left to Right */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10" />

        <motion.div
          animate={{ x: ['-50%', 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 whitespace-nowrap py-4"
        >
          {[...duplicatedStack].reverse().map((tech, i) => (
            <motion.div
              key={`row2-${i}`}
              className="flex items-center gap-4 px-6 py-4 bg-gray-900/80 border border-gray-800 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-colors min-w-[180px] group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg overflow-hidden bg-white/5"
                style={{ background: `linear-gradient(135deg, ${tech.color}33, ${tech.color}11)` }}
              >
                {tech.logo ? (
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    data-fallback={tech.fallback || ''}
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; const fb = t.getAttribute('data-fallback'); if (fb) { t.onerror = null; t.src = fb; } }}
                  />
                ) : (
                  tech.name.charAt(0)
                )}
              </div>
              <div>
                <div className="text-white font-semibold group-hover:text-purple-400 transition-colors">{tech.name}</div>
                <div className="text-gray-500 text-xs">Technology</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, delay: Math.random() * 5, duration: Math.random() * 10 + 15 }));
  return (<div className="absolute inset-0 overflow-hidden pointer-events-none">{particles.map((p) => (<motion.div key={p.id} className="absolute rounded-full bg-primary-400/15 dark:bg-primary-400/20" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }} animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }} />))}</div>);
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 hero-futuristic-grid pointer-events-none" />
      <motion.div
        className="absolute inset-0 pointer-events-none hero-motion-grid"
        animate={{ backgroundPosition: ['0px 0px', '120px 120px'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-cyan-300/80 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          style={{ left: '14%', top: '18%' }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-purple-300/80 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
          style={{ left: '28%', top: '12%' }}
          animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-blue-300/80 shadow-[0_0_24px_rgba(59,130,246,0.36)]"
          style={{ left: '24%', top: '34%' }}
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[14%] top-[18%] h-px w-[220px] bg-gradient-to-r from-cyan-300/90 via-transparent to-transparent"
          animate={{ x: [0, 8, 0], opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[26%] top-[13%] h-px w-[130px] bg-gradient-to-r from-purple-300/80 via-transparent to-transparent"
          animate={{ x: [0, -10, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[23%] top-[36%] h-px w-[180px] bg-gradient-to-r from-blue-300/70 via-transparent to-transparent"
          animate={{ x: [0, 6, 0], opacity: [0.16, 0.55, 0.16] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400/5 via-blue-500/3 to-transparent blur-3xl"
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ParticleField />

      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 18, -18, 0], opacity: [0.7, 1, 0.7, 0.8] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }} className="absolute top-16 left-[8%]"><Floating3DShape shape="cube" /></motion.div>
        <motion.div animate={{ x: [10, -10, 10], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }} className="absolute top-[55%] left-[5%]"><Floating3DShape shape="ring" /></motion.div>
        <motion.div animate={{ y: [0, 24, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-28 right-0 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <motion.div animate={{ rotate: [0, 15, -15, 0], opacity: [0.4, 0.7, 0.4, 0.5] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-16 right-[18%] w-[360px] h-[2px] rounded-full bg-gradient-to-r from-cyan-400/40 via-blue-300/30 to-purple-400/40" />
        <motion.div animate={{ rotate: [0, -15, 15, 0], opacity: [0.3, 0.75, 0.3, 0.5] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[50%] right-[10%] w-[420px] h-[0.5px] rounded-full bg-gradient-to-r from-purple-400/30 via-cyan-300/20 to-transparent" />
      </div>

      {/* Main 3D Object overlapping content */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        animate={{ y: [0, -12, 0], opacity: [0.96, 1, 0.96] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute left-0 top-10 h-px w-3/4 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20"
          animate={{ x: [0, 20, -20, 0], opacity: [0.1, 0.5, 0.1, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-[30%] h-px w-[420px] bg-gradient-to-r from-transparent via-cyan-400/20 to-purple-400/20"
          animate={{ x: [0, -24, 24, 0], opacity: [0.12, 0.55, 0.12, 0.12] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[15%] bottom-8 h-px w-[280px] bg-gradient-to-r from-purple-400/15 via-cyan-400/15 to-transparent"
          animate={{ x: [0, 18, -18, 0], opacity: [0.1, 0.45, 0.1, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-10 left-[6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent blur-3xl"
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[22%] right-[10%] w-[360px] h-[360px] rounded-full border border-cyan-300/20 dark:border-purple-300/15 blur-xl"
          animate={{ rotate: [0, 20, -20, 0], opacity: [0.35, 0.75, 0.35, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[10%] right-0 w-[420px] h-[2px] rounded-full bg-gradient-to-r from-cyan-400/40 via-transparent to-purple-400/40"
          animate={{ x: [0, 20, -20, 0], opacity: [0.2, 0.65, 0.2, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Hero3DObject />
      </motion.div>

      <motion.div style={{ opacity, scale }} className="relative w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10">
        <div className="grid gap-8 items-start">
          <div className="w-full max-w-[740px] lg:max-w-[820px] text-left">
            <div className="max-w-[32rem] sm:max-w-[40rem]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-400/15 border border-cyan-400/30 dark:border-cyan-500/30 text-cyan-400 dark:text-cyan-300 text-sm font-medium mb-6 backdrop-blur-sm"
              >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
            AnantaByte Digital Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.05] mb-6 tracking-tight"
          >
            <GlitchText>Build</GlitchText> the{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Future</span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 blur-xl -z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="absolute inset-x-0 bottom-0 h-1 bg-cyan-400/30 blur-xl"
                animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100">With </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Technology</span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8 leading-relaxed"
          >
            We craft innovative digital solutions that accelerate growth. From web and mobile apps to AI-powered platforms, we turn your vision into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </Link>

            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 dark:bg-white/10 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-300/50 dark:border-white/20 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/15 hover:border-cyan-400/50 dark:hover:border-cyan-400/30 transition-all duration-300"
            >
              Our Services
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            {[
              { value: '5+', label: 'Projects' },
              { value: '5+', label: 'Clients' },
              { value: '2+', label: 'Years' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-cyan-400/50 dark:text-cyan-400/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const activeService = selectedService !== null ? services[selectedService] : null;
  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30, rotateX: 8 }} animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Our Core <span className="gradient-text">Services</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive technology solutions tailored to your business needs, from concept to deployment.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const tiltRef = use3DTilt();
            const cardY = useTransform(scrollYProgress, [0.1 + i * 0.05, 0.4 + i * 0.05], [60, 0]);
            const cardRotate = useTransform(scrollYProgress, [0.1 + i * 0.05, 0.4 + i * 0.05], [8, 0]);
            const cardOpacity = useTransform(scrollYProgress, [0.1 + i * 0.05, 0.3 + i * 0.05], [0, 1]);
            const ServiceIcon = service.icon;
            return (
              <motion.div key={service.title} ref={tiltRef} style={{ y: cardY, rotateX: cardRotate, opacity: cardOpacity }} onClick={() => setSelectedService(i)}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-600 shadow-sm hover:shadow-2xl hover:shadow-primary-500/15 dark:hover:shadow-primary-400/10 transition-all duration-500 cursor-pointer preserve-3d">
                <div className="relative h-44 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-500" />
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}><ServiceIcon className="w-5 h-5 text-white" /></div>
                </div>
                <div className="p-6 pt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <Link to={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {activeService && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md" onClick={() => setSelectedService(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} className="bg-white dark:bg-gray-950 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl preserve-3d" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
                  <img src={activeService.image} alt={activeService.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeService.color} flex items-center justify-center shadow-lg`}><activeService.icon className="w-6 h-6 text-white" /></div>
                    <span className="px-3 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 text-primary-700 dark:text-primary-300 text-sm font-semibold backdrop-blur-sm">{activeService.title}</span>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 flex items-center justify-center backdrop-blur-sm transition-colors">
                    <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300 rotate-90" />
                  </button>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{activeService.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{activeService.desc}</p>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Featured Capabilities</h3>
                  <div className="space-y-3 mb-6">
                    {activeService.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                        <span className="mt-1 w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeService.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to={`/services/${activeService.slug}`} onClick={() => setSelectedService(null)} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300">
                      View Full Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button onClick={() => setSelectedService(null)} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">Close</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);
  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0"><div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" /><div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" /></div>
      <motion.div style={{ rotateX, perspective: 1200 }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 preserve-3d">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => { const { count, ref: countRef } = useCountUp(stat.value, 2000); return (
            <motion.div key={stat.label} ref={countRef} initial={{ opacity: 0, scale: 0.5, rotateY: 20 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="text-center preserve-3d">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">{count}{stat.suffix}</div>
              <div className="text-primary-200 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ); })}
        </div>
      </motion.div>
    </section>
  );
}

function WhyChooseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const contentRotate = useTransform(scrollYProgress, [0, 0.4], [6, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: contentY, rotateX: contentRotate, opacity: contentOpacity }}>
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Why </span>
            <img src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=40&dpr=1" alt="Tech stack" className="inline-block h-6 ml-2 rounded-md object-cover" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Why Businesses <span className="gradient-text">Choose Us</span></h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">We combine deep technical expertise with a passion for innovation to deliver solutions that make a real difference.</p>
            <div className="space-y-4 mb-8">
              {['End-to-end project management', 'Transparent communication', 'Post-launch support & maintenance', 'Cutting-edge technology stack'].map((item) => (
                <div key={item} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" /><span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span></div>
              ))}
            </div>
            <Link to="/about" className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">More about us <ArrowRight className="w-4 h-4" /></Link>
          </motion.div>
          <div ref={ref} className="grid gap-5">
            {reasons.map((reason, i) => (
              <motion.div key={reason.title} initial={{ opacity: 0, x: 40, rotateY: 10 }} animate={isVisible ? { opacity: 1, x: 0, rotateY: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group flex items-start gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d perspective-1000">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300"><reason.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" /></div>
                <div><h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{reason.title}</h3><p className="text-gray-600 dark:text-gray-400 text-sm">{reason.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0.2, 0.5], [10, 0]);
  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center perspective-1000">
        <motion.div style={{ scale, rotateX }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/40 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"><Users className="w-4 h-4" /> Join 200+  Clients</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Ready to <span className="gradient-text">Transform</span> Your Business?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8 text-lg">Let's discuss how our technology solutions can accelerate your growth and give you a competitive edge.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5">Schedule a Call <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-semibold rounded-xl border-2 border-primary-200 dark:border-primary-700/40 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300">View Services</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Testimonials removed from HomePage — managed via the Testimonials page or Admin upload */

function TestimonialPreview() {
  const { ref, isVisible } = useScrollAnimation();
  const [list, setList] = useState<Testimonial[]>([]);

  useEffect(() => {
    try {
      setList(getTestimonials());
    } catch (e) {
      setList(initialTestimonials);
    }
  }, []);

  if (!list || list.length === 0) return null;

  const preview = list.slice(0, 2);

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 1, y: 0 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Client Stories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">What Our <span className="gradient-text">Clients Say</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 perspective-1000">
          {preview.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }} animate={isVisible ? { opacity: 1, y: 0, rotateY: 0, rotateX: 0 } : { opacity: 1, y: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 0.7, delay: i * 0.2, type: 'spring', stiffness: 80 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d preserve-3d">
              <div className="flex gap-1 mb-4">{Array.from({ length: t.rating || 5 }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md"><span className="text-white font-bold text-sm">{t.name.charAt(0)}</span></div>
                <div><div className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</div><div className="text-xs text-gray-500 dark:text-gray-400">{t.role}{t.company ? `, ${t.company}` : ''}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10"><Link to="/testimonials" className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">Read all testimonials <ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <SEO
        title="Technology Services for Businesses"
        description="Ananta Byte delivers enterprise-grade web, mobile, AI, and cloud solutions designed to accelerate growth, improve performance, and drive digital transformation."
        pathname="/"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
        ])}
      />
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseSection />
      <TestimonialPreview />
      <CTASection />
    </main>
  );
}
