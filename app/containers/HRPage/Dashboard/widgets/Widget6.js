import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	makeStyles,
	Avatar,
	Button,
	Card, CardContent, CardHeader,
	Menu,
	MenuItem,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PersonIcon from '@material-ui/icons/Person';
import months from '../../../../utils/months'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
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


const Widget6 = ({ employees }) => {
	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(moment().format('MMM'));
	let monthsList = [{ label: "Month", value: "Month" }, ...months];

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(monthsList[index].label);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (!employees) {
		return ''
	}

	console.log(employees, "employees")

	const birthdayEmps = employees.length > 0 && employees.filter(emp => moment(emp.dob).format('MMM') === selectedIndex);

	return (
		<div>
			<Card className={classes.card}>
				<CardHeader
					action={
						<React.Fragment>
							<Button color="primary" aria-label="settings" onClick={handleClickListItem}>
								{selectedIndex} <ExpandMoreIcon />
							</Button>
							<Menu
								id="lock-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{monthsList.map((option, index) => (
									<MenuItem
										key={option.label}
										disabled={index === 0}
										selected={option.label === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
									>
										{option.label}
									</MenuItem>
								))}
							</Menu>
						</React.Fragment>
					}
					title="Uploading Birthdays"
				/>
				<CardContent>
					{birthdayEmps.length > 0 ?
						<Table className={classes.table}>
							<TableBody>
								{birthdayEmps.slice(0, 2).map((emp, i) =>
									<TableRow key={i}>
										<TableCell component="th" scope="row">
											<Avatar aria-label="recipe" className={classes.avatar}>
												{emp.lastName ? emp.lastName[0].toUpperCase() : <PersonIcon />}
											</Avatar>
										</TableCell>
										<TableCell align="left">{emp.firstName + ' ' + emp.lastName}</TableCell>
										<TableCell align="right">{moment(emp.dob).format('MMM DD')}</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
						:
						<Typography align="center" color="textSecondary">No upcoming birthdays</Typography>
					}
				</CardContent>
			</Card>
		</div>
	)
}


const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
	departments: Selectors.makeSelectDepartments(),
	employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
	return {};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo,
)(Widget6);