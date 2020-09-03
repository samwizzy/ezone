/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  makeStyles,
  Box,
  List,
  FormControlLabel,
  Icon,
  IconButton,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { blue } from '@material-ui/core/colors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import VerticalTimeline from './components/VerticalTimeline';
import AddActivityDialog from './components/AddActivityDialog'

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
  },
  title: {
    flexGrow: 1
  }
}));

const ActivitiesList = props => {
  const classes = useStyles();
  const { loading, activities, openNewActivitiesDialog } = props;
  const [form, setForm] = React.useState({ type: '', createdBy: '', all: '' })

  const orderedActivities = _.orderBy(activities, ['dateCreated'], ['desc'])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  console.log(activities, "crm activities")

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>Activities</Typography>
            {/* <IconButton onClick={openNewActivitiesDialog}><AddIcon fontSize="large" /></IconButton> */}
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                id="type"
                name="type"
                placeholder="Select type"
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
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem key={0} value="">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="all"
                name="all"
                placeholder="Select all"
                select
                fullWidth
                SelectProps={{
                  className: classes.textField,
                }}
                className={classes.textField}
                variant="outlined"
                label="All"
                value={form.all}
                onChange={handleChange}
              >
                <MenuItem key={0} value="">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="created-by"
                name="createdBy"
                placeholder="Select created by"
                select
                fullWidth
                SelectProps={{
                  className: classes.textField,
                }}
                className={classes.textField}
                variant="outlined"
                label="Created for contact or company"
                value={form.createdBy}
                onChange={handleChange}
              >
                <MenuItem key={0} value="">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {activities && activities.length > 0
            ? <VerticalTimeline activities={orderedActivities} />
            :
            <Box>
              <Typography variant="subtitle2" align="center">No activities has been recorded</Typography>
            </Box>
          }
        </Grid>
      </Grid>
    </div>
  );
};

ActivitiesList.propTypes = {
  loading: PropTypes.bool,
  activities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activities: Selectors.makeSelectGetAllCrmActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewActivitiesDialog: () => dispatch(Actions.openNewActivitiesDialog()),
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
