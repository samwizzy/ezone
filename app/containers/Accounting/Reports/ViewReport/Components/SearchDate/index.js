import React, { useEffect, memo, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DateRangePicker } from 'materialui-daterange-picker';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import './style.css';
import formatDate from '../../Helpers';

const SearchDate = ({
  dispatchGetGeneralJournalTimeAction,
  handleFetch,
  time,
  searchField = '',
}) => {
  const { startDate, endDate } = time;
  const [open, setOpen] = useState(false);
  const [endDateRange, setEndDateRange] = useState({ chatEndDate: '' });
  const [date, setDate] = useState('Select date range');
  const toggle = () => setOpen(!open);

  // useEffect(() => {
  //   if (!dateRange) return;
  //   setDate(
  //     `${formatDate(dateRange.startDate)} -  ${formatDate(dateRange.endDate)}`,
  //   );
  // }, [dateRange]);

  const formatDateYear = date => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getUTCFullYear();
    return `${year}/${month + 1}/${day}`;
  };

  const handleClick = e => {
    dispatchGetGeneralJournalTimeAction({
      startDate: '2000/02/22',
      endDate: e.target.value.split('-').join('/'),
    });
    handleFetch();
  };

  return (
    <div style={{ disply: 'flex', flexDirection: 'column' }}>
      <input
        name="chatEndDate"
        type="date"
        onChange={handleClick}
        className="input-search in searchd"
      />
    </div>
  );
};
// 0107629596
const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectTime(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchDate);
