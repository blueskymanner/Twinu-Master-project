import React from 'react'
import { Grid } from '@material-ui/core'

function ViralNews() {
    return (
        <Grid container spacing={4}>
            <Grid item lg={12} sm={12} xs={12}>
                <div id="dexscreener-embed" width="100%">
                    <iframe
                        width="100%"
                        height="600px"
                        src="https://cointelegraph.com/"
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

export default ViralNews
