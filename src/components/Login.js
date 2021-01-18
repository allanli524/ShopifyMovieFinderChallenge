import React, { useState, useContext } from 'react';
import {useHistory} from "react-router-dom"
import {AppContext} from "../contextlib";
import {InputGroup, Button, FormControl} from "react-bootstrap";
import {Box} from "@material-ui/core";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ usernameError, setUsernameError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")

    const history = useHistory()

    const { setCurrentUser } = useContext(AppContext);

    const checkCompletion = () => {
        let status = true
        if(!username){
            setUsernameError("*Please enter your username")
            status = false
        }
        if(!password){
            setPasswordError("*Please enter your password")
            status = false
        }
        return status
    }

    const checkAuth = () => {
        axios.post('https://moviefindershopifyapi.herokuapp.com/users/find', { username: username}).then((res) => {
            if(res.data){
               if(res.data.password === password){
                    setCurrentUser({ username: res.data.username, nominations: res.data.nominated})
                    alert("Welcome back")
                    history.push("/app")
                } else{
                    alert("password is incorrect")
                }
            }else{
                alert("Username not found")
            }
            
        }).catch((err) => {console.log(err)})
    }

    const userLogin = () => {
        if(checkCompletion()){
            checkAuth()
        }
    }

    return (
        <div>
            <h1 className="title-name">Create a Profile</h1>
            <InputGroup className="input-form">
                <div className="device-id">
                    <Box mt={5} width={1}>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {usernameError}
                        </div>
                        <FormControl
                            value={username} 
                            placeholder="Your Username"
                            onChange={e => setUsername(e.target.value)}
                            aria-label="username"
                            aria-describedby="basic-addon1"
                        />
                    </Box>
                </div>
                <div className="username">
                    <Box mt={5} width={1}>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {passwordError}
                        </div>
                        <FormControl
                            value={password} 
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </Box>
                </div>
                <Box mt={5} width={1} className="submit">
                    <Button 
                        onClick={() => {userLogin()}}
                        className="btn"
                        >
                            Login
                    </Button>
                </Box>
            </InputGroup>
        </div>
    )
}
export default Login;