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
    FiClock,
    FiSun,
    FiMoon,
    FiMonitor,
    FiCheck,
} from 'react-icons/fi';
import './CommandPalette.css';
import { experiences, projects, papers } from './content';
import { useTheme, type ThemeMode } from './ThemeContext';

type ActionGroup = 'Navigate' | 'Experience' | 'Projects' | 'Research' | 'Links' | 'Actions' | 'Theme';

type Action = {
    id: string;
    label: string;
    hint: string;
    group: ActionGroup;
    icon: React.ReactNode;
    keywords?: string[];
    trailing?: React.ReactNode;
    run: () => unknown;
};

const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const RECENT_KEY = 'cmdk:recent';
const RECENT_LIMIT = 5;

const SUGGESTIONS = ['Oracle', 'MonitorBench', 'ML', 'Resume', 'Dark mode'];

function loadRecent(): string[] {
    try {
        const raw = localStorage.getItem(RECENT_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.slice(0, RECENT_LIMIT) : [];
    } catch {
        return [];
    }
}

function saveRecent(ids: string[]) {
    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, RECENT_LIMIT)));
    } catch { /* ignore */ }
}

function scoreAction(a: Action, q: string): number {
    if (!q) return 0;
    const query = q.toLowerCase();
    const label = a.label.toLowerCase();
    const keywords = (a.keywords || []).join(' ').toLowerCase();
    const hint = a.hint.toLowerCase();
    if (label.startsWith(query)) return 100;
    if (label.includes(query)) return 70;
    if (keywords.includes(query)) return 50;
    if (hint.includes(query)) return 30;
    return -1;
}

export default function CommandPalette() {
    const { mode, setMode } = useTheme();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [toast, setToast] = useState<string | null>(null);
    const [recent, setRecent] = useState<string[]>(() => loadRecent());
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const flashToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 1800);
    };

    const pushRecent = (id: string) => {
        setRecent(prev => {
            const next = [id, ...prev.filter(x => x !== id)].slice(0, RECENT_LIMIT);
            saveRecent(next);
            return next;
        });
    };

    const themeActions: Action[] = useMemo(() => {
        const make = (target: ThemeMode, label: string, icon: React.ReactNode, hint: string, keywords: string[]): Action => ({
            id: `theme-${target}`,
            label,
            hint,
            group: 'Theme',
            icon,
            keywords,
            trailing: mode === target ? <FiCheck className="cmdk-item-check" /> : null,
            run: () => {
                setMode(target);
                flashToast(`Theme: ${target}`);
            },
        });
        return [
            make('light', 'Light theme', <FiSun />, 'Force light mode', ['light', 'theme', 'mode', 'dark']),
            make('dark', 'Dark theme', <FiMoon />, 'Force dark mode', ['dark', 'theme', 'mode', 'night']),
            make('system', 'Match system', <FiMonitor />, 'Follow OS preference', ['system', 'auto', 'theme', 'mode']),
        ];
    }, [mode, setMode]);

    const baseActions: Action[] = useMemo(() => [
        { id: 'about', label: 'About', hint: 'Background & focus', group: 'Navigate', icon: <FiUser />, keywords: ['bio', 'background'], run: () => scrollToHash('#About') },
        { id: 'experience', label: 'Experience', hint: 'Roles & internships', group: 'Navigate', icon: <FiBriefcase />, keywords: ['work', 'jobs', 'timeline'], run: () => scrollToHash('#Experience') },
        { id: 'research', label: 'Research', hint: 'Publications', group: 'Navigate', icon: <FiBookOpen />, keywords: ['paper', 'arxiv'], run: () => scrollToHash('#Research') },
        { id: 'projects', label: 'Projects', hint: 'Selected works', group: 'Navigate', icon: <FiCode />, keywords: ['work', 'portfolio'], run: () => scrollToHash('#Projects') },
        { id: 'skills', label: 'Skills', hint: 'Tech stack', group: 'Navigate', icon: <FiCpu />, keywords: ['stack', 'tools', 'languages'] , run: () => scrollToHash('#Technologies') },
        { id: 'contact', label: 'Contact', hint: 'Get in touch', group: 'Navigate', icon: <FiMail />, keywords: ['email', 'reach'], run: () => scrollToHash('#Contact') },

        ...experiences.map((exp): Action => ({
            id: `exp-${exp.id}`,
            label: `${exp.title} @ ${exp.company.split('(')[0].trim()}`,
            hint: exp.duration.split(' - ').pop() || exp.duration,
            group: 'Experience',
            icon: <FiBriefcase />,
            keywords: [exp.company, ...exp.themes, ...exp.bullets.flatMap(b => b.split(' '))],
            run: () => window.dispatchEvent(new CustomEvent('cmdk:expand-experience', { detail: { id: exp.id } })),
        })),

        ...projects.map((p): Action => ({
            id: `proj-${p.id}`,
            label: p.title,
            hint: p.year.split(' - ').pop() || p.year,
            group: 'Projects',
            icon: <FiCode />,
            keywords: [p.summary],
            run: () => window.dispatchEvent(new CustomEvent('cmdk:open-project', { detail: { id: p.id } })),
        })),

        ...papers.map((p): Action => ({
            id: `paper-${p.id}`,
            label: p.title.length > 60 ? p.title.slice(0, 60) + '…' : p.title,
            hint: p.year,
            group: 'Research',
            icon: <FiBookOpen />,
            keywords: [...p.tags, ...p.authors, p.summary.slice(0, 200)],
            run: () => window.dispatchEvent(new CustomEvent('cmdk:open-paper', { detail: { id: p.id } })),
        })),

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

        ...themeActions,
    ], [themeActions]);

    const totalCommandCount = baseActions.length;

    const filtered = useMemo(() => {
        const q = query.trim();
        if (!q) {
            if (recent.length === 0) return baseActions;
            const recentActions = recent
                .map(id => baseActions.find(a => a.id === id))
                .filter((a): a is Action => Boolean(a))
                .map((a): Action => ({ ...a, id: `recent::${a.id}`, group: 'Navigate' }));
            const rest = baseActions.filter(a => !recent.includes(a.id));
            return [...recentActions, ...rest];
        }
        const scored = baseActions
            .map(a => ({ a, score: scoreAction(a, q) }))
            .filter(x => x.score >= 0)
            .sort((x, y) => y.score - x.score)
            .map(x => x.a);
        return scored;
    }, [query, baseActions, recent]);

    const grouped = useMemo(() => {
        const groups: { label: string; items: Action[] }[] = [];
        const recentItems = filtered.filter(a => a.id.startsWith('recent::'));
        if (recentItems.length > 0 && !query.trim()) {
            groups.push({ label: 'Recent', items: recentItems });
        }
        const order: ActionGroup[] = ['Navigate', 'Experience', 'Projects', 'Research', 'Links', 'Actions', 'Theme'];
        order.forEach(g => {
            const items = filtered.filter(a => a.group === g && !a.id.startsWith('recent::'));
            if (items.length > 0) groups.push({ label: g, items });
        });
        return groups;
    }, [filtered, query]);

    const runAction = (a: Action) => {
        a.run();
        const cleanId = a.id.replace(/^recent::/, '');
        pushRecent(cleanId);
        if (cleanId !== 'copy-email' && !cleanId.startsWith('theme-')) setOpen(false);
    };

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
                if (action) runAction(action);
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

    useEffect(() => {
        if (!listRef.current) return;
        const activeEl = listRef.current.querySelector('.cmdk-item.active') as HTMLElement | null;
        activeEl?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

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
                                placeholder="Search experiences, projects, papers, or actions..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <kbd className="cmdk-esc">ESC</kbd>
                        </div>

                        {!query.trim() && (
                            <div className="cmdk-suggestions">
                                <span className="cmdk-suggestions-label">Try</span>
                                {SUGGESTIONS.map(s => (
                                    <button
                                        key={s}
                                        className="cmdk-suggestion-chip"
                                        onClick={() => {
                                            setQuery(s);
                                            requestAnimationFrame(() => inputRef.current?.focus());
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="cmdk-results" ref={listRef}>
                            {filtered.length === 0 && (
                                <div className="cmdk-empty">No results for "{query}"</div>
                            )}

                            {grouped.map(({ label, items }) => (
                                <div className="cmdk-group" key={label}>
                                    <div className="cmdk-group-label">
                                        {label === 'Recent' && <FiClock className="cmdk-group-icon" />}
                                        {label}
                                    </div>
                                    {items.map((a) => {
                                        const idx = filtered.indexOf(a);
                                        const isActive = idx === activeIndex;
                                        return (
                                            <button
                                                key={a.id}
                                                className={`cmdk-item ${isActive ? 'active' : ''}`}
                                                onMouseEnter={() => setActiveIndex(idx)}
                                                onClick={() => runAction(a)}
                                            >
                                                <span className="cmdk-item-icon">{a.icon}</span>
                                                <span className="cmdk-item-label">{a.label}</span>
                                                <span className="cmdk-item-hint">{a.hint}</span>
                                                <span className="cmdk-item-trailing">
                                                    {a.trailing}
                                                    {isActive && !a.trailing && <FiCornerDownLeft className="cmdk-item-enter" />}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="cmdk-footer">
                            <div className="cmdk-footer-keys">
                                <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                                <span><kbd>↵</kbd> Select</span>
                                <span><kbd>ESC</kbd> Close</span>
                            </div>
                            <span className="cmdk-footer-count">{totalCommandCount} commands</span>
                        </div>

                        {toast && <div className="cmdk-toast">{toast}</div>}
                    </div>
                </div>
            )}
        </>
    );
}
