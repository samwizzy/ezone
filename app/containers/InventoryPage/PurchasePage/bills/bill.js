import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import ImportIcon from '@material-ui/icons/GetApp';
import ExportIcon from '@material-ui/icons/Publish';
import { Grid, Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  paperBase:{
    padding: '15px',
  },
  base:{
    paddingTop: '10px',
    paddingLeft:'10px',
    paddingRight:'10px',
    marginBottom:'20px'
  },
  pap:{
    padding:'10px',
    marginBottom:'15px'
  },
  papy:{
    padding:'12px',
    marginBottom:'15px'
  },
  controlButtons:{
    float:'right'  
  },
  divContent:{
    textAlign:'center',
    margin:'3px'
  }
}));

const Bill = () => {
  const classes = useStyles();
  const [salesorders] = useState([]);
  const sales = [
    {
      value: 1,
      label: 'Nepa Bill',
    },
    {
      value: 2,
      label: 'House Rent',
    }
  ];

  const columns = [
    {
      name: 'referenceNumber',
      label: 'Reference number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'vendor',
      label: 'Vendor',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'balance',
      label: 'Balance',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'billStatus',
      label: 'Bill Status',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return ( 

    <div className={classes.base}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Paper className={classes.papy} elevation={3}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Grid item xs={12}>
                  <div>
                    <Typography gutterBottom variant="h5" component="h1">
                      Bill
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <Autocomplete
                      id="sales"
                      options={sales}
                      size="small"
                      getOptionLabel={option => option.label}
                      onChange={(event, value) => { 
                        // accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                        // setFinancialYearDate();
                      }}
                      style={{ width: 200 }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label=""
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <div className={classes.controlButtons}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div className={classes.divContent}>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary">
                          >
                            New Bill
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className={classes.divContent}>
                          <Grid container spacing={0}>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={4}>
                              <div>
                                <Button
                                  startIcon={<ImportIcon />}
                                  size="small"
                                  variant="contained">
                                >
                                  Import
                                </Button>
                              </div> 
                            </Grid>
                            <Grid item xs={4}>
                              <div>
                                <Button
                                  startIcon={<ExportIcon />}
                                  size="small"
                                  variant="contained">
                                >
                                  Export
                              </div> 
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.pap}>
            <div>
              <React.Fragment>
                <div className={classes.root}>
                  <Grid container>
                    <Grid item xs={12}>
                      <MUIDataTable
                        className={classes.datatable}
                        data={salesorders}
                        columns={columns}
                      />
                    </Grid>
                  </Grid>
                </div>
              </React.Fragment>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bill;
