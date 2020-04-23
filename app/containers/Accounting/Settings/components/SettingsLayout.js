import React, {memo} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles, Box, Button, Grid, Paper, Table, TableBody, TableRow, TableCell, TextField, Toolbar, Typography } from '@material-ui/core'
import SettingsSideBar from './SettingsSideBar'
import AddIcon from '@material-ui/icons/Add'

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
					<Grid container>
						<Grid item xs={5}>
							<Toolbar>
								<Typography variant="h4">Settings</Typography>
							</Toolbar>
							<Paper square elevation={0}>
								<Toolbar>
									<Typography variant="h6">Accounting Period</Typography>
								</Toolbar>
								<Table size="small" className={classes.table}>
									<TableBody>
										<TableRow>
											<TableCell>Financial Year Start</TableCell>
											<TableCell><Box className={classes.box} p={2}>15th July</Box></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Accounting Method</TableCell>
											<TableCell><Box className={classes.box} p={2}>Accrual</Box></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Tax year starts</TableCell>
											<TableCell><Box className={classes.box} p={2}>15th July</Box></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Tax Type</TableCell>
											<TableCell><Box className={classes.box} p={2}>Limited Liability</Box></TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Paper>
						</Grid>
						<Grid item xs={7}></Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<Paper square elevation={0}>
								<Toolbar>
									<Typography variant="h6">Accounting Years</Typography>
								</Toolbar>
								<Table size="small" className={classes.table}>
									<TableBody>
										<TableRow>
											<TableCell component="th">Name</TableCell>
											<TableCell><TextField id="outlined-basic" label="Outlined" variant="outlined" /></TableCell>
											<TableCell component="th">Start Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>
											</TableCell>
											<TableCell component="th">End Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>
											</TableCell>
											<TableCell component="th"><Typography variant="subtitle1">Opened</Typography></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell><TextField id="outlined-basic" label="Outlined" variant="outlined" /></TableCell>
											<TableCell>Start Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>
											</TableCell>
											<TableCell>End Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>
											</TableCell>
											<TableCell><Typography variant="subtitle1">Opened</Typography></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell><TextField id="outlined-basic" label="Outlined" variant="outlined" /></TableCell>
											<TableCell>Start Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>
											</TableCell>
											<TableCell>End Date</TableCell>
											<TableCell>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														format="MM/dd/yyyy"
														margin="normal"
														inputVariant="outlined"
														name="startDate"
														id="date-picker-startDate"
														label="Start Date"
														value={form.startDate}
														onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
														KeyboardButtonProps={{
															'aria-label': 'change date',
														}}
														fullWidth
													/>
												</MuiPickersUtilsProvider>	
											</TableCell>
											<TableCell><Typography variant="subtitle1">Closed</Typography></TableCell>
										</TableRow>
										<TableRow>
											<TableCell colSpan={7}>
												<Button variant="contained" color="primary" startIcon={<AddIcon />}>Add More</Button>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default compose(
	withRouter,
	memo
)(SettingsLayout)