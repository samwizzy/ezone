import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  Typography,
  Toolbar,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  toolbar: {
    padding: theme.spacing(0, 2),
    borderBottom: `1px dotted ${theme.palette.divider}`,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    borderRadius: 0,
    boxShadow: theme.shadows[0],
  },
}));

const PayrunSettings = props => {
  const classes = useStyles(props);
  const { history, match, payrunSettings } = props;
  const [form, setForm] = useState({
    allowPayslip: false,
    schedule: '',
    period: 'days',
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  if (!payrunSettings) {
    // return "No Setting available";
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Payrun settings"
        action={
          <IconButton onClick={() => {}}>
            <EditIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Automatically send out payslips</Grid>
                <Grid item>
                  <FormControlLabel
                    title="Automatically send out payslips"
                    control={
                      <Switch
                        checked={form.allowPayslip}
                        onChange={handleChange}
                        name="allowPayslip"
                        color="primary"
                      />
                    }
                    label="ON"
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>
                <TextField
                  id="schedule"
                  name="schedule"
                  label="Schedule"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={form.schedule}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="period"
                  select
                  name="period"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={form.period}
                  onChange={handleChange}
                >
                  {['days', 'weeks', 'months', 'years'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>After Pay Run Approval</Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  payrunSettings: Selectors.makeSelectGetPayRunSettingsData(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(PayrunSettings);
