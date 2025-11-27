import './MovieCard.css';

interface MovieCardProps {
    title: string;
    image?: string;
    description?: string; // Keep for potential future use
    tags?: string[]; // Keep for potential future use
    match?: number; // Keep for potential future use
    duration?: string; // Keep for potential future use
    isLarge?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function MovieCard({
    title,
    image,
    isLarge = false,
    onClick,
    className = ''
}: MovieCardProps) {
    return (
        <div
            className={`movie-card ${isLarge ? 'large' : ''} ${className}`}
            onClick={onClick}
        >
            <img
                src={image}
                alt={title}
                className={`card-image ${isLarge ? 'large' : ''}`}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x170?text=Project';
                }}
            />
            <div className="card-title-overlay">
                {title}
            </div>
        </div>
    );
}
