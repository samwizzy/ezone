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
                            <span> 3rd March, 2020 </span>
                        </>
                    }
                />
                <CardContent>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
})