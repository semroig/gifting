import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "components/pure/logo";

export default function Navbar() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true)

    const handleSignOut = () => {
        setIsAuth(false)
        navigate("/", {replace: true})
    }

    return (
        <nav>
            <Link to="/"> <Logo /> </Link>

            {!isAuth
                ? (
                    <div>
                        <Link to="/signin">Sign in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                )
                : (
                    <div>
                        <Link to="/quiz/questions">New quiz</Link>
                        <Link to="/quiz/history">History</Link>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                )
            }
        </nav>
    )
}


