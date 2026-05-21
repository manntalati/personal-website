import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    isDark: boolean;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'system',
    isDark: false,
    setMode: () => { },
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = 'theme-mode';

function getSystemPrefersDark(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveIsDark(mode: ThemeMode): boolean {
    if (mode === 'system') return getSystemPrefersDark();
    return mode === 'dark';
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
        if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
        return 'system';
    });

    const [isDark, setIsDark] = useState<boolean>(() => resolveIsDark(mode));

    useEffect(() => {
        setIsDark(resolveIsDark(mode));
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    useEffect(() => {
        if (mode !== 'system') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => setIsDark(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [mode]);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    const setMode = (m: ThemeMode) => setModeState(m);
    const toggleTheme = () => setModeState(isDark ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ mode, isDark, setMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
