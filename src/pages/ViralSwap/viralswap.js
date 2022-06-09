import React from 'react'
import { Grid } from '@material-ui/core'
// styles
import useStyles from './styles'

function ViralSwap() {
    var classes = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid item lg={12} sm={12} xs={12}>
                <div id="uniswap-embed" width="100%" height="100vh">
                    <iframe
                        width="100%"
                        className={classes.fullHeight}
                        src="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9d37f31a4e8c6af7f64f1ce6241d24f5cacd391c&chain=mainnet"
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

export default ViralSwap
