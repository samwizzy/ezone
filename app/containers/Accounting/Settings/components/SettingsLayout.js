import React, {memo} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import { makeStyles, Box, Button, Grid, Paper, Table, TableBody, TableRow, TableCell, TextField, Toolbar, Typography } from '@material-ui/core'
import SettingsSideBar from './SettingsSideBar'
import AddIcon from '@material-ui/icons/Add'
import AccountingPeriod from './../AccountingPeriod'


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	box: {
		backgroundColor: theme.palette.grey[200]
	},
	table: {
    '& .MuiTableFooter-root': {},
    '& th.MuiTableCell-root': {
			borderBottom: 'none !important',
			width: '10%'
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none !important'
    },
  },
}))

const SettingsLayout = props => {
	const classes = useStyles()
	const {} = props 
	const [form, setForm] = React.useState({})

	const handleDateChange = (date, formatted, name) => { 
    // setForm(_.set({...form}, name, reformattedDate(date)))
  }

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={2}>
					<SettingsSideBar />
				</Grid>
				<Grid item xs={10}>
					<AccountingPeriod />
				</Grid>
			</Grid>
		</div>
	)
}

export default compose(
	withRouter,
	memo
)(SettingsLayout)