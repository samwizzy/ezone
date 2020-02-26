import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

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
    dispatchGetSmsProviderAction, 
    smsProviderData
  } = props;

  console.log('smsProviderData:- ', smsProviderData);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetSmsProviderAction();
  }, []);

  return (
    <React.Fragment>
      SMS Configuration Settings
      <Card className={classes.card} variant="outlined">
        <CardContent>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="demo-simple-select-outlined-label">
            SMS
          </InputLabel> */}
          <FormHelperText><h3>Select SMS Provider</h3></FormHelperText>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={age}
            // onChange={handleChange}
            // labelWidth={labelWidth}
          >
            <MenuItem value="oko">
              <em>None</em>
            </MenuItem>

            {smsProviderData.map((item) => {
              <MenuItem 
                key={item.id}
                value={item.id}
              >
                {item.providerName}
              </MenuItem>
            })}
            
          </Select>
        </FormControl>
          <Grid container spacing={3} className={classes.formStyle}>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-SMS-Gateway-URL"
                  label="SMS Gateway URL"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-Message-Parameter"
                  label="Message Parameter"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-Receiver-Parameter"
                  label="Receiver Parameter"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-Password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-SMS-parameter-sender-ID"
                  label="SMS parameter sender ID"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div>
                <TextField
                  id="outlined-SMS-sending-model"
                  label="SMS-sending-model"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
            >
              Cancel
            </Button>
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
});

function mapDispatchToProps(dispatch) {
  return {
    // openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
    dispatchGetSmsProviderAction: evt => dispatch(Actions.getSmsProviderAction(evt)),
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
