import React from 'react';
import { Button } from "react-bootstrap";
import {useHistory} from "react-router-dom";

import './css/home.css';


const Home = () => {
    const history = useHistory()
    return (
        <div className="cont">
            <h1 className="title1">Welcome to Movie Nominator</h1>
            <p className="text1">This web app uses the OMDB API to help you compile a list of films for nomination </p>
            <p className="text1">If you've been here before and have saved your progress with us, press the login button. Or else, get started.</p>
            <div className="cont2">
                <Button  onClick={()=>{history.push("/app")}}> Get Started </Button>
                <Button  onClick={()=>{history.push("/login")}}> Login </Button>
            </div>
        </div>
    )
}

export default Home;