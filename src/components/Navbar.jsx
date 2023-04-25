
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/renginiai">Renginiai</Link>
                    </li>
                    <li>
                        <Link to="/vietos">Vietos</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar