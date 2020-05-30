import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, Tabs, Tab } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MenuBar from '../../../../components/MenuBar'
import Goals from './../Goals';
import Recognition from './../Recognition';
import Feedback360 from './../Feedback360';
import Reviews from './../Reviews';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  }
}));

const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#ffffff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    borderRadius: "20px 20px 0px 0px",
    minWidth: 92,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.subtitle1.fontSize,
    padding: theme.spacing(1, 3),
    marginRight: theme.spacing(1),
    color: '#ffffff',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: '#ffffff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      backgroundColor: '#ffffff',
			fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
	},
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function ModuleLayout({history, location, match}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(location.pathname)

  console.log(location, "location")

  const handleChange = (event, newValue) => {
    setValue(newValue)
    history.push(newValue)
  }

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <AntTab label="Goals" {...a11yProps(0)} value="/human-resource/performance/goals" />
              <AntTab label="Recognition" {...a11yProps(1)} value="/human-resource/performance/recognitions" />
              <AntTab label="360 Feedback" {...a11yProps(2)} value="/human-resource/performance/feedbacks" />
              <AntTab label="Reviews" {...a11yProps(3)} value="/human-resource/performance/reviews" />
            </AntTabs>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {value === "/human-resource/performance/goals" && (<Goals />)}
            {value === "/human-resource/performance/recognitions" && (<Recognition />)}
            {value === "/human-resource/performance/feedbacks" && (<Feedback360 />)}
            {value === "/human-resource/performance/reviews" && (<Reviews />)}
          </div>
        }
      />
    </div>
  );
}

ModuleLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({});

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
)(ModuleLayout);
