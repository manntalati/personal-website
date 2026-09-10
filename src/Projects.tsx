import './Projects.css';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { projects, type Project } from './content';

interface ProjectsProps {
    searchQuery?: string;
}

export default function Projects({ searchQuery = '' }: ProjectsProps) {
    const [languages, setLanguages] = useState<Record<string, string[]>>({})
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Top-2 languages are baked into /repo-languages.json at build time by
    // scripts/fetch-languages.mjs, so no GitHub token ever reaches the browser.
    useEffect(() => {
        let cancelled = false;
        fetch('/repo-languages.json', { cache: 'no-cache' })
            .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
            .then((data: Record<string, string[]>) => {
                if (!cancelled) setLanguages(data);
            })
            .catch((err) => console.error('[projects] could not load /repo-languages.json', err));
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<{ id: string }>).detail;
            const project = projects.find(p => p.id === detail.id);
            if (!project) return;
            const section = document.getElementById('Projects');
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => setSelectedProject(project), 400);
        };
        window.addEventListener('cmdk:open-project', handler);
        return () => window.removeEventListener('cmdk:open-project', handler);
    }, []);

    useEffect(() => {
        if (!selectedProject) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedProject]);

    const filteredProjects = projects.filter(p => {
        const query = searchQuery.toLowerCase();
        const tags = languages[p.id] || [];
        return (
            p.title.toLowerCase().includes(query) ||
            p.summary.toLowerCase().includes(query) ||
            tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    if (filteredProjects.length === 0) return null;

    return (
        <section id="Projects" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="section-label">Selected Works</span>
                    <h2 className="section-heading">Innovation</h2>
                </div>

                <div className="projects-list">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-item"
                            onClick={() => setSelectedProject(project)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedProject(project);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open details for ${project.title}`}
                        >
                            <span className="project-year">{project.year.split(' ').pop()}</span>

                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-summary">{project.summary}</p>
                            </div>

                            <div className="project-tags">
                                {(languages[project.id] || []).map((lang) => (
                                    <span key={lang} className="project-tag">{lang}</span>
                                ))}
                            </div>

                            <span className="project-arrow">→</span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div className="pm-backdrop" onClick={() => setSelectedProject(null)}>
                    <div
                        className="pm-card"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedProject.title} details`}
                    >
                        <button className="pm-close" onClick={() => setSelectedProject(null)} aria-label="Close dialog">×</button>

                        <div className="pm-meta-row">
                            <span className="pm-year">{selectedProject.year.split(' - ').pop()}</span>
                            <div className="pm-tags">
                                {(languages[selectedProject.id] || []).map((lang) => (
                                    <span key={lang} className="project-tag">{lang}</span>
                                ))}
                            </div>
                        </div>

                        <h2 className="pm-title">{selectedProject.title}</h2>

                        <div className="pm-image-wrapper">
                            <img src={selectedProject.imageUrl} alt={selectedProject.title} className="pm-image" loading="lazy" decoding="async" />
                        </div>

                        <p className="pm-label">Description</p>
                        <p className="pm-description">{selectedProject.summary}</p>

                        <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="pm-btn"
                        >
                            <FaGithub /> Source Repository
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
