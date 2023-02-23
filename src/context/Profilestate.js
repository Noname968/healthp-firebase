import { useState, useEffect } from 'react';
import Profilecontext from './Profilecontext';
import { auth } from '../firebase';

function Profilestate(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        })
        return unsubscribe;
    }, [])

    return (
        <Profilecontext.Provider value={{user}}>
            {props.children}
        </Profilecontext.Provider>
    )
}

export default Profilestate
