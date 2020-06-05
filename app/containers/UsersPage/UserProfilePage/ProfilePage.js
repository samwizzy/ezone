import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, Box, Tabs, Tab } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import Vector from '../../../images/Vector.svg';
import Vector1 from '../../../images/Vector1.svg';
import UserProfile from './components/UserProfile';
import SubscriptionDetails from './subscription/SubscriptionDetails'
import SubscriptionList from './subscription/SubscriptionList'

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
      style={{flexGrow: 1}}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
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
    padding: theme.spacing(0, 4),
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    "& img:first-child": {
      marginRight: 10,
    },
  },
  labelIcon: {
    minHeight: "48px",
    "& .MuiTab-wrapper > *:first-child": { marginBottom: 0 },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const ProfilePage = props => {
  const classes = useStyles();
	const { loading } = props;
	const [value, setValue] = React.useState(0);

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
				<AntTab label="My Account" icon={<img alt="" src={Vector} />} {...a11yProps(0)} />
				<AntTab label="Subscription" icon={<img alt="" src={Vector1} />} {...a11yProps(1)} />
				<AntTab label="Settings" icon={<img alt="" src={Vector1} />} {...a11yProps(2)} />
			</AntTabs>
			<TabPanel value={value} index={0}>
        <UserProfile />
      </TabPanel>
			<TabPanel value={value} index={1}>
        <SubscriptionList />
        {/* <SubscriptionDetails /> */}
      </TabPanel>
			<TabPanel value={value} index={2}>
        Settings
      </TabPanel>
    </div>
  );
};

ProfilePage.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(ProfilePage);
