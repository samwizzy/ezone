import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, Button, ButtonGroup, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DescriptionTab from './components/DescriptionTab';
import ApplicantTab from './components/ApplicantTab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: { 
    border: 0, 
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  },
  buttonGroup: {
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
  }
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const JobOpeningDetails = props => {
  const classes = useStyles();
	const { loading, openNewEmployeeDialog, getEmployee, employees, employee, getJobOpenings, jobOpenings, /* jobOpeningDetails */ } = props;
	const [value, setValue] = React.useState(0);
  //console.log(jobOpeningDetails, "job details inside job openingdetails");
  React.useEffect(() => {
  }, [employee]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
      >
				<Grid item xs={12}>
					<div className={classes.buttonGroup}>
            <Typography variant="h6">
              <IconButton onClick={()=>{}}><ArrowRightAltIcon className={classes.icon} /></IconButton> Job Details
            </Typography>
            
						<div size="small" aria-label="small outlined button group">
							<IconButton onClick={()=>{}}><EditSharp className={classes.icon} /></IconButton>
							<IconButton onClick={()=>{}}><Assignment className={classes.icon} /></IconButton>
						</div>
					</div>
				</Grid>
        <Grid item md={12}>
          <div className={classes.content}>
						<AntTabs
							value={value}
							onChange={handleTabChange}
							aria-label="ant example"
						>
							<AntTab label="Description" />
							<AntTab label="Applicants" />
						</AntTabs>
						<Typography className={classes.padding} />
						{value == 0 && <DescriptionTab />}
						{value == 1 && <ApplicantTab />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

JobOpeningDetails.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings : Selectors.makeSelectJobOpenings(),
  jobOpeningDetails : Selectors.makeSelectJobOpeningDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
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
)(JobOpeningDetails);
