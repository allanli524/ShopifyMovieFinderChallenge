import {useState} from "react"
import {AppContext} from "./contextlib"
import App from "./App"

const Context = () => {

    const [currentUser, setCurrentUser] = useState({ username: null, nominations: []})

    return (
        <AppContext.Provider value={{currentUser, setCurrentUser}}>
            <App/>
        </AppContext.Provider>
    )
}

export default Context;