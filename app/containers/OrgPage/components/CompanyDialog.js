import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  withStyles,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Grid,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const CompanyDialog = props => {
  const {
    companyDialog,
    closeEditCompanyDialog,
    dispatchUpdateCompanyInfoAction,
  } = props;

  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [values, setValues] = React.useState({
    address: '',
    city: '',
    companyName: '',
    companyShortName: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    contactPersonTel: '',
    country: '',
    emailAddress: '',
    industry: '',
    language: '',
    noOfEmployees: '',
    phoneNumber: '',
    postalCode: '',
    sector: '',
    state: '',
    timeZone: '',
    website: '',
  });

  const handleSelectChange = event => {
    setCurrency(event.target.value);
  };
  const handlePanelChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  console.log(companyDialog, 'companyDialog');

  useEffect(() => {
    setValues({
      ...companyDialog.data,
    });
  }, [companyDialog.data]);

  const closeComposeDialog = () => {
    // eslint-disable-next-line no-unused-expressions
    companyDialog.type === 'new' ? '' : closeEditCompanyDialog();
  };

  return (
    <div>
      {companyDialog && (
        <Dialog
          {...companyDialog.props}
          onClose={closeComposeDialog}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <Typography variant="h6">
                {companyDialog.type === 'new' ? '' : 'Edit Company Information'}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {companyDialog.type === 'new' ? (
              <div />
            ) : (
              <div>
                <TextField
                  id="standard-companyName"
                  variant="outlined"
                  label="Company Name"
                  className={classes.textField}
                  value={values.companyName}
                  onChange={handleChange('companyName')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="standard-companyShortName"
                  variant="outlined"
                  label="Company Short Name"
                  className={classes.textField}
                  value={values.companyShortName}
                  onChange={handleChange('companyShortName')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="standard-emailAddress"
                  variant="outlined"
                  label="Company Email"
                  className={classes.textField}
                  value={values.emailAddress}
                  type="email"
                  onChange={handleChange('emailAddress')}
                  margin="normal"
                  fullWidth
                />
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={6}>
                      <TextField
                        id="standard-contactPersonTel"
                        variant="outlined"
                        label="Contact Person Tel"
                        className={classes.textField}
                        value={values.contactPersonTel}
                        onChange={handleChange('contactPersonTel')}
                        margin="normal"
                        type="number"
                        fullWidth
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        id="standard-phoneNumber"
                        variant="outlined"
                        label="Phone Number"
                        className={classes.textField}
                        value={values.phoneNumber}
                        type="number"
                        onChange={handleChange('phoneNumber')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-numberOfEmployees"
                        variant="outlined"
                        label="Number Of Employees"
                        className={classes.textField}
                        value={values.noOfEmployees}
                        type="number"
                        onChange={handleChange('noOfEmployees')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-postalCode"
                        variant="outlined"
                        label="Postal Code"
                        className={classes.textField}
                        value={values.postalCode}
                        onChange={handleChange('postalCode')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <TextField
                  id="standard-website"
                  variant="outlined"
                  label="website"
                  className={classes.textField}
                  value={values.website}
                  onChange={handleChange('website')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="standard-adminName"
                  variant="outlined"
                  label="Contact Person Name"
                  className={classes.textField}
                  value={values.contactPersonName}
                  onChange={handleChange('contactPersonName')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="standard-adminEmail"
                  variant="outlined"
                  label="Contact Person Email"
                  className={classes.textField}
                  value={values.contactPersonEmail}
                  onChange={handleChange('contactPersonEmail')}
                  margin="normal"
                  fullWidth
                />
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-contactPersonPhone"
                        variant="outlined"
                        label="Contact Person Phone"
                        className={classes.textField}
                        value={values.contactPersonPhone}
                        type="number"
                        onChange={handleChange('contactPersonPhone')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-contactPersonTel"
                        variant="outlined"
                        label="Contact Person Tel"
                        className={classes.textField}
                        value={values.contactPersonTel}
                        onChange={handleChange('contactPersonTel')}
                        margin="normal"
                        type="number"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <TextField
                  id="standard-address"
                  label="Address"
                  className={classes.textField}
                  value={values.address}
                  onChange={handleChange('address')}
                  margin="normal"
                  fullWidth
                  multiline
                  rows="2"
                />

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-industry"
                        select
                        fullWidth
                        label="Select Industry"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-sector"
                        select
                        fullWidth
                        label="Select Sector"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-country"
                        select
                        fullWidth
                        label="Select country"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-state"
                        select
                        fullWidth
                        label="Select State"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-city"
                        select
                        fullWidth
                        label="Select City"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-language"
                        select
                        fullWidth
                        label="Select Language"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {/* <TextField
                        id="standard-select-timeZone"
                        select
                        fullWidth
                        label="Time Zone"
                        value={currency}
                        onChange={handleSelectChange}
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField> */}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )}
          </DialogContent>
          {companyDialog.type === 'new' ? (
            <div />
          ) : (
            <DialogActions>
              <Button
                onClick={() => {
                  dispatchUpdateCompanyInfoAction(values);
                  closeComposeDialog();
                }}
                color="primary"
                variant="contained"
              >
                Update
              </Button>
              <Button
                onClick={() => closeComposeDialog()}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
            </DialogActions>
          )}
        </Dialog>
      )}
    </div>
  );
};

CompanyDialog.propTypes = {
  dispatchNewPostAction: PropTypes.func,
  closeNewPostDialog: PropTypes.func,
  closeEditCompanyDialog: PropTypes.func,
  companyDialog: PropTypes.object,
  dispatchUpdateCompanyInfoAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companyDialog: Selectors.makeSelectEditCompanyDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchNewPostAction: evt => dispatch(Actions.saveNewPost(evt)),
    closeEditCompanyDialog: () => dispatch(Actions.closeEditCompanyDialog()),
    dispatchUpdateCompanyInfoAction: evt =>
      dispatch(Actions.updateCompanyInfo(evt)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyDialog);
