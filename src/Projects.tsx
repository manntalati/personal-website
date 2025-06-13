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
        imageUrl: "public/recycling.HEIC",
        summary: "Developing an AI recycling assistant featuring a custom CNN and deployment on AWS SageMaker to classify waste materials with ≥ 70% target accuracy",
        githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
        year: "June 2025-Present",
    },
    {
        id: "2",
        title: "UIUC Lifestyle",
        imageUrl: "public/uiuc.png",
        summary: "Developing full-stack platform delivering ideal campus lifestyle: study spots, transit, deals",
        githubUrl: "https://github.com/manntalati/uiuc-lifestyle",
        year: "May 2025-Present",
    },
    {
        id: "3",
        title: "Drainiacs",
        imageUrl: "public/lidar.jpg",
        summary: "Constructed a solution to detect drain blockages with the LIDAR technology to alert the Stormwater Management Department",
        githubUrl: "https://github.com/manntalati/drainiacs_machine_learning",
        year: "Sep 2020-Nov 2021",
    },
    ];

    return (
        <>
            <div>
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
            </div>  
        </>
    )
}