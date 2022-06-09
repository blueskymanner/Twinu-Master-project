import React, { useState, useEffect, useRef } from 'react'
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
} from '@material-ui/core'

import { withRouter } from 'react-router-dom'

// useDApp
import { useEthers } from '@usedapp/core'

// styles
import useStyles from './styles'

// logo
import logo from './lgf.png'
import metamask from '../../images/metamask.svg'
import walletConnectIcon from '../../images/wc.png'
// context
import { useUserDispatch, loginUser, loginOnlyView } from '../../context/UserContext'

function Login(props) {
    const { activateBrowserWallet, account } = useEthers()
    const vidRef = useRef()
    var classes = useStyles()

    // global
    var userDispatch = useUserDispatch()

    // local
    var [isLoading, setIsLoading] = useState(false)
    var [error, setError] = useState(null)
    var [activeTabId, setActiveTabId] = useState(0)
    var [accountInput, setAccountInput] = useState(account || '')
    var [firstMetamask, setFirstMetamask] = useState(0)
    var [accountwc, setAccountWC] = useState(0)

    function handleConnectWallet() {
        activateBrowserWallet()
        setFirstMetamask(1)
    }
    function handleConnectWalletByWC() {
        console.log("handleConnectWalletByWC");
        setAccountWC(1);
    }
    useEffect(() => {
        vidRef.current.play()
    }, [])

    useEffect(() => {
        account ? setAccountInput(account) : setAccountInput('')
        if (firstMetamask) {
            setFirstMetamask(0)
            loginUser(
                userDispatch,
                account,
                props.history,
                setIsLoading,
                setError
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    return (
        <div>
            <Grid container className={classes.container}>
                <div className={classes.logotypeContainer}>
                    {/* <img
                        src={logo}
                        alt="logo"
                        className={classes.logotypeImage}
                    /> */}
                    <video
                        ref={vidRef}
                        muted
                        width="100%"
                        height="100%"
                        loop
                        autoPlay
                    >
                        <source src="/videos/logo.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className={classes.formContainer}>
                    <div className={classes.form}>
                        <Tabs
                            value={activeTabId}
                            onChange={(e, id) => setActiveTabId(id)}
                            indicatorColor="secondary"
                            textColor="secondary"
                            centered
                        >
                            <Tab
                                label="Login"
                                classes={{ root: classes.tab }}
                            />
                        </Tabs>
                        {
                            <React.Fragment>
                                <Typography
                                    variant="h1"
                                    className={classes.greeting}
                                >
                                    Welcome to Viral
                                </Typography>
                                <Button
                                    size="large"
                                    className={classes.googleButton}
                                    onClick={handleConnectWallet}
                                    disabled={account ? 1 : 0}
                                >
                                    {/* <img
                                        src={metamask}
                                        alt="metamask"
                                        className={classes.googleIcon}
                                    /> */}
                                    {account
                                        ? ' Already connected with Wallet'
                                        : 'Login By Wallet connect'}
                                </Button>
                                <div className={classes.formDividerContainer}>
                                    <div className={classes.formDivider} />
                                    <Typography
                                        className={classes.formDividerWord}
                                    >
                                        or
                                    </Typography>
                                    <div className={classes.formDivider} />
                                </div>
                                <Fade in={error}>
                                    <Typography
                                        color="secondary"
                                        className={classes.errorMessage}
                                    >
                                        Something is wrong with your ETH Wallet
                                        :(
                                    </Typography>
                                </Fade>
                                <TextField
                                    id="eth"
                                    color="secondary"
                                    InputProps={{
                                        classes: {
                                            underline:
                                                classes.textFieldUnderline,
                                            input: classes.textField,
                                        },
                                    }}
                                    value={accountInput}
                                    onChange={e =>
                                        setAccountInput(e.target.value)
                                    }
                                    margin="normal"
                                    placeholder="ETH Wallet Address"
                                    type="text"
                                    fullWidth
                                />
                                <div className={classes.formButtons}>
                                    {isLoading ? (
                                        <CircularProgress
                                            size={26}
                                            className={classes.loginLoader}
                                        />
                                    ) : (
                                        <Button
                                            disabled={
                                                accountInput &&
                                                accountInput.length === 0
                                            }
                                            onClick={() =>
                                                loginUser(
                                                    userDispatch,
                                                    accountInput,
                                                    props.history,
                                                    setIsLoading,
                                                    setError
                                                )
                                            }
                                            variant="contained"
                                            color="secondary"
                                            className={classes.loginBtn}
                                            size="large"
                                        >
                                            Login
                                        </Button>
                                    )}
                                </div>
                                <div className={classes.formDividerContainer}>
                                    <div className={classes.formDivider} />
                                    <Typography
                                        className={classes.formDividerWord}
                                    >
                                        or
                                    </Typography>
                                    <div className={classes.formDivider} />
                                </div>
                                <Button
                                    onClick={() =>
                                        loginOnlyView(props.history)
                                    }
                                    variant="contained"
                                    color="secondary"
                                    className={classes.loginBtn}
                                    size="large"
                                >
                                    SIGN Anonymously
                                </Button>
                            </React.Fragment>
                        }
                    </div>
                    <Typography color="primary" className={classes.copyright}>
                        © {new Date().getFullYear()}{' '}
                        <a
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            href="https://www.Twinuproject.com/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            #Viral Dapp
                        </a>
                        . All rights reserved.
                    </Typography>
                </div>
            </Grid>
        </div>
    )
}

export default withRouter(Login)
