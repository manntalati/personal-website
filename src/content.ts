import cityCoordinates from './cityCoordinates';

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

export type Photo = {
    id: string;
    src: string;          // local path under /public (e.g. "/photography/tokyo/01.webp") OR a full URL
    date: string;         // ISO date "YYYY-MM-DD" — used to sort & group photos day-by-day
    caption?: string;
    alt?: string;
    width?: number;       // optional intrinsic size (lets the grid reserve space / avoid layout shift)
    height?: number;
};

export type City = {
    id: string;
    name: string;
    country?: string;
    coordinates?: [number, number]; // optional override; usually auto-resolved from `name` via cityCoords()
    blurb?: string;
    photos: Photo[];
};

/**
 * Travel photography, grouped by city.
 *
 * HOW TO ADD A PHOTO
 *   1. Drop the original image in `photos/<city-id>/` (any format), then run `npm run optimize:photos`
 *      (this also runs on `npm run dev` / `npm run build`). It writes a web-sized .webp to
 *      `public/photography/<city-id>/` — reference THAT path in `src`. A full external URL also works.
 *   2. Add a `{ id, src, date, caption }` line to that city's `photos` array:
 *        - id:      any unique string,         e.g. "chicago-2"
 *        - src:     "/photography/chicago/02.webp"   OR   "https://…"
 *        - date:    "YYYY-MM-DD"  ← drives day-by-day sorting/grouping (newest day shown first)
 *        - caption: optional — shown on hover and in the photo viewer (omit or "" for none)
 *      Listing order doesn't matter; photos are auto-sorted by `date`.
 *   3. New city? Add a City with a unique `id` and `name`. Its map pin is placed automatically by
 *      looking the `name` up in `cityCoordinates.ts` (e.g. "San Francisco" → its lng/lat). Only if a
 *      place isn't in that list, add `coordinates: [longitude, latitude]` to override.
 */
export const cities: City[] = [
    {
        id: "chicago",
        name: "Chicago",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "chicago-1", src: "/photography/chicago/01.webp", date: "2026-02-04", caption: "Chicago Downtown" },
        ],
    },
    {
        id: "sf",
        name: "San Francisco",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "sf-1", src: "/photography/sf/IMG_5682.webp", date: "2026-06-27", caption: "Ghirardelli Square" },
            { id: "sf-2", src: "/photography/sf/IMG_5664.webp", date: "2026-06-27", caption: "Alcatraz Island" },
            { id: "sf-3", src: "/photography/sf/IMG_5654.webp", date: "2026-06-27", caption: "Pier 39" },
        ],
    },
    {
        id: "punta",
        name: "Punta Cana",
        country: "Dominican Republic",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "punta-1", src: "/photography/punta/IMG_5603.webp", date: "2024-11-24", caption: "Beach" },
        ],
    },
    {
        id: "monterey",
        name: "Monterey",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "monterey-1", src: "/photography/monterey/IMG_5713.webp", date: "2026-07-03", caption: "Fisherman's Wharf" },
        ],
    },
    {
        id: "carmel",
        name: "Carmel",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "carmel-1", src: "/photography/carmel/IMG_5741.webp", date: "2026-07-04", caption: "Fisherman's Wharf" },
            { id: "carmel-2", src: "/photography/carmel/IMG_6139.webp", date: "2026-07-05", caption: "Garrapata State Park" },
            { id: "carmel-3", src: "/photography/carmel/IMG_6145.webp", date: "2026-07-05", caption: "Garrapata State Park" },
            { id: "carmel-4", src: "/photography/carmel/IMG_6149.webp", date: "2026-07-05", caption: "Garrapata State Park" },
        ],
    },
    {
        id: "bigsur",
        name: "Big Sur",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "bigsur-1", src: "/photography/bigsur/IMG_6193.webp", date: "2026-07-04", caption: "Bixby Bridge" },
            { id: "bigsur-2", src: "/photography/bigsur/IMG_6197.webp", date: "2026-07-04", caption: "Bixby Bridge" },
            { id: "bigsur-3", src: "/photography/bigsur/IMG_6243.webp", date: "2026-07-04", caption: "Pfeiffer Beach" },
            { id: "bigsur-4", src: "/photography/bigsur/IMG_6282.webp", date: "2026-07-04", caption: "Pfeiffer Beach" },
            { id: "bigsur-5", src: "/photography/bigsur/image.png", date: "2026-07-04", caption: "Pfeiffer Beach" },
        ],
    },
    {
        id: "seaside",
        name: "Seaside",
        country: "United States",
        photos: [
            // Edit `date` (YYYY-MM-DD) and `caption` below; add more photos as new lines.
            { id: "seaside-1", src: "/photography/seaside/IMG_6437.webp", date: "2026-07-05", caption: "Point Lobos" },
            { id: "seaside-2", src: "/photography/seaside/IMG_6562.webp", date: "2026-07-05", caption: "Point Lobos" },
            { id: "seaside-3", src: "/photography/seaside/IMG_6569.webp", date: "2026-07-05", caption: "Point Lobos" },
        ],
    },
]

/**
 * Resolve a city's map position: the inline `coordinates` override if present, otherwise a lookup
 * by name in `cityCoordinates` (see cityCoordinates.ts). Returns null if the name isn't found —
 * in that case add it to cityCoordinates.ts or set `coordinates` inline on the city.
 */
export function cityCoords(city: City): [number, number] | null {
    if (city.coordinates) return city.coordinates;
    const key = city.name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return cityCoordinates[key] ?? null;
}
