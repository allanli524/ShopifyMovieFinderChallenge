import React, { useState, useContext } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import { InputGroup, Button } from 'reactstrap';
import { Navbar} from 'react-bootstrap';
import {AppContext} from "../contextlib";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/homepage.css';

const HomePage = () => {

    const history = useHistory()
    const { currentUser, setCurrentUser } = useContext(AppContext);
    
    const [ movie, setMovie ] = useState("")
    const [ results, setResults ] = useState([])
    const [ searchState, setSearchState ] = useState(false)
    const [ nominated, setNominated ] = useState(currentUser.nominations)
    const [ notFound, setNotFound ] = useState(false)

    const searchMovie = (movie) => {
        console.log(movie)
        axios.get(`http://www.omdbapi.com/?s=${movie}&apikey=d959d59b`).then((res) => {
            if(res.data.Search){
                setResults(res.data.Search)
                console.log(res.data.Search)
                setNotFound(false)
            }else{
                setNotFound(true)
            }
            setSearchState(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const checkNominated = (movie) => {
        for(let i = 0; i<nominated.length; i++){
            if(nominated[i] === movie){
                return false
            }
        }
        return true
    }

    const nominate = (movie) => {
        if(checkNominated(movie)){
            setNominated([...nominated, movie])
        }else{
            alert("This movie has already been nominated!")
        }
    }

    const remove = (movie) => {
        let arr = [...nominated]
        let index = arr.indexOf(movie)
        if (index !== -1) {
            arr.splice(index, 1);
            setNominated(arr);
          }
    }

    const auth = () => {
        if(!currentUser.username){
            if(nominated.length === 0){
                alert("You haven't nominated anything yet, try to find something you like!")
            }else{
                setCurrentUser({ username: null, nominations: nominated})
                history.push('/signup')
            }
        } else {
            axios.post('https://moviefindershopifyapi.herokuapp.com/users/update', { username: currentUser.username, nominations: nominated}).then(
                (res) => {
                    console.log(res)
                    alert("Your nomination list has been stored!")
                    setCurrentUser({ username: currentUser.username, nominations: nominated})
                    history.push('/')
                }
            ).catch((err) => { console.log(err) })
        }
    }

    return (
        <div className="cont1">
            <div className="navbarrr">
            <Navbar bg="light">
                <Navbar.Brand> Nominate Your Favourite Films </Navbar.Brand>
                {currentUser.username &&
                    <div>
                        <p className="welcome1">Welcome {currentUser.username}!</p>
                        <Button className="logout"
                            onClick={() => {
                            setCurrentUser({email: null, nominations: [{}]})
                            history.push("/")
                        }}>
                        Logout
                        </Button>
                    </div>
                }
            </Navbar>
            </div>
            <div>
                <InputGroup className="mb-3">
                    <input
                    placeholder="Movie Name"
                    value={movie}
                    onChange={e => { 
                        setMovie(e.target.value)
                        setSearchState(false)
                    }}
                />
                <Button variant="outline-secondary" onClick={() => {searchMovie(movie)}}>Search</Button>
                </InputGroup>
            </div>
            <div className="navbar2">
                <div>
                    <h1>Search results for: {searchState && movie}</h1>
                    { notFound && <h2>No results found ...</h2>}
                    <ul>
                    {
                        searchState && results.map( (movie) =>  (
                            <div key={movie.imdbID}>
                                <li>{movie.Title}</li>
                                <Button onClick={() => {nominate(movie)}}>Nominate</Button>
                            </div>
                        ))
                    }
                    </ul>
                </div>
                <div>
                    <div>
                        <h1>Nominated Films</h1>
                        <ul>
                            {
                                nominated.map( (movie) =>  (
                                    <div key={movie.imdbID}>
                                        <li>{movie.Title}</li>
                                        <Button onClick={() => {remove(movie)}}>Remove</Button>
                                    </div>
                                ))
                            } 
                        </ul>
                    </div>
                    <div>
                        <Button onClick={() => {auth()}}>Save Nomination List</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;