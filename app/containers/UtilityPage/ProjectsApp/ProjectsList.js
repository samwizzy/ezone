import React, { memo } from 'react';
import {
  makeStyles,
  Box,
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
import apps from './components/apps.db';

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
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
    // height: `calc(100vh - 350px)`,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: theme.palette.grey[50],
    },
    '&::-webkit-scrollbar-track': {
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
      backgroundColor: theme.palette.primary.main,
    },
  },
  button: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '20px',
  },
  grid: {
    margin: theme.spacing(1, 0),
    border: `1px solid ${theme.palette.grey[50]}`,
  },
  textField: {
    width: theme.spacing(50),
    padding: theme.spacing(0),
    borderRadius: theme.spacing(4),
  },
  box: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    //flex: '1 0 12em', // flex-grow flex-shrink flex-basis
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
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
            <Grid container justify="space-between" className={classes.grid}>
              <Grid item xs={12}>
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
              <Grid item sm={12} md={8}>
                <Grid container justify="space-between" className={classes.grid}>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" component="h3">
                      My Apps
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

                <Grid container justify="space-between">
                  <Grid item sm={12} md={12} lg={12}>
                    <Paper square className={classes.paper} elevation={0}>
                      {apps.map(app => (
                        <Paper
                          key={app.id}
                          component={Link}
                          href={app.url}
                          className={classes.box}
                        >
                          <img src={app.icon} alt="" />
                          <Typography variant="body2">{app.name}</Typography>
                        </Paper>
                      ))}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={4}>

              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ProjectsList.propTypes = {};

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
