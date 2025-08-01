import './Experience.css'

export default function Experience() {
    type Experience = {
        title: string;
        bullets: string[];
        imageUrl: string;
        urlLink: string;
    }

    const experiences: Experience[] = [
        {
            title: "Data Science Intern @ Ameren",
            bullets: [
                "Implementing short-term electric load forecasting models to achieve ≤ 4% MAPE, projected to save $50,000+",
                "Hyperparameter tuning neural forecasting models to enhance model accuracy by ≥ 1% with Ray Tune",
                "Developing a Jenkins CI/CD pipeline using Terraform to deploy code across several environments and productionize it",
            ],
            imageUrl: "ameren.png",
            urlLink: "https://www.ameren.com/",
        },
        {
            title: "Senior Consultant @ CUBE Consulting",
            bullets: [
                "Implemented a Framer-driven website redesign and category plan that boosts user engagement by 25%, and developed a spectrometry algorithm to extract spectral information",
                "Contacted 20+ potential clients weekly to facilitate projects and led a team of 4+ consultants",
            ],
            imageUrl: "cube.png",
            urlLink: "https://www.cubeconsulting.org/",
        },
        {
            title: "Data Science Intern @ Former Harvard Preceptor, David Kane",
            bullets: [
                "Developed 10+ data science tutorials from R for Data Science (2e) in RStudio by collaborating with Harvard preceptor to enhance educational resources for students",
                "Drafted and contributed to fundamental chapters on statistical methods, predictive models, and mathematical expressions in the book (Preceptor’s Primer) offered in Kane’s Data Science Course to strengthen the course curriculum",
            ],
            imageUrl: "preceptor.jpg",
            urlLink: "https://ppbds.github.io/primer/",
        },
        {
            title: "SWE & Web Dev Intern @ Silverline Educational Advisory Services",
            bullets: [
                "Assisted with the redesign of the website through React, TypeScript, and CSS, improving engagement by 10%",
                "Implemented bot functionalities with the CTO using Discord.py, enhancing support for 250+ members"
            ],
            imageUrl: "silverline.png",
            urlLink: "http://silverlineadvisory.org",
        },
        {
            title: "User Interface & User Experience Intern @ Oppti",
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
            <div key={idx} className={`experience-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
            <div className="experience-text">
                <h5 className="title_header">{exp.title}</h5>
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