import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserContext, { User } from "../context/user";

export const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cleanup = onAuthStateChanged(auth, (user) => {

            if (user !== null) {
                setUser(user as User);
                setLoggedIn(!!user);
            } else {
                setUser(null);
                setLoggedIn(false);
            }
            if (loggedIn) {
                navigate('/dashboard');
            } else {
                navigate('/login')
            }
        });

        return cleanup;
    }, [loggedIn]);

    return (
        <UserContext.Provider value={user}>
            <Outlet />
        </UserContext.Provider>
    )
}