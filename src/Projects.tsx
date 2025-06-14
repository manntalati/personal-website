import "bootstrap/dist/css/bootstrap.min.css";
import './Projects.css';

export default function Projects() {
    type Project = {
        id: string;
        title: string;
        imageUrl: string;
        summary: string;
        githubUrl: string;
        year: string;
    };

    const projects: Project[] = [
    {
        id: "1",
        title: "AI Recycling Assistant",
        imageUrl: "/recycling.HEIC",
        summary: "Developing an AI recycling assistant featuring a custom CNN and deployment on AWS SageMaker to classify waste materials with ≥ 70% target accuracy",
        githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
        year: "June 2025-Present",
    },
    {
        id: "2",
        title: "UIUC Lifestyle",
        imageUrl: "/uiuc.png",
        summary: "Developing full-stack platform delivering ideal campus lifestyle: study spots, transit, deals",
        githubUrl: "https://github.com/manntalati/uiuc-lifestyle",
        year: "May 2025-Present",
    },
    {
        id: "3",
        title: "Drainiacs",
        imageUrl: "/lidar.jpg",
        summary: "Constructed a solution to detect drain blockages with the LIDAR technology to alert the Stormwater Management Department",
        githubUrl: "https://github.com/manntalati/drainiacs_machine_learning",
        year: "Sep 2020-Nov 2021",
    },
    ];

    return (
        <>
            <div className="project">
                <p className="heading">Projects</p>
                <div className="container py-4">
                    <div className="row g-4">
                        {projects.map((p) => (
                        <div key={p.id} className="col-sm-6 col-md-4">
                            <div className="card h-100">
                                <img
                                    src={p.imageUrl}
                                    className="card-img-top"
                                    alt={p.title}
                                    style={{ height: 160, objectFit: "cover" }}/>
                                <div className="card-body d-flex flex-column">
                                    <div className="year">
                                    <h5 className="card-title">{p.title}</h5>
                                    <h6>{p.year}</h6>
                                    </div>
                                        <p className="card-text flex-grow-1">{p.summary}</p>
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
                <div className="tech">
                    <p className="heading">Tech Stack: </p>
                        <div className="stack">
                            <a href="https://www.python.org" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="50" height="50"/> 
                            </a>
                            <a href="https://cplusplus.com/" target="_blank" rel="noreferrer">
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="c++" width="50" height="50"/>
                            </a>
                            <a href="https://www.java.com" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="50" height="50"/> 
                            </a>
                            <a href="https://www.r-project.org/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg" alt="r" width="50" height="50"/> 
                            </a> 
                            <a href="hhttps://www.typescriptlang.org/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/> 
                            </a>  
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/> 
                            </a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="html5" width="50" height="50"/> 
                            </a> 
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="css" width="50" height="50"/> 
                            </a>
                            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="50" height="50"/> 
                            </a> 
                            <a href="https://pandas.pydata.org/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" alt="pandas" width="50" height="50"/> 
                            </a>
                            <a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" alt="tensorflow" width="50" height="50"/> 
                            </a>
                            <a href="https://numpy.org/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" alt="numpy" width="50" height="50"/> 
                            </a>
                            <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> 
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" alt="git" width="50" height="50"/> 
                            </a>
                        </div>
                </div>
            </div>  
        </>
    )
}