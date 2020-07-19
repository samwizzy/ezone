import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import ImportIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/ArrowForward';
import ExportIcon from '@material-ui/icons/Publish';
import { Grid,
    Button,
    TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FixedAssetContext } from '.';


const useStyles = makeStyles((theme) => ({
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
    padding:'15px'
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
const Assets = () => {
    const fixedContext = useContext(FixedAssetContext)
    const classes = useStyles();
    const [assetData] = useState([
      {item:'Building',itemid:'Olaimeji Wale',itemclass:'Stock Item',unitprice:'3rd Jul,2019',unitcost:'3rd Jul,2019',stockonhand:'1000'},
      {item:'Building',itemid:'John Wick',itemclass:'Stock Item',unitprice:'3rd Jul,2019',unitcost:'3rd Jul,2019',stockonhand:'1000'},
      {item:'Building',itemid:'Mary Paul',itemclass:'Mary Paul',unitprice:'7th May,2020',unitcost:'7th May,2020',stockonhand:'30'},
      {item:'Building',itemid:'John Wick',itemclass:'John Wick',unitprice:'3rd Jul,2019',unitcost:'3rd Jul,2019',stockonhand:'1000'},
      {item:'Building',itemid:'Mary Paul',itemclass:'Service',unitprice:'7th May,2020',unitcost:'7th May,2020',stockonhand:'10'},

      
    ]);
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
          name: 'item',
          label: 'Item',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'itemid',
          label: 'Item Id',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'itemclass',
          label: 'Item Class',
          options: {
            filter: true,
            sort: false,
          },
        },
        /*{
           name: 'balance',
            label: 'Balance',
            options: {
              filter: true,
              sort: false,
            },
        },*/

        {
            name: 'unitprice',
             label: 'Unit price',
             options: {
               filter: true,
               sort: false,
             },
         },
         {
          name: 'unitcost',
           label: 'Unit Cost',
           options: {
             filter: true,
             sort: false,
           },
       },
       {
        name: 'stockonhand',
         label: 'Stock on Hand',
         options: {
           filter: true,
           sort: false,
         },
     }
    
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
                              Asset Master Data
                             </Typography>
                             </div>
                           </Grid>
                           <Grid item xs={12}>
                               <div>
                     <Autocomplete
                    id="sales"
                    options={sales}
                    size={'small'}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                    //accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                      // setFinancialYearDate();
                    }}
                    style={{ width: 200}}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={''}
                        style={{borderRadius:'100px' }}
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
                                      size={'small'}
                                      onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'newasset'})}}
                                      variant="contained"
                                       color="primary">
                                        New Assets
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
                                       size={'small'}
                                      variant="contained">
                                        Import
                                            </Button>
                                      </div> 
                                          </Grid>
                                          <Grid item xs={4}>
                                          <div>
                                      <Button
                                       startIcon={<ExportIcon />}
                                       size={'small'}
                                      variant="contained">
                                        Export
                                        </Button>
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
                          data={assetData}
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
}
 
export default Assets;