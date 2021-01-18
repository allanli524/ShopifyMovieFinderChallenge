import React from 'react';
import { Button } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';


const Home = () => {
    const history = useHistory()
    return (
        <div className="cont">
            <h1>Welcome to Movie Nominator</h1>
            <div className="cont2">
                <Button onClick={()=>{history.push("/app")}}> Get Started </Button>
                <Button onClick={()=>{history.push("/login")}}> Login </Button>
            </div>
        </div>
    )
}

export default Home;