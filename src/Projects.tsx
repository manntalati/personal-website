import './Projects.css';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

interface ProjectsProps {
    searchQuery?: string;
}

export default function Projects({ searchQuery = '' }: ProjectsProps) {
    type Project = {
        id: string;
        title: string;
        imageUrl: string;
        summary: string;
        githubUrl: string;
        year: string;
    };

    const token = import.meta.env.VITE_GITHUB_KEY;
    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
    };

    const projects: Project[] = [
        {
            id: "1",
            title: "PR Assistant",
            imageUrl: "/pr-assistant-cli.png",
            summary: "AI-powered CLI tool that understands your codebase and automatically generates Pull Requests based on high-level instructions.",
            githubUrl: "https://github.com/manntalati/pr-assistant",
            year: "Nov 2025 - Present",
        },
        {
            id: "5",
            title: "AI Recycling Assistant",
            imageUrl: "/recycling.HEIC",
            summary: "AI recycling assistant with custom CNN deployed on AWS SageMaker to classify waste materials with ≥ 70% accuracy.",
            githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
            year: "Jun 2025 - Aug 2025",
        },
        {
            id: "6",
            title: "Resume Recommender",
            imageUrl: "/resume_recommender.png",
            summary: "Tool to optimize resumes for job and internship applications.",
            githubUrl: "https://github.com/manntalati/resume-recommender",
            year: "Jul 2025",
        },
    ];

    const [languages, setLanguages] = useState<Record<string, string[]>>({})

    useEffect(() => {
        projects.forEach((p) => {
            const parts = p.githubUrl.split("github.com/");
            if (parts.length < 2) return;

            const [owner, repo] = parts[1].split("/");
            fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
                headers,
            })
                .then((res) => res.json())
                .then((data: any) => {
                    if (data && typeof data === 'object') {
                        const top2 = Object.entries(data)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 2)
                            .map(([lang]) => lang);
                        setLanguages((prev) => ({ ...prev, [p.id]: top2 }));
                    }
                })
                .catch(console.error);
        });
    }, []);

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

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="Projects" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="section-label">Selected Works</span>
                    <h2 className="section-heading">Innovation & Research</h2>
                </div>

                <div className="projects-list">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-item"
                            onClick={() => setSelectedProject(project)}
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
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>×</button>

                        <div className="modal-header">
                            <h2 className="modal-title">{selectedProject.title}</h2>
                        </div>

                        <div className="modal-image-wrapper">
                            <img src={selectedProject.imageUrl} alt={selectedProject.title} className="modal-image" />
                        </div>

                        <div className="modal-body">
                            <div className="modal-main">
                                <p className="modal-description">{selectedProject.summary}</p>
                            </div>

                            <div className="modal-meta">
                                <a
                                    href={selectedProject.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="modal-btn"
                                >
                                    <FaGithub /> Source Repository →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}