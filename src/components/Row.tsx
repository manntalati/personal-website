import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Row.css';

interface RowProps {
    title: string;
    children: React.ReactNode;
}

export default function Row({ title, children }: RowProps) {
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
        <div className="row">
            <h2 className="row-title">{title}</h2>
            <div className="row-container">
                <FaChevronLeft
                    className={`slider-arrow left ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div className="row-posters" ref={rowRef}>
                    {children}
                </div>
                <FaChevronRight
                    className="slider-arrow right"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
}
