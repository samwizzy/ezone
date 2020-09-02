/* eslint-disable prettier/prettier */
import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Avatar,
  Backdrop,
  CircularProgress,
  makeStyles,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  FormControlLabel,
  Icon,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
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
    deleteCourse,
    openNewCourseDialog,
    openEditCourseDialog,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);

  console.log(match, "match mm")
  console.log(courses, "courses")
  console.log(selectedCourseId, "selectedCourseId")

  const handleClick = id => (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(id)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditCourse = () => {
    handleClose()
  }

  const handleViewCourse = () => {
    history.push('/lms/course/' + selectedCourseId)
    handleClose()
  }

  const handleDeleteCourse = () => {
    deleteCourse(selectedCourseId)
    handleClose()
  }

  const sortedCourses = _.orderBy(courses, ['dateCreated'], ['desc']);

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
      name: "thumbNail",
      label: " ",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return value.fileUrl ? <Avatar variant="square" fontSize="small" src={value.fileUrl} /> : <Avatar fontSize="small" />
        }
      }
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
      name: 'category.name',
      label: 'Category',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Section and Lecture',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Fragment>
              <Typography>Total sections: {20}</Typography>
              <Typography>Total lectures: {15}</Typography>
            </Fragment>
          )
        }
      },
    },
    {
      name: 'level',
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
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return <IconButton onClick={handleClick(value)}><Icon>more_vert</Icon></IconButton>
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
        data={sortedCourses}
        columns={columns}
        options={options}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewCourse}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
        {/* <MenuItem onClick={handleEditCourse}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem> */}
        <MenuItem onClick={handleDeleteCourse}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
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
    openEditCourseDialog: data => dispatch(Actions.openEditCourseDialog(data)),
    deleteCourse: id => dispatch(Actions.deleteCourse(id)),
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
