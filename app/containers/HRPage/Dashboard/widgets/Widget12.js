import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import { withStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'
import moment from 'moment'

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

export default withStyles(styles)(class Widget12 extends React.Component {
	render() {
		const { classes, employees } = this.props

		const age18_25 = employees && employees.filter(emp => {
			const age = moment().diff(moment(emp.dob), 'year')
			return age >= 18 && age <= 25
		}).length
		const age26_35 = employees && employees.filter(emp => {
			const age = moment().diff(moment(emp.dob), 'year')
			return age >= 26 && age <= 35
		}).length
		const age36_45 = employees && employees.filter(emp => {
			const age = moment().diff(moment(emp.dob), 'year')
			return age >= 36 && age <= 45
		}).length
		const age46_55 = employees && employees.filter(emp => {
			const age = moment().diff(moment(emp.dob), 'year')
			return age >= 46 && age <= 55
		}).length
		const age56_65 = employees && employees.filter(emp => {
			const age = moment().diff(moment(emp.dob), 'year')
			return age >= 56 && age <= 65
		}).length

		const data = {
			labels: ['18 - 25 yrs', '26 - 35 yrs', '36 - 45 yrs', '46 - 55 yrs', '56 - 65 yrs'],
			datasets: [
				{
					label: 'Age Profile dataset',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: [age18_25, age26_35, age36_45, age46_55, age56_65]
				}
			]
		};

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings" component={Link} to="/hr/dashboard/age-report">
							view report
						</Button>
					}
					title="Age Profile"
				/>
				<CardContent>
					<Bar
						data={data}
						width={100}
						height={230}
						options={{
							maintainAspectRatio: false
						}}
					/>
				</CardContent>
			</Card>
		);
	}
})
