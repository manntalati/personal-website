import { useState, useEffect, useRef, useMemo } from 'react';
import {
    FiSearch,
    FiUser,
    FiBriefcase,
    FiBookOpen,
    FiCode,
    FiCpu,
    FiMail,
    FiFileText,
    FiGithub,
    FiLinkedin,
    FiCopy,
    FiCornerDownLeft,
} from 'react-icons/fi';
import './CommandPalette.css';

type Action = {
    id: string;
    label: string;
    hint: string;
    group: 'Navigate' | 'Links' | 'Actions';
    icon: React.ReactNode;
    keywords?: string[];
    run: () => unknown;
};

const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [toast, setToast] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const flashToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 1800);
    };

    const actions: Action[] = useMemo(() => [
        { id: 'about', label: 'About', hint: 'Background & focus', group: 'Navigate', icon: <FiUser />, keywords: ['bio', 'background'], run: () => scrollToHash('#About') },
        { id: 'experience', label: 'Experience', hint: 'Roles & internships', group: 'Navigate', icon: <FiBriefcase />, keywords: ['work', 'jobs', 'oracle', 'ameren'], run: () => scrollToHash('#Experience') },
        { id: 'research', label: 'Research', hint: 'Publications', group: 'Navigate', icon: <FiBookOpen />, keywords: ['paper', 'arxiv', 'monitorbench'], run: () => scrollToHash('#Research') },
        { id: 'projects', label: 'Projects', hint: 'Selected works', group: 'Navigate', icon: <FiCode />, keywords: ['work', 'portfolio'], run: () => scrollToHash('#Projects') },
        { id: 'skills', label: 'Skills', hint: 'Tech stack', group: 'Navigate', icon: <FiCpu />, keywords: ['stack', 'tools', 'languages'], run: () => scrollToHash('#Technologies') },
        { id: 'contact', label: 'Contact', hint: 'Get in touch', group: 'Navigate', icon: <FiMail />, keywords: ['email', 'reach'], run: () => scrollToHash('#Contact') },

        { id: 'resume', label: 'Download Resume', hint: 'PDF', group: 'Links', icon: <FiFileText />, keywords: ['cv', 'pdf'], run: () => window.open('/talati_mann_resume.pdf', '_blank') },
        { id: 'github', label: 'GitHub', hint: 'github.com/manntalati', group: 'Links', icon: <FiGithub />, run: () => window.open('https://github.com/manntalati', '_blank') },
        { id: 'linkedin', label: 'LinkedIn', hint: 'linkedin.com/in/mann-talati', group: 'Links', icon: <FiLinkedin />, run: () => window.open('https://www.linkedin.com/in/mann-talati', '_blank') },

        {
            id: 'copy-email',
            label: 'Copy Email',
            hint: 'mann.talati@gmail.com',
            group: 'Actions',
            icon: <FiCopy />,
            keywords: ['mail', 'clipboard'],
            run: async () => {
                try {
                    await navigator.clipboard.writeText('mann.talati@gmail.com');
                    flashToast('Email copied');
                } catch {
                    flashToast('Copy failed');
                }
            },
        },
        {
            id: 'email-link',
            label: 'Send Email',
            hint: 'Opens your mail client',
            group: 'Actions',
            icon: <FiMail />,
            run: () => { window.location.href = 'mailto:mann.talati@gmail.com'; },
        },
    ], []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter(a => {
            const haystack = [a.label, a.hint, a.group, ...(a.keywords || [])].join(' ').toLowerCase();
            return haystack.includes(q);
        });
    }, [query, actions]);

    const grouped = useMemo(() => {
        const groups: Record<string, Action[]> = {};
        filtered.forEach(a => {
            if (!groups[a.group]) groups[a.group] = [];
            groups[a.group].push(a);
        });
        return groups;
    }, [filtered]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen(prev => !prev);
                return;
            }
            if (e.key === 'Escape' && open) {
                setOpen(false);
                return;
            }
            if (!open) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(i => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const action = filtered[activeIndex];
                if (action) {
                    action.run();
                    if (action.id !== 'copy-email') setOpen(false);
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, filtered, activeIndex]);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActiveIndex(0);
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    useEffect(() => { setActiveIndex(0); }, [query]);

    return (
        <>
            <button
                className="cmdk-hint"
                onClick={() => setOpen(true)}
                aria-label="Open command palette"
            >
                <FiSearch className="cmdk-hint-icon" />
                <span className="cmdk-hint-label">Search</span>
                <kbd className="cmdk-hint-kbd">⌘K</kbd>
            </button>

            {open && (
                <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
                    <div className="cmdk-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="cmdk-search">
                            <FiSearch className="cmdk-search-icon" />
                            <input
                                ref={inputRef}
                                className="cmdk-input"
                                placeholder="Jump to section, copy email, open links..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <kbd className="cmdk-esc">ESC</kbd>
                        </div>

                        <div className="cmdk-results">
                            {filtered.length === 0 && (
                                <div className="cmdk-empty">No results for "{query}"</div>
                            )}

                            {Object.entries(grouped).map(([group, items]) => (
                                <div className="cmdk-group" key={group}>
                                    <div className="cmdk-group-label">{group}</div>
                                    {items.map((a) => {
                                        const idx = filtered.indexOf(a);
                                        const isActive = idx === activeIndex;
                                        return (
                                            <button
                                                key={a.id}
                                                className={`cmdk-item ${isActive ? 'active' : ''}`}
                                                onMouseEnter={() => setActiveIndex(idx)}
                                                onClick={() => {
                                                    a.run();
                                                    if (a.id !== 'copy-email') setOpen(false);
                                                }}
                                            >
                                                <span className="cmdk-item-icon">{a.icon}</span>
                                                <span className="cmdk-item-label">{a.label}</span>
                                                <span className="cmdk-item-hint">{a.hint}</span>
                                                {isActive && <FiCornerDownLeft className="cmdk-item-enter" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="cmdk-footer">
                            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                            <span><kbd>↵</kbd> Select</span>
                            <span><kbd>ESC</kbd> Close</span>
                        </div>

                        {toast && <div className="cmdk-toast">{toast}</div>}
                    </div>
                </div>
            )}
        </>
    );
}
