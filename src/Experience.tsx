import './Experience.css'
import { useState } from 'react';

interface ExperienceProps {
    searchQuery?: string;
}

export default function Experience({ searchQuery = '' }: ExperienceProps) {
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
            title: "Research Assistant",
            company: "ASTRAL Lab (Assured Trustworthy AI Research Lab) @ UIUC",
            duration: "Jan 2026 - Present",
            bullets: [
                "Building dual-objective CoT monitorability benchmarks for ASTRAL Lab, based on OpenAI’s work",
                "Curating datasets and benchmark specifications to test hidden-objective detection to effectively monitor monitorability",
            ],
            imageUrl: "ameren.png",
            urlLink: "https://github.com/ASTRAL-Group",
            themes: ["LLM", "Chain of Thought", "Research"],
        },
        {
            title: "Technical Project Manager",
            company: "CUBE Consulting",
            duration: "Sep 2024 - Present",
            bullets: [
                "Leading 4+ consultants to design AI-enabled workflows for Amazon AWS for educators, sales, and others",
                "Implemented Framer website redesign boosting engagement by 25%; built web-based 3D aircraft simulation",
            ],
            imageUrl: "cube.png",
            urlLink: "https://www.cubeconsulting.org/",
            themes: ["Strategy", "Leadership", "Analytics"],
        },
        {
            title: "Course Assistant",
            company: "University of Illinois at Urbana-Champaign",
            duration: "Sep 2025 - Present",
            bullets: [
                "Mentor 8 students through the SDLC by standardizing Git workflows, pull requests, code reviews, and CI/CD pipelines",
                "Leading bi-weekly design/code reviews and implementing issue tracking and sprint cadences",
            ],
            imageUrl: "cube.png",
            urlLink: "https://www.cubeconsulting.org/",
            themes: ["Strategy", "Leadership", "Analytics"],
        },
        {
            title: "Data Science Intern",
            company: "Ameren",
            duration: "Nov 2024 - Aug 2025",
            bullets: [
                "Implemented short-term electric load forecasting models to achieve ≤ 4% MAPE, projected to save $50,000+",
                "Hyperparameter-tuned neural forecasting models to enhance model accuracy by ≥ 1% with Ray Tune",
                "Developed a Jenkins CI/CD pipeline using Terraform to deploy code across several environments and productionize it",
            ],
            imageUrl: "ameren.png",
            urlLink: "https://www.ameren.com/",
            themes: ["Forecasting", "ML", "Cloud"],
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
    ]

    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    const filteredExperiences = experiences.filter(exp => {
        const query = searchQuery.toLowerCase();
        return (
            exp.title.toLowerCase().includes(query) ||
            exp.company.toLowerCase().includes(query) ||
            exp.themes.some(theme => theme.toLowerCase().includes(query)) ||
            exp.bullets.some(bullet => bullet.toLowerCase().includes(query))
        );
    });

    if (filteredExperiences.length === 0) return null;

    return (
        <section id="Experience" className="experience-section">
            <div className="experience-container">
                <div className="experience-header">
                    <span className="section-label">Timeline</span>
                    <h2 className="section-heading">Professional Journey</h2>
                </div>

                <div className="experience-list">
                    {filteredExperiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className={`experience-card ${expandedIndex === idx ? 'expanded' : ''}`}
                        >
                            <div className="experience-item" onClick={() => toggleExpand(idx)}>
                                <div className="experience-meta">
                                    <span className="experience-duration">{exp.duration.split(' - ').pop()}</span>
                                </div>

                                <div className="experience-info">
                                    <span className="experience-company">{exp.company}</span>
                                    <h3 className="experience-title">{exp.title}</h3>

                                    <div className="experience-details">
                                        <ul className="experience-bullets">
                                            {exp.bullets.map((b, i) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="experience-expand-icon">
                                    {expandedIndex === idx ? '−' : '+'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}