import React from 'react'
import Widget from '../Widget'
import { Link } from 'react-router-dom'
import { Box, Grid, Breadcrumbs } from '@material-ui/core'
import { Typography, Button } from '../Wrappers'
import {
    NavigateNext as NavigateNextIcon,
    CalendarToday as CalendarIcon,
} from '@material-ui/icons'
import { useLocation } from 'react-router-dom'

// styles
import useStyles from '../Layout/styles'

// components

import { useLayoutState } from '../../context/LayoutContext'
import structure from '../Sidebar/SidebarStructure'
//Sidebar structure

//Sidebar structure

const BreadCrumbs = () => {
    const location = useLocation()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    // eslint-disable-next-line no-unused-vars
    const id = open ? 'add-section-popover' : undefined
    // eslint-disable-next-line no-unused-vars
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    const renderBreadCrumbs = () => {
        let url = location.pathname
        let route = url
            .split('/')
            .slice(1)
            .map(route =>
                route
                    .split('-')
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(' ')
            )
        const length = route.length
        return route.map((item, index) => {
            let middlewareUrl =
                '/' +
                url
                    .split('/')
                    .slice(1, index + 2)
                    .join('/')

            return (
                <Breadcrumbs
                    key={index + '_b'}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Typography
                        variant="h6"
                        color={length === index + 1 ? 'primary' : ''}
                    >
                        {length === index + 1 ? (
                            item
                        ) : (
                            <Link
                                to={middlewareUrl}
                                style={{
                                    color: 'unset',
                                    textDecoration: 'none',
                                }}
                            >
                                {item}
                            </Link>
                        )}
                    </Typography>
                </Breadcrumbs>
            )
        })
    }

    // global
    // eslint-disable-next-line no-unused-vars
    const layoutState = useLayoutState()

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const today = new Date()

    return (
        <></>
        // <Widget
        //     disableWidgetMenu
        //     inheritHeight
        //     className={classes.margin}
        //     bodyClass={classes.navPadding}
        // >
        //     <Grid
        //         container
        //         direction="row"
        //         justify="space-between"
        //         alignItems="center"
        //         wrap={'nowrap'}
        //         style={{ overflowX: 'auto' }}
        //     >
        //         {// eslint-disable-next-line
        //         structure.map(c => {
        //             if (
        //                 window.location.hash.includes(c.link) &&
        //                 c.link &&
        //                 c.label === 'My Portfolio'
        //             ) {
        //                 return (
        //                     <Box display="flex" alignItems="center" key={c.id}>
        //                         <Breadcrumbs aria-label="breadcrumb">
        //                             <Typography variant="h4">
        //                                 {c.label}
        //                             </Typography>
        //                         </Breadcrumbs>
        //                     </Box>
        //                 )
        //             }
        //         })}
        //     </Grid>
        // </Widget>
    )
}
export default BreadCrumbs
