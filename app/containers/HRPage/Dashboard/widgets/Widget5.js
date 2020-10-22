import React from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Avatar,
  Button,
  Card, CardContent, CardActions, CardHeader,
  List, ListItem, ListItemText, ListItemAvatar,
  Typography
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment'
import _ from 'lodash'
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
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
}));


const Widget5 = ({ employees }) => {
  const classes = useStyles()
  const history = useHistory()

  console.log(employees, "employees widget 5")
  const newHires = employees.filter(emp => moment().isSame(emp.dateCreated, 'month'))
  const sortedHires = _.orderBy(newHires, ['dateCreated'], ['desc']);
  console.log(newHires, "new hires")

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <Button size="small" color="primary" onClick={() => history.push('/hr/recruitment')} aria-label="settings">
              see all
						</Button>
          }
          title="New Hires"
        />
        <CardContent>
          {newHires.length > 0 ?
            <List className={classes.root}>
              {sortedHires.slice(0, 2).map((hire, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      {hire.lastName ? hire.lastName[0].toUpperCase() : <PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={hire.firstName + ' ' + hire.lastName} />
                </ListItem>
              )}
            </List>
            :
            <Typography align="center" color="textSecondary">There are no new hires</Typography>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default Widget5
