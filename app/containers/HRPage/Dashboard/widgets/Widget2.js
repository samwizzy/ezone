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
import CrmDashImage2 from '../../../../images/crmDash2.jpg'
import hrDash3 from '../../../../images/hrDash3.jpg'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	card: {
		flexGrow: 1,
		borderRadius: theme.shape.borderRadius * 2,
		backgroundImage: `url(${hrDash3})`,
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
		display: "flex",
		'& tr': {
			display: "flex",
		},
		"& td, & th": {
			borderBottom: "none !important",
			color: theme.palette.common.white,
		},
	},
	childTable: {
		'& tr': {
			display: "flex",
		},
		'& td, & th': {
			color: theme.palette.common.white,
		},
	}
}));


const Widget2 = (props) => {
	const classes = useStyles()
	const { departments } = props

	if (!departments) {
		return ''
	}

	console.log(departments, "departments")

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Table className={classes.table} size="small">
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography variant="h3">{departments && departments.length}</Typography>
								</TableCell>
								<TableCell>
									<Table className={classes.childTable} size="small">
										<TableBody>
											{departments.length > 0 && departments.slice(0, 4).map((dept, i) =>
												<TableRow key={i}>
													<TableCell>{dept.employees.length} {dept.name}</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>

				<CardActions>
					<Button component={Link} to='/hr/departments'>
						View All Departments
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
)(Widget2);
// export default Widget2