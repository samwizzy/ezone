import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, Box, IconButton, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Menu, MenuItem, Grid, Paper, Table, TableBody, TableRow, TableCell, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import ScheduleIcon from '@material-ui/icons/Schedule'
import AddIcon from '@material-ui/icons/Add';
import PathImage from '../../../../../../images/pathImage.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  table: {
    display: 'flex',
    "& tr": {
      flex: '1 1 100%',
      "& td": {
        flex: '1 1 100%',
      }
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: { flexGrow: 1 },
  icon: {
    color: theme.palette.grey[800],
  },
  box: {
    display: 'flex',
    alignItems: 'center'
  },
  toolbar: {
    ...theme.mixins.toolbar,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const initialState = {
  dueDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  time: moment().format('YYYY HH:mm:ss'),
}

const Structure = props => {
  const classes = useStyles();
  const { loading, history, openNewAssignmentDialog } = props;
  const [form, setForm] = React.useState({ ...initialState });

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const openAssignmentDialog = () => {
    openNewAssignmentDialog()
    handleClose()
  }

  return (
    <Fragment>
      <Grid
        container
      >
        <Grid item md={12}>
          <Paper className={classes.paper} square>
            <List dense={true}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h6">New Stage</Typography>}
                />
              </ListItem>
            </List>
          </Paper>
          <Box className={classes.box}>
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
            <Typography>Add</Typography>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.paper} square>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>Learning Heart</Typography>
            </Toolbar>
            <Table className={classes.table}>
              <TableBody>
                {_.range(0, 2).map((row, i) =>
                  <TableRow key={i}>
                    <TableCell><img src={PathImage} alt="" /></TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">Beginner’s guide to statistics</Typography>
                    </TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="normal"
                          fullWidth
                          inputVariant="outlined"
                          id={`date-picker-dialog-${i}`}
                          label="Date"
                          size="small"
                          format="dd/MM/yyyy"
                          name="dueDate"
                          value={form.dueDate}
                          onChange={handleDateChange('dueDate')}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          margin="normal"
                          fullWidth
                          inputVariant="outlined"
                          id={`time-picker-dialog-${i}`}
                          name="time"
                          label="Time"
                          size="small"
                          value={form.time}
                          onChange={handleDateChange('time')}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                          keyboardIcon={<ScheduleIcon />}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Box className={classes.box}>
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
              <Typography>Add</Typography>
            </Box>
          </Paper>

        </Grid>
      </Grid>
    </Fragment>
  );
};

Structure.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAssignmentDialog: () => dispatch(Actions.openNewAssignmentDialog())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Structure);
