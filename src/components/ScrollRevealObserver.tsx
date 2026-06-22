import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRevealObserver() {
  const location = useLocation();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => {
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
        section.classList.remove('scroll-reveal');
        section.classList.remove('in-view');
      });
    };
  }, [location.pathname]);

  return null;
}
