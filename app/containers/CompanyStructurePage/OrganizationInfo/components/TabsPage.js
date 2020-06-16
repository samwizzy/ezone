import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  makeStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../../App/actions';
import OrgInfo from './OrgInfo';
import MenuBar from '../../../../components/MenuBar'
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: '10px 25px',
    borderRadius: '20px 20px 0 0',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsPage({ companyInfo }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(companyInfo, "companyInfo")

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <Tabs
            elevation={0}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            centered
          >
            <Tab
              label={`${companyInfo ? companyInfo.companyName : ''} Info`}
              {...a11yProps(0)}
            />
          </Tabs>
        }
        content={
          <TabPanel value={value} index={0}>
            <OrgInfo />
          </TabPanel>
        }
      />
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  companyInfo: Selectors.makeSelectCompanyInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginAction: evt => dispatch(Actions.loginAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TabsPage);
