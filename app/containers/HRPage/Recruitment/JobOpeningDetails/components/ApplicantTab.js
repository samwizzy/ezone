import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Grid, Icon, List, ListItem, ListItemText, ListItemIcon, IconButton, Paper, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables'
import { green } from '@material-ui/core/colors';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  tableRoot: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    "&.active": {
      color: green[500]
    }
  },
}));

const menus = [
  { id: 1, title: "All" },
  { id: 2, title: "Hired" },
  { id: 3, title: "In-review" },
  { id: 4, title: "Rejected" },
  { id: 5, title: "Withdrawn" }
]

const ApplicantTab = props => {
  const classes = useStyles();
  const { loading, match, getJobOpenings, jobOpenings, applicants, openNewApplicantDialog } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  console.log(applicants, "applicants")

  const handleListRoute = (event, index) => {
    setSelectedIndex(index);
  }

  const handleRoute = () => { }

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'firstName',
      label: 'Applicant',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'lastName',
      label: 'Applicant',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'mobileNumber',
      label: 'Mobile',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Applied',
      options: {
        filter: true,
        sort: true,
        customBodyRender: date => date ? moment(date).format('lll') : ''
      },
    },
    {
      name: 'applyingFor.jobTitle',
      label: 'Applied For',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'applyingFor.submissionDeadline',
      label: 'Deadline',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          return (
            <div>
              <IconButton><VisibilityIcon /></IconButton>
              <IconButton><MailIcon /></IconButton>
            </div>
          )
        }
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => (
      <Button variant="contained" onClick={openNewApplicantDialog} color="primary" startIcon={<Icon>add</Icon>}>
        New Applicant
      </Button>
    ),
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData) => history.push(`${match.url}/applicant/${rowData[0]}`),
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
      >
        <Grid item xs={2}>
          <Paper square elevation={0}>
            <List
              className={classes.list}
            >
              {menus && menus.map(menu => (
                <ListItem button selected={selectedIndex === menu.id} key={menu.id} onClick={event => handleListRoute(event, menu.id)}>
                  <ListItemText primary={menu.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.tableRoot}>
            <MUIDataTable
              className={classes.datatable}
              title="Applicants"
              data={applicants}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ApplicantTab.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
  applicants: Selectors.makeSelectApplicants(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewApplicantDialog: () => dispatch(Actions.openNewApplicantDialog()),
    openEditEmployeeDialog: () => dispatch(Actions.openEditEmployeeDialog()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
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
)(ApplicantTab);
