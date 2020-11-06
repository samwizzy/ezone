import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Grid, Toolbar, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import moment from 'moment'
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: { flexGrow: 1 },
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  }
}));

const AttendanceDetails = props => {
  const classes = useStyles();
  const { loading, attendance, openEditAttendanceDialog, getEmployeesByShift } = props;
  console.log(attendance, "attendance by id")
  useEffect(() => {
    if (attendance.attendance) {
      getEmployeesByShift(attendance.attendance.id)
    }
  }, [attendance.attendance])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Attendance Details
          </Typography>
          <IconButton onClick={() => { }}><DeleteOutlineIcon /></IconButton>
          <IconButton onClick={() => { }}><EditOutlinedIcon /></IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AttendanceDetails.propTypes = {
  loading: PropTypes.bool,
  openEditAttendanceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  attendance: Selectors.makeSelectAttendanceById(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendanceById: (id) => dispatch(Actions.getAttendanceById(id)),
    getEmployeesByShift: (id) => dispatch(Actions.getEmployeesByShift(id)),
    openEditAttendanceDialog: () => dispatch(Actions.openEditAttendanceDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AttendanceDetails);
