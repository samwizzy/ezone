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
  InputLabel,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import CountriesAndStates from '../../../../utils/countries_states.json';

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

const countries = [
  {
    value: 'English',
    label: 'English',
  },
  {
    value: 'French',
    label: 'French',
  },
];

const industries = [
  {
    value: 'Agriculture Industry',
    label: 'Agriculture Industry',
  },
  {
    value: 'Real Estate/Construction',
    label: 'Real Estate/Construction',
  },
  {
    value: 'Consumer Goods',
    label: 'Consumer Goods',
  },
  {
    value: 'Healthcare',
    label: 'Healthcare',
  },
  {
    value: 'Industrial Goods',
    label: 'Industrial Goods',
  },
  {
    value: 'Natural Resources',
    label: 'Natural Resources',
  },
  {
    value: 'Oil And Gas',
    label: 'Oil And Gas',
  },
  {
    value: 'Services',
    label: 'Services',
  },
  {
    value: 'Utilities',
    label: 'Utilities',
  },
];

let getCountry;
let getStates;

const CompanyDialog = props => {
  const {
    loading,
    companyDialog,
    closeEditCompanyDialog,
    dispatchUpdateCompanyInfoAction,
  } = props;

  const classes = useStyles();
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

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const SelectState = name => {
    getCountry = CountriesAndStates.filter(data => data.name === name);
  };

  if (getCountry) {
    getCountry.map(data => {
      getStates = data.states.map(data2 => {
        return data2;
      });
    });
  }

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
                        value={values.postalCode ? values.postalCode : ''}
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
                  variant="outlined"
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
                        variant="outlined"
                        label="Select Industry"
                        value={values.industry ? values.industry : ''}
                        onChange={handleSelectChange('industry')}
                      >
                        <InputLabel id="select-industry-label">
                          Select Industry
                        </InputLabel>
                        {industries.map(option => (
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
                        variant="outlined"
                        label="Select Language"
                        value={values.language ? values.language : ''}
                        onChange={handleSelectChange('language')}
                      >
                        {countries.map(option => (
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
                      {/* <Autocomplete
                        id="combo-itemCategory"
                        options={CountriesAndStates}
                        getOptionLabel={option => option.name}
                        onChange={(evt, ve) => handleSelectChange(evt, ve)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Country"
                            variant="outlined"
                            placeholder="Select Country"
                            fullWidth
                          />
                        )}
                      /> */}
                      <TextField
                        id="standard-select-country"
                        select
                        fullWidth
                        label="Select country"
                        variant="outlined"
                        value={values.country ? values.country : ''}
                        onChange={handleSelectChange('country')}
                        onClick={SelectState(values.country)}
                      >
                        <InputLabel id="select-country-label">
                          Select Country
                        </InputLabel>
                        {CountriesAndStates.map(option => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-state"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select State"
                        value={values.state ? values.state : ''}
                        onChange={handleSelectChange('state')}
                      >
                        <InputLabel id="select-country-label">
                          Select State
                        </InputLabel>
                        {getStates &&
                          getStates.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-select-city"
                        fullWidth
                        variant="outlined"
                        label="Select City"
                        value={values.city}
                        onChange={handleChange('city')}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
              {loading ? (
                <LoadingIndicator />
              ) : (
                <Button
                  onClick={() => {
                    dispatchUpdateCompanyInfoAction(values);
                    // closeComposeDialog();
                  }}
                  color="primary"
                  variant="contained"
                >
                  Update
                </Button>
              )}
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
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  companyDialog: Selectors.makeSelectEditCompanyDialog(),
  loading: Selectors.makeSelectLoading(),
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
