import React, { memo } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

const DatePicker = props => {
  const { date, setStartDate, setEndDate } = props;

  const handleDateChange = name => value => {
    if (name === 'startDate') {
      setStartDate(moment(value).format('DD/MM/YYYY'));
    } else {
      setEndDate(moment(value).format('DD/MM/YYYY'));
    }
  };

  console.log(date, 'date valid shit');

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        id="start-date"
        required
        inputVariant="outlined"
        format="dd/MM/yyyy"
        size="small"
        style={{ width: 200 }}
        label="Start Date"
        value={date.startDate}
        onChange={handleDateChange('startDate')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
});

const mapDispatchToProps = dispatch => ({
  setStartDate: date => dispatch(Actions.setStartDate(date)),
  setEndDate: date => dispatch(Actions.setEndDate(date)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DatePicker);
