import React, { memo, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EzoneUtils from "../../../utils/EzoneUtils"
import clsx from 'clsx';
import {
  makeStyles,
  CircularProgress,
  Checkbox,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Actions from "./../actions"
import * as Selectors from "./../selectors"
import { createStructuredSelector } from 'reselect';
import apps from './../apps.db';

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
  },
  button: {
    padding: theme.spacing(1, 4),
    borderRadius: '50px',
    marginLeft: theme.spacing(1),
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
    '&.color': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '& img': {
      height: '40px',
      marginBottom: theme.spacing(1),
    },
    '& p': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiCheckbox-root': { },
  },
}));

const ProjectsList = props => {
  const {loading, modules, history, registerModules, regModsDetails } = props;
  const classes = useStyles();
  const [state, setState] = useState({ apps: [], text: '' });
  const [selected, setSelected] = useState({
    moduleOfferIds: [],
  });

  console.log(loading, "loading")
  console.log(regModsDetails, "regModsDetails")

  // useEffect(() => {
  //   if(regModsDetails){
  //     history.push("/applications/payment-summary")
  //   }
  // }, [regModsDetails]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, apps: modules }));
  }, [modules]);

  const handleCheck = event => {
    const { value } = event.target;
    selected.moduleOfferIds.includes(value)
      ? setSelected({
          moduleOfferIds: selected.moduleOfferIds.filter(id => value !== id),
        })
      : setSelected({
          moduleOfferIds: [...selected.moduleOfferIds, value],
        });
  };

  const handleRegister = () => {
    registerModules(selected);
    history.push("/applications/payment-summary")
  }

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

  console.log(selected, "selected")

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
                      Access Offers
                    </Typography>
                    <Typography variant="caption" component="h3">
                      Select from the applications below
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => history.goBack()}
                      className={classes.button}
                    >
                      Go back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleRegister}
                      disabled={!selected.moduleOfferIds.length}
                      startIcon={loading && <CircularProgress color="inherit" size={20} />}
                    >
                      Register modules
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item sm={12} md={12} lg={12}>
                    <Paper square className={classes.paper} elevation={0}>
                      <Table>
                        <TableBody>
                          {state.apps.map(app => (
                            <TableRow key={app.id} className={clsx(classes.box, { color: selected.moduleOfferIds.includes(app.id.toString()) })}> 
                              <TableCell>
                                <Checkbox value={app.id} checked={selected.moduleOfferIds.includes(app.id.toString())} onClick={handleCheck} />
                              </TableCell>
                              <TableCell className={clsx(classes.box, { color: selected.moduleOfferIds.includes(app.id.toString()) })}>
                                {app.moduleName}
                              </TableCell>
                              <TableCell className={clsx(classes.box, { color: selected.moduleOfferIds.includes(app.id.toString()) })}>
                                {EzoneUtils.formatCurrency(app.cost)}
                              </TableCell>
                              <TableCell className={clsx(classes.box, { color: selected.moduleOfferIds.includes(app.id.toString()) })}>
                                {app.durationInMonths} months
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
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
  loading: Selectors.makeSelectLoading(),
  regModsDetails: Selectors.makeSelectRegModsDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    registerModules: (data) => dispatch(Actions.registerModules(data))
  };
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
