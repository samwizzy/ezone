import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Button,
  CardActions,
  Paper,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup
} from '@material-ui/core';
import _ from 'lodash';
import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/ArrowForward';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  formControl: {}
}));

const taxMethods = [
  { label: 'Method 1', value: 'Method 1' },
  { label: 'Method 2', value: 'Method 2' },
  { label: 'Method 3', value: 'Method 3' },
];

const FinancialYearSetup = props => {
  const classes = useStyles();
  const {
    form,
    handleNext,
    handleChange,
    handleCheckChange,
    handleSelectChange,
  } = props;

  const canSubmitValues = () =>
    form.taxPayerNumber &&
    form.taxMethod &&
    form.pensionCode &&
    form.allowNHFNumber &&
    form.nhfNumber > 0;

  return (
    <div>
      <Paper square elevation={0} className={classes.paper}>
        <Grid item xs={12}>
          <TextField
            id="tax-payer-number"
            name="taxPayerNumber"
            label="Company Tax Payer Number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.taxPayerNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="pension-code"
            name="pensionCode"
            label="Pension Employer’s Code"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.pensionCode}
            onChange={handleChange}
          />
        </Grid>

        <FormControl component="fieldset" margin="normal">
          <FormControlLabel
            value="NHF Number"
            name="allowNHFNumber"
            onChange={handleChange}
            checked={Boolean(form.allowNHFNumber)}
            control={<Checkbox color="primary" />}
            label="NHF Number"
            labelPlacement="end"
          />
        </FormControl>

        {form.allowNHFNumber &&
          <Grid item xs>
            <TextField
              id="nhf-number"
              name="nhfNumber"
              label="NHF Number"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.nhfNumber}
              onChange={handleChange}
            />

            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={form.nhfOptions.NHIS_Code} onChange={handleCheckChange} value="NHIS_Code" name="nhfOptions" />}
                  label="NHIS Code"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.nhfOptions.ITF_Number} onChange={handleCheckChange} value="ITF_Number" name="nhfOptions" />}
                  label="ITF Number"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.nhfOptions.NSITF_Number} onChange={handleCheckChange} value="NSITF_Number" name="nhfOptions" />}
                  label="NSITF Number"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        }

        <Autocomplete
          id="Tax Calculation Method"
          style={{ width: 300 }}
          options={taxMethods}
          onChange={handleSelectChange('taxMethod')}
          value={form.taxMethod}
          autoHighlight
          getOptionLabel={option => option.label}
          renderInput={params => (
            <TextField
              {...params}
              label="Choose a Tax Calculation Method"
              variant="outlined"
              margin="normal"
            />
          )}
        />

        <Typography variant="overline" component="h1" gutterBottom>
          Your Financial year or Accounting method cannot change after Setup is
          completed
        </Typography>
      </Paper>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!canSubmitValues()}
          onClick={handleNext}
          endIcon={<SendIcon />}
        >
          Next
        </Button>
      </CardActions>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(FinancialYearSetup);
