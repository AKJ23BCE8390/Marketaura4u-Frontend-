const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
let timeoutId;

export function startSessionTimeout(onLogout) {
  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onLogout();
    }, INACTIVITY_LIMIT);
  };

  ["click", "mousemove", "keydown", "scroll"].forEach(event => {
    window.addEventListener(event, resetTimer);
  });

  resetTimer();

  return () => {
    clearTimeout(timeoutId);
    ["click", "mousemove", "keydown", "scroll"].forEach(event => {
      window.removeEventListener(event, resetTimer);
    });
  };
}
