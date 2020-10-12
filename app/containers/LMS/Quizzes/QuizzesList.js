/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Grid, Toolbar,
  Table, TableBody, TableRow, TableCell,
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Add, Visibility } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import QuizImage from '../../../images/quizImage.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
    boxShadow: theme.shadows[1]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  toolbar: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

const QuizzesList = props => {
  const classes = useStyles();
  const { loading, history, match } = props;
  const [form, setForm] = React.useState({
    search: ''
  })

  useEffect(() => {
  }, []);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSelectChange = name => (evt, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container>
        <Grid item xs={12}>
          <AppBar color="inherit" className={classes.appBar}>
            <Toolbar><Typography variant="h6">Quizzes</Typography></Toolbar>
            <Toolbar className={classes.toolbar}>
              <div style={{ display: 'flex' }}>
                <TextField
                  name="search"
                  label="Search"
                  id="outlined-search"
                  variant="outlined"
                  margin="normal"
                  style={{ width: 300, marginRight: 8 }}
                  size="small"
                  value={form.search}
                  onChange={handleChange}
                />

                <Autocomplete
                  id="combo-box-parent-category"
                  size="small"
                  options={[]}
                  getOptionLabel={option => option.name}
                  getOptionSelected={option => option.name === form.parentCategory}
                  value={form.parentCategory}
                  onChange={handleSelectChange('parentCategory')}
                  style={{ width: 300, marginRight: 8 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Parent Category"
                      variant="outlined"
                      placeholder="Search"
                      margin="normal"
                    />
                  )}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    style={{ width: 300 }}
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Date"
                    size="small"
                    format="MM/dd/yyyy"
                    name="date"
                    value={form.date}
                    onChange={handleDateChange('date')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <Button variant="contained" color="primary" onClick={() => history.push(`${match.url}/new`)} disableElevation>
                Add Quiz
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          <Table className={classes.table}>
            <TableBody>
              {_.range(0, 2).map((row, i) =>
                <TableRow key={i}>
                  <TableCell><img src={QuizImage} alt="quiz" /></TableCell>
                  <TableCell>
                    <Typography variant="h6">Word puzzle</Typography>
                    <Typography variant="subtitle2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis tempus, eget semper sed.
                    </Typography>
                    <Typography variant="body2">
                      Type: Multichoice Questions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      Date Created:  3rd Jul 2020
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

    </React.Fragment>
  );
};

QuizzesList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  quizzes: Selectors.makeSelectGetQuizzes(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewQuizDialog: () => dispatch(Actions.openNewQuizDialog()),
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
)(QuizzesList);
