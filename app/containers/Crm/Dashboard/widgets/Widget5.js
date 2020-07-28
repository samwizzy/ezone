import React from 'react'
import classNames from 'classnames'
import {
  makeStyles,
  Box,
  Button,
  Card, CardContent, CardActions, CardHeader,
  Divider,
  Icon,
  List,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import moment from 'moment'
import _ from 'lodash'
import { green, orange, red } from '@material-ui/core/colors'
import LensSharp from '@material-ui/icons/LensSharp'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(5)
    }
  },
  card: {
    borderRadius: theme.shape.borderRadius * 4,
    "& .MuiCardHeader-root": {
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
  table: {
    "& .MuiTableFooter-root": {
      borderTop: `1px solid ${theme.palette.divider} !important`
    },
    "& .MuiTableCell-root": {
      borderBottom: "none !important"
    },
    '& .MuiTableCell-body': {
      border: 0,
      color: theme.palette.text.secondary,
      // fontSize: theme.typography.subtitle1.fontSize
    },
    '& .MuiTableCell-body:last-child': {
      display: "flex",
      alignItems: "center",
    },
  },
  status: {
    width: 14,
    height: 14,
    color: theme.palette.common.black,
    '&.APPROVED': { color: theme.palette.primary.main },
    '&.PENDING': { color: orange[500] },
    '&.EXPIRED': { color: red[500] },
    '&.DONE': { color: green[500] },
  }
}));


const Widget5 = ({ tasks }) => {
  const classes = useStyles()

  const orderedTasks = _.orderBy(tasks, ['dateCreated'], ['desc'])

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          title="Tasks"
        />
        <CardContent>
          {orderedTasks && orderedTasks.length > 0 ?
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">Name</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedTasks && orderedTasks.slice(0, 3).map((task, i) =>
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">{task.title}</TableCell>
                    <TableCell align="right">{moment(task.dateCreated).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      <LensSharp className={classNames(classes.status, { [task.status]: true })} /> {task.status}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            :
            <Typography variant="subtitle1" color="textSecondary" align="center">
              No Tasks Available
          </Typography>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default Widget5
