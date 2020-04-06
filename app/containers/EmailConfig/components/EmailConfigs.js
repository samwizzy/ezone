import React, { memo, useEffect } from 'react';
import * as AppSelectors from '../../App/selectors';

import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';


const useStyles = makeStyles(theme => ({
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
    margin: theme.spacing(1, 2, 1, 4),
  },
  formStyle: {
    padding: theme.spacing(2),
  },
  header: {
    margin: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.5)',
  },
  buttonStyle: {
    margin: theme.spacing(2),
  },
}));

const EmailConfigs = props => {
  const classes = useStyles();

  const { 
    dispatchUpdateEmailConfigAction,
    dispatchTestEmailConfigConnectionAction,
    emailConfigData,
    testEmailConfigConnectionData,
    loading,
    currentUser
  } = props;

  const [values, setValues] = React.useState({
    orgId: currentUser.organisation.orgId,
    host: '',
    port: '',
    username: '',
    password: '',
    tls: false,
    tlsRequired: false,
    authenticate: false
  });

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.type === 'checkbox'? event.target.checked : event.target.value });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('emailConfigData --> ', emailConfigData);

    // const { gatewayUrl, username, password, sender_id } = smsConfigData;
    // setValues({ ...values, gatewayUrl, username, password, sender_id });

    // setValues({
    //   ...emailConfigData,
    //   tls: emailConfigData.isTlsEnabled,
    //   tlsRequired: emailConfigData.isTlsRequired,
    //   authenticate: emailConfigData.isAuth
    // });
  }, []);

  const canSubmitForm = () => {
    const { host, port, username, password } = values;
    return (
      host.length > 0 &&
      port.length > 0 &&
      username.length > 0 &&
      password.length > 0
    );
  };

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <React.Fragment>
      Email Configuration Settings
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Grid container spacing={3} className={classes.formStyle}>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                name="host"
                value={values.host}
                id="host"
                label="Host Name"
                size="medium"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <TextField
                name="port"
                value={values.port}
                id="outlined-Port"
                label="Port"
                size="medium"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Divider component="hr" />
          <Typography variant="h6" component="h6" className={classes.header}>
            Security and Authentication
          </Typography>
          <Grid container spacing={3} className={classes.formStyle}>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                name="username"
                value={values.username}
                id="outlined-Username"
                label="Username"
                size="medium"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                name="password"
                value={values.password}
                id="outlined-Password"
                label="Password"
                size="medium"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <FormGroup>
          <FormControlLabel
            value={values.tls}
            control={<Checkbox checked={values.tls} name="tls" onChange={handleChange} value="tls" />}
            label="TLS"
          />
          <FormControlLabel
            value={values.tlsRequired}
            control={<Checkbox checked={values.tlsRequired} name="tlsRequired" onChange={handleChange} value="tlsRequired" />}
            label="TLS Required"
          />
          <FormControlLabel
            value={values.authenticate}
            control={
              <Checkbox checked={values.authenticate} onChange={handleChange} name="authenticate" value="authenticate" />
            }
            label="Authentication"
          />
        </FormGroup>
        <Grid item xs={12} md={6} lg={6}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => dispatchTestEmailConfigConnectionAction(values)}
          >
            Test Connection
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.buttonStyle} 
            onClick={() => dispatchUpdateEmailConfigAction(values)}
            disabled={!canSubmitForm()}
          >
            Save
          </Button>
          {/* <Button 
            variant="contained" 
            color="primary" 
            className={classes.buttonStyle}
          >
            Cancel
          </Button> */}
        </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

EmailConfigs.propTypes = {
  // openEditColorDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelectors.makeSelectCurrentUser(),
  emailConfigData: Selectors.makeSelectUserEmailConfigData(),
  testEmailConfigConnectionData: Selectors.makeSelectUserTestConnectionData(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateEmailConfigAction: evt => dispatch(Actions.updateEmailConfigAction(evt)),
    dispatchTestEmailConfigConnectionAction: evt => dispatch(Actions.testEmailConnectionAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmailConfigs);
