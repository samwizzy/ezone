import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const JournalListing = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedJournal, setSelectedJournal] = React.useState(null);

  const { history, journalListData } = props;

  console.log('journalListData -> ', journalListData);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedJournal(_.find(journalListData, { id }));
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  journalListData.reverse()

  const columns = [
    {
      name: 'dateCreated',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return moment(value).format('ll')
        }
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
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
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
        data={journalListData}
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
        <MenuItem onClick={() => { }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => history.push({ pathname: '/account/journal/details' })}>
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
  journalListData: Selectors.makeSelectJournalListData(),
});

function mapDispatchToProps(dispatch) {
  return {};
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
