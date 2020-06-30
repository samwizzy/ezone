import React from 'react';
import { withStyles, Card, CardContent, CardHeader, Icon, Link, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core'
import LensIcon from '@material-ui/icons/Lens'
import moment from 'moment'

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
		const { classes, announcements } = this.props

		console.log(announcements, "announcements widget 13")

		if (!announcements) {
			return ''
		}

		return (
			<Card className={classes.root}>
				<CardContent>
					{announcements.length > 0 ?
						<List dense>
							{announcements && announcements.splice(0, 1).map((announcement, i) => (
								<ListItem disableGutters key={i}>
									<ListItemText
										disableTypography
										primary={
											<React.Fragment>
												<Link href="#">{announcement.title}</Link> —
												<span> {moment(announcement.dateCreated).format('Do MMMM, YYYY')} </span>
											</React.Fragment>
										}
										secondary={
											<Typography variant="body2" component="span">
												{announcement.message}
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<span>Priority:</span> &nbsp;
										<LensIcon className={classes.icon} fontSize="small" /> Low
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
						:
						<Typography align="center">No announcement has been made yet</Typography>
					}
				</CardContent>
			</Card>
		);
	}
})