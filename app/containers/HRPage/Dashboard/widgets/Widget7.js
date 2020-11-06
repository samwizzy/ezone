import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Avatar,
  Button,
  Card, CardContent, CardHeader,
  List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,
  Paper,
  Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minHeight: 210,
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiCardContent-root": {
      padding: 0,
      fontSize: theme.typography.body2.fontSize,
    },
    "& .MuiCardHeader-root": {
      padding: theme.spacing(2),
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
}));


const Widget7 = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const leaveRequests = [];

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <Button color="primary" size="small" onClick={() => history.push('/human-resource/leave-management/leave-request')} aria-label="settings">
              see all
						</Button>
          }
          title="Leave Request for Approval"
        />
        <CardContent>
          {leaveRequests.length > 0 ?
            <List className={classes.root}>
              {[0, 1].slice(0, 2).map((emp, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      {emp.lastName ? emp.lastName[0].toUpperCase() : <PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={emp.firstName + ' ' + emp.lastName} />
                  <ListItemSecondaryAction>
                    <Typography>Sick Leave</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
            :
            <Typography align="center" color="textSecondary">No Leave has been requested</Typography>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default Widget7
