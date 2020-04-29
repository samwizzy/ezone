/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  Breadcrumbs,
	CircularProgress,
  Button,
  Link,
  Typography,
  FormControlLabel,
  Icon,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { Add } from '@material-ui/icons';
import { darken } from '@material-ui/core/styles/colorManipulator'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: { 
    flexGrow: 1 
  },
  datatable: {
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
  link: {
    fontSize: theme.typography.h6.fontSize,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const PartyGroupDetails = props => {
  const classes = useStyles();
  
  const {
    openEditPartyDialogAction,
    openEditPartyGroupAction,
    dispatchGetAllUsersAction,
    selectedPartyGroupData,
    DispatchgetSelectedPartyGroupAction,
    getSelectedParty,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenNewPartyAction,
		loading,
		match
	} = props;
	const { params } = match 

  useEffect(() => {
    console.log(params.groupId, "params.groupId")
		fetchPartyGroupById(params.groupId)
  }, []);

  const fetchPartyGroupById = (groupId) => {
    const data = partyGroupData && partyGroupData.find(group => group.id === parseInt(groupId, 10))
    console.log(data, "data details")
		DispatchgetSelectedPartyGroupAction(data)
  }
  
  const fetchPartyById = (groupId, partyId) => {
		const data = partyGroupData && partyGroupData.find(group => group.id === parseInt(groupId, 10))
		const partyFound = data && data.parties.find(party => party.id === parseInt(partyId, 10))
		getSelectedParty(partyFound)
  }
  
  const handleRoute = (groupId, partyId) => {
    const data = partyGroupData && partyGroupData.find(group => group.id === groupId)
    const partyFound = data && data.parties.find(party => party.id === parseInt(partyId, 10))
		getSelectedParty(partyFound)
    props.history.push(`/organization/company/structure/${groupId}/party/${partyId}`)
  } 
	
	console.log(partyGroupData, "partyGroupData")
	console.log(selectedPartyGroupData, "selectedPartyGroupData details")

	if(!selectedPartyGroupData){
		return ''
	}

  const columns = [
		{
      name: 'id',
      label: ' ',
      options: {
				display: "excluded",
        filter: true,
        sort: false,
      },
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
      name: 'name',
      label: 'Party Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'tag.name',
      label: 'Tag',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = selectedPartyGroupData.parties.find(party => value === party.id);
      
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => openEditPartyDialogAction(data)}
              >
                Edit
              </Button>
            </div>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={event => (
                  event.stopPropagation(),
                  handleRoute(selectedPartyGroupData.id, value)
                )}
              >
                View
              </Button>
            </div>
          );
        },
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
        variant="contained"
        style={{marginLeft: 5}}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenNewPartyAction({ partyGroupId: selectedPartyGroupData.id })}
      >
        New Party
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      handleRoute(selectedPartyGroupData.id, rowData[0])
    },
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

			<MUIDataTable
					className={classes.datatable}
					title={
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" href="/organization/company/structure" className={classes.link}>
                Party Groups
              </Link>
              <Typography color="textPrimary" variant="h6">{selectedPartyGroupData.name}</Typography>
            </Breadcrumbs>
          }
					data={selectedPartyGroupData.parties}
					columns={columns}
					options={options}
			/>
    </React.Fragment>
  );
};

PartyGroupDetails.propTypes = {
  openEditPartyGroupAction: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenNewPartyAction: PropTypes.func,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openEditPartyDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartyDialogAction: evt =>  dispatch(Actions.openEditPartyDialog(evt)),
    dispatchOpenNewPartyGroupAction: () => dispatch(Actions.openNewPartyGroupDialog()),
    openEditPartyGroupAction: evt => dispatch(Actions.openEditPartyGroupDialog(evt)),
    dispatchOpenNewPartyAction: evt => dispatch(Actions.openNewPartyDialog(evt)),
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    DispatchgetSelectedPartyGroupAction: evt => dispatch(Actions.getSelectedPartyGroupAction(evt)),
    getSelectedParty: evt => dispatch(Actions.getSelectedParty(evt)),
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
)(PartyGroupDetails);
