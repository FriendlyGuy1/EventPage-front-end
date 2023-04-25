
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
                    <li>
                            {/* remember to change it later */}
                        <Link to="/login&register">register</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar