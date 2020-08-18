/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  FormControlLabel,
  Icon,
  Button,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NoVirtualClassRoom from './NoVirtualClassRoom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const VirtualClassroomsList = props => {
  const classes = useStyles();

  const { loading, history, match, getClassrooms, classrooms } = props;

  useEffect(() => {
    getClassrooms();
  }, []);

  const columns = [
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
      name: 'course',
      label: 'Course',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return moment(value).format('lll')
        }
      },
    },
    {
      name: 'time',
      label: 'Time',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return moment(value).format('HH:mm:ss')
        }
      },
    },
    {
      name: 'status',
      label: 'Owner',
      options: {
        filter: true,
        sort: false,
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => history.push(`${match.url}/new`)}
      >
        New Classroom
      </Button>
    ),
    elevation: 0
  };

  console.log(classrooms, "classrooms count")
  if (!classrooms || classrooms.length === 0) {
    return <NoVirtualClassRoom />
  }

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        className={classes.datatable}
        title="Virtual Classrooms"
        data={[]}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

VirtualClassroomsList.propTypes = {
  loading: PropTypes.bool,
  getClassrooms: PropTypes.func,
  classrooms: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  classrooms: Selectors.makeSelectGetClassrooms(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClassrooms: () => dispatch(Actions.getClassrooms()),
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
)(VirtualClassroomsList);
