import './Experience.css'
import { useState, useEffect } from 'react';
import { experiences } from './content';

interface ExperienceProps {
    searchQuery?: string;
}

export default function Experience({ searchQuery = '' }: ExperienceProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<{ id: string }>).detail;
            const idx = experiences.findIndex(exp => exp.id === detail.id);
            if (idx === -1) return;
            setExpandedIndex(idx);
            requestAnimationFrame(() => {
                const section = document.getElementById('Experience');
                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        };
        window.addEventListener('cmdk:expand-experience', handler);
        return () => window.removeEventListener('cmdk:expand-experience', handler);
    }, []);

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
                            key={exp.id}
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
