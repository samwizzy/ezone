import React, { memo } from "react"
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from "react-router-dom"
import {
	makeStyles,
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Divider,
	List,
	Paper,
	Grid,
	Table,
	TableHead,
	TableBody,
	TableFooter,
	TableRow,
	TableCell,
	Typography
} from '@material-ui/core';
import CrmDashImage1 from '../../../../images/crmDash.jpg'
import hrDash1 from '../../../../images/hrDash1.jpg'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

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
		backgroundImage: `url(${hrDash1})`,
		backgroundRepeat: `no-repeat`,
		backgroundPosition: `center bottom`,
		backgroundSize: 'cover',
		"& .MuiCardActions-root": {
			justifyContent: "center",
			backgroundColor: theme.palette.common.white,
		},
		"& .MuiCardContent-root": {
			minHeight: 160
		}
	},
	table: {
		whiteSpace: "nowrap",
		"& .MuiTableFooter-root": {
			borderTop: `1px solid ${theme.palette.divider} !important`,
		},
		"& .MuiTableCell-root": {
			borderBottom: "none !important",
		},
		'& .MuiTableCell-body': {
			color: theme.palette.common.white,
		},
	}
}));


const Widget1 = (props) => {
	const classes = useStyles()
	const { employees } = props
	console.log(employees, "employees")

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Table className={classes.table} size="small">
						<TableBody>
							<TableRow>
								<TableCell component="th">
									<Typography variant="h3">{employees && employees.length}</Typography>
								</TableCell>
								<TableCell align="right">
									<Typography variant="subtitle2">Employees</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>

				<CardActions>
					<Button component={Link} to='/hr/employees'>
						View All Employees
					</Button>
				</CardActions>
			</Card>
		</div>
	)
}


const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
	departments: Selectors.makeSelectDepartments(),
	employees: Selectors.makeSelectEmployees(),
	employee: Selectors.makeSelectEmployee(),
	user: AppSelectors.makeSelectCurrentUser(),
	departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
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
)(Widget1);
// export default Widget1