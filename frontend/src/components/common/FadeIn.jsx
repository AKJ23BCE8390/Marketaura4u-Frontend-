import React from 'react';
import { useInView } from 'react-intersection-observer';

// --- Reusable Animated Components ---
const FadeIn = ({ children, delay = 0, duration = 500, triggerOnce = true }) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;