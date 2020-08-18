/* eslint-disable prettier/prettier */
import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: "auto",
  },
  datatable: {
    whiteSpace: "nowrap",
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CoursesList = props => {
  const classes = useStyles();

  const {
    loading,
    history,
    match,
    getCourses,
    courses,
    openNewCourseDialog,
    openEditCourseDialog,
  } = props;

  console.log(match, "match mm")

  useEffect(() => {
    getCourses();
  }, []);

  const data = [
    {
      id: 1,
      title: 'Statistics for Beginners',
      category: 'Architecture',
      stats: { sections: 20, lectures: 15 },
      enrollment: 'Enrollment',
      dateCreated: '2020-06-30T15:24:16.000+0000'
    }
  ];

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        sort: false,
      },
    },
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'stats',
      label: 'Section and Lecture',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Fragment>
              <Typography>Total sections: {value.sections}</Typography>
              <Typography>Total lectures: {value.lectures}</Typography>
            </Fragment>
          )
        }
      },
    },
    {
      name: 'enrollment',
      label: 'Enrollment',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Published',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return moment(value).format('ll')
        }
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    filter: false,
    print: false,
    viewColumns: false,
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Add />}
        onClick={() => history.push(`${match.url}/new`)}
      >
        New Course
      </Button>
    ),
    onRowClick: (rowData) => {
      history.push('/lms/course/' + rowData[0])
    },
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        title="Courses"
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

CoursesList.propTypes = {
  loading: PropTypes.bool,
  getCourses: PropTypes.func,
  openNewCourseDialog: PropTypes.func,
  openEditCourseDialog: PropTypes.func,
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  courses: Selectors.makeSelectGetCourses(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewCourseDialog: () => dispatch(Actions.openNewCourseDialog()),
    openEditCourseDialog: evt => dispatch(Actions.openEditCourseDialog(evt)),
    getCourses: () => dispatch(Actions.getCourses()),
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
)(CoursesList);
