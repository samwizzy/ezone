import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Link,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import apps from './components/apps.db'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
    overflowX: 'auto',
    paddingRight: '90px',
    "&::-webkit-scrollbar": {
      height: "6px",
      backgroundColor: theme.palette.grey[50]
    },
    "&::-webkit-scrollbar-track": {
      "-webkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
      backgroundColor: theme.palette.primary.main,
    }
  },
  button: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '20px',
  },
  grid: {
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[50]}`,
  },
  textField: {
    width: theme.spacing(50),
    padding: theme.spacing(0),
    borderRadius: '20px',
  },
  box: {
    flex: '1 0 12em', // flex-grow flex-shrink flex-basis
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    height: theme.spacing(20),
    borderRadius: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& img': {
      height: '70px',
    },
  },
}));

const ProjectsList = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid justify="space-between" container>
          <Grid item xs={12}>
            <Grid container className={classes.grid}>
              <Grid item sm={12} xs={12}>
                <TextField
                  className={classes.textField}
                  id="outlined-search"
                  label="Search Apps"
                  type="search"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container justify="space-between" className={classes.grid}>
              <Grid item sm={12} md={6} lg={6}>
                <Typography variant="h6" component="h3">
                  My Apps
                </Typography>
              </Grid>
              <Grid item sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Request App Access
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container justify="space-between">
              <Grid item sm={12} md={12} lg={12}>
                <Paper square className={classes.paper} elevation={1}>
                  {apps.map((app, index) => (
                    <Paper key={index} component={Link} href={app.url} className={classes.box}>
                      <img src={app.icon} alt="" />
                      <Typography variant="body2">{app.name}</Typography>
                    </Paper>
                  ))}
                </Paper>
              </Grid>
            </Grid>

            {/* <Calendar /> */}
            {/* <ChatBox /> */}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ProjectsList.propTypes = {
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectsList);
