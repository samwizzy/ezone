import React, { memo } from "react"
import { compose } from 'redux';
import { connect } from 'react-redux';
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
import hrDash4 from '../../../../images/hrDash4.jpg'
import crmDash from '../../../../images/crmDash.jpg'
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	card: {
		borderRadius: theme.shape.borderRadius * 2,
		backgroundImage: `url(${crmDash})`,
		backgroundRepeat: `no-repeat`,
		backgroundPosition: `center bottom`,
		backgroundSize: 'cover',
		"& .MuiCardActions-root": {
			justifyContent: "center",
			backgroundColor: theme.palette.secondary.contrastText,
		},
		"& .MuiCardContent-root": {
			minHeight: 160,
			display: 'flex',
			alignItems: 'center',
		}
	},
	table: {
		whiteSpace: "nowrap",
		overflowX: 'hidden',
		display: 'flex',
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


const Widget4 = (props) => {
	const classes = useStyles()
	const { roles } = props

	if (!roles) {
		return ''
	}

	console.log(roles, "roles")

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Table className={classes.table} size="small">
						<TableBody>
							<TableRow>
								<TableCell component="th">
									<Typography variant="h3">{roles && roles.length}</Typography>
								</TableCell>
								<TableCell align="right">
									<Table className={classes.childTable} size="small">
										<TableBody>
											{roles.length > 0 && roles.slice(0, 4).map((role, i) =>
												<TableRow key={i}>
													<TableCell>{/*role.employees.length*/} {role.name}</TableCell>
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
					<Button component={Link} to='/hr/roles'>
						View All Roles
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
	roles: Selectors.makeSelectRoles(),
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
)(Widget4);