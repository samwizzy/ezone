/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import ScheduleDialog from './ScheduleDialog';
import ParticipantDialog from './ParticipantDialog';
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
    borderRadius: theme.shape.borderRadius * 5,
  }
}));

const SchedulesList = props => {
  const classes = useStyles();
  const { loading } = props;
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
          <Typography variant="h6">Schedules</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            
          </Grid>
          <Grid container spacing={4}>
            
          </Grid>
        </Grid>
      </Grid>

      <ScheduleDialog />
      <ParticipantDialog />
    </div>
  );
};

SchedulesList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewScheduleDialog: () => dispatch(Actions.openNewScheduleDialog()),
    openNewParticipantDialog: () => dispatch(Actions.openNewParticipantDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SchedulesList);
