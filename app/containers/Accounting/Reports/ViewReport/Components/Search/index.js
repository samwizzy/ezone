import React, { useEffect, memo, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DateRangePicker } from 'materialui-daterange-picker';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import './style.css';
import formatDate from '../../Helpers';

const Search = ({
  dispatchGetGeneralJournalTimeAction,
  handleFetch,
  time,
  searchField = '',
}) => {
  const { startDate, endDate } = time;
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState();
  const [date, setDate] = useState('Select date range');
  const toggle = () => setOpen(!open);

  useEffect(() => {
    if (!dateRange) return;
    setDate(
      `${formatDate(dateRange.startDate)} -  ${formatDate(dateRange.endDate)}`,
    );
  }, [dateRange]);

  const formatDateYear = date => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getUTCFullYear();
    return `${year}/${month + 1}/${day}`;
  };

  // handleOpen = e => {}

  return (
    <div style={{ disply: 'flex', flexDirection: 'column' }}>
      {!searchField ? (
        <button className="daterange" onClick={() => setOpen(true)}>
          {date}
        </button>
      ) : (
        <input type="text" placeholder={searchField} className="input-search" />
      )}
      {!searchField ? (
        <div className="search-wrap">
          <DateRangePicker
            open={open}
            toggle={toggle}
            style={{ display: 'none' }}
            onChange={range => {
              setDateRange(range);
              setOpen(false);
              dispatchGetGeneralJournalTimeAction({
                startDate: formatDateYear(range.startDate),
                endDate: formatDateYear(range.endDate),
              });
              handleFetch();
            }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectDate(),
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
)(Search);
