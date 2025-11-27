import './Tech.css'
import Top10Row from './components/Top10Row';
import Row from './components/Row';
import MovieCard from './components/MovieCard';

interface TechProps {
    searchQuery?: string;
}

export default function Tech({ searchQuery = '' }: TechProps) {
    const techStack = [
        {
            category: "Languages",
            items: [
                { name: "Python", url: "https://www.python.org", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
                { name: "C++", url: "https://cplusplus.com/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
                { name: "Java", url: "https://www.java.com", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
                { name: "R", url: "https://www.r-project.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg" },
                { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
                { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
                { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
            ]
        },
        {
            category: "Frameworks & Libraries",
            items: [
                { name: "React", url: "https://reactjs.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" },
                { name: "Pandas", url: "https://pandas.pydata.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" },
                { name: "TensorFlow", url: "https://www.tensorflow.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
                { name: "NumPy", url: "https://numpy.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
                { name: "OpenCV", url: "https://opencv.org/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg" },
                { name: "Apache Spark", url: "https://spark.apache.org/docs/latest/api/python/index.html", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original-wordmark.svg" },
            ]
        },
        {
            category: "Tools & Cloud",
            items: [
                { name: "AWS", url: "https://aws.amazon.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                { name: "Git", url: "https://git-scm.com/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
                { name: "Terraform", url: "https://developer.hashicorp.com/terraform", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg" },
                { name: "Jenkins", url: "https://www.jenkins.io/", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg" },
            ]
        }
    ];

    // Create a Top 10 list from all items
    const top10Items = [
        ...techStack[0].items.slice(0, 4),
        ...techStack[1].items.slice(0, 4),
        ...techStack[2].items.slice(0, 2)
    ].map((item, index) => ({
        id: index,
        title: item.name,
        image: item.icon // Using icon as image for now, might need better images
    }));

    const filteredTechStack = techStack.map(genre => ({
        ...genre,
        items: genre.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            genre.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(genre => genre.items.length > 0);

    if (filteredTechStack.length === 0 && searchQuery) return null;

    return (
        <section id="Technologies" className="tech-section">
            {!searchQuery && <Top10Row title="Top 10 Technologies Today" items={top10Items} />}

            {filteredTechStack.map((genre, idx) => (
                <Row key={idx} title={genre.category}>
                    {genre.items.map((item, i) => (
                        <MovieCard
                            key={i}
                            title={item.name}
                            image={item.icon}
                            description="Tech Stack"
                            match={95}
                            duration="Tool"
                            isLarge={false}
                            onClick={() => window.open(item.url, '_blank')}
                            className="tech-card"
                        />
                    ))}
                </Row>
            ))}
        </section>
    )
}