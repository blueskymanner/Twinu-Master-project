import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        maxWidth: '100vw',
        overflowX: 'hidden',
    },
    content: {
        flexGrow: 1,
        width: `calc(100vw - 240px)`,
        minHeight: '100vh',
    },
    contentShift: {
        width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    fakeToolbar: {
        ...theme.mixins.toolbar,
    },
    link: {
        marginRight: `16px !important`,
    },
    defaultRadio: {
        color: '#536DFE',
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#536DFE',
        },
    },
    successRadio: {
        color: '#23a075',
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#23a075',
        },
    },
    secondaryRadio: {
        color: '#FF5C93',
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#FF5C93',
        },
    },
    warningRadio: {
        color: '#FFC260',
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#FFC260',
        },
    },
    infoRadio: {
        color: '#9013FE',
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#9013FE',
        },
    },
    button: {
        boxShadow: theme.customShadows.widget,
        textTransform: 'none',
        '&:active': {
            boxShadow: theme.customShadows.widgetWide,
        },
    },
    ecommerceIcon: {
        color: '#6E6E6E',
    },
    calendarIcon: {
        color: theme.palette.primary.main,
        marginRight: 14,
    },
    margin: {
        marginBottom: 24,
    },
    changeThemeFab: {
        position: 'fixed',
        top: theme.spacing(15),
        right: 0,
        zIndex: 1,
        borderRadius: 0,
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    },
    navPadding: {
        paddingTop: `${theme.spacing(1)}px !important`,
        paddingBottom: `6px !important`,
    },
    date: {
        marginRight: 38,
        color: theme.palette.type === 'dark' ? '#D6D6D6' : '#4A494A',
    },
    dFlex: {
        display: "flex",
    },
    mlAuto: {
        width: "100%",
        marginTop: "10px",
        marginLeft: "unset",
        [theme.breakpoints.up(510)]: {
            display: "flex",
            marginLeft: "auto",
            width: "unset",
            marginTop: "0px",
        }
    },
    mlBoxAuto: {
        marginTop: "10px",
        [theme.breakpoints.up(510)]: {
            display: "flex",
            marginLeft: "auto",
            marginTop: "0px",
        }
    },
    topBox: {
        display: "block",
        width: "100%",
        [theme.breakpoints.up(510)]: {
            display: "flex",                  
        }
    }
}))
