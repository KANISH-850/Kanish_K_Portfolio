"use client";

import { useEffect } from 'react';

export function DevToolsBlocker() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+I (Windows/Linux)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
      }
      // Disable Cmd+Opt+I (Mac)
      if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
      }
      // Disable Cmd+Opt+J (Mac)
      if (e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+J (Windows/Linux)
      if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
      }
      // Disable Ctrl+U
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
      // Disable Cmd+U
      if (e.metaKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
