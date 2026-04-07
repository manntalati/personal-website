import './Research.css';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface ResearchProps {
    searchQuery?: string;
}

type Paper = {
    id: string;
    title: string;
    summary: string;
    authors: string[];
    arxivUrl: string;
    year: string;
    tags: string[];
};

const papers: Paper[] = [
    {
        id: "1",
        title: "MonitorBench: A Comprehensive Benchmark for Chain-of-Thought Monitorability in Large Language Models",
        summary: "Large language models (LLMs) can generate chains of thought (CoTs) that are not always causally responsible for their final outputs. When such a mismatch occurs, the CoT no longer faithfully reflects the actual reasons driving the model's behavior, leading to the reduced CoT monitorability problem. We propose MonitorBench, a systematic benchmark for evaluating CoT monitorability in LLMs — providing 1,514 test instances across 19 tasks spanning 7 categories, plus two stress-test settings to quantify the extent to which CoT monitorability can be degraded.",
        authors: ["Han Wang", "Yifan Sun", "Brian Ko", "Mann Talati", "Jiawen Gong", "Zimeng Li", "Naicheng Yu", "Xucheng Yu", "Wei Shen", "Vedant Jolly", "Huan Zhang"],
        arxivUrl: "https://arxiv.org/abs/2603.28590",
        year: "Mar 2026",
        tags: ["LLM", "Benchmark", "CoT"],
    },
];

export default function Research({ searchQuery = '' }: ResearchProps) {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

    const filteredPapers = papers.filter(p => {
        const query = searchQuery.toLowerCase();
        return (
            p.title.toLowerCase().includes(query) ||
            p.summary.toLowerCase().includes(query) ||
            p.tags.some(tag => tag.toLowerCase().includes(query)) ||
            p.authors.some(a => a.toLowerCase().includes(query))
        );
    });

    if (filteredPapers.length === 0) return null;

    return (
        <section id="Research" className="research-section">
            <div className="research-container">
                <div className="research-header">
                    <span className="section-label">Publications</span>
                    <h2 className="section-heading">Research</h2>
                </div>

                <div className="research-list">
                    {filteredPapers.map((paper) => (
                        <div
                            key={paper.id}
                            className="research-item"
                            onClick={() => setSelectedPaper(paper)}
                        >
                            <span className="research-year">{paper.year.split(' ').pop()}</span>

                            <div className="research-info">
                                <h3 className="research-title">{paper.title}</h3>
                                <p className="research-authors">
                                    {paper.authors.map((a, i) => (
                                        <span key={i} className={a === 'Mann Talati' ? 'author-highlight' : ''}>
                                            {a}{i < paper.authors.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="research-tags">
                                {paper.tags.map((tag) => (
                                    <span key={tag} className="project-tag">{tag}</span>
                                ))}
                            </div>

                            <span className="project-arrow">→</span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPaper && (
                <div className="project-modal-overlay" onClick={() => setSelectedPaper(null)}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedPaper(null)}>×</button>

                        <div className="modal-header">
                            <h2 className="modal-title">{selectedPaper.title}</h2>
                        </div>

                        <div className="modal-body research-modal-body">
                            <div className="modal-main">
                                <p className="research-modal-label">Abstract</p>
                                <p className="modal-description">{selectedPaper.summary}</p>

                                <p className="research-modal-label" style={{ marginTop: '2rem' }}>Authors</p>
                                <p className="modal-description">
                                    {selectedPaper.authors.map((a, i) => (
                                        <span key={i} className={a === 'Mann Talati' ? 'author-highlight' : ''}>
                                            {a}{i < selectedPaper.authors.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="modal-meta">
                                <a
                                    href={selectedPaper.arxivUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="modal-btn"
                                >
                                    <FiExternalLink /> View on arXiv →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
