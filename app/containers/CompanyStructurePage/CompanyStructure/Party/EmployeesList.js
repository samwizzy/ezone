/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils'
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Breadcrumbs,
  Button,
  Typography,
  FormControlLabel,
  Icon,
  IconButton,
  Link
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator'
import Add from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import EmployeeDialog from './components/EmployeeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1)
    }
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      // cursor: 'pointer'
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
  link: {
    fontSize: theme.typography.h6.fontSize,
	},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const EmployeeList = props => {
  const classes = useStyles();
  const {
    dispatchGetAllUsersAction,
    dispatchGetPartyGroups,
    selectedPartyGroupData,
    DispatchgetSelectedPartyGroupAction,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenAddEmployeeToPositionDialogAction,
    openNewRoleDialog,
    loading,
    allPositions,
    selectedPosition,
    match,
  } = props;

  const { params } = match

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
  }, []);

  const handlePrev = () => {
    props.history.goBack()
  }
  const handleBackToRoot = () => {
    props.history.push("/organization/company/structure")
  }

  console.log(selectedPosition, "selectedPosition from employees")

  if (selectedPosition.employees === undefined) {
    return <LoadingIndicator />;
  }

  const columns = [
    {
			name: 'id',
			label: ' ',
			options: {
				display: "excluded",
				filter: true,
			}
    },
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
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
      name: 'id',
      label: 'Employee Name',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const employee = selectedPosition.employees && selectedPosition.employees.find(emp => emp.id === value);
          
          return (
            <Typography>
              {employee.firstName} {employee.lastName}
            </Typography>
          );
        },
      },
    },
    {
      name: 'emailAddress',
      label: 'Email Address',
      options: {
        filter: true,
        sort: false
      },
    },
  ];

  const options = {
    filter: false,
    print: false,
    viewColumns: false,
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        style={{marginLeft: 5}}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenAddEmployeeToPositionDialogAction()}
      >
        Add New Employee
      </Button>
    ),
    textLabels: {
			body: {
				noMatch: "Sorry, no employees exist with this position",
				toolTip: "Sort",
				columnHeaderTooltip: column => `Sort for ${column.label}`
			},
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <EmployeeDialog params={params} />
      <MUIDataTable
        title={
          <div className={classes.flex}>
            <Link color="inherit" onClick={handlePrev}>
              <IconButton><KeyboardReturnIcon /></IconButton>
            </Link>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" onClick={handleBackToRoot} className={classes.link}>
                Positions
              </Link>
              <Typography color="textPrimary" variant="h6">{EzoneUtils.toTitleCase(selectedPosition.name)}</Typography>
            </Breadcrumbs>
          </div>
        }
        data={selectedPosition.employees}
        columns={columns}
        options={options}
        className={classes.datatable}
      />
    </div>
  );
};

EmployeeList.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenAddEmployeeToPositionDialogAction: PropTypes.func,
  openNewRoleDialog: PropTypes.func,
  partyGroupData: PropTypes.array,
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.object,
  allPositions: PropTypes.object,
  // selectedPartyGroupData: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
  // allPositions: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
  selectedPosition: Selectors.makeSelectSelectedPosition(),
  allPositions: Selectors.makeSelectGetAllPositions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenAddEmployeeToPositionDialogAction: () =>
      dispatch(Actions.openAddEmployeeToPositionDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),
    dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
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
)(EmployeeList);
