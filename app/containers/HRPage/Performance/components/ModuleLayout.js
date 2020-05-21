import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, Tabs, Tab } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
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

function ModuleLayout(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
              <AntTab label="Goals" {...a11yProps(0)}  />
              <AntTab label="Recognition" {...a11yProps(1)} />
              <AntTab label="360 Feedback" {...a11yProps(2)} />
              <AntTab label="Reviews" {...a11yProps(3)} />
            </AntTabs>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {value === 0 && (<Goals />)}
            {value === 1 && (<Recognition />)}
            {value === 2 && (<Feedback360 />)}
            {value === 3 && (<Reviews />)}
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
