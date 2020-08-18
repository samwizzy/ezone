import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, List, ListSubheader, ListItem, ListItemText, ListItemAvatar, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LensIcon from '@material-ui/icons/Lens';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    "& .MuiListItemAvatar-root": {
      minWidth: "30px !important"
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const Overview = props => {
  const classes = useStyles();
  const { loading, history } = props;

  return (
    <Grid
      container
      justify='space-between'
    >
      <Grid item md={12}>
        <div className={classes.content}>
          <List
            className={classes.list}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                What will you learn
              </ListSubheader>
            }
          >
            {_.range(0, 4).map((row, i) =>
              <ListItem key={i}>
                <ListItemAvatar>
                  <CheckCircleOutlineIcon />
                </ListItemAvatar>
                <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
              </ListItem>
            )}
          </List>
        </div>
        <div className={classes.content}>
          <List
            className={classes.list}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Requirement
              </ListSubheader>
            }
          >
            {_.range(0, 4).map((row, i) =>
              <ListItem key={i}>
                <ListItemAvatar>
                  <LensIcon />
                </ListItemAvatar>
                <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
              </ListItem>
            )}
          </List>
        </div>
        <div className={classes.content}>
          <List
            className={classes.list}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                About Course
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor eu porta laoreet augue facilisi. Magna amet malesuada at interdum viverra tempor. Tortor, porttitor quisque quis posuere amet feugiat imperdiet neque. Quis fames metus, et lacus pretium sed at ut ipsum. Commodo ut tincidunt faucibus mauris. Ut vestibulum augue in eu pulvinar facilisis. Vitae tortor sit elit, dui. Quis at id odio sit pharetra. Risus at id vulputate eu. Venenatis enim turpis dictumst odio scelerisque. Risus netus nunc et egestas. Nam orci, eget nulla enim enim euismod dis pretium sed. Elit non, consectetur ut venenatis. Placerat laoreet in nunc pharetra sed mus. Diam odio vestibulum, amet, porttitor in egestas. Rhoncus orci a mauris eget ridiculus eleifend. Diam velit orci eros, enim. Tincidunt potenti porta in vitae. Egestas imperdiet felis ultricies non interdum. In lorem aliquet in aliquet diam condimentum tincidunt eget. Consectetur in placerat semper euismod ut.
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

Overview.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Overview);
