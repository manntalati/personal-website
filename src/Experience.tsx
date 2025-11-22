import './Experience.css'
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

export default function Experience() {
    type Experience = {
        title: string;
        bullets: string[];
        imageUrl: string;
        urlLink: string;
        company: string;
        duration: string;
        themes: string[];
    }

    const experiences: Experience[] = [
        {
            title: "Data Science Intern",
            company: "Ameren",
            duration: "Nov 2024 - Aug 2025",
            bullets: [
                "Implementing short-term electric load forecasting models to achieve ≤ 4% MAPE, projected to save $50,000+",
                "Hyperparameter tuning neural forecasting models to enhance model accuracy by ≥ 1% with Ray Tune",
                "Developing a Jenkins CI/CD pipeline using Terraform to deploy code across several environments and productionize it",
            ],
            imageUrl: "ameren.png",
            urlLink: "https://www.ameren.com/",
            themes: ["Forecasting", "Optimization", "Cloud"],
        },
        {
            title: "Senior Consultant",
            company: "CUBE Consulting",
            duration: "Sep 2024 - Present",
            bullets: [
                "Implemented a Framer-driven website redesign and category plan that boosts user engagement by 25%, and developed a spectrometry algorithm to extract spectral information",
                "Contacted 20+ potential clients weekly to facilitate projects and led a team of 4+ consultants",
            ],
            imageUrl: "cube.png",
            urlLink: "https://www.cubeconsulting.org/",
            themes: ["Strategy", "Leadership", "Analytics"],
        },
        {
            title: "Data Science Intern",
            company: "Former Harvard Preceptor, David Kane",
            duration: "Jun 2023 - Aug 2023",
            bullets: [
                "Developed 10+ data science tutorials from R for Data Science (2e) in RStudio by collaborating with Harvard preceptor to enhance educational resources for students",
                "Drafted and contributed to fundamental chapters on statistical methods, predictive models, and mathematical expressions in the book (Preceptor's Primer) offered in Kane's Data Science Course to strengthen the course curriculum",
            ],
            imageUrl: "preceptor.jpg",
            urlLink: "https://ppbds.github.io/primer/",
            themes: ["Education", "Statistics", "Publishing"],
        },
        {
            title: "SWE & Web Dev Intern",
            company: "Silverline Educational Advisory Services",
            duration: "Jul 2022 - Mar 2024",
            bullets: [
                "Assisted with the redesign of the website through React, TypeScript, and CSS, improving engagement by 10%",
                "Implemented bot functionalities with the CTO using Discord.py, enhancing support for 250+ members"
            ],
            imageUrl: "silverline.png",
            urlLink: "http://silverlineadvisory.org",
            themes: ["Fullstack", "Automation", "Impact"],
        },
        {
            title: "User Interface & User Experience Intern",
            company: "Oppti",
            duration: "Jun 2022 - Aug 2022",
            bullets: [
                "Collaborated with the Oppti team and COO on UI/UX projects, contributing to the development of several frontend pages alongside other interns",
                "Assisted in designing pages for a new system revamp and gained exposure to UI/UX practices through mentorship from the team and COO",
            ],
            imageUrl: "oppti.png",
            urlLink: "https://getoppti.com/",
            themes: ["Design", "Frontend", "Collaboration"],
        },
    ]

    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

    const toggleEpisode = (index: number) => {
        if (selectedEpisode === index) {
            setSelectedEpisode(null);
        } else {
            setSelectedEpisode(index);
        }
    }

    return (
        <section id="Experience" className="experience-section">
            <div className="experience-header-container">
                <h2 className="section-title">Episodes</h2>
                <span className="season-info">Season 1: The Journey</span>
            </div>

            <div className="episodes-list">
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className={`episode-item ${selectedEpisode === idx ? 'active' : ''}`}
                        onClick={() => toggleEpisode(idx)}
                    >
                        <div className="episode-number">{idx + 1}</div>

                        <div className="episode-thumbnail-wrapper">
                            <img src={exp.imageUrl} alt={exp.company} className="episode-thumbnail" />
                            <div className="play-overlay">
                                <FaPlay className="play-icon" />
                            </div>
                        </div>

                        <div className="episode-content">
                            <div className="episode-header-row">
                                <h3 className="episode-title">{exp.title}</h3>
                                <span className="episode-duration">{exp.duration}</span>
                            </div>
                            <h4 className="episode-company">{exp.company}</h4>

                            {selectedEpisode !== idx && (
                                <div className="episode-tags">
                                    {exp.themes.map((theme, i) => (
                                        <span key={i} className="episode-tag">{theme}</span>
                                    ))}
                                </div>
                            )}

                            <div className={`episode-details ${selectedEpisode === idx ? 'expanded' : ''}`}>
                                <ul className="episode-bullets">
                                    {exp.bullets.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                                <a href={exp.urlLink} target="_blank" rel="noreferrer" className="episode-link">
                                    Visit Company
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}