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
import { green, orange, red } from '@material-ui/core/colors'
import LensSharp from '@material-ui/icons/LensSharp'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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


const Widget5 = ({ jobOpenings }) => {
	const classes = useStyles()

	console.log(jobOpenings, "jobOpenings wodget 5")

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
					<Table className={classes.table}>
						<TableBody>
							{[0, 1].map((hire, i) =>
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
										</Avatar>
									</TableCell>
									<TableCell align="left">Christian Okeme</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}

export default Widget5