import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, Box, Button, ButtonGroup, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../../../../actions';
import * as Selectors from '../../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import CVImage from '../../../../../../images/cvImage.jpg';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DescTab from './tabs/DescTab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
	tabs: {
		borderLeft: `1px solid ${theme.palette.divider}`,
		borderRight: `1px solid ${theme.palette.divider}`,
	}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AntTabs = withStyles({
	flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    backgroundColor: '#1890ff',
    left: 0,
    top: 0,
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
		backgroundColor: 'rgba(26, 136, 225, 0.1)',
		borderRadius: '0px 30px 30px 0px',
    textTransform: 'none',
    minWidth: 92,
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(2, 4),
    marginRight: theme.spacing(2),
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
	wrapper: {
		alignItems: 'flex-start',
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const ApplicantDetailsTabs = props => {
  const classes = useStyles();
	const { loading, openNewEmployeeDialog, getEmployee, employees, employee, getJobOpenings, jobOpenings } = props;
	const [value, setValue] = React.useState(0);

  React.useEffect(() => {
  }, [employee]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
			<AntTabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleTabChange}
				aria-label="ant example"
				className={classes.tabs}
			>
				<AntTab label="Basic Information" {...a11yProps(0)} />
				<AntTab label="CV" {...a11yProps(1)} />
				<AntTab label="Interview" {...a11yProps(2)} />
				<AntTab label="History" {...a11yProps(3)} />
			</AntTabs>
			<TabPanel value={value} index={0}>
        <DescTab />
      </TabPanel>
			<TabPanel value={value} index={1}>
        <div>
          <img alt="" src={CVImage} />
        </div>
      </TabPanel>
			<TabPanel value={value} index={2}>
        Interview
      </TabPanel>
			<TabPanel value={value} index={3}>
        History
      </TabPanel>
    </div>
  );
};

ApplicantDetailsTabs.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings : Selectors.makeSelectJobOpenings(),
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
)(ApplicantDetailsTabs);
