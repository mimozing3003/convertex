import { useState, useEffect } from 'react';

type ColorMode = 'light' | 'dark';

export const useColorMode = () => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem('colorMode');
    return (savedMode as ColorMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
    document.body.classList.toggle('dark-mode', mode === 'dark');
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode: ColorMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggleColorMode };
}; 