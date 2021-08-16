import React, { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import apps from './../apps.db';
import * as AppSelectors from '../../App/selectors';

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
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(2),
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
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: "none"
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
    flex: '0 1 11em', // flex-grow flex-shrink flex-basis
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& img': {
      height: '70px',
      marginBottom: theme.spacing(1),
    },
  },
}));

const ProjectsList = props => {
  const { modules, match, accessToken, currentUser } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({ apps: [], text: '' });

  console.log(accessToken, "accessToken")

  React.useEffect(() => {
    setState(prevState => ({ ...prevState, apps: apps }));
  }, []);

  const handleTextChange = e => {
    const value = e.target.value;
    let filteredApps = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      filteredApps = apps.sort().filter(v => regex.test(v.name));
    } else {
      filteredApps = [...apps];
    }

    setState(() => ({
      apps: filteredApps,
      text: value,
    }));
  };

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
                  value={state.text}
                  onChange={handleTextChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container justify="space-between" className={classes.grid}>
              <Grid item sm={12} md={8}>
                <Grid
                  container
                  justify="space-between"
                  className={classes.grid}
                >
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" component="h3">
                      My Apps
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      type="button"
                      variant="contained"
                      component={Link}
                      to="/applications/access-offers"
                      color="primary"
                      className={classes.button}
                    >
                      Buy Application
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item sm={12} md={12} lg={12}>
                    <Paper square className={classes.paper} elevation={0}>
                      {state.apps.map((app, i) => (
                        <Paper
                          key={i}
                          className={classes.box}
                        >
                          <img src={app.icon} alt={app.name} />
                          <Typography variant="body2">
                            <a href={`${app.url}?token=${accessToken}&orgId=${currentUser.organisation.orgId}`}>{app.name.replace("_", " ")}</a>
                          </Typography>
                        </Paper>
                      ))}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={4} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ProjectsList.propTypes = {};

const mapStateToProps = createStructuredSelector({
  accessToken: AppSelectors.makeSelectAccessToken(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(ProjectsList);
