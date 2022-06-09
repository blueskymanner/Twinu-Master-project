import { formatUnits } from '@ethersproject/units'
import axios from 'axios'

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

export async function coingeckoETH() {
    try {
        return await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd%2Ceur%2Cbtc%2Ceth`
        )
    } catch (error) {
        // eslint-disable-next-line
        console.error(error.message)
    }
    return null
}
