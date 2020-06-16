import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  withStyles,
  CircularProgress,
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
import CountriesAndStates from '../../../../utils/countries_states.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
    updateCompanyInfo,
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
      getStates = data.states.map(data2 => data2);
    });
  }

  useEffect(() => {
    // trigger this action to pre-populate state for edit
    if (companyDialog.data) {
      SelectState(companyDialog.data.country);
    }
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

          <DialogContent dividers>
            {companyDialog.type === 'new' ? (
              <div />
            ) : (
                <div>
                  <TextField
                    id="standard-companyName"
                    name="companyName"
                    variant="outlined"
                    label="Company Name"
                    value={values.companyName ? values.companyName : ''}
                    onChange={handleChange('companyName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-companyShortName"
                    name="companyShortName"
                    variant="outlined"
                    label="Company Short Name"
                    value={values.companyShortName ? values.companyShortName : ''}
                    onChange={handleChange('companyShortName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-emailAddress"
                    name="emailAddress"
                    variant="outlined"
                    label="Company Email"
                    value={values.emailAddress ? values.emailAddress : ''}
                    type="email"
                    onChange={handleChange('emailAddress')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-phoneNumber"
                    name="phoneNumber"
                    variant="outlined"
                    label="Phone Number"
                    value={values.phoneNumber ? values.phoneNumber : ''}
                    type="number"
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                    fullWidth
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-numberOfEmployees"
                        name="noOfEmployees"
                        variant="outlined"
                        label="Number Of Employees"
                        value={values.noOfEmployees ? values.noOfEmployees : ''}
                        type="number"
                        onChange={handleChange('noOfEmployees')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-postalCode"
                        name="postalCode"
                        variant="outlined"
                        label="Postal Code"
                        value={values.postalCode ? values.postalCode : ''}
                        onChange={handleChange('postalCode')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    id="standard-website"
                    name="website"
                    variant="outlined"
                    label="Website"
                    value={values.website ? values.website : ''}
                    onChange={handleChange('website')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-adminName"
                    name="contactPersonName"
                    variant="outlined"
                    label="Contact Person Name"
                    value={values.contactPersonName ? values.contactPersonName : ''}
                    onChange={handleChange('contactPersonName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-adminEmail"
                    name="contactPersonEmail"
                    variant="outlined"
                    label="Contact Person Email"
                    value={values.contactPersonEmail ? values.contactPersonEmail : ''}
                    onChange={handleChange('contactPersonEmail')}
                    margin="normal"
                    fullWidth
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-contactPersonPhone"
                        name="contactPersonPhone"
                        variant="outlined"
                        label="Contact Person Phone"
                        value={values.contactPersonPhone ? values.contactPersonPhone : ''}
                        type="number"
                        onChange={handleChange('contactPersonPhone')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-contactPersonTel"
                        name="contactPersonTel"
                        variant="outlined"
                        label="Contact Person Tel"
                        value={values.contactPersonTel ? values.contactPersonTel : ''}
                        onChange={handleChange('contactPersonTel')}
                        margin="normal"
                        type="number"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    id="standard-address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={values.address ? values.address : ''}
                    onChange={handleChange('address')}
                    margin="normal"
                    fullWidth
                    multiline
                    rows="2"
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-select-industry"
                        name="industry"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select Industry"
                        value={values.industry ? values.industry : ''}
                        onChange={handleSelectChange('industry')}
                        margin="normal"
                      >
                        <MenuItem key="" value="">
                          Select Industry
                        </MenuItem>
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
                        name="language"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select Language"
                        value={values.language ? values.language : ''}
                        onChange={handleSelectChange('language')}
                        margin="normal"
                      >
                        {countries.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
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
                        margin="normal"
                      >
                        <MenuItem key="" value="">
                          Select Country
                        </MenuItem>
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
                        name="state"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select State"
                        value={values.state ? values.state : ''}
                        onChange={handleSelectChange('state')}
                        margin="normal"
                      >
                        <MenuItem key="" value="">
                          Select State
                        </MenuItem>
                        {getStates && getStates.map(option =>
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        )}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-select-city"
                        name="city"
                        fullWidth
                        variant="outlined"
                        label="Select City"
                        value={values.city ? values.city : ''}
                        onChange={handleChange('city')}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => updateCompanyInfo(values)}
              color="primary"
              variant="contained"
              disabled={loading && loading}
              endIcon={loading && <CircularProgress size={20} />}
            >
              {companyDialog.type === 'new' ? "Save" : "Save"}
            </Button>
            <Button
              onClick={() => closeComposeDialog()}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

CompanyDialog.propTypes = {
  closeEditCompanyDialog: PropTypes.func,
  companyDialog: PropTypes.object,
  updateCompanyInfo: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  companyDialog: Selectors.makeSelectEditCompanyDialog(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeEditCompanyDialog: () => dispatch(Actions.closeEditCompanyDialog()),
    updateCompanyInfo: evt => dispatch(Actions.updateCompanyInfo(evt)),
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
