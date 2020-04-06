import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { Autocomplete } from '@material-ui/lab';


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

const SMSConfigs = props => {
  const classes = useStyles();

  const {
    smsProviderData,
    smsConfigData,
    loading,
    currentUser,
    dispatchCreateSmsConfigAction,
    testConnectionDialog,
    openTestConnectionDialogAction
  } = props;

  const [values, setValues] = React.useState({
    gatewayUrl: "",
    orgId: currentUser.organisation.orgId,
    password: "",
    sender_id: "",
    smsProvider: "",
    username: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, smsProvider: value });
  };
  console.log('smsConfigData -> ', smsConfigData);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   const { gatewayUrl, username, password, sender_id } = smsConfigData;
  //   setValues({ ...values, gatewayUrl, username, password, sender_id });
  // }, []);

  const canSubmitForm = () => {
    const { smsProvider, gatewayUrl, sender_id, username, password } = values;
    return (
      smsProvider.length > 0 &&
      gatewayUrl.length > 0 &&
      sender_id.length > 0 &&
      username.length > 0 &&
      password.length > 0
    );
  };


  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <React.Fragment>
      SMS Configuration Settings
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Autocomplete
            id="combo-box-demo"
            size="medium"
            options={smsProviderData}
            getOptionLabel={option => option.providerName}
            onChange={(evt, value) => handleSelectChange(evt, value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Select SMS Provider"
                className={classes.textField}
                variant="outlined"
                placeholder="Search"
                fullWidth
              />
            )}
          />
          <Grid container spacing={3} className={classes.formStyle}>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                id="standard-gatewayUrl"
                label="Gateway Url"
                size="medium"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.gatewayUrl}
                onChange={handleChange('gatewayUrl')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                id="standard-sender_id"
                label="SMS parameter sender ID"
                size="medium"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.sender_id}
                onChange={handleChange('sender_id')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                id="standard-gatewayUrl"
                label="Enter username"
                size="medium"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.username}
                onChange={handleChange('username')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                id="standard-password"
                label="Password"
                size="medium"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className={classes.textField}
                value={values.password}
                onChange={handleChange('password')}
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => openTestConnectionDialogAction()}
            >
              Test Sample Message
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.buttonStyle} 
              onClick={() => dispatchCreateSmsConfigAction(values)}
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

SMSConfigs.propTypes = {
  // openEditColorDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
  smsProviderData: Selectors.makeSelectSmsProviderData(),
  smsConfigData: Selectors.makeSelectSmsConfigData(),
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  testConnectionDialog: Selectors.makeSelectTestConnectionDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateSmsConfigAction: evt => dispatch(Actions.createSmsConfigAction(evt)),
    openTestConnectionDialogAction: () => dispatch(Actions.openTestConnectionDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SMSConfigs);
