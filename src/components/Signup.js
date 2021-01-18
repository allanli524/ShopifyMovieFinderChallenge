import React, { useState, useContext } from 'react';
import {useHistory} from "react-router-dom";
import {AppContext} from "../contextlib";
import {InputGroup, Button, FormControl} from "react-bootstrap";
import {Box} from "@material-ui/core";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ usernameError, setUsernameError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")

    const history = useHistory()

    const { setCurrentUser, currentUser } = useContext(AppContext);

    const checkCompletion = () => {
        let status = true
        if(!username){
            setUsernameError("*Please enter your username")
            status = false
        }
        if(!password){
            setPasswordError("*Please enter your password")
            status = false
        }else if(password.length < 8){
            setPasswordError("*Password must be over 8 characters long")
            status = false
        }
        return status
    }

    const checkDuplicate = async () => {
        let status = true
        await axios.post('https://moviefindershopifyapi.herokuapp.com/users/find', { username: username}).then((res) => {
            console.log(res.data)
            if(res.data){
                alert("This username has already been taken")
                status = false
            }
        }).catch((err) => {console.log(err)})
        return status
    }

    const userSignup = () => {
        if(checkCompletion()){
            let status = checkDuplicate()
            console.log(status)
            if(status){
                axios.post('https://moviefindershopifyapi.herokuapp.com/users/add', { username: username, password: password, nominated: currentUser.nominations}).then(
                    (res) => {
                        console.log(res)
                        alert("You are signed up and your nomination list has been stored!")
                        setCurrentUser({ username: username, nominations: currentUser.nominations})
                        history.push("/app")
                    }
                ).catch((err) => { console.log(err) })
            }
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
                            placeholder="Username"
                            onChange={e => setPassword(e.target.value)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </Box>
                </div>
                <Box mt={5} width={1} className="submit">
                    <Button 
                        onClick={() => {userSignup()}}
                        className="btn"
                        >
                            Sign-up and save nominations
                    </Button>
                </Box>
            </InputGroup>
        </div>
    )
}
export default SignUp;