import { createPortal } from 'react-dom';
import './Projects.css';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaGithub } from 'react-icons/fa';

export default function Projects() {
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
            title: "Google Calendar Agent",
            imageUrl: "/coming_soon.png",
            summary: "Developing an AI agent to easily handle google calendar events",
            githubUrl: "https://github.com/manntalati/google-calendar-agent",
            year: "Aug 2025-Present",
        },
        {
            id: "2",
            title: "Trading Assistant",
            imageUrl: "/coming_soon.png",
            summary: "Developing an stock trading assistant integrated with LangChain to make more informed decisions with voice commands",
            githubUrl: "https://github.com/manntalati/trading-assistant",
            year: "Aug 2025-Present",
        },
        {
            id: "3",
            title: "SnapScoutShop",
            imageUrl: "/coming_soon.png",
            summary: "Developing an easy way to shop the best prices by simply snapping a picture of the item",
            githubUrl: "https://github.com/manntalati/snap-scout-shop",
            year: "Jul 2025-Present",
        },
        {
            id: "4",
            title: "AI Recycling Assistant",
            imageUrl: "/recycling.HEIC",
            summary: "Developing an AI recycling assistant featuring a custom CNN and deployment on AWS SageMaker to classify waste materials with ≥ 70% target accuracy",
            githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
            year: "Jun 2025-Aug 2025",
        },
        {
            id: "5",
            title: "Resume Recommender",
            imageUrl: "/resume_recommender.png",
            summary: "Constructing the best way to optimize resumes to apply to all jobs & internships",
            githubUrl: "https://github.com/manntalati/resume-recommender",
            year: "Jul 2025",
        },
        {
            id: "6",
            title: "Personal Website",
            imageUrl: '/portfolio.png',
            summary: "This website!!",
            githubUrl: "https://github.com/manntalati/personal-website",
            year: "Jun 2025",
        },
        {
            id: "7",
            title: "UIUC Lifestyle",
            imageUrl: "/uiuc.png",
            summary: "Developing full-stack platform delivering ideal campus lifestyle: study spots, transit, deals",
            githubUrl: "https://github.com/manntalati/uiuc-lifestyle",
            year: "May 2025-Present",
        },
        {
            id: "8",
            title: "MacroMasters",
            imageUrl: '/macro-master.jpg',
            summary: "Combat issues that users may face with tracking calories and staying on par with their nutrition goals",
            githubUrl: "https://github.com/manntalati/macro-masters",
            year: "Jan 2025-May 2025",
        },
        {
            id: "9",
            title: "Metea Hackathon",
            imageUrl: '/hackathon.png',
            summary: "Addressing the growing demand for secure data transfer in light of the increased prevalence of malicious intenders",
            githubUrl: "https://github.com/manntalati/meteahackathon",
            year: "May 2023",
        },
        {
            id: "10",
            title: "NCAA Women's Volleyball",
            imageUrl: '/ncaa.png',
            summary: "The project aims to analyze the statistics for all players and teams in hopes of establishing the leaders and stronger teams",
            githubUrl: "https://github.com/manntalati/NCAA_Womens_Volleyball_2012-2019",
            year: "Aug 2022",
        },
        {
            id: "11",
            title: "Drainiacs",
            imageUrl: "/lidar.jpg",
            summary: "Constructed a solution to detect drain blockages with the LIDAR technology to alert the Stormwater Management Department",
            githubUrl: "https://github.com/manntalati/drainiacs_machine_learning",
            year: "Sep 2020-Nov 2021",
        },
    ];

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [languages, setLanguages] = useState<Record<string, string[]>>({})
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = window.innerWidth * 0.8;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

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
                        const top3 = Object.entries(data)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 2)
                            .map(([lang]) => lang);
                        setLanguages((prev) => ({ ...prev, [p.id]: top3 }));
                    }
                })
                .catch(console.error);
        });
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section id="Projects" className="project-section">
            <h2 className="section-title">Trending Projects</h2>

            <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scroll('left')}>
                    <FaChevronLeft />
                </button>

                <div className="projects-row no-scrollbar" ref={scrollContainerRef}>
                    {projects.map((p) => (
                        <div key={p.id} className="project-card" onClick={() => handleProjectClick(p)}>
                            <div className="card-image-wrapper">
                                <img
                                    src={p.imageUrl}
                                    className="card-image"
                                    alt={p.title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x170?text=Project';
                                    }}
                                />
                                <div className="card-overlay-title">
                                    <h3>{p.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-btn right" onClick={() => scroll('right')}>
                    <FaChevronRight />
                </button>
            </div>

            {selectedProject && createPortal(
                <div className="project-modal-overlay" onClick={closeProject}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeProject}>&times;</button>

                        <div className="modal-banner">
                            <img
                                src={selectedProject.imageUrl}
                                alt={selectedProject.title}
                                className="modal-banner-image"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Project';
                                }}
                            />
                            <div className="modal-banner-overlay">
                                <h2 className="modal-title">{selectedProject.title}</h2>
                                <div className="modal-actions">
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="modal-play-btn">
                                        <FaGithub className="btn-icon" /> View Code
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="modal-content">
                            <div className="modal-left-col">
                                <div className="modal-meta">
                                    <span className="match-score">98% Match</span>
                                    <span className="year">{selectedProject.year}</span>
                                    <span className="rating">HD</span>
                                </div>
                                <p className="modal-summary">{selectedProject.summary}</p>
                            </div>

                            <div className="modal-right-col">
                                <div className="modal-tags">
                                    <span className="tag-label">Genres:</span>
                                    {(languages[selectedProject.id] || []).map((lang, i) => (
                                        <span key={lang} className="modal-tag">
                                            {i > 0 && ", "}
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    )
}