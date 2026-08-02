import { Link } from "react-router-dom";

import { platformLinks } from "./navbarData";

import "./DesktopNav.css";

function DesktopNav() {

    return (

        <nav className="nav-links">

            {platformLinks.map((item) => (

                <Link
                    key={item.to}
                    to={item.to}
                    className="nav-link"
                >

                    {item.title}

                </Link>

            ))}

        </nav>

    );

}

export default DesktopNav;