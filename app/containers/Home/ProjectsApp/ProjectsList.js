import React, { memo } from 'react';
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
import * as AppSelectors from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { Title } from '../../../components';
import SkeletonList from './SkeletonList';

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
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(2),
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
    '& img': {
      marginBottom: theme.spacing(1),
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  button: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '20px',
  },
  grid: {
    margin: theme.spacing(1, 0),
  },
  textField: {
    width: theme.spacing(50),
    padding: theme.spacing(0),
    borderRadius: theme.spacing(4),
  },
  box: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    flex: '0 1 11.1em', // flex-grow flex-shrink flex-basis
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
    },
  },
}));

const ProjectsList = props => {
  const { applications: apps, accessToken, currentUser } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({ apps, text: '' });

  console.log(currentUser, 'currentUser');

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
                  label="Search apps"
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
                  alignItems="center"
                  className={classes.grid}
                >
                  <Grid item xs={6} md={6}>
                    <Title>My apps</Title>
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
                      color="primary"
                      disabled
                      className={classes.button}
                    >
                      Request App Access
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item sm={12} md={12} lg={12}>
                    {apps.length > 0 ? (
                      <Paper square className={classes.paper} elevation={0}>
                        {apps.map((app, i) => (
                          <Paper key={i} className={classes.box}>
                            <img src={app.icon} alt={app.moduleName} />
                            <Typography variant="body2">
                              <a
                                href={`${
                                  app.urlPath
                                }?token=${accessToken}&orgId=${
                                  currentUser.organisation.orgId
                                }`}
                              >
                                {app.moduleName.replace('_', ' ')}
                              </a>
                            </Typography>
                          </Paper>
                        ))}
                      </Paper>
                    ) : (
                      <SkeletonList />
                    )}
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
  memo,
)(ProjectsList);
