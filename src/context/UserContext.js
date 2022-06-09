import React from 'react'

var UserStateContext = React.createContext()
var UserDispatchContext = React.createContext()

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true }
        case 'SIGN_OUT_SUCCESS':
            return { ...state, isAuthenticated: false }
        case 'WALLET': {
            return { ...state, wallet: action.value }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function UserProvider({ children }) {
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem('id_token'),
        wallet: null,
    })

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

function useUserState() {
    var context = React.useContext(UserStateContext)
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider')
    }
    return context
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext)
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider')
    }
    return context
}

export {
    UserProvider,
    useUserState,
    useUserDispatch,
    loginUser,
    signOut,
    setWallet,
    loginOnlyView,
}

// ###########################################################

function loginUser(dispatch, account, history, setIsLoading, setError) {
    setError(false)
    setIsLoading(true)

    if (!!account) {
        setTimeout(() => {
            localStorage.setItem('id_token', 1)
            localStorage.setItem('account', account)
            localStorage.setItem('theme', 'dark')

            setError(null)
            setIsLoading(false)
            dispatch({ type: 'LOGIN_SUCCESS' })

            history.push('/app/ViralNews')
        }, 1000)
    } else {
        dispatch({ type: 'LOGIN_FAILURE' })
        setError(true)
        setIsLoading(false)
        history.push('/login')
    }
}

function loginOnlyView(history) {
    history.push('/app/ViralNews');
}

function signOut(dispatch, history) {
    localStorage.removeItem('id_token')
    localStorage.removeItem('account')

    dispatch({ type: 'SIGN_OUT_SUCCESS' })
    history.push('/login')
}

function setWallet(dispatch, value) {
    dispatch({ type: 'WALLET', value })
}
