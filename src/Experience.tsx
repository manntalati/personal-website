import './Experience.css'
import { useEffect, useRef, useState } from 'react';

export default function Experience() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleItems(prev => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    type Experience = {
        title: string;
        bullets: string[];
        imageUrl: string;
        urlLink: string;
        company: string;
        duration: string;
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
        },
    ]

    return (
        <section id="Experience" className="experience">
        <h2 className="experience-heading">Experience</h2>
        {experiences.map((exp, idx) => (
            <div 
                key={idx} 
                ref={(el) => itemRefs.current[idx] = el}
                data-index={idx}
                className={`experience-row ${idx % 2 === 1 ? 'reverse' : ''} ${
                    visibleItems.includes(idx) ? 'visible' : ''
                }`}
            >
            <div className="experience-text">
                <div className="experience-header">
                    <h3 className="title_header">{exp.title}</h3>
                    <div className="experience-meta">
                        <span className="company">{exp.company}</span>
                        <span className="duration">{exp.duration}</span>
                    </div>
                </div>
                <ul className="dashed">
                {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
                </ul>
            </div>
            <div className="experience-image">
                <a href={exp.urlLink} target="_blank" rel="noreferrer">
                <img src={exp.imageUrl} alt={exp.title} />
                </a>
            </div>
            </div>
        ))}
        </section>
    );
}