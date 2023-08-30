import { useContext, createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    saveUerInfo: () => { },
    getUerInfo: () => { },
    user: {},
    signOut: () => { }
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        console.log('change isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        console.log('change user', user);
    }, [user]);

    function saveUerInfo(userToSave) {
        console.log('entro save', userToSave);
        setIsAuthenticated(true);
        setUser(userToSave);
    }

    function getUerInfo() {
        return user;
    }

    function signOut() {
        setIsAuthenticated(false)
        setUser()
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            saveUerInfo,
            getUerInfo,
            user,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);