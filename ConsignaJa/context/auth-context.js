import React, { createContext, useState, useEffect } from "react";
import userData from "../data/person.json"; // Import the person.json data

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        token: null,
        email: null,
        name: null,
        role: null,
        isAuthenticated: false
    });

    useEffect(() => {
        // Check if there is a previously authenticated user in person.json
        const checkAuth = () => {
            try {
                // Set user state to the first user object in person.json
                const foundUser = userData.find(user => user.email === "Teste"); // Adjust the condition based on your JSON structure
                if (foundUser) {
                    setUser(foundUser);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        checkAuth();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    async function signIn(email, password) {
        // Your signIn logic here
        const foundUser = userData.find(user => user.email === email && user.password === password); // Adjust the condition based on your JSON structure
        if (foundUser) {
            setUser({ ...foundUser, isAuthenticated: true }); // Set isAuthenticated to true when setting the user
        } else {
            alert("usuário e senha errados!");
        }
    }

    function isLogged() {
        return user.isAuthenticated;
    }

    async function logout() {
        setUser({
            id: null,
            token: null,
            email: null,
            name: null,
            role: null,
            isAuthenticated: false
        });
    }

    return (
        <AuthContext.Provider value={{ signIn, isLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
