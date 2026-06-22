import type { LucideIcon } from 'lucide-react';
import { Code2, Smartphone, Bot, Brain, Palette, Cloud, Megaphone } from 'lucide-react';

export interface ServiceData {
  id: number;
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  image: string;
  features: string[];
  tech: string[];
}

export const services: ServiceData[] = [
  {
    id: 1,
    slug: 'web-development',
    icon: Code2,
    title: 'Web Development',
    desc: 'Scalable, responsive websites built with modern frameworks and optimized for performance and conversion.',
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['React & Next.js Development', 'E-commerce Platforms', 'Progressive Web Apps', 'API Development & Integration', 'Performance Optimization'],
    tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 2,
    slug: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    desc: 'Native and cross-platform mobile applications that deliver exceptional user experiences and strong engagement.',
    color: 'from-cyan-500 to-blue-500',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['iOS & Android Development', 'React Native & Flutter', 'App Store Optimization', 'Push Notifications & Analytics', 'Offline-First Architecture'],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  // {
  //   id: 3,
  //   slug: 'chatbot-development',
  //   icon: Bot,
  //   title: 'Chatbot Development',
  //   desc: 'Intelligent conversational AI that transforms customer engagement with context-aware interactions.',
  //   color: 'from-blue-600 to-indigo-500',
  //   image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   features: ['Custom AI Chatbots', 'Multi-platform Deployment', 'Natural Language Processing', 'Seamless CRM Integration', 'Analytics & Reporting'],
  //   tech: ['OpenAI', 'Dialogflow', 'Rasa', 'LangChain', 'WhatsApp API'],
  // },
  {
    id: 4,
    slug: 'ai-ml-solutions',
    icon: Brain,
    title: 'AI/ML Solutions',
    desc: 'Machine learning models that turn data into insights, automate decisions, and improve business outcomes.',
    color: 'from-sky-500 to-blue-600',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['Predictive Analytics', 'Computer Vision', 'Natural Language Processing', 'Recommendation Engines', 'Custom Model Training'],
    tech: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face'],
  },
  {
    id: 5,
    slug: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Intuitive interfaces designed to delight users, improve usability, and drive engagement.',
    color: 'from-blue-400 to-cyan-500',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['User Research & Strategy', 'Wireframing & Prototyping', 'Visual Design Systems', 'Usability Testing', 'Design System Creation'],
    tech: ['Figma', 'Adobe XD', 'Framer', 'Principle', 'Maze'],
  },
  {
    id: 6,
    slug: 'cloud-solutions',
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure designed for resilience, security, and cost efficiency.',
    color: 'from-blue-500 to-sky-600',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['Cloud Migration', 'Infrastructure as Code', 'DevOps & CI/CD', 'Serverless Architecture', 'Cost Optimization'],
    tech: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker'],
  },
 {
id: 7,
slug: 'qa-testing',
icon: Megaphone,
title: 'QA Testing Services',
desc: 'Ensure software quality, reliability, and performance with our comprehensive Manual Testing, API Testing, and Automation Testing services. We help businesses deliver bug-free applications with faster releases and improved user experiences.',
color: 'from-green-500 to-emerald-500',
image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
features: [
'Manual Functional Testing',
'API Testing & Validation',
'Automation Testing Framework Development',
'Regression Testing',
'Cross-Browser Testing',
'Performance & Load Testing',
'Database Testing',
'Test Planning & Documentation',
'CI/CD Test Automation Integration',
'Bug Reporting & Quality Assurance'
],
tech: [
'Selenium',
'Cypress',
'Playwright',
'Postman',
'REST Assured',
'Java',
'TestNG',
'JMeter',
'MySQL',
'Jenkins'
],
}

];
