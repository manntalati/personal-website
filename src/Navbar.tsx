import './Navbar.css'
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaCaretDown } from 'react-icons/fa';
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
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
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
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchText('');
            onSearch('');
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
                    <HashLink smooth to="/#top" className="navbar-logo">
                        MANN
                    </HashLink>

                    <ul className="navbar-links">
                        <li><HashLink smooth to="/#top">Home</HashLink></li>
                        <li><HashLink smooth to="/#Experience">Experience</HashLink></li>
                        <li><HashLink smooth to="/#Projects">Projects</HashLink></li>
                        <li><HashLink smooth to="/#Technologies">Tech</HashLink></li>
                        <li><HashLink smooth to="/#Contact">Contact</HashLink></li>
                    </ul>
                </div>

                <div className="navbar-right">
                    <div className={`search-box ${isSearchOpen ? 'open' : ''}`}>
                        <FaSearch className="icon search-icon" onClick={handleSearchClick} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Titles, people, genres"
                            value={searchText}
                            onChange={handleSearchChange}
                            onBlur={handleBlur}
                            className="search-input"
                        />
                    </div>
                    <HashLink smooth to="/#Contact" className="icon-wrapper">
                        <FaBell className="icon" />
                    </HashLink>
                    <div className="profile-menu-container">
                        <div className="profile-menu">
                            <div className="profile-icon">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
                            </div>
                            <FaCaretDown className="icon caret" />
                        </div>
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-item">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Mann" />
                                <span>Mann</span>
                            </div>
                            <div className="profile-dropdown-item">
                                <div className="guest-icon"></div>
                                <span>Guest</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}