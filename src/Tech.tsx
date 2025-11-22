import './Tech.css'

export default function Tech() {
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

    return (
        <section id="Technologies" className="tech-section">
            <h2 className="section-title">Technologies & Genres</h2>

            <div className="tech-genres">
                {techStack.map((genre, idx) => (
                    <div key={idx} className="genre-row">
                        <h3 className="genre-title">{genre.category}</h3>
                        <div className="genre-list">
                            {genre.items.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="tech-item"
                                    title={item.name}
                                >
                                    <div className="tech-icon-wrapper">
                                        <img src={item.icon} alt={item.name} className="tech-icon" />
                                    </div>
                                    <span className="tech-name">{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}