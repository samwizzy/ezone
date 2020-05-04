/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Button,
  Link,
  Typography,
  FormControlLabel,
  Icon,
  IconButton,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { Add } from '@material-ui/icons';
import { darken } from '@material-ui/core/styles/colorManipulator';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EzoneUtils from '../../../../utils/EzoneUtils';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import PositionsList from './PositionsList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
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
  divider: {
    margin: theme.spacing(5, 0),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

let parties = '';
const PartyList = props => {
  const classes = useStyles();
  const {
    openEditPartyDialogAction,
    openEditPartyGroupAction,
    dispatchGetAllUsersAction,
    selectedPartyGroupData,
    getSelectedParty,
    DispatchgetSelectedPartyGroupAction,
    partyGroupData,
    partyData,
    dispatchOpenNewPartyGroupAction,
    openNewPartiesDialogAction,
    loading,
    match,
    getPartyByIdAction,
    getPartyById,
  } = props;
  const { params } = match;

  // console.log(partyData, 'partyData');
  // console.log(params, 'params');
  console.log(getPartyById, 'getPartyById');

  const [newParties, setNewParties] = React.useState();

  useEffect(() => {
    getPartyByIdAction(params.partyId);
  }, []);

  useEffect(() => {
    parties =
      partyGroupData &&
      partyGroupData.find(group => group.id === parseInt(params.groupId, 10));
    if (parties) {
      setNewParties(parties);
    }
  }, [partyGroupData]);

  console.log(newParties, 'newParties');
  const handleRoute = (data, groupId, partyId) => {
    getSelectedParty(data);
    getPartyByIdAction(partyId);
    props.history.push(
      `/organization/company/structure/${groupId}/party/${partyId}`,
    );
  };

  const handlePrev = () => {
    props.history.goBack();
  };
  const handleBackToRoot = () => {
    props.history.push('/organization/company/structure');
  };

  console.log(partyGroupData, 'partyGroupData partylist');
  console.log(partyData, 'partyData');
  console.log(selectedPartyGroupData, 'selectedPartyGroupData partylist');

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => (
          <FormControlLabel label={tableMeta.rowIndex + 1} control={<Icon />} />
        ),
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
          const data = partyData.parties.find(party => value === party.id);

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
          const data = partyData.parties.find(party => value === party.id);
          return (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={event => {
                event.stopPropagation();
                handleRoute(data, partyData.id, value);
              }}
            >
              View
            </Button>
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
        style={{ marginLeft: 5 }}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() =>
          openNewPartiesDialogAction({ partyGroupId: partyData.id })
        }
      >
        New Party
      </Button>
    ),
    textLabels: {
      body: {
        noMatch: 'Sorry, no matching parties found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    // onRowClick: (rowData, rowState) => {
    //   handleRoute(partyData.id, rowData[0]);
    // },
    elevation: 0,
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        className={classes.datatable}
        title={
          <div className={classes.flex}>
            <Link color="inherit" onClick={handlePrev}>
              <IconButton>
                <KeyboardReturnIcon />
              </IconButton>
            </Link>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                color="inherit"
                onClick={handleBackToRoot}
                className={classes.link}
              >
                {'> Party Groups'}
              </Link>
              <Typography color="textPrimary" variant="h6">
                {EzoneUtils.toTitleCase(partyData.name)}
              </Typography>
            </Breadcrumbs>
          </div>
        }
        data={partyData.parties}
        columns={columns}
        options={options}
      />

      <Divider className={classes.divider} />

      <PositionsList positions={partyData.positions} />
    </React.Fragment>
  );
};

PartyList.propTypes = {
  openEditPartyGroupAction: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  openNewPartiesDialogAction: PropTypes.func,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  openEditPartyDialogAction: PropTypes.func,
  getPartyByIdAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  partyData: Selectors.makeSelectSelectedParty(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
  getPartyById: Selectors.makeSelectGetPartyById(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartyDialogAction: evt =>
      dispatch(Actions.openEditPartyDialog(evt)),
    dispatchOpenNewPartyGroupAction: () =>
      dispatch(Actions.openNewPartyGroupDialog()),
    openEditPartyGroupAction: evt =>
      dispatch(Actions.openEditPartyGroupDialog(evt)),
    openNewPartiesDialogAction: evt =>
      dispatch(Actions.openNewPartiesDialog(evt)),
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),
    getSelectedParty: evt => dispatch(Actions.getSelectedParty(evt)),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
    getPartyByIdAction: evt => dispatch(Actions.getPartyById(evt)),
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
)(PartyList);
