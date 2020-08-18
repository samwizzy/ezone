import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Avatar, Box, Button, Card, CardHeader, CardContent, CardActions, IconButton, FormControl, FormLabel, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Menu, MenuItem, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    boxShadow: theme.shadows[1],
    borderRadius: 0,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  ml: { marginLeft: theme.spacing(1) },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3)
  },
  title: { flexGrow: 1 },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  }
}));

const AddClassroom = props => {
  const classes = useStyles();
  const { loading, history, createStudent } = props;
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    course: null,
    date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    startTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    endTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    timezone: null,
    zoomId: '',
    zoomPassword: '',
    participants: '',
  });

  React.useEffect(() => { }, [])

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH::mm:ss.SSS') });
  };

  const handleSelectChange = name => (e, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const canSubmitForm = () => {
    const { title, description, course, date, startTime, endTime, timezone, zoomId, zoomPassword, participants } = form;
    return title.length > 0 && description.length > 0;
  };

  const handleSubmit = () => {
    createClassroom(form)
  };

  console.log(form, "form")

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper} square elevation={1}>
          <Toolbar variant="dense">
            <Typography className={classes.title} variant="h6">New Classroom</Typography>
          </Toolbar>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Card className={classes.card} square elevation={1}>
              <CardContent>
                <div className={classes.content}>

                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <TextField
                        name="title"
                        label="Title"
                        id="outlined-title"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="description"
                        label="Description"
                        id="outlined-description"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        rows={3}
                        rowsMax={5}
                        value={form.description}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        id="combo-box-courses"
                        size="small"
                        options={[]}
                        getOptionLabel={option => option.name}
                        getOptionSelected={option => option.name === form.course}
                        value={form.course}
                        onChange={handleSelectChange('course')}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Course"
                            variant="outlined"
                            placeholder="Search"
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="normal"
                          inputVariant="outlined"
                          id="date-picker-dialog"
                          label="Date"
                          size="small"
                          format="dd/MM/yyyy"
                          value={form.date}
                          onChange={handleDateChange('date')}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          margin="normal"
                          size="small"
                          inputVariant="outlined"
                          id="start-time-picker"
                          label="Start Time"
                          value={form.startTime}
                          onChange={handleDateChange('startTime')}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          margin="normal"
                          size="small"
                          inputVariant="outlined"
                          id="end-time-picker"
                          label="End Time"
                          value={form.endTime}
                          onChange={handleDateChange('endTime')}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <Autocomplete
                        id="combo-box-timezone"
                        size="small"
                        options={[]}
                        getOptionLabel={option => option.name}
                        getOptionSelected={option => option.name === form.timezone}
                        value={form.timezone}
                        onChange={handleSelectChange('timezone')}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Timezone"
                            variant="outlined"
                            placeholder="Search"
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="zoomId"
                        label="Zoom meeting ID"
                        id="outlined-zoom-id"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={form.zoomId}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="zoomPassword"
                        label="Zoom meeting Password"
                        id="outlined-zoom-password"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={form.zoomPassword}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="participants"
                        label="Participants"
                        id="outlined-participants"
                        fullWidth
                        margin="normal"
                        size="small"
                        variant="outlined"
                        value={form.participants}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                </div>
              </CardContent>
              <CardActions>
                <Button onClick={() => { }} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmitForm()}
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AddClassroom.propTypes = {
  loading: PropTypes.bool,
  createClassroom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    createClassroom: () => dispatch(Actions.createClassroom())
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
)(AddClassroom);
