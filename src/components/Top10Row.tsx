import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Row.css'; // Reuse Row styles
import './Top10Row.css';

interface Top10Item {
    id: string | number;
    image: string;
    title: string;
}

interface Top10RowProps {
    title: string;
    items: Top10Item[];
}

export default function Top10Row({ title, items }: Top10RowProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: 'left' | 'right') => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="row top-10-row">
            <h2 className="row-title">{title}</h2>
            <div className="row-container">
                <FaChevronLeft
                    className={`slider-arrow left ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div className="row-posters top-10-posters" ref={rowRef}>
                    {items.map((item, index) => (
                        <div key={item.id} className="top-10-card">
                            <div className="rank-number">
                                <svg width="100%" height="100%" viewBox="0 0 70 150" className="rank-svg">
                                    <text
                                        x="50%"
                                        y="100%"
                                        textAnchor="middle"
                                        className="rank-text"
                                    >
                                        {index + 1}
                                    </text>
                                </svg>
                            </div>
                            <img src={item.image} alt={item.title} className="top-10-image" />
                        </div>
                    ))}
                </div>
                <FaChevronRight
                    className="slider-arrow right"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
}
