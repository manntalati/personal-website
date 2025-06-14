import "bootstrap/dist/css/bootstrap.min.css";
import './Projects.css';
import { useState, useEffect } from 'react';

export default function Projects() {
    type Project = {
        id: string;
        title: string;
        imageUrl: string;
        summary: string;
        githubUrl: string;
        year: string;
    };

    const badgeColors: Record<string,string> = {
    'Javascript': 'F7DF1E',
    'Typescript': '3178C6',
    'Python':     '3776AB',
    cplusplus:  '00599C',
    html5:      'E34F26',
    css3:       '1572B6',
    'Java':       '007396',
    'R':          '276DC3',
    'Jupyter Notebook': 'EB860D',
    };


    const token = import.meta.env.VITE_GITHUB_KEY;
    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
    };

    interface Languages {
        [language: string]: number;
    }

    async function getTopLanguages(owner: string, repo: string): Promise<string[]> {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
        const data: Languages = await res.json();
        return Object.entries(data)
            .sort(([,a],[,b]) => b - a)
            .slice(0, 3)
            .map(([lang]) => lang);
    }

    async function fetchAll() {
    const list = await fetch(`https://api.github.com/users/manntalati/repos?per_page=100`, { headers }).then(r => r.json());
    for (let repo of list) {
        console.log(repo.name, await getTopLanguages(repo.owner.login, repo.name));
    }
    }fetchAll();

    const projects: Project[] = [
    {
        id: "1",
        title: "AI Recycling Assistant",
        imageUrl: "/recycling.HEIC",
        summary: "Developing an AI recycling assistant featuring a custom CNN and deployment on AWS SageMaker to classify waste materials with ≥ 70% target accuracy",
        githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
        year: "Jun 2025-Present",
    },
    {
        id: "2",
        title: "Personal Website",
        imageUrl: '/portfolio.png',
        summary: "This website!! 😝",
        githubUrl: "https://github.com/manntalati/personal-website",
        year: "Jun 2025",
    },
    {
        id: "3",
        title: "UIUC Lifestyle",
        imageUrl: "/uiuc.png",
        summary: "Developing full-stack platform delivering ideal campus lifestyle: study spots, transit, deals",
        githubUrl: "https://github.com/manntalati/uiuc-lifestyle",
        year: "May 2025-Present",
    },
    {
        id: "4",
        title: "Macro Masters",
        imageUrl: '/macro-master.jpg',
        summary: "Combat issues that users may face with tracking calories and staying on par with their nutrition goals",
        githubUrl: "https://github.com/manntalati/macro-masters",
        year: "Jan 2025-May 2025",
    },
    {
        id: "5",
        title: "Metea Hackathon",
        imageUrl: '/hackathon.png',
        summary: "Addressing the growing demand for secure data transfer in light of the increased prevalence of malicious intenders, we aimed to tackle this issue through encrypted file transfers",
        githubUrl: "https://github.com/manntalati/meteahackathon",
        year: "May 2023",
    },
    {
        id: "6",
        title: "NCAA Women's Volleyball Project",
        imageUrl: '/ncaa.png',
        summary: "The project aims to analyze the statistics for all players and teams in hopes of establishing the leaders and stronger teams that exhibit power within their divisions",
        githubUrl: "https://github.com/manntalati/NCAA_Womens_Volleyball_2012-2019",
        year: "Aug 2022",
    },
    {
        id: "7",
        title: "Drainiacs",
        imageUrl: "/lidar.jpg",
        summary: "Constructed a solution to detect drain blockages with the LIDAR technology to alert the Stormwater Management Department",
        githubUrl: "https://github.com/manntalati/drainiacs_machine_learning",
        year: "Sep 2020-Nov 2021",
    },
    ];

    const [languages, setLanguages] = useState<Record<string, string[]>>({})
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;
    const endIndex = Math.min(startIndex + visibleCount, projects.length);
    const visibleProjects = projects.slice(startIndex, endIndex);

    const onPrev = () => setStartIndex(i => Math.max(0, i - visibleCount));
    const onNext = () => setStartIndex(i => Math.min(projects.length - visibleCount, i + visibleCount));

    useEffect(() => {
        projects.forEach((p) => {
        const [owner, repo] = p.githubUrl
            .split("github.com/")[1]
            .split("/");
        fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers,
        })
            .then((res) => res.json())
            .then((data: any) => {
            const top3 = Object.entries(data)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 2)
                .map(([lang]) => lang);
            setLanguages((prev) => ({ ...prev, [p.id]: top3 }));
            })
            .catch(console.error);
        });
    }, []);

    return (
        <section id="Projects" className="project">
            <p className="project-heading">Projects</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-outline-light" onClick={onPrev} disabled={startIndex === 0}>&larr;</button>
                <small>{startIndex+1}–{endIndex} of {projects.length}</small>
                <button className="btn btn-outline-light" onClick={onNext} disabled={endIndex >= projects.length}>&rarr;</button>
                </div>
                <div className="container py-4">
                <div className="row g-4">
                    {visibleProjects.map((p) => (
                    <div key={p.id} className="col-sm-6 col-md-4">
                        <div className="card h-100">
                            <img
                                src={p.imageUrl}
                                className="card-img-top"
                                alt={p.title}
                                style={{ height: 130, objectFit: "cover" }}/>
                            <div className="card-body d-flex flex-column">
                                <div className="year">
                                <h5 className="card-title">{p.title}</h5>
                                <h6>{p.year}</h6>
                                </div>
                                    <p className="card-text flex-grow-1">{p.summary}</p>
                                    <div className="d-flex justify-content-center flex-wrap mb-3">
                                    {(languages[p.id] || []).map(lang => {
                                        const color = badgeColors[lang] || 'lightgrey';
                                        return (
                                        <img
                                            key={lang}
                                            src={
                                            `https://img.shields.io/badge/` +
                                            `${encodeURIComponent(lang)}-${color}` +
                                            `?style=for-the-badge&logo=${encodeURIComponent(lang)}&logoColor=white`
                                            }
                                            alt={lang}
                                            className="mx-1"
                                        />
                                        )
                                    })}
                                    </div>
                                    <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary mt-auto"
                                    > GitHub </a>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}