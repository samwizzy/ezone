import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard from '@material-ui/icons/Dashboard';
import HumanResourcePage from './HumanResourcePage';

const VertTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
  tabsRoot: {
    textAlign: 'right',
  },
}))(Tabs);

const MyTab = withStyles(theme => ({
  root: {
    borderRight: '2px solid lightgray',
    textAlign: 'right !important',
  },
  selected: {
    color: '#4ABDAC',
    borderRight: '3px solid #4ABDAC',
    textAlign: 'right !important',
  },
  label: {
    fontSize: 20,
    textTransform: 'initial',
  },
}))(Tab);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      style={{ padding: 0 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Container>
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    textAlign: 'right',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiListItem-root': {
      textAlign: 'right',
    },
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <VertTabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        // className={classes.tabs}
        indicatorColor="primary"
      >
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Dashboard
            </Typography>
          }
          {...a11yProps(0)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Organization
            </Typography>
          }
          {...a11yProps(1)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Recruitment
            </Typography>
          }
          {...a11yProps(2)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Attendance
            </Typography>
          }
          {...a11yProps(3)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Payroll
            </Typography>
          }
          {...a11yProps(4)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Announcements
            </Typography>
          }
          {...a11yProps(5)}
          component={ListItem}
        />
        <MyTab
          disableRipple
          label={
            <Typography variant="body2">
              <Dashboard /> Performance
            </Typography>
          }
          {...a11yProps(6)}
          component={ListItem}
        />
        />
        {/* <MyTab disableRipple label="Sourcing" />
            <MyTab disableRipple label="Production" />
            <MyTab disableRipple label="Shipping" />
            <MyTab disableRipple label="Sales" /> */}
      </VertTabs>
      {value === 0 && (
        <TabPanel>
          <HumanResourcePage />
        </TabPanel>
      )}
      {value === 1 && <TabPanel>Production Stuff</TabPanel>}
      {value === 2 && <TabPanel>Shipping Stuff</TabPanel>}
      {value === 3 && <TabPanel>Sales Stuff</TabPanel>}
      {value === 4 && <TabPanel>Sales Stuff</TabPanel>}
      {value === 5 && <TabPanel>Sales Stuff</TabPanel>}
      {value === 6 && <TabPanel>Sales Stuff</TabPanel>}
      {value === 7 && <TabPanel>Sales Stuff</TabPanel>}
      {/* <TabPanel value={value} index={0}>
            <HumanResourcePage />
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
            Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
            Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
            Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
            Item Seven
        </TabPanel> */}
    </div>
  );
}
