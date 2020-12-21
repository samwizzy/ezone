import React, { memo } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  list: {
    '& .MuiListSubheader-root': {
      position: 'relative',
      height: 'fit-content',
      '&::before': {
        position: 'absolute',
        content: "''",
        top: 0,
        left: 0,
        width: '5px',
        height: '100%',
      },
    },
    '& .recievables::before': { backgroundColor: '#1A88E1' },
    '& .fixed::before': { backgroundColor: '#C51AE1' },
    '& .payables::before': { backgroundColor: '#1AE1BD' },
    '& .reconciliation::before': { backgroundColor: '#322F7C' },
    '& .ledger::before': { backgroundColor: '#FCD81C' },
    '& .budget::before': { backgroundColor: '#36E11A' },
    '& .inv::before': { backgroundColor: '#1C4DFC' },
    '& .fs::before': { backgroundColor: '#EF0000' },
    '& .payroll::before': { backgroundColor: '#FF00C7' },
    '& .taxes::before': { backgroundColor: '#322F7C' },
  },
}));

const CardBoard = props => {
  const classes = useStyles(props);
  const { history, contents } = props;

  const ListData = contents.map((content, i) => (
    <ListItem
      button
      key={i}
      onClick={() => history.push(`/account/reports/${content.link}`)}
    >
      <ListItemText primary={content.name} />
    </ListItem>
  ));

  return (
    <Card>
      <CardContent>
        <List
          className={classes.list}
          disablePadding
          dense
          subheader={
            <ListSubheader
              className={props.color}
              disableSticky
              component="div"
              id="nested-list-subheader"
            >
              <Typography variant="h6" color="textSecondary">
                {props.title}
              </Typography>
            </ListSubheader>
          }
        >
          {ListData}
        </List>
      </CardContent>
    </Card>
  );
};

export default compose(
  withRouter,
  memo,
)(CardBoard);
