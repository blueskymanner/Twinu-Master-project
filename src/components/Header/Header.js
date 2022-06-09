import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Fab,
    Button,
    Grid,
    Avatar,
} from '@material-ui/core'
import {
    Menu as MenuIcon,
    Person as AccountIcon,
    Send as SendIcon,
    ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import classNames from 'classnames'

import { useEthers } from '@usedapp/core'

// styles
import useStyles from './styles'

// components
import { Typography } from '../Wrappers'
import Notification from '../Notification/Notification'
import UserAvatar from '../UserAvatar/UserAvatar'

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from '../../context/LayoutContext'
// import { useUserState, signOut,  } from '../../context/UserContext'
import { useMaterialUIController, setWallet } from '../../context'
const messages = [
    {
        id: 0,
        variant: 'warning',
        name: 'Jane Hew',
        message: 'Hey! How is it going?',
        time: '9:32',
    },
    {
        id: 1,
        variant: 'success',
        name: 'Lloyd Brown',
        message: 'Check out my new Dashboard',
        time: '9:18',
    },
    {
        id: 2,
        variant: 'primary',
        name: 'Mark Winstein',
        message: 'I want rearrange the appointment',
        time: '9:15',
    },
    {
        id: 3,
        variant: 'secondary',
        name: 'Liana Dutti',
        message: 'Good news from sale department',
        time: '9:09',
    },
]

const notifications = [
    { id: 0, color: 'warning', message: 'Check out this awesome ticket' },
    {
        id: 1,
        color: 'success',
        type: 'info',
        message: 'What is the best way to get ...',
    },
    {
        id: 2,
        color: 'secondary',
        type: 'notification',
        message: 'This is just a simple notification',
    },
    {
        id: 3,
        color: 'primary',
        type: 'e-commerce',
        message: '12 new orders has arrived today',
    },
]

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_WEB3_PROVIDER':
            return {
                ...state,
                provider: action.provider,
                web3Provider: action.web3Provider,
                address: action.address,
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
            }

        case 'RESET_WEB3_PROVIDER':
            return initialState
        default:
            throw new Error()
    }
}

function Header(props) {
    var classes = useStyles()
    const { activateBrowserWallet, account, deactivate } = useEthers()
    // global
    var layoutState = useLayoutState()
    var layoutDispatch = useLayoutDispatch()
    const [controller, dispatchC] = useMaterialUIController()
    // local
    var [mailMenu, setMailMenu] = useState(null)
    var [notificationsMenu, setNotificationsMenu] = useState(null)

    const [state, dispatch] = useReducer(reducer, initialState)
    const { provider } = state

    const connect = useCallback(async function() {
        activateBrowserWallet()
        setWallet(dispatchC, account)
        dispatch({
            type: 'SET_WEB3_PROVIDER',
            provider: null,
            web3Provider: null,
            address: account,
        })

        return null
    }, [])

    const disconnect = useCallback(
        // eslint-disable-next-line
        async function() {
            deactivate()
            setWallet(dispatchC, null)
            dispatch({
                type: 'RESET_WEB3_PROVIDER',
            })
        },
        [provider]
    )

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    onClick={() => toggleSidebar(layoutDispatch)}
                    className={classNames(
                        classes.headerMenuButtonSandwich,
                        classes.headerMenuButtonCollapse
                    )}
                >
                    {layoutState.isSidebarOpened ? (
                        <ArrowBackIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse
                                ),
                            }}
                        />
                    ) : (
                        <MenuIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse
                                ),
                            }}
                        />
                    )}
                </IconButton>
                <Avatar alt="" src="twinu.jpg" />

                <Typography
                    variant="h6"
                    weight="medium"
                    className={classes.logotype}
                >
                    #VIRAL APP
                </Typography>
                <div className={classes.grow} />
                {account ? (
                    <Grid display="inline-block">
                        <Typography color="primary" px={1}>
                            Connected as ${account.substring(0, 3)}...
                            {account.substring(
                                account.length - 3,
                                account.length3
                            )}
                        </Typography>
                        <Button
                            color="secondary"
                            backgroundColor="white"
                            textTransform="none"
                            onClick={disconnect}
                            display="inline-block"
                        >
                            <Typography variant="button" display="inline-block">
                                Disconnect
                            </Typography>
                        </Button>
                    </Grid>
                ) : (
                    <Button
                        color="secondary"
                        width="60%"
                        backgroundColor="white"
                        textTransform="none"
                        onClick={connect}
                        display="inline-block"
                    >
                        <Typography variant="button">CONNECT WALLET</Typography>
                    </Button>
                )}

                <Menu
                    id="mail-menu"
                    open={Boolean(mailMenu)}
                    anchorEl={mailMenu}
                    onClose={() => setMailMenu(null)}
                    MenuListProps={{ className: classes.headerMenuList }}
                    className={classes.headerMenu}
                    classes={{ paper: classes.profileMenu }}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            New Messages
                        </Typography>
                        <Typography
                            className={classes.profileMenuLink}
                            component="a"
                            color="secondary"
                        >
                            {messages.length} New Messages
                        </Typography>
                    </div>
                    {messages.map(message => (
                        <MenuItem
                            key={message.id}
                            className={classes.messageNotification}
                        >
                            <div className={classes.messageNotificationSide}>
                                <UserAvatar
                                    color={message.variant}
                                    name={message.name}
                                />
                                <Typography
                                    size="sm"
                                    color="text"
                                    colorBrightness="secondary"
                                >
                                    {message.time}
                                </Typography>
                            </div>
                            <div
                                className={classNames(
                                    classes.messageNotificationSide,
                                    classes.messageNotificationBodySide
                                )}
                            >
                                <Typography weight="medium" gutterBottom>
                                    {message.name}
                                </Typography>
                                <Typography
                                    color="text"
                                    colorBrightness="secondary"
                                >
                                    {message.message}
                                </Typography>
                            </div>
                        </MenuItem>
                    ))}
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Add"
                        className={classes.sendMessageButton}
                    >
                        Send New Message
                        <SendIcon className={classes.sendButtonIcon} />
                    </Fab>
                </Menu>
                <Menu
                    id="notifications-menu"
                    open={Boolean(notificationsMenu)}
                    anchorEl={notificationsMenu}
                    onClose={() => setNotificationsMenu(null)}
                    className={classes.headerMenu}
                    disableAutoFocusItem
                >
                    {notifications.map(notification => (
                        <MenuItem
                            key={notification.id}
                            onClick={() => setNotificationsMenu(null)}
                            className={classes.headerMenuItem}
                        >
                            <Notification
                                {...notification}
                                typographyVariant="inherit"
                            />
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
export default Header
