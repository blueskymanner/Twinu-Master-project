import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Close as CloseIcon } from '@material-ui/icons'
import useStyles from './styles'
// components
import Layout from './Layout'
import Documentation from './Documentation/Documentation'

// pages
import Error from '../pages/error'
import Login from '../pages/login'

// context
import { useUserState } from '../context/UserContext'

function App() {
    // global
    var { isAuthenticated } = useUserState()
    // const isAuth = isAuthenticated()
    const classes = useStyles()
    function CloseButton({ closeToast, className }) {
        return <CloseIcon className={className} onClick={closeToast} />
    }

    return (
        <>
            <ToastContainer
                className={classes.toastsContainer}
                closeButton={
                    <CloseButton className={classes.notificationCloseButton} />
                }
                closeOnClick={false}
                progressClassName={classes.notificationProgress}
            />
            <HashRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/login" />}
                    />
                    {/* <Route exact path="/" render={() => <Redirect to="/app/profile" />} /> */}

                    <Route
                        exact
                        path="/app"
                        render={() => <Redirect to="/app/portfolio" />}
                        // render={() => <Redirect to="/app/profile" />}
                    />
                    <Route path="/documentation" component={Documentation} />
                    <PrivateRoute path="/app" component={Layout} />
                    <Route path="/login" component={Login} />

                    <Route component={Error} />
                </Switch>
            </HashRouter>
        </>
    )

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={
                    props =>
                        //    isAuthenticated ? (
                        React.createElement(component, props)
                    /*   ) : (
                        <Redirect to={'/login'} />
                    ) */
                }
            />
        )
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        )
    }
}

export default App
