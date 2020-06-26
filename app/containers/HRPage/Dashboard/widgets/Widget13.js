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
					{announcements && announcements.splice(0, 1).map((announcement, i) => (
						<React.Fragment key={i}>
							<List dense>
								<ListItem disableGutters>
									<ListItemText
										primary={announcement.title}
										secondary={
											<React.Fragment>
												<Link href="#">App Launching Event</Link> —
												<span> {moment(announcement.dateCreated).format('Do MMMM, YYYY')} </span>
											</React.Fragment>
										}
									/>
									<ListItemSecondaryAction>
										<span>Priority:</span> &nbsp;
									<LensIcon className={classes.icon} fontSize="small" /> Low
								</ListItemSecondaryAction>
								</ListItem>
							</List>
							<Typography variant="body1">
								{announcement.message}
							</Typography>
						</React.Fragment>
					))}

				</CardContent>
			</Card>
		);
	}
})