import React from "react"
import EzoneUtils from '../../../../../utils/EzoneUtils'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { makeStyles, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiListSubheader-root': {
      borderLeft: `3px solid ${red[500]}`
    }
  },
}));

const payrollReports = [
  { name: 'Payroll Journals', label: 'Payroll Journals' },
  { name: 'Payroll Check Register', label: 'Payroll Check Register' },
  { name: 'Payroll Tax report', label: 'Payroll Tax report' },
  { name: 'Tax liability Report', label: 'Tax liability Report' },
  { name: 'Employee Earnings Report', label: 'Employee Earnings Report' },
  { name: 'Employee Compensation Report', label: 'Employee Compensation Report' },
  { name: 'Employee List', label: 'Employee List' },
];

const Widget2 = ({ accounts, accData }) => {
  const classes = useStyles()

  return (
    <div>
      <List
        className={classes.root}
        dense
        subheader={
          <ListSubheader component="div" id="payroll">
            Payroll
          </ListSubheader>
        }
      >
        {payrollReports.map((item, i) =>
          <ListItem button key={i}>
            <ListItemText primary={item.name} secondary={item.label} />
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default Widget2
