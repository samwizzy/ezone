import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Checkbox,
  Grid,
  Icon,
  IconButton,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardContent-root': {
      justifyContent: 'flex-end',
    },
    '& .MuiCardActions-root': {
      padding: theme.spacing(1, 2),
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: { flexGrow: 1 },
  toolbar: {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const currencies = [
  { value: 'NGN', label: 'NGN' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const AddEmployeeSalary = props => {
  const classes = useStyles(props);
  const { loading } = props;
  const [expanded, setExpanded] = useState({
    personal: false,
    bank: false,
    salary: false,
    taxation: false,
    pension: false,
    medical: false,
    leave: false,
  });

  const [options, setOptions] = useState({
    employee: 'EXISTING',
  });

  const [form, setForm] = useState({
    employee: null,
    employeeId: null,
    branch: null,
    email: '',
    currency: null,
    amount: '',
    salaryType: null,
    department: null,
    rate: null,
    enableTax: true,
    pensionApplicable: true,
    salary: '',
    houseAllowance: '',
    transportAllowance: '',
    utilityAllowance: '',
    payeAmount: '',
    payerNumber: '',
    taxType: 'PAYE_AMOUNT',
    fundType: 'COMPANY_PENSION_FUND',
    medicalAllowanceType: 'COMPANY_MEDICAL_ALLOWANCE',
    bankName: '',
    accountName: '',
    accountNumber: '',
    certNumber: '',
    rsaPin: '',
    pensionName: '',
    pfaCode: '',
    institutionName: '',
    taxDeduction: false,
    medicalAllowance: false,
    allowanceType: '',
    cardNumber: '',
    companyContributionPercentage: '',
    employeeContributionPercentage: '',
    leaveType: '',
    NumberOfDays: '',
    openingBalance: '',
  });

  const handleExpandClick = name => () => {
    setExpanded({ ...expanded, [name]: !expanded[name] });
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleOptionsChange = event => {
    const { name, value, type, checked } = event.target;
    setOptions({ ...options, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title="New Employee Salary"
      />

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup
              aria-label="employee-type"
              name="employee"
              value={options.employee}
              onChange={handleOptionsChange}
              row
            >
              <FormControlLabel
                value="EXISTING"
                control={<Radio color="primary" />}
                label="Exiting Employee"
              />
              <FormControlLabel
                value="NEW"
                control={<Radio color="primary" />}
                label="New Employee"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Autocomplete
                  id="employee"
                  options={[]}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('employee')}
                  value={form.employee}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select employee"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Employee"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  id="employee-id"
                  options={[]}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('employeeId')}
                  value={form.employeeId}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select employee ID"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Employee ID"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  id="branch"
                  options={[]}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('branch')}
                  value={form.branch}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select branch"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Branch"
                      fullWidth
                    />
                  )}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs>
                <FormControl fullWidth>
                  <FormLabel>Gross salary</FormLabel>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Autocomplete
                        id="currency"
                        options={currencies}
                        getOptionLabel={option => option.label}
                        onChange={handleSelectChange('currency')}
                        value={form.currency}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="outlined"
                            margin="normal"
                            size="small"
                            placeholder="Currency"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        id="amount"
                        name="amount"
                        label="Amount"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={form.amount}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
                <Autocomplete
                  id="salary-type"
                  options={[]}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('salaryType')}
                  value={form.salaryType}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Salary Type"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Type"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  id="departments"
                  options={[]}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('department')}
                  value={form.department}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Salary department"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Departments"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Bank Details
        </Typography>

        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.bank,
          })}
          onClick={handleExpandClick('bank')}
          aria-expanded={expanded.bank}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.bank} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    id="bank-name"
                    name="bankName"
                    label="Bank Name"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.bankName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="account-name"
                    name="accountName"
                    label="Account Name"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.accountName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="account-number"
                    name="accountNumber"
                    label="Account Number"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.accountNumber}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Gross Salary
        </Typography>

        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.salary,
          })}
          onClick={handleExpandClick('salary')}
          aria-expanded={expanded.salary}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.salary} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    id="salary"
                    name="salary"
                    label="Basic Salary"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.salary}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="house-allowance"
                    name="houseAllowance"
                    label="Housing Allowance"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.houseAllowance}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="transport-allowance"
                    name="transportAllowance"
                    label="Transport Allowance"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.transportAllowance}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item>
                  <TextField
                    id="utility-allowance"
                    name="utilityAllowance"
                    label="Utility Allowance"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.utilityAllowance}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Taxation
        </Typography>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.taxation,
          })}
          onClick={handleExpandClick('taxation')}
          aria-expanded={expanded.taxation}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.taxation} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.enableTax}
                    onChange={handleChange}
                    name="enableTax"
                    color="primary"
                  />
                }
                label="Enable Employee Tax"
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="tax-type"
                name="taxType"
                value={form.taxType}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="PAYE_AMOUNT"
                  control={<Radio color="primary" />}
                  label="PAYE Amount"
                />
                <FormControlLabel
                  value="WITHHOLDING_TAX"
                  control={<Radio color="primary" />}
                  label="Withholding Tax"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    id="paye-amount"
                    name="payeAmount"
                    label="PAYE Amount"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.payeAmount}
                    onChange={handleChange}
                  />
                  <TextField
                    id="payer-number"
                    name="payerNumber"
                    label="Employee Tax Payer number"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.payerNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Autocomplete
                          id="rates"
                          options={[]}
                          getOptionLabel={option => option.label}
                          onChange={handleSelectChange('rate')}
                          value={form.currency}
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Rate (%)"
                              margin="normal"
                              size="small"
                              placeholder="Currency"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          id="amount"
                          name="amount"
                          label="Amount"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={form.amount}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid item xs />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Employee Pension
        </Typography>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.pension,
          })}
          onClick={handleExpandClick('pension')}
          aria-expanded={expanded.pension}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.pension} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.pensionApplicable}
                        onChange={handleChange}
                        name="pensionApplicable"
                        color="primary"
                      />
                    }
                    label="Pension Applicable"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.taxDeduction}
                        onChange={handleChange}
                        name="taxDeduction"
                        color="primary"
                      />
                    }
                    label="Tax Deductable"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Fund type</FormLabel>
                <RadioGroup
                  aria-label="fund-type"
                  name="fundType"
                  value={form.fundType}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="COMPANY_PENSION_FUND"
                    control={<Radio color="primary" />}
                    label="Company Pension Fund only"
                  />
                  <FormControlLabel
                    value="EMPLOYEE_COMPANY_PENSION_FUND"
                    control={<Radio color="primary" />}
                    label="Employee and Company Pension Fund"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    id="company-contribution-percentage"
                    name="companyContributionPercentage"
                    label="Company contribution Percentage"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.companyContributionPercentage}
                    onChange={handleChange}
                  />
                  <TextField
                    id="cert-number"
                    name="certNumber"
                    label="Pension fund Cetificate number"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.certNumber}
                    onChange={handleChange}
                  />
                  <TextField
                    id="rsa-pin"
                    name="rsaPin"
                    label="Employee RSA PIN"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.rsaPin}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="employee-contribution-percentage"
                    name="employeeContributionPercentage"
                    label="Employee contribution Percentage"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.employeeContributionPercentage}
                    onChange={handleChange}
                  />
                  <TextField
                    id="pension-name"
                    name="pensionName"
                    label="Pension Fund Name"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.pensionName}
                    onChange={handleChange}
                  />
                  <TextField
                    id="pfa-code"
                    name="pfaCode"
                    label="Employee PFA Code"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.pfaCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="institution-name"
                    name="institutionName"
                    label="Pension Fund Institution Name"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.institutionName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Medical Allowance
        </Typography>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.medical,
          })}
          onClick={handleExpandClick('medical')}
          aria-expanded={expanded.medical}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.medical} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.medicalAllowance}
                        onChange={handleChange}
                        name="medicalAllowance"
                        color="primary"
                      />
                    }
                    label="Employee has Medical Allowance"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.taxDeduction}
                        onChange={handleChange}
                        name="taxDeduction"
                        color="primary"
                      />
                    }
                    label="Tax Deductable"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="medical-allowance-type"
                  name="medicalAllowanceType"
                  value={form.medicalAllowanceType}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="COMPANY_MEDICAL_ALLOWANCE"
                    control={<Radio color="primary" />}
                    label="Company Medical Allowance only"
                  />
                  <FormControlLabel
                    value="EMPLOYEE_COMPANY_MEDICAL_ALLOWANCE"
                    control={<Radio color="primary" />}
                    label="Employee and Company Medical Allowance"
                  />
                  <FormControlLabel
                    value="EMPLOYEE_MEDICAL_ALLOWANCE"
                    control={<Radio color="primary" />}
                    label="Employee Medical Allowance only"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    id="company-contribution-percentage"
                    name="companyContributionPercentage"
                    label="Company contribution Percentage"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.companyContributionPercentage}
                    onChange={handleChange}
                  />
                  <Autocomplete
                    id="allowanceType"
                    options={[]}
                    getOptionLabel={option => option.label}
                    onChange={handleSelectChange('allowanceType')}
                    value={form.allowanceType}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Medical Allowance Type"
                        margin="normal"
                        size="small"
                        placeholder="Allowance Type"
                        fullWidth
                      />
                    )}
                  />
                  <TextField
                    id="card-number"
                    name="cardNumber"
                    label="Card Number"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.cardNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="contribution-percentage"
                    name="employeeContributionPercentage"
                    label="Employee contribution Percentage"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.employeeContributionPercentage}
                    onChange={handleChange}
                  />
                  <TextField
                    id="amount"
                    name="amount"
                    label="Amount ( NGN )"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.amount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <CardActions>
        <Typography variant="button" className={classes.title}>
          Leave
        </Typography>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded.leave,
          })}
          onClick={handleExpandClick('leave')}
          aria-expanded={expanded.leave}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded.leave} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    id="leave-type"
                    name="leaveType"
                    label="Leave Type"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.leaveType}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="number-of-days"
                    name="NumberOfDays"
                    label="Number of Days"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.NumberOfDays}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="opening-balance"
                    name="openingBalance"
                    label="Opening Balance ( Days )"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={form.openingBalance}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

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
)(AddEmployeeSalary);
