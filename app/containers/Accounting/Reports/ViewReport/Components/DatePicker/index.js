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

  const handleDateChange = name => (value, date) => {
    // const formattedDate = _.mapValues(date, function(value) {
    //   return moment(value).format('DD/MM/YYYY');
    // });

    if (name === 'startDate') {
      setStartDate(moment(value, 'YYYY/MM/DD').format('YYYY/MM/DD'));
    } else if (name === 'endDate') {
      setEndDate(moment(value).format('YYYY/MM/DD'));
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

      <KeyboardDatePicker
        autoOk
        id="end-date"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        size="small"
        style={{ width: 200, marginLeft: 4 }}
        label="End Date"
        value={date.endDate}
        onChange={handleDateChange('endDate')}
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
