import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    padding: theme.spacing(2),
  },
  editButton: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '8px',
  },
}));

const TopSection = props => {
  const classes = useStyles();

  const { openEditColorDialog, openEditCompanyDialog } = props;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid justify="space-between" container>
          <Grid item />
          <Grid item />
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

TopSection.propTypes = {
  openEditColorDialog: PropTypes.func,
  openEditCompanyDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditCompanyDialog: evt => dispatch(Actions.openEditCompanyDialog(evt)),
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopSection);
