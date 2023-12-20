import {createContext } from 'react'

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true
});

export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState(null);
}