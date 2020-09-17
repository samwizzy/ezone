import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from "react-router-dom"
import { Pie } from 'react-chartjs-2';
import { withStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const styles = theme => ({
	root: {
		minHeight: 388,
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
})

class Widget11 extends React.Component {
	render() {
		const { classes, employees } = this.props

		const male = employees && employees.filter(emp => emp.gender === 'Male').length
		const female = employees && employees.filter(emp => emp.gender === 'Female').length
		const notSpecified = employees && employees.filter(emp => (emp.gender !== 'Male' && emp.gender !== 'Female')).length

		const data = {
			labels: [
				'Male',
				'Female',
				'Not Specified'
			],
			datasets: [{
				data: [male, female, notSpecified],
				backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				],
				hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				]
			}]
		};

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings" component={Link} to="/hr/dashboard/gender-report">
							view report
						</Button>
					}
					title="Gender Profile"
				/>
				<CardContent>
					<Pie data={data} />
				</CardContent>
			</Card>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	employees: Selectors.makeSelectEmployees(),
	user: AppSelectors.makeSelectCurrentUser(),
});

const withConnect = connect(
	mapStateToProps,
	null,
);

export default compose(
	withStyles(styles),
	withRouter,
	withConnect,
	memo,
)(Widget11);