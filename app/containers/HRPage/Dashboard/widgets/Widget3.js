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
import hrDash2 from '../../../../images/hrDash2.jpg'
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		border: `1px solid ${theme.palette.grey[100]}`,
		'& .MuiGrid-item': {
			flex: 1,
			margin: theme.spacing(5)
		}
	},
	card: {
		borderRadius: theme.shape.borderRadius * 2,
		backgroundImage: `url(${hrDash2})`,
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
		overflowX: 'hidden',
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


const Widget3 = (props) => {
	const classes = useStyles()
	const { branches } = props

	if (!branches) {
		return ''
	}

	console.log(branches, "branches")

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Table className={classes.table} size="small">
						<TableBody>
							<TableRow>
								<TableCell component="th">
									<Typography variant="h3">{branches && branches.length}</Typography>
								</TableCell>
								<TableCell>
									<Table className={classes.childTable} size="small">
										<TableBody>
											{branches.length > 0 && branches.slice(0, 4).map((branch, i) =>
												<TableRow key={i}>
													<TableCell>{/*branch.employees.length*/} {branch.name}</TableCell>
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
					<Button component={Link} to='/hr/branches'>
						View All Branches
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
	branches: Selectors.makeSelectBranches(),
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
)(Widget3);