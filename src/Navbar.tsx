import './Navbar.css'
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { HashLink } from 'react-router-hash-link';

interface NavbarProps {
    onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchClick = () => {
        if (isSearchOpen && searchText) {
            // If search is open with text, close and clear
            setSearchText('');
            onSearch('');
            setIsSearchOpen(false);
        } else {
            setIsSearchOpen(!isSearchOpen);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };

    const handleBlur = () => {
        if (searchText === '') {
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <HashLink smooth to="/#top" className="navbar-logo serif-heading">
                        Mann Talati
                    </HashLink>
                </div>

                <ul className="navbar-links">
                    <li><HashLink smooth to="/#About">About</HashLink></li>
                    <li><HashLink smooth to="/#Experience">Experience</HashLink></li>
                    <li><HashLink smooth to="/#Projects">Projects</HashLink></li>
                    <li><HashLink smooth to="/#Technologies">Skills</HashLink></li>
                    <li><HashLink smooth to="/#Contact">Contact</HashLink></li>
                </ul>

                <div className="navbar-right">
                    <div className={`search-box ${isSearchOpen ? 'open' : ''}`}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearchChange}
                            onBlur={handleBlur}
                            className="search-input"
                        />
                        <button
                            className="search-btn"
                            onClick={handleSearchClick}
                            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                        >
                            {isSearchOpen ? <IoClose /> : <FaSearch />}
                        </button>
                    </div>

                    <HashLink smooth to="/#Contact" className="navbar-cta">
                        Get in Touch
                    </HashLink>
                </div>
            </div>
        </nav>
    );
}