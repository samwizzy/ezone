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

const PartyList = props => {
  const classes = useStyles();
  const {
    openEditPartiesDialogAction,
    openNewPartiesDialogAction,
    loading,
    match,
    getPartyByIdAction,
    getPartyById,
  } = props;
  const { params } = match;

  useEffect(() => {
    getPartyByIdAction(params.partyId);
  }, []);

  const handleRoute = (groupId, partyId) => {
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
          const data = getPartyById.parties.find(party => value === party.id);

          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => openEditPartiesDialogAction(data)}
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
        customBodyRender: value => (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={event => {
              event.stopPropagation();
              handleRoute(getPartyById.id, value);
            }}
          >
            View
          </Button>
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
          openNewPartiesDialogAction({ partyGroupId: getPartyById.id })
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
    elevation: 0,
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {getPartyById && (
        <div>
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
                    {'Party Groups'}
                  </Link>
                  <Typography color="textPrimary" variant="h6">
                    {EzoneUtils.toTitleCase(getPartyById.name)}
                  </Typography>
                </Breadcrumbs>
              </div>
            }
            data={getPartyById.parties}
            columns={columns}
            options={options}
          />

          <Divider className={classes.divider} />

          <PositionsList positions={getPartyById.positions} />
        </div>
      )}
    </React.Fragment>
  );
};

PartyList.propTypes = {
  getPartyById: PropTypes.object,
  loading: PropTypes.bool,
  openNewPartiesDialogAction: PropTypes.func,
  openEditPartiesDialogAction: PropTypes.func,
  getPartyByIdAction: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getPartyById: Selectors.makeSelectGetPartyById(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartiesDialogAction: evt =>
      dispatch(Actions.openEditPartiesDialog(evt)),
    openNewPartiesDialogAction: evt =>
      dispatch(Actions.openNewPartiesDialog(evt)),
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
