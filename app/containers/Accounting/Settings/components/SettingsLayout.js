import React, {memo,useReducer} from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import { 
  makeStyles, 
  Grid, 
} from '@material-ui/core';
import SettingsSideBar from './SettingsSideBar';
import AccountingPeriod from './AccountingPeriod';
import DepreciationSetup from '../../FixedAssets/depreciation';
import DepreciationArea from '../../FixedAssets/depreciationarea';
import AccessClass from '../../FixedAssets/assetsclasses';
export const SettingContext = React.createContext();

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	}
}))

const SettingsLayout = props => {
	const classes = useStyles()
	const {} = props 

	const initialState ={
		page:'setting',
		setting:true,
		depreciation:false,
		deprecitionarea:false,
		assetclasses:false
	  }
  
	  const reducer = (state, action) => {
	   switch(action.type){
		 case 'NAVIGATION':
		  state = {
			...state,
			page:action.page,
			[state.page] :false,
			[action.page]:true,
		  };
		  return state;
		  default :
		  return state;
	   }
	  }

	  const [state, dispatch] = useReducer(reducer, initialState);
	

	return (
		<SettingContext.Provider
    value={{ settingState: state, settingDispatch: dispatch }}>
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={2}>
					<SettingsSideBar/>
				</Grid>
				<Grid item xs={10}>
					<div>
					{state.setting?
					<AccountingPeriod/>
					:
					<div/>
					}
					</div>
					<div>
						{state.deprecition?
						<DepreciationSetup/>
						:
						<div/>
						}
					</div>
					<div>
						{state.deprecitionarea?
						<DepreciationArea/>
						:
						<div/>
						}
					</div>
					<div>
						{state.assetclasses?
						<AccessClass/>
						:
						<div/>
						}
					</div>
					
					
				</Grid>
			</Grid>
		</div>
		</SettingContext.Provider>
	)
}

SettingsLayout.propTypes = {

};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo
)(SettingsLayout)