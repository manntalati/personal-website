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
                "Implementing short-term electric load forecasting models to achieve ≤ 3% MAPE, projected to save $1000+ daily",
                "Hyperparameter tuning neural forecasting models to enhance model accuracy by ≥ 1% with Ray Tune",
                "Utilizing statistical models to forecast 8+ companies’ electric load consumption"
            ],
            imageUrl: "ameren.png",
            urlLink: "https://www.ameren.com/",
        },
        {
            title: "Senior Consultant @ CUBE Consulting",
            bullets: [
                "Developed 10+ data science tutorials from R for Data Science (2e) by collaborating with Harvard preceptor to enhance educational resources for students",
                "Drafted and contributed to fundamental chapters on statistical methods, predictive models, and mathematical expressions in the book (Preceptor’s Primer) offered in Kane’s Data Science Course through R and RStudio",
            ],
            imageUrl: "cube.png",
            urlLink: "https://www.cubeconsulting.org/",
        },
        {
            title: "Data Science Intern @ Former Harvard Preceptor, David Kane",
            bullets: [
                "Developed 10+ data science tutorials from R for Data Science (2e) by collaborating with Harvard preceptor to enhance educational resources for students",
                "Drafted and contributed to fundamental chapters on statistical methods, predictive models, and mathematical expressions in the book (Preceptor’s Primer) offered in Kane’s Data Science Course through R and RStudio",
            ],
            imageUrl: "preceptor.jpg",
            urlLink: "https://ppbds.github.io/primer/",
        },
        {
            title: "SWE & Web Dev Intern @ Silverline Educational Advisory Services",
            bullets: [
                "Assisted with the redesign of the website through React, Typescript, and CSS, improving engagement by 10%",
                "Implemented bot functionalities with the CTO using Discord.py, enhancing support for 250+ members",
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
            imageUrl: "oppti.jpeg",
            urlLink: "https://getoppti.com/",
        },
    ]

    return (
        <section className="experience">
        <h2 className="experience-heading">Experience</h2>
        {experiences.map((exp, idx) => (
            <div
            key={idx}
            className={`experience-row ${idx % 2 === 1 ? 'reverse' : ''}`}
            >
            
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