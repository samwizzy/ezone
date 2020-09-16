import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ModuleLayout from './ModuleLayout'; 
import ListBoard from '../Reports/ListBoard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paperBase:{
  padding:'15px'
  },
  base:{
      paddingTop: '5px',
      paddingLeft:'5px',
      paddingRight:'5px',
      marginBottom:'20px'
  },
  pap:{
      padding:'8px',
      marginBottom:'15px'
  }
}));

const Reports = () => {
    const classes = useStyles();
    const recievables = ['Customer Ledgers','Aged Receivables'
    ,'Customer master file','Cash Receipt Jornals','Invoice Register',
    'Sales Order Details','Sales Journal','Sales taxes','Taxes/Exempt Sales','Quote register']
    const fixedAsset =['Fixed Asset Register','Fixed Asset Schedule']
    const payables =['Vendor Ledgers','Aged Payables',
    'Cash Journal report','Purchase order register',
    'Bill reports', 'Payments reports','Quotation reports','Purchase journal','vendor master life','Purchase order report']
    const ledger =['Cash account register','Charts of Accounts','General Journal','General ledger','Trial Balance']
    const financialStatement =['income Statement','Statement of financial position'
    ,'Cashflow']
    const inventory =['Cost of goods sold','Inventory status report','Inv.valuation report','Item list','Physical Inventory list']
    const payroll =['Payroll Journals','Payroll Check Register',
    'Payroll Tax report','Tax liability Report','Employee Earnings Report','Employee Compensation Report','Employee List']
    return ( 
      <ModuleLayout>
        <div className={classes.base}>
          <Paper className={classes.paperBase} elevation={1}>
            <Grid container >
                <Grid item xs={12}>
                <Paper className={classes.pap} elevation={3} >
                <Typography gutterBottom variant="h6" component="h1">
                 Reports
                </Typography>
            </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Grid container spacing={2}>
                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'blue'} title={'Recievables'} contents={recievables}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'orchild'} title={'Fixed Asset'} contents={fixedAsset}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          </Grid>  
                        
                        </Grid>

                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                 
                                <Paper elevation={3} >
                                <Paper elevation={1}>
                                <ListBoard bar={'green'} title={'Payables'} contents={payables}/>
                                </Paper>
                               </Paper>

                                </Grid>

                                <Grid item xs={12}>
                                 
                                <Paper elevation={3} >
                                <Paper elevation={1}>
                                <ListBoard bar={'orchild'} title={'Taxes'} contents={['Tax Summary']}/>
                                </Paper>
                               </Paper>

                                </Grid>


                            </Grid>
                        
                        </Grid>



                        <Grid item xs={3}>
                          <Grid container spacing={2}>
                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'yellow'} title={'General Ledger'} contents={ledger}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'purple'} title={'Budget'} contents={['Budget report','Budget Vs Actuals']}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'green'} title={'Inventory'} contents={inventory}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          </Grid>  
                        
                        </Grid>


                        <Grid item xs={3}>
                          <Grid container spacing={2}>
                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'pink'} title={'Financial Statement'} contents={financialStatement}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          <Grid item xs={12}>
                          <Paper elevation={3} >
                          <Paper elevation={1}>
                           <ListBoard bar={'purple'} title={'Payroll'} contents={payroll}/>
                          </Paper>
                        </Paper>
                          </Grid>

                          </Grid>  
                        
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            
            </Paper>
        </div>
        </ModuleLayout>
     );
}
 
export default Reports;