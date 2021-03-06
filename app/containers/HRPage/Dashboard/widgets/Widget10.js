import React from 'react';
import { Line } from 'react-chartjs-2';
import { withStyles, Button, Card, CardHeader, CardContent } from '@material-ui/core';

const styles = theme => ({
	root: {
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
});

const initialState = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Employee Growth dataset',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};


class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.interval = null
	}

	componentWillMount() {
		this.setState(initialState);
	}

	componentDidMount() {

		var _this = this;

		this.interval = setInterval(function () {
			var oldDataSet = _this.state.datasets[0];
			var newData = [];

			for (var x = 0; x < _this.state.labels.length; x++) {
				newData.push(Math.floor(Math.random() * 100));
			}

			var newDataSet = {
				...oldDataSet
			};

			newDataSet.data = newData;

			var newState = {
				...initialState,
				datasets: [newDataSet]
			};

			_this.setState(newState);
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<Line data={this.state} />
		);
	}
}


export default withStyles(styles)(class Widget10 extends React.Component {

	render() {
		const { classes } = this.props

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings">
							see all
						</Button>
					}
					title="Employee Growth"
				/>
				<CardContent>
					<Graph />
				</CardContent>
			</Card>
		);
	}
})