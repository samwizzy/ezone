import React, { memo } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as Selectors from './../selectors';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import Radio from '@material-ui/core/Radio';
import * as Enums from '../enums';
import {
  makeStyles,
  Button,
  CardActions,
  Paper,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
}));


const SetChartOfAccount = (props) => {
  const classes = useStyles();
  const { form, handleChange, handleNext, handlePrev } = props

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.paper}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Chart Of Account</FormLabel>
            <RadioGroup aria-label="account-chart" name="accountChart" value={form.accountChart} onChange={handleChange}>

              <FormControlLabel
                value='CREATE'
                control={<Radio color="primary" />}
                label="Create your Chart of Accounts"
                labelPlacement="end"
              />

              <FormControlLabel
                value='IMPORT'
                control={<Radio color="primary" />}
                label="Import Existing Chart of Accounts"
                labelPlacement="end"
              />

              <FormControlLabel
                value='DEFAULT'
                control={<Radio color="primary" />}
                label="Use system generated Chart of Accounts (NonAccountants)"
                labelPlacement="end"
              />

            </RadioGroup>
          </FormControl>

          <CardActions>
            <Button
              variant="contained"
              onClick={handlePrev}
              startIcon={<BackIcon />}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<NextIcon />}
            >
              Next
            </Button>
          </CardActions>
        </Grid>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  businessTypes: Selectors.makeSelectBusinessTypes(),
  currencies: Selectors.makeSelectCurrencies(),
})

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
  memo,
)(SetChartOfAccount);
