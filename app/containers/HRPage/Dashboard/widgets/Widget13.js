import React from 'react';
import { withStyles, Card, CardContent, CardHeader, Icon, Link, Typography } from '@material-ui/core'
import LensIcon from '@material-ui/icons/Lens'

const styles = theme => ({
	root: {
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
	status: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	icon: {
		width: 14,
		height: 14,
	}
})

export default withStyles(styles)(class Widget13 extends React.Component {
	render() {
		const { classes } = this.props

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<div className={classes.status}>
							<span>Priority:</span> &nbsp;
							<LensIcon className={classes.icon} fontSize="small" /> Low
						</div>
					}
					title="Latest Announcements"
					subheader={
						<>
							<Link href="#">App Launching Event</Link> —
							<span> 22<sup>nd</sup> June, 2020 </span>
						</>
					}
				/>
				<CardContent>
					<Typography variant="body1">
						Due to the recent outbreak of the coronavirus that has shakened & ravaged the global economy, the company thought it wise & appropriate to announce that the entire staffs should be allowed to adopt a remote working systems to ameliorate the risk of contracting the virus as it possess a huge threat to our lives and that of our families, we trust that you'd do your best to stay safe. The company believes this will not affect our success but rather harness us to do more. Thanks.
					</Typography>
				</CardContent>
			</Card>
		);
	}
})