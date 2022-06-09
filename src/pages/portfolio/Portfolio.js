import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    CircularProgress,
    Button,
    TextField,
} from '@material-ui/core'

import { useTheme } from '@material-ui/styles'

import { formatUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'

import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { createMuiTheme } from '@material-ui/core/styles'
import { BigNumber } from '@ethersproject/bignumber'
import { coingeckoETH } from './utils'

// import { useMaterialUIController } from '../../context'
import {
    useContractCall,
    useEthers,
    useContractFunction,
    useTokenBalance,
} from '@usedapp/core'
// styles
import useStyles from './styles'
import { utils } from 'ethers'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import axios from 'axios'

import dividendABI from '../../abi/dividend.json'
import viralABI from '../../abi/viral.json'
import rewardABI from '../../abi/reward.json'
import lpABI from '../../abi/lp.json'

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

// Contracts
const TWINU_Contract = '0x934c1ff0bed280f3041ff7e3131b156f45ac8b5c'

const VIRAL_Contract = '0x9d37f31a4e8c6af7f64f1ce6241d24f5cacd391c'
const Reward_Contract = '0x42114d38b1d324633fb257ed0267b483f50593d9'
const LP_Contract = '0x860cd7ccd714c351b9fd0d7b51c9f24a902882fc'

// Create our number formatter.
var formatter = new Intl.NumberFormat()

// Create our number formatter.
var formatterUS = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

async function balance(chainId, contract) {
    try {
        return await axios.get(
            `https://effortless-leaf-336220.uc.r.appspot.com/balances_v2/${contract}/false/${chainId}`
        )
    } catch (error) {
        console.error(error.message)
    }
}

const datatableData = []

datatableData.push([1, parseFloat(0), formatterUS.format(parseFloat(0)), 1])

const simpleContractInterface = new ethers.utils.Interface(dividendABI)
const viralContractInterface = new ethers.utils.Interface(viralABI)
const rewardContractInterface = new ethers.utils.Interface(rewardABI)
const lpContractInterface = new ethers.utils.Interface(lpABI)

export function useDividend(account) {
    const [dividend] =
        useContractCall({
            abi: simpleContractInterface,
            address: TWINU_Contract,
            method: 'withdrawableDividendOf',
            args: [account],
        }) ?? []
    return dividend
}

export function useCanClaim(account) {
    const [claim] =
        useContractCall({
            abi: rewardContractInterface,
            address: Reward_Contract,
            method: 'canClaim',
            args: [account],
        }) ?? []
    return claim
}

export function useBalanceOf(account) {
    const [balance] =
        useContractCall({
            abi: lpContractInterface,
            address: LP_Contract,
            method: 'balanceOf',
            args: [account],
        }) ?? []
    return balance
}

export function useAllowance(account) {
    const [allowance] =
        useContractCall({
            abi: lpContractInterface,
            address: LP_Contract,
            method: 'allowance',
            args: [account, Reward_Contract],
        }) ?? []
    return allowance
}

function PortfolioPage() {
    var classes = useStyles()
    var theme = useTheme()

    const { account } = useEthers()
    const tokenBalance = useTokenBalance(TWINU_Contract, account)
    const tokenBalanceF = tokenBalance ? formatUnits(tokenBalance, 9) : 0
    const dividend = useDividend(account)
    const [claimDisabled, setClaimDisabled] = useState(false)
    const dividendF = dividend ? formatUnits(dividend, 18) : 0

    const [disabled, setDisabled] = useState(false)
    const [disabledApproved, setDisabledApproved] = useState(false)
    const [approvalError, setApprovalError] = useState(null)

    const claimViral = useCanClaim(account)
    // console.log('claimViral ', claimViral)
    // const claimViralF = claimViral ? formatUnits(claimViral, 18) : 0
    const balanceOfLP = useBalanceOf(account)
    const balanceOfLPF = balanceOfLP ? formatUnits(balanceOfLP, 18) : 0
    const allowance = useAllowance(account)
    const allowanceF = allowance ? formatUnits(allowance, 18) : 0

    const [price, setPrice] = useState(0)
    const [priceLoader, setPriceLoader] = useState(0)
    const [ethPrice, setETHPrice] = useState(0)
    const [ethPriceLoader, setETHPriceLoader] = useState(0)
    const [lpLockAmount, setLpLockAmount] = useState(0)
    const contract = new Contract(TWINU_Contract, simpleContractInterface)
    const { state, send: claimH } = useContractFunction(contract, 'claim', {})

    const contractReward = new Contract(
        Reward_Contract,
        rewardContractInterface
    )

    const contractLP = new Contract(LP_Contract, lpContractInterface)

    function handleClaim() {
        try {
            setClaimDisabled(true)
            claimH()
        } catch (e) {
            console.log(e)
        }
    }

    const { state: stateApprove, send: useApprove } = useContractFunction(
        contractLP,
        'approve',
        {}
    )

    const {
        state: stateLockAndClaim,
        send: useLockAndClaim,
    } = useContractFunction(contractReward, 'lockAndClaim', {})

    // 1. CLAIM
    useEffect(() => {
        if (state.status === 'Success') {
            setClaimDisabled(false)
        }
        if (state.status === 'Exception' || state.status === 'Fail') {
            setClaimDisabled(false)
            console.log(state.errorMessage)
            // setApprovalError(state.errorMessage)
        }
    }, [state])

    // 2. APPROVE
    useEffect(() => {
        // console.log("stateApprove ", stateApprove);

        if (stateApprove.status === 'Success') {
            setDisabled(false)
            setDisabledApproved(true)
        }
        if (stateApprove.status === 'Exception' || state.status === 'Fail') {
            setDisabled(false)
            setApprovalError(stateApprove.errorMessage)
        }
    }, [stateApprove])

    // 2. Lock and Claim
    useEffect(() => {
        console.log(' stateLockAndClaim ', stateLockAndClaim)
        if (
            stateLockAndClaim.status !== 'Mining' &&
            stateLockAndClaim.status !== 'Exception' &&
            stateLockAndClaim.status !== 'PendingSignature' &&
            stateLockAndClaim.status !== 'Fail'
        ) {
            setDisabled(false)
            // setStakingMCAPAmount(0);
            /* const smcap = SMCAPBalance();
      setSMCAPBalance(smcap); */
        }
        if (
            stateLockAndClaim.status === 'Exception' ||
            stateLockAndClaim.status === 'Fail'
        ) {
            setDisabled(false)
            // setApprovalError(state.errorMessage);
        }
    }, [stateLockAndClaim])

    useEffect(() => {
        const fetchPrice = async contract => {
            setPriceLoader(1)

            try {
                const response = await balance(1, contract)
                setPrice(response.data.data.data.items[0].quote_rate)
            } catch (error) {
                console.error(error.message)
            }
            setPriceLoader(0)
        }

        const ethPrice = async () => {
            setETHPriceLoader(1)

            try {
                const ethResponse = await coingeckoETH()
                setETHPrice(parseFloat(ethResponse.data.ethereum.usd))
            } catch (error) {
                console.error(error.message)
            }
            setETHPriceLoader(0)
        }

        const refresh = async () => {
            await Promise.all([
                // fetchTransfers(TWINU_Contract),
                fetchPrice(TWINU_Contract),
                ethPrice(),
            ])
        }

        refresh()
    }, [account])

    const approveLP = () => {
        try {
            setDisabled(true)
            setApprovalError(null)
            /* eslint-disable */
            useApprove(
                Reward_Contract,
                BigNumber.from(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                )
            )
        } catch (e) {
            console.log(e)
        }
    }

    const lockAndClaimLP = () => {
        try {
            setDisabled(true)
            setApprovalError(null)
            var options = {
                gasLimit: 28500000,
            }
            useLockAndClaim(
                BigNumber.from('1000000000000000000').mul(lpLockAmount),
                options
            )
        } catch (e) {
            console.log(e)
        }
    }
    // console.log('price ', dividendF, ethPrice, dividendF * ethPrice)
    return account ? (
        <div className={classes.containerSpace}>
            <PageTitle title="#VIRAL Balance & Earnings" />

            <Grid container>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Widget
                                title="#VIRAL BALANCE"
                                disableWidgetMenu
                            >
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h1"
                                        className={classes.text}
                                    >
                                        {formatter.format(tokenBalanceF)}
                                    </Typography>
                                </div>
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Widget
                                title="BALANCE VALUE (USD)"
                                disableWidgetMenu
                            >
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h1"
                                        className={classes.text}
                                    >
                                        {!priceLoader ? (
                                            formatterUS.format(
                                                tokenBalance
                                                    ? tokenBalanceF *
                                                          parseFloat(price * 1)
                                                    : 0
                                            )
                                        ) : (
                                            <CircularProgress
                                                size={26}
                                                className={classes.loginLoader}
                                            />
                                        )}
                                    </Typography>
                                </div>
                            </Widget>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Widget title="LP EARNING (LP)" disableWidgetMenu>
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h1"
                                        className={classes.text}
                                    >
                                        {!priceLoader ? (
                                            formatter.format(dividendF)
                                        ) : (
                                            <CircularProgress
                                                size={26}
                                                className={classes.loginLoader}
                                            />
                                        )}
                                    </Typography>
                                    <Button
                                        onClick={handleClaim}
                                        disabled={claimDisabled}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Claim
                                    </Button>
                                </div>
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Widget
                                title="EARNING VALUE (USD)"
                                disableWidgetMenu
                            >
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h1"
                                        className={classes.text}
                                    >
                                        {!ethPriceLoader ? (
                                            formatterUS.format(
                                                dividendF * ethPrice
                                            )
                                        ) : (
                                            <CircularProgress
                                                size={26}
                                                className={classes.loginLoader}
                                            />
                                        )}
                                    </Typography>
                                </div>
                            </Widget>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}></Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid
                        container
                        alignItems="center"
                        spacing={4}
                        direction="column"
                    ></Grid>
                </Grid>
            </Grid>
            <PageTitle title="#VIRAL Claim" />

            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Widget
                                title="CAN I CLAIM?"
                                disableWidgetMenu
                            >
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h3"
                                        className={classes.text}
                                    >
                                        {claimViral
                                            ? 'Yes'
                                            : 'Nothing to Claim'}
                                    </Typography>
                                </div>
                            </Widget>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid
                        container
                        alignItems="center"
                        spacing={4}
                        direction="column"
                    ></Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Widget title="LP BALANCE" disableWidgetMenu>
                                <div className={classes.dashedBorder}>
                                    <Typography
                                        variant="h3"
                                        className={classes.text}
                                    >
                                        {formatter.format(balanceOfLPF)}
                                    </Typography>
                                </div>
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Widget title="LOCK AND CLAIM" disableWidgetMenu>
                                {allowanceF > 0 ? (
                                    <>
                                        <TextField
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                style: { color: 'white' },
                                            }}
                                            placeholder="Enter LP Amount"
                                            value={
                                                lpLockAmount > 0
                                                    ? lpLockAmount
                                                    : ''
                                            }
                                            size="small"
                                            onChange={({ currentTarget }) => {
                                                setLpLockAmount(
                                                    Math.floor(
                                                        parseFloat(
                                                            currentTarget.value
                                                        )
                                                    )
                                                )
                                            }}
                                            variant="outlined"
                                            id="eth"
                                            margin="normal"
                                        />
                                        <p />
                                        <Button
                                            variant="outlined"
                                            className={classes.mrSpace}
                                            size="small"
                                            onClick={() => {
                                                setLpLockAmount(
                                                    Math.floor(balanceOfLPF)
                                                )
                                            }}
                                        >
                                            Maximum
                                        </Button>
                                        <Button
                                            onClick={() => lockAndClaimLP()}
                                            disabled={
                                                disabled ||
                                                disabledApproved ||
                                                !claimViral
                                            }
                                            color="primary"
                                            variant="outlined"
                                        >
                                            Lock & Claim
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => approveLP()}
                                        disabled={disabled || disabledApproved}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Approve
                                    </Button>
                                )}
                            </Widget>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid
                        container
                        alignItems="center"
                        spacing={4}
                        direction="column"
                    ></Grid>
                </Grid>
            </Grid>
        </div>
    ) : (
        <div className={classes.containerSpace}>
            <PageTitle title="Balance & Earnings" />

            <Grid container>
                <Typography variant="info" display="inline-block">
                    CONNECT YOUR WALLET FIRST
                </Typography>
            </Grid>
        </div>
    )
}

// ################################################################

function renderActiveShape(props) {
    var RADIAN = Math.PI / 180
    var {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props
    var sin = Math.sin(-RADIAN * midAngle)
    var cos = Math.cos(-RADIAN * midAngle)
    var sx = cx + outerRadius * cos
    var sy = cy + outerRadius * sin
    var mx = cx + outerRadius * cos
    var my = cy + outerRadius * sin
    var ex = mx + (cos >= 0 ? 1 : -1) * 22
    var ey = my
    var textAnchor = cos >= 0 ? 'start' : 'end'

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    )
}

export default PortfolioPage
