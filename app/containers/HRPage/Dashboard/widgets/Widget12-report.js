import React from 'react';
import { Bar } from 'react-chartjs-2';
import { withStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'

const styles = theme => ({
	root: {
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
})

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

export default withStyles(styles)(class Widget12 extends React.Component {
	render() {
		const { classes } = this.props

		return (
			<Card className={classes.root}>
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