import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from '../../../App/selectors';
import { AddReview } from '../components/AddButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
}));

const FeedbacksList = props => {
  const classes = useStyles();
  const {
    loading,
    openNewReviewDialog,
    getReviews,
    getReviewById,
    reviews,
  } = props;

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'duration',
      label: 'Duration',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddReview openDialog={openNewReviewDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      getHolidayById(rowData[0]);
    },
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Feedbacks"
        data={reviews}
        columns={columns}
        options={options}
      />
    </div>
  );
};

FeedbacksList.propTypes = {
  loading: PropTypes.bool,
  openNewReviewDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  reviews: Selectors.makeSelectReviews(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReviews: () => dispatch(Actions.getRecognitions()),
    getReviewById: id => dispatch(Actions.getRecognitionById(id)),
    openNewReviewDialog: () => dispatch(Actions.openNewRecognitionDialog()),
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
)(FeedbacksList);
