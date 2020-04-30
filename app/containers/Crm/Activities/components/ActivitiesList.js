/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { blue } from '@material-ui/core/colors';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ContactDialog from './ContactDialog';
import VerticalTimeline from './VerticalTimeline';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiGrid-container": {
      backgroundImage: `linear-gradient(to bottom, ${blue[50]}, #fff 80%, ${blue[50]})`,
      '& .MuiGrid-item': {
        flex: 1,
        margin: theme.spacing(0, 4),
      }
    }
  },
  textField: {
    borderRadius: theme.shape.borderRadius * 8,
  }
}));

const ActivitiesList = props => {
  const classes = useStyles();
  const { loading, GetAllCrmActivities } = props;
  const [form, setForm] = React.useState({})

  useEffect(() => {}, []);

  const handleChange = () => {}

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Activities</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                id="country"
                name="country"
                placeholder="Select country"
                select
                fullWidth
                SelectProps={{
                  className: classes.textField,
                }}
                InputProps={{
                  className: classes.textField,
                }}
                className={classes.textField}
                variant="outlined"
                label="Select a type"
                value={form.country}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="country"
                name="country"
                placeholder="Select country"
                select
                fullWidth
                SelectProps={{
                  className: classes.textField,
                }}
                className={classes.textField}
                variant="outlined"
                label="All"
                value={form.country}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="country"
                name="country"
                placeholder="Select country"
                select
                fullWidth
                SelectProps={{
                  className: classes.textField,
                }}
                className={classes.textField}
                variant="outlined"
                label="Created for contact or company"
                value={form.country}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <VerticalTimeline GetAllCrmActivities={GetAllCrmActivities} />
        </Grid>
      </Grid>
    </div>
  );
};

ActivitiesList.propTypes = {
  loading: PropTypes.bool,
  GetAllCrmActivities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  GetAllCrmActivities: Selectors.makeSelectGetAllCrmActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewContactDialogAction: () => dispatch(Actions.openNewContactDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ActivitiesList);
