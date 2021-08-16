import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import {
  makeStyles,
  Button,
  CardActions,
  Paper,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const SetChartOfAccount = props => {
  const classes = useStyles();
  const { form, handleChange, handleNext, handlePrev } = props;

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.paper}>
        <Grid item xs>
          <Typography variant="h6">Accounts setup</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="salary-reporting"
            name="salaryReporting"
            label="Account head for salary reporting"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.salaryReporting}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="tax-reporting"
            name="taxReporting"
            label="Account head for tax reporting"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.taxReporting}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="pension-reporting"
            name="pensionReporting"
            label="Account head for pension reporting"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.pensionReporting}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="nhf-reporting"
            name="nhfReporting"
            label="Account head for NHF reporting"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.nhfReporting}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs className={classes.margin}>
          <CardActions>
            <Button
              variant="contained"
              onClick={handlePrev}
              startIcon={<BackIcon />}
              disableElevation
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<NextIcon />}
              disableElevation
            >
              Next
            </Button>
          </CardActions>
        </Grid>
      </Paper>
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
)(SetChartOfAccount);
