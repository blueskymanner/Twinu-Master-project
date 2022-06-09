import React from 'react'
import { Grid } from '@material-ui/core'
// styles
import useStyles from './styles'

function Dashboard() {
    var classes = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid item lg={12} sm={12} xs={12}>
                <div id="dexscreener-embed" width="100%">
                    <iframe
                        width="100%"
                        className={classes.fullHeight}
                        src="https://dexscreener.com/ethereum/0x9C8B8cB53D4F0132c551f76b4F26B7F85C28D226?embed=1&theme=dark"
                    ></iframe>
                </div>
            </Grid>
        </Grid>
    )
}

// #######################################################################

function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill()
    let lastValue

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1)

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
        ) {
            randomValue = Math.floor(Math.random() * multiplier + 1)
        }

        lastValue = randomValue

        return { value: randomValue }
    })
}

export default Dashboard
