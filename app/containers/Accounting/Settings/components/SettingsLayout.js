import React, { memo, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core';
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
export const PayloadContext = React.createContext();

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	pap: {
		padding: '8px'
	}
}))

const SettingsLayout = props => {
	const classes = useStyles()
	const { } = props

	const initialState = {
		page: 'setting',
		setting: true,
		depreciation: false,
		newdeprecition: false,
		deprecitionarea: false,
		newdeprecitionarea: false,
		assettype: false,
		newassettype: false,
		currencies: false,
		taxrate: false,
		taxtype: false,

	}

	const initialPayload = {
		payload: {},
		update: false
	}

	const reducerII = (state, action) => {
		switch (action.type) {
			case 'UPDATE':
				state = {
					...state,
					payload: action.payload,
					update: action.update
				};
				return state;
			default:
				return state;
		}
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'NAVIGATION':
				state = {
					...state,
					page: action.page,
					[state.page]: false,
					[action.page]: true,
				};
				return state;
			default:
				return state;
		}
	}



	const [state, dispatch] = useReducer(reducer, initialState);
	const [stateII, dispatchII] = useReducer(reducerII, initialPayload);

	useEffect(() => {
		let mounted = true
		if (mounted) {
			getLocation()
		}
		return () => {
			mounted = false
		}
	}, [props.path])

	function getLocation() {
		let nav = `${props.path}`
		//.log(`Path path from layout ${nav}`)
		let k = nav.lastIndexOf('/');
		let newPath = nav.substr(k + 1);
		//console.log(`new Path ${newPath}`)
		switch (newPath) {
			case 'settings':
			case 'period':
				dispatch({ type: 'NAVIGATION', page: 'setting' })
				break;
			case 'fixedasset':
			case 'deprecitiontype':
				dispatch({ type: 'NAVIGATION', page: 'depreciation' })
				break;
			case 'deprecitionarea':
				dispatch({ type: 'NAVIGATION', page: 'deprecitionarea' })
				break;
			case 'assettype':
				dispatch({ type: 'NAVIGATION', page: 'assettype' })
				break;
			case 'currencies':
				dispatch({ type: 'NAVIGATION', page: 'currencies' })
				break;
			case 'taxes':
			case 'taxrate':
				dispatch({ type: 'NAVIGATION', page: 'taxrate' })
				break;
			case 'taxtype':
				dispatch({ type: 'NAVIGATION', page: 'taxtype' })
				break;
			default:
				dispatch({ type: 'NAVIGATION', page: 'setting' })
		}

	}

	return (
		<SettingContext.Provider
			value={{ settingState: state, settingDispatch: dispatch }}>
			<PayloadContext.Provider
				value={{ payloadState: stateII, payloadDispatch: dispatchII }}>
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className={classes.pap} elevation={3} >
								<Typography gutterBottom variant="h6" component="h1">
									Settings
                </Typography>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<div>
								{state.setting ?
									<AccountingPeriod />
									:
									<div />
								}
							</div>
							<div>
								{state.depreciation ?
									<DepreciationSetup />
									:
									<div />
								}
							</div>
							<div>
								{state.deprecitionarea ?
									<DepreciationArea />
									:
									<div />
								}
							</div>
							<div>
								{state.currencies ?
									<Currencies />
									:
									<div />
								}
							</div>
							<div>
								{state.taxrate ?
									<TaxRate />
									:
									<div />
								}
							</div>
							<div>
								{state.taxtype ?
									<TaxType />
									:
									<div />
								}
							</div>
							<div>
								{state.assettype ?
									<AssetType />
									:
									<div />
								}
							</div>

							<div>
								{state.newassettype ?
									<NewAssetType />
									:
									<div />
								}
							</div>
						</Grid>
					</Grid>
				</div>
			</PayloadContext.Provider>
		</SettingContext.Provider>
	)
}

SettingsLayout.propTypes = {};

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps(dispatch) {
	return {}
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