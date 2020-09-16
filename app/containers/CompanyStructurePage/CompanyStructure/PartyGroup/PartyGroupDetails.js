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
import { darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

let parties = '';
const PartyGroupDetails = props => {
  const classes = useStyles();

  const {
    openEditPartyDialogAction,
    partyGroupData,
    dispatchOpenNewPartyAction,
    loading,
    match,
    getPartyByIdAction,
  } = props;
  const { params } = match;

  const [newParties, setNewParties] = React.useState();

  useEffect(() => {
    parties =
      partyGroupData &&
      partyGroupData.find(group => group.id === parseInt(params.groupId, 10));
    if (parties) {
      setNewParties(parties);
    }
  }, [partyGroupData]);

  const handleRoute = (groupId, partyId) => {
    getPartyByIdAction(partyId);
    props.history.push(
      `/organization/company/structure/${groupId}/party/${partyId}`,
    );
  };

  const handleBackToRoot = event => {
    event.preventDefault()
    props.history.push('/organization/company/structure');
  };

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
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = newParties.parties.find(party => value === party.id);

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
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <div>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={event => {
                event.stopPropagation();
                handleRoute(newParties.id, value);
              }}
            >
              View
            </Button>
          </div>
        ),
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
          dispatchOpenNewPartyAction({
            partyGroupId: newParties.id,
          })
        }
      >
        New Party
      </Button>
    ),
    elevation: 0,
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {newParties && (
        <MUIDataTable
          className={classes.datatable}
          title={
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                color="inherit"
                onClick={handleBackToRoot}
                className={classes.link}
              >
                {'Party Groups'}
              </Link>
              <Typography color="textPrimary" variant="h6">
                {newParties.name}
              </Typography>
            </Breadcrumbs>
          }
          data={newParties.parties}
          columns={columns}
          options={options}
        />
      )}
    </React.Fragment>
  );
};

PartyGroupDetails.propTypes = {
  loading: PropTypes.bool,
  dispatchOpenNewPartyAction: PropTypes.func,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  openEditPartyDialogAction: PropTypes.func,
  getPartyByIdAction: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartyDialogAction: evt => dispatch(Actions.openEditPartyDialog(evt)),
    dispatchOpenNewPartyAction: evt => dispatch(Actions.openNewPartyDialog(evt)),
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
)(PartyGroupDetails);
