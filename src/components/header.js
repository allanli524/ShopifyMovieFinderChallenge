import { Navbar, Button } from 'react-bootstrap';
import {AppContext} from "../contextlib";
import {useContext} from "react"
import {useHistory} from "react-router-dom"
// import "./css/header.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    
    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(AppContext);

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand> Nominate Your Favourite Films </Navbar.Brand>
                {currentUser.email}
                {currentUser.email ? (
                    <p className="welcome1">Welcome {currentUser.email}!</p>
                ) : (null)}
                {
                    currentUser.email ? (
                    <Button className="logout"
                        onClick={() => {
                        setCurrentUser({email: null, nominations: [{}]})
                        history.push("/")
                    }}>
                    Logout
                    </Button>
                    ) : (null)
                }
                
            </Navbar>
        </div>
    )
}

export default Header