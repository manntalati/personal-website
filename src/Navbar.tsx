import './Navbar.css'
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <>
            <div className="navbar">
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
        </>
    )
}

export default Navbar;