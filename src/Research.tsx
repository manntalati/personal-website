import './Research.css';
import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { papers, type Paper } from './content';

interface ResearchProps {
    searchQuery?: string;
}

export default function Research({ searchQuery = '' }: ResearchProps) {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<{ id: string }>).detail;
            const paper = papers.find(p => p.id === detail.id);
            if (!paper) return;
            const section = document.getElementById('Research');
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => setSelectedPaper(paper), 400);
        };
        window.addEventListener('cmdk:open-paper', handler);
        return () => window.removeEventListener('cmdk:open-paper', handler);
    }, []);

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
                <div className="research-modal-backdrop" onClick={() => setSelectedPaper(null)}>
                    <div className="research-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="research-modal-close" onClick={() => setSelectedPaper(null)}>×</button>

                        <div className="research-modal-meta-row">
                            <span className="research-modal-year">{selectedPaper.year}</span>
                            <div className="research-modal-tags">
                                {selectedPaper.tags.map((tag) => (
                                    <span key={tag} className="project-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <h2 className="research-modal-title">{selectedPaper.title}</h2>

                        <p className="research-modal-label">Abstract</p>
                        <p className="research-modal-abstract">{selectedPaper.summary}</p>

                        <p className="research-modal-label">Authors</p>
                        <p className="research-modal-authors">
                            {selectedPaper.authors.map((a, i) => (
                                <span key={i} className={a === 'Mann Talati' ? 'author-highlight' : ''}>
                                    {a}{i < selectedPaper.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>

                        <a
                            href={selectedPaper.arxivUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="research-modal-btn"
                        >
                            <FiExternalLink /> View on arXiv
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
