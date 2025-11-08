import React from 'react';

const AnimatedWaves = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div className="wave absolute -bottom-1/4 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" />
    <div className="wave absolute -bottom-1/3 left-1/2 h-[35rem] w-[70rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" style={{ animationDelay: '2s' }} />
    <div className="wave absolute -bottom-1/2 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" style={{ animationDelay: '4s' }} />
  </div>
);

export default AnimatedWaves;