import React from 'react'
import classNames from 'classnames'
import {
	makeStyles,
	Avatar,
	Box,
	Button,
	Card, CardContent, CardActions, CardHeader,
	Divider,
	Icon,
	IconButton,
	List,
	Paper,
	Grid,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography
} from '@material-ui/core';
import moment from 'moment'
import _ from 'lodash'
import { green, orange, red } from '@material-ui/core/colors'
import LensSharp from '@material-ui/icons/LensSharp'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		border: `1px solid ${theme.palette.divider}`,
		'& .MuiGrid-item': {
			flex: 1,
			margin: theme.spacing(5)
		}
	},
	card: {
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
	table: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		whiteSpace: "nowrap",
		"& .MuiTableFooter-root": {
			borderTop: `1px solid ${theme.palette.divider} !important`
		},
		"& .MuiTableCell-root": {
			borderBottom: "none",
			padding: theme.spacing(1),
		},
		'& .MuiTableCell-body': {
			color: theme.palette.text.secondary,
		},
	},
}));


const Widget5 = ({ employees }) => {
	const classes = useStyles()

	console.log(employees, "employees widget 5")
	const newHires = employees.filter(emp => moment().isSame(emp.dateCreated, 'month'))
	const sortedHires = _.orderBy(newHires, ['dateCreated'], ['desc']);
	console.log(newHires, "new hires")

	return (
		<div>
			<Card className={classes.card}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings">
							see all
						</Button>
					}
					title="New Hires"
				/>
				<CardContent>
					{newHires.length > 0 ?
						<Table className={classes.table}>
							<TableBody>
								{sortedHires.slice(0, 2).map((hire, i) =>
									<TableRow key={i}>
										<TableCell component="th" scope="row">
											<Avatar aria-label="recipe" className={classes.avatar}>
												{hire.lastName ? hire.lastName[0].toUpperCase() : <PersonIcon />}
											</Avatar>
										</TableCell>
										<TableCell align="left">{hire.firstName + ' ' + hire.lastName}</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table> :
						<Typography align="center" color="textSecondary">There are no new hires</Typography>
					}
				</CardContent>
			</Card>
		</div>
	)
}

export default Widget5