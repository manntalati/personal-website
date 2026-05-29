export type Experience = {
    id: string;
    title: string;
    bullets: string[];
    urlLink: string;
    company: string;
    duration: string;
    themes: string[];
};

export type Project = {
    id: string;
    title: string;
    imageUrl: string;
    summary: string;
    githubUrl: string;
    year: string;
};

export type Paper = {
    id: string;
    title: string;
    summary: string;
    authors: string[];
    arxivUrl: string;
    year: string;
    tags: string[];
};

export const experiences: Experience[] = [
    {
        id: "oracle",
        title: "Software Engineer Intern",
        company: "Oracle",
        duration: "May 2026 - Present",
        bullets: [
            "Oracle Cloud Data Science Service - Model Building Team",
        ],
        urlLink: "https://www.oracle.com/",
        themes: ["Model Building", "Software Engineering", "Cloud Infrastructure"],
    },
    {
        id: "astral",
        title: "Research Assistant",
        company: "ASTRAL Lab (Assured Trustworthy AI Research Lab) @ UIUC",
        duration: "Jan 2026 - Present",
        bullets: [
            "Building dual-objective CoT monitorability benchmarks for ASTRAL Lab, based on OpenAI's work",
            "Curating datasets and benchmark specifications to test hidden-objective detection to effectively monitor monitorability",
        ],
        urlLink: "https://github.com/ASTRAL-Group",
        themes: ["LLM", "Chain of Thought", "Research"],
    },
    {
        id: "cube",
        title: "Chief Technology Officer",
        company: "CUBE Consulting",
        duration: "Sep 2024 - Present",
        bullets: [
            "Leading 4+ consultants to design AI-enabled workflows for Amazon AWS for educators, sales, and others",
            "Implemented Framer website redesign boosting engagement by 25%; built web-based 3D aircraft simulation",
        ],
        urlLink: "https://www.cubeconsulting.org/",
        themes: ["Strategy", "Leadership", "Analytics"],
    },
    {
        id: "uiuc-ca",
        title: "Course Assistant",
        company: "University of Illinois at Urbana-Champaign",
        duration: "Sep 2025 - May 2026",
        bullets: [
            "Mentor 8 students through the SDLC by standardizing Git workflows, pull requests, code reviews, and CI/CD pipelines",
            "Leading bi-weekly design/code reviews and implementing issue tracking and sprint cadences",
        ],
        urlLink: "https://www.cubeconsulting.org/",
        themes: ["Strategy", "Leadership", "Analytics"],
    },
    {
        id: "ameren",
        title: "Data Science Intern",
        company: "Ameren",
        duration: "Nov 2024 - Aug 2025",
        bullets: [
            "Implemented short-term electric load forecasting models to achieve ≤ 4% MAPE, projected to save $50,000+",
            "Hyperparameter-tuned neural forecasting models to enhance model accuracy by ≥ 1% with Ray Tune",
            "Developed a Jenkins CI/CD pipeline using Terraform to deploy code across several environments and productionize it",
        ],
        urlLink: "https://www.ameren.com/",
        themes: ["Forecasting", "ML", "Cloud"],
    },
    {
        id: "kane",
        title: "Data Science Intern",
        company: "Former Harvard Preceptor, David Kane",
        duration: "Jun 2023 - Aug 2023",
        bullets: [
            "Developed 10+ data science tutorials from R for Data Science (2e) in RStudio by collaborating with Harvard preceptor to enhance educational resources for students",
            "Drafted and contributed to fundamental chapters on statistical methods, predictive models, and mathematical expressions in the book (Preceptor's Primer) offered in Kane's Data Science Course to strengthen the course curriculum",
        ],
        urlLink: "https://ppbds.github.io/primer/",
        themes: ["Education", "Statistics", "Publishing"],
    },
];

export const projects: Project[] = [
    {
        id: "1",
        title: "Autonomous Driving",
        imageUrl: "/coming_soon.webp",
        summary: "A full autonomous driving perception pipeline built from scratch in PyTorch. Implements the core vision system that self-driving cars use to understand the world: object detection, instance segmentation, and more.",
        githubUrl: "https://github.com/manntalati/autonomous-driving",
        year: "Mar 2026 - Present",
    },
    {
        id: "5",
        title: "AI Recycling Assistant",
        imageUrl: "/recycling.webp",
        summary: "AI recycling assistant with custom CNN deployed on AWS SageMaker to classify waste materials with ≥ 70% accuracy.",
        githubUrl: "https://github.com/manntalati/ai_recycling_assistant",
        year: "Jun 2025 - Aug 2025",
    },
    {
        id: "6",
        title: "Resume Recommender",
        imageUrl: "/resume_recommender.webp",
        summary: "Tool to optimize resumes for job and internship applications.",
        githubUrl: "https://github.com/manntalati/resume-recommender",
        year: "Jul 2025",
    },
];

export const papers: Paper[] = [
    {
        id: "monitorbench",
        title: "MonitorBench: A Comprehensive Benchmark for Chain-of-Thought Monitorability in Large Language Models",
        summary: "Large language models (LLMs) can generate chains of thought (CoTs) that are not always causally responsible for their final outputs. When such a mismatch occurs, the CoT no longer faithfully reflects the actual reasons driving the model's behavior, leading to the reduced CoT monitorability problem. We propose MonitorBench, a systematic benchmark for evaluating CoT monitorability in LLMs — providing 1,514 test instances across 19 tasks spanning 7 categories, plus two stress-test settings to quantify the extent to which CoT monitorability can be degraded.",
        authors: ["Han Wang", "Yifan Sun", "Brian Ko", "Mann Talati", "Jiawen Gong", "Zimeng Li", "Naicheng Yu", "Xucheng Yu", "Wei Shen", "Vedant Jolly", "Huan Zhang"],
        arxivUrl: "https://arxiv.org/abs/2603.28590",
        year: "Mar 2026",
        tags: ["LLM", "Benchmark", "CoT"],
    },
];
