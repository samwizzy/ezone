/* eslint-disable prettier/prettier */
import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Backdrop,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  FormControlLabel,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import PdfFile from '../../../images/pdfFile.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  list: {
    "& .MuiListItemAvatar-root": {
      marginRight: theme.spacing(2)
    }
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CoursesList = props => {
  const classes = useStyles();

  const {
    loading,
    history,
    match,
    getContents,
    getAllCompanies,
    openNewContentDialog,
    openEditContentDialog,
  } = props;

  useEffect(() => {
    getContents();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const data = [
    {
      id: 1,
      title: 'Statistics for Beginners',
      category: 'Architecture',
      stats: { sections: 20, lectures: 15 },
      enrollment: 'Enrollment',
      dateCreated: '2020-06-30T15:24:16.000+0000'
    }
  ];

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar color="inherit" position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>Resources</Typography>
              <Button size="small" color="primary" variant="contained" disableElevation onClick={() => { }}>Upload</Button>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <List dense={true} className={classes.list}>
              <ListItem>
                <ListItemAvatar>
                  <img src={PdfFile} alt="" />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <React.Fragment>
                      <Typography variant="h6">
                        Intoduction to statistics  - YouTube
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <div className={classes.flex}>
                      <Typography color="textPrimary" className={classes.link}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam sagittis, placerat metus in risus.
                      </Typography>

                      <Typography color="textPrimary" className={classes.link}>
                        Course  - Beginner’s guide to Statistics
                      </Typography>
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>


    </React.Fragment>
  );
};

CoursesList.propTypes = {
  loading: PropTypes.bool,
  openNewContentDialog: PropTypes.func,
  openEditContentDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewContentDialog: () => dispatch(Actions.openNewContentDialog()),
    openEditContentDialog: evt => dispatch(Actions.openEditContentDialog(evt)),
    getContents: () => dispatch(Actions.getContents()),
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
)(CoursesList);
