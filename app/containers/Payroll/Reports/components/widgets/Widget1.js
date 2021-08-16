import React from 'react';
import EzoneUtils from '../../../../../utils/EzoneUtils';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiListSubheader-root': {
      borderLeft: `4px solid ${red[200]}`,
    },
  },
}));

const payrollReports = [
  { name: 'Payroll journals', label: 'Payroll journals' },
  { name: 'Payroll check register', label: 'Payroll check register' },
  { name: 'Payroll tax report', label: 'Payroll tax report' },
  { name: 'Tax liability report', label: 'Tax liability report' },
  { name: 'Employee earnings report', label: 'Employee earnings report' },
  {
    name: 'Employee compensation report',
    label: 'Employee compensation report',
  },
  { name: 'Employee list', label: 'Employee list' },
];

const Widget1 = ({ accounts, accData }) => {
  const classes = useStyles();

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
        {payrollReports.map((item, i) => (
          <ListItem button key={i}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Widget1;
