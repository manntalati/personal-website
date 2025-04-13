import './Navbar.css'
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";


function Navbar() {

    const linkedinLink = () => {
        window.open("https://www.linkedin.com/in/mann-talati-017gvffgh")
    }

    const githubLink = () => {
        window.open("https://github.com/manntalati")
    }

    const emailLink = () => {
        window.open("mailto: mann.talati@gmail.com")
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <ul className="list">
                        <li className="navbar-item">
                            <FaLinkedin className="navbar-image"
                            onClick={linkedinLink}
                            size={30}
                            />
                        </li>
                        <li className="navbar-item">
                            <FaGithub className="navbar-image"
                            onClick={githubLink}
                            size={30}
                            />
                        </li>
                        <li className="navbar-item">
                            <MdOutlineEmail className="navbar-image"
                                onClick={emailLink}
                                size={30}
                                
                            />
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <ul className="list">
                        <li className="navbar-item">
                            <Link className="link" to={"./about"}> About </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="link" to={"./projects"}> Projects </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="link" to={"./resume"}> Resume </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;