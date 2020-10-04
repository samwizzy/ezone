import React from "react"
import EzoneUtils from '../../../../../utils/EzoneUtils'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {
	makeStyles,
	Button,
	Card, CardHeader,
	Table,
	TableHead,
	TableBody,
	TableFooter,
	TableRow,
	TableCell,
	Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	card: {
		flexGrow: 1,
		overflowX: 'hidden',
	},
	table: {
		minWidth: 400,
		"& .MuiTableFooter-root": {
			borderTop: `1px solid ${theme.palette.divider} !important`
		},
		"& .MuiTableCell-root": {
			borderBottom: "none !important"
		},
		'& .MuiTableCell-body': {
			color: theme.palette.text.secondary,
			fontSize: theme.typography.fontSize
		},
	}
}));


const Widget2 = ({ accounts, accData }) => {
	const classes = useStyles()
	const { currency } = accData
	const payablesAccounts = _.filter(accounts, (account) => account.accountType && account.accountType.id === 7)

	if (!payablesAccounts && !accData) {
		return <Typography>There are currently no Payables</Typography>
	}

	return (
		<div>
			<Card className={classes.card}>
				<CardHeader
					title="Total Payables"
					subheader="Total Unpaid Bills"
				/>

				<Table className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<TableCell colSpan="3" variant="head" component="th">
								<Typography variant="subtitle1" color="primary">Current</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">{payablesAccounts.length}</TableCell>
							<TableCell align="left">1 - 10 days</TableCell>
							<TableCell align="right">NGN 0.00</TableCell>
						</TableRow>
					</TableBody>

					<TableHead>
						<TableRow>
							<TableCell colSpan="3" variant="head" component="th">
								<Typography variant="subtitle1" component="h2" color="primary">Overdue</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">{payablesAccounts.length}</TableCell>
							<TableCell align="left">1 - 30 days</TableCell>
							<TableCell align="right">NGN 0.00</TableCell>
						</TableRow>
					</TableBody>

					<TableFooter>
						<TableRow>
							<TableCell align="left" colSpan={2}>
								<Typography variant="subtitle1" component="h2" color="textSecondary">Total</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="subtitle1" color="textSecondary">
									{EzoneUtils.formatCurrency(payablesAccounts.reduce((curVal, b) => curVal + b.openingBalance, 0))}
								</Typography>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Card>
		</div>
	)
}

export default Widget2