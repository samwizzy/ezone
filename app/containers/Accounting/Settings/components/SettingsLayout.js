import React, {memo,useReducer,useEffect} from 'react'
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
import Currencies from './currencies';
import TaxRate from './taxrate';
import TaxType from './taxtype';
import AssetType from './assettype';
import NewAssetType from './newassettype';
import DepreciationAreas from './depreciationAreas';
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
		newdeprecition:false,
		deprecitionarea:false,
		newdeprecitionarea:false,
		assettype:false,
		newassettype:false,
		currencies:false,
		taxrate:false,
		taxtype:false
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
	
	  useEffect(() => {
	   getLocation()
	   return ()=>{
		   getLocation()
	   }
	  },[])

	  function getLocation(){
		  let nav = `${props.path}`
		  console.log(`Path path from layout ${nav}`)
		  let k = nav.lastIndexOf('/');
		  let newPath = nav.substr(k+1);
		  console.log(`new Path ${newPath}`)
		  switch(props.path){
          case '/account/settings':
		  case '/account/settings/period':
		  dispatch({type:'NAVIGATION',page:'setting'})	  
		  break;
		  case'/account/settings/fixedasset':
		  case '/account/settings/deprecitiontype':
		 dispatch({type:'NAVIGATION',page:'depreciation'})	  
			break; 
		 case '/account/settings/deprecitionarea':
			dispatch({type:'NAVIGATION',page:'deprecitionarea'})
			break;
	    case '/account/settings/assettype':
			dispatch({type:'NAVIGATION',page:'assettype'})
			break;	
			case '/account/settings/currencies':
			dispatch({type:'NAVIGATION',page:'currencies'})
			break;
			case '/account/settings/taxes':
		    case '/account/settings/taxrate':
				dispatch({type:'NAVIGATION',page:'taxrate'})
				break;
		  case '/account/settings/taxtype':
			dispatch({type:'NAVIGATION',page:'taxtype'})
			break; 	
		default:
			dispatch({type:'NAVIGATION',page:'setting'})					 	  	  	  
		  }
				  
	  }

	return (
		<SettingContext.Provider
    value={{ settingState: state, settingDispatch: dispatch }}>
		<div className={classes.root}>
			<Grid container>
				{/*<Grid item xs={2}>
					<SettingsSideBar/>
				</Grid>*/}
				<Grid item xs={12}>
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
					{/*<div>
						{state.deprecitionarea?
						<DepreciationAreas/>
						:
						<div/>
						}
					</div>*/}
					<div>
						{state.deprecitionarea?
						<DepreciationArea/>
						:
						<div/>
						}
					</div>
					<div>
						{state.currencies?
						<Currencies/>
						:
						<div/>
						}
					</div>
					<div>
						{state.taxrate?
						<TaxRate/>
						:
						<div/>
						}
					</div>
					<div>
						{state.taxtype?
						<TaxType/>
						:
						<div/>
						}
					</div>
					<div>
						{state.assettype?
						<AssetType/>
						:
						<div/>
						}
					</div>

					<div>
						{state.newassettype?
						<NewAssetType/>
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