import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';
import {
  makeStyles,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green, red, grey, yellow } from '@material-ui/core/colors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';
import { statuses } from './../enums'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer'
    },
    '& td': { padding: theme.spacing(1, 2) },
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
  button: {
    marginLeft: theme.spacing(1)
  },
  status: {
    '&.pending': { color: green[500] },
    '&.rejected': { color: red[500] },
    '&.submitted': { color: yellow[500] },
    '&.drafted': { color: grey[500] },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const JournalListing = props => {
  const classes = useStyles();
  const { history, match, journals, getJournalById, openEditJournalDialog } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedJournal, setSelectedJournal] = React.useState(null);

  console.log('journals -> ', journals);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedJournal(_.find(journals, { id }));
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleEditClick = () => {
    const { id } = selectedJournal
    openEditJournalDialog(selectedJournal)
    history.push(`${match.url}/edit/${id}`)
  }

  const handleViewClick = () => {
    const { id } = selectedJournal
    getJournalById(id)
    history.push(`${match.url}/view/${id}`)
  }

  const orderedJournals = _.orderBy(journals, 'dateCreated', 'desc');

  if (!journals.length > 0) {
    return <CircleLoader />
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'dateCreated',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => value ? moment(value).format('ll') : ""
      },
    },
    {
      name: 'reference',
      label: 'Reference number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'total',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => new Intl.NumberFormat('en-US', {}).format(value)
      },
    },

    {
      name: 'entryByName',
      label: 'Created by',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return value
            ? <strong className={classNames(classes.status, { [value.toLowerCase()]: true })}>{_.find(statuses, { value }).label}</strong>
            : null
        }
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => handleClick(event, value)}
            >
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'Sorry, no journals found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="Post New Entry">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push('/account/journal/add')}
        >
          New Entry
        </Button>
      </Tooltip>
    ),
    elevation: 0
  };

  return (
    <React.Fragment>
      <MUIDataTable
        className={classes.datatable}
        title="Journal"
        data={orderedJournals}
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
        <MenuItem onClick={handleEditClick}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleViewClick}>
          View Details
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

JournalListing.propTypes = {
  loading: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  journals: Selectors.makeSelectJournalListData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJournalById: (data) => dispatch(Actions.getJournalById(data)),
    openEditJournalDialog: (data) => dispatch(Actions.openEditJournalDialog(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(JournalListing);
