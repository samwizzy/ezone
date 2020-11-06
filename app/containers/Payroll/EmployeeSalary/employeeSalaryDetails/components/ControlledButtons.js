import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: { flexGrow: 1, textTransform: 'uppercase' },
  iconPaper: {
    boxShadow: theme.shadows[1],
    '& button:first-child': { marginRight: theme.spacing(1) }
  },
}));

const ControlledButtons = props => {
  const classes = useStyles();
  const { history, employeeSalary, openEditEmployeeSalaryDialog, openDeleteEmployeeSalaryDialog } = props;

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Toolbar className={classes.iconPaper} variant="dense">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.title}>{employeeSalary.accountName}</Typography>

        <IconButton onClick={() => { }}>
          <Icon>print</Icon>
        </IconButton>
        <IconButton onClick={() => openEditEmployeeSalaryDialog(employeeSalary)}>
          <Icon>edit</Icon>
        </IconButton>
        <IconButton onClick={() => openDeleteEmployeeSalaryDialog(employeeSalary)}>
          <Icon>delete</Icon>
        </IconButton>
      </Toolbar>
    </div>
  );
};

ControlledButtons.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openDeleteEmployeeSalaryDialog: data => dispatch(Actions.openDeleteEmployeeSalaryDialog(data)),
    openEditEmployeeSalaryDialog: data => dispatch(Actions.openEditEmployeeSalaryDialog(data)),
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
)(ControlledButtons);
