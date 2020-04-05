/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  List, 
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import envelope from '../../images/envelope.svg';
import directory from '../../images/directory.svg';
import mail from '../../images/mail.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  grid: {
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(5)
    }
  },
  list: {},
  card: {
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[200]}`,
    '& a': {
      textDecoration: 'none'
    }
  },
  cardIcon: {
  },
  cardContent: {
  },
}));


const EmailHome = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <Card
            className={classes.card}
            variant="outlined"
          >
            <CardContent component={RouterLink} to="/email/configuration">
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <img alt="" src={envelope} className={classes.cardIcon} />
                  </ListItemAvatar>
                  <ListItemText primary="Email / SMS Configuration" secondary="Jan 9, 2014" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            className={classes.card}
            variant="outlined"
          >
            <CardContent component={RouterLink} to="/email">
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <img alt="" src={directory} className={classes.cardIcon} />
                  </ListItemAvatar>
                  <ListItemText primary="AD Configuration" secondary="Jan 9, 2014" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            className={classes.card}
            variant="outlined"
          >
            <CardContent component={RouterLink} to="/email/template">
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <img alt="" src={mail} className={classes.cardIcon} />
                  </ListItemAvatar>
                  <ListItemText primary="Email Templates" secondary="Jan 9, 2014" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

EmailHome.propTypes = {};

const mapStateToProps = createStructuredSelector({});

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
)(EmailHome);