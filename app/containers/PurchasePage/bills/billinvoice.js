import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import logo from '../octivier-logo.svg';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import EditIcon from '@material-ui/icons/EditOutlined';
import PdfIcon from '@material-ui/icons/PictureAsPdfOutlined';
import PrinterIcon from '@material-ui/icons/PrintOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import HistoryIcon from '@material-ui/icons/HistoryOutlined';
import MsgIcon from '@material-ui/icons/EmailOutlined';
import DropIcon from '@material-ui/icons/ArrowDropDown';
import AttachIcon from '@material-ui/icons/AttachFile';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import { Grid,
    Button,
    TextField,MenuItem,Select ,Menu,IconButton,Divider} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    total: {
      ...theme.typography.button,
      width:'290px',
      backgroundColor: theme.palette.background.paper,
      backgroundColor:'#bbb',
      padding: theme.spacing(1),
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
      flex: {
        position: "relative",
        padding: theme.spacing(8, 5)
      },
      status: {
        textAlign: "center",
        padding: theme.spacing(2, 5),
        position: "absolute",
        backgroundColor: '#bbb',
        color: theme.palette.common.white,
        top: 0, left: 0,
        "&::after": {
          content: "''",
          position: "absolute",
          top: 0, 
          right: "-52.67px",
          width: 0,
          height: 0,
          borderTop: "52.67px solid #bbb",
          borderRight: "52.67px solid transparent"
        },
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0, 
          right: "-52.67px",
          width: 0,
          height: 0,
          borderBottom: "52.67px solid #bbb",
          borderRight: "52.67px solid transparent"
        }
      },
    paperBase:{
    padding:'15px'
    },
    littleMargin:{
    marginBottom:'10px'
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
    },
    papy:{
        padding:'12px',
    },
    controlButtons:{
      float:'right'  
    },
    divContent:{
        textAlign:'center',
        margin:'3px'
    },
    divRight:{
        float:'right',
        padding:'5px'
    },
    pushForward:{
      marginTop:'10em'
    }
  }));


const BillinInvoice = () => {
    const classes = useStyles();
    const [paction, setPaction] = React.useState('CONFIRMED');
    const [activity, setActivity] = React.useState('Activity (Comment and History)');
    const [anchorEl, setAnchorEl] = React.useState(null);

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
        name: 'description',
        label: 'Description',
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: 'quantity',
        label: 'Quantity',
        options: {
          filter: true,
          sort: false,
        },
      },
      {
         name: 'rate',
          label: 'Rate',
          options: {
            filter: true,
            sort: false,
          },
      },
       {
          name: 'amount',
           label: 'Amount',
           options: {
             filter: true,
             sort: false,
           },
       }
    ];

    const salesValue =[
      {item:'Hp laptops',description:'Lorem ipsum dolor',quantity:2,rate:'$600',amount:'$600'},
      {item:'Hp laptops',description:'Lorem ipsum dolor',quantity:3,rate:'$600',amount:'$600'}
    ]


  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleChange = (event) => {
    setPaction(event.target.value);
  };
    const performAction = [
        {
          value: 'CONFIRMED',
          label: 'Mark as Confirmed',
        },
        {
          value: 'DRAFT',
          label: 'Mark as Draft',
        },
        {
          value: 'PENDING',
          label: 'Mark as Pending',
        },
        {
          value: 'CREAT_SHIPMENT',
          label: 'Create Shipment',
        },
      ];
    return ( 
        <div className={classes.paperBase}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
                 <Paper style={{minHeight:'50px'}} className={classes.pap} elevation={3}>
                     <div>
                     <Paper elevation={1}>
                         <div style={{float:'right'}}>
                             <Grid container spacing={1}>
                                 <Grid item xs={7}>
                                   <div className={classes.papy}> 
                                  <Grid container spacing={1}>
                                      <Grid item>
                                          <EditIcon/>
                                      </Grid>
                                      <Grid item>
                                          <PdfIcon/>
                                      </Grid>
                                      <Grid item>
                                          <PrinterIcon/>
                                      </Grid>
                                      <Grid item>
                                          <TrashIcon/>
                                      </Grid>
                                      <Grid item>
                                          <RefreshIcon/>
                                      </Grid>
                                      <Grid item>
                                          <MsgIcon/>
                                      </Grid>
                                  </Grid>
                                  </div> 
                                 </Grid>
                                 <Grid item xs={5}>
                                 <TextField
                             id="paction"
                             select
                             size={'small'}
                             label=""
                             value={paction}
                             onChange={handleChange}
                             SelectProps={{
                           native: true,
                          }}
                        variant="outlined"
                        >
                  {performAction.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                  </option>
          ))}
        </TextField>  
                                </Grid>
                             </Grid>

                         </div>
                         </Paper>
                     </div>

                 </Paper>
              </Grid>  

              <Grid item xs={12}>
                <Paper className={classes.pap} elevation={2}>
                  <Grid container spacing={10}>
                    <Grid item xs={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={1}>
                          <div style={{position:'relative',top:'10px'}}>
                           <HistoryIcon color="primary" />
                           </div>
                        </Grid>
                        <Grid item xs={11}>
                          <div>
                            <Grid container spacing={1}>
                              <Grid item xs={11}>
                                <div style={{position:'relative',top:'11px'}}>
                              <Typography color="primary" variant="body1">
                              {activity}
                              </Typography>
                              </div>
                              </Grid>
                              <Grid item xs={1}>
                                <div style={{position:'relative',left:'-2.5em'}}>
                              <IconButton color="primary" aria-controls="simple-menu"
                               component="span" onClick={handleClickMenu}>
                        <DropIcon color="primary" />
                       </IconButton>
                          <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                         open={Boolean(anchorEl)}
                         onClose={handleClose}
                          >
                      <MenuItem  value={1} onClick={(e) =>{
                        setActivity('Activity (Comment and History)')
                        setAnchorEl(null);
                      }}><Typography color="primary" variant="body1">
                     Activity (Comment and History)
                     </Typography></MenuItem>
                     <MenuItem value={2} onClick={(e) => {
                       setActivity('Activity (Confirmed and Saved)')
                       setAnchorEl(null);
                     }}>
                     <Typography color="primary" variant="body1">
                       Activity (Confirmed and Saved)</Typography></MenuItem>
                     <MenuItem value={3} onClick={(e)=>{
                       setActivity('Activity (Rejected)')
                       setAnchorEl(null);
                       }}>
                     <Typography color="primary" variant="body1">
                       Activity (Rejected)
                       </Typography></MenuItem>
                         </Menu>
                         </div>
                              </Grid>
                            </Grid>
                      </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      {/*<div>
                        <div className={classes.divRight}>
                         
                        <Typography variant="subtitle1" gutterBottom>
                          Shipments
                        </Typography>
                        <Divider style={{backgroundColor:'blue',height:'5px',borderRadius:'5px'}}/>
                        
                        </div>
              
                      </div>*/}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper elevation={2}>
                  <div className={classes.flex}>
                  <Grid container spacing={2}>
                   <Grid item xs={12}>
                     <Grid container spacing={10}>
                       <Grid item xs={4}>
                         <div>
                         <div className={classes.status}>
                         <Typography>Draft</Typography>
                        </div>
                         </div>
                       </Grid>
                       <Grid item xs={8}>
                         <div style={{position:'relative',top:'-3em'}}>
                           <div className={classes.divRight}>
                              <Grid container spacing={1}>
                                <Grid item>
                                <Typography variant="subtitle1">
                                     Invoice Status
                                    </Typography>
                                </Grid>
                                <Grid item>
                                  <div>
                                  <Typography style={{color:'red'}} variant="subtitle1">
                                     Not Invoiced
                                    </Typography>
                                  </div>
                                </Grid>
                               
                              </Grid>
                           </div>
                         </div>
                       </Grid>
                     </Grid>
                   </Grid>

                   <Grid item xs={12}>
                     <Grid container spacing={10}>
                       <Grid item xs={6}>
                         <div style={{position:'relative',top:'-1.8em'}}>
                         <Grid container spacing={2}>

                           <Grid item xs={12}>
                           <Grid item xs={12}>
                       <Grid container spacing={0}>
                         <Grid item xs={2}>
                           <img src={logo}/>
                         </Grid>
                         <Grid item xs={5}>
                           <div style={{position:'relative',top:'.9em',left:'-1.4em'}}>
                           <Typography variant="h6" component="h1">
                             First Marine
                           </Typography>
                           </div>
                         </Grid>
                       </Grid>
                       </Grid>
                           </Grid>
                           
                           <Grid item xs={12}>
                             <div>
                             <Typography variant="h4" component="h1" gutterBottom>
                            Purchase Order
                           </Typography>
                             </div>
                           <div className={classes.littleMargin}>
                           <Typography variant="h6" component="h1" gutterBottom>
                            Ref No: 029993939YU
                           </Typography>
                           </div>
                           <div>
                           <Typography style={{color:'grey'}} variant="subtitle2" gutterBottom>
                            Date: 3rd Jul 2019
                           </Typography>
                           </div>
                           </Grid>
                         </Grid>
                         </div>

                       </Grid>

                       <Grid item xs={6}>
                         <div>
                           <div className={classes.divRight}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div>
                                <Typography variant="h6" component="h1" gutterBottom>
                                 Bill To
                               </Typography>
                                </div>
                              </Grid>

                              <Grid item xs={12}>
                                <div>
                                <Typography Typography  variant="subtitle2" gutterBottom>
                                 John Well
                               </Typography>
                                </div>
                              </Grid>

                              <Grid item xs={12}>
                                <div>
                                <Typography Typography variant="subtitle2" gutterBottom>
                                 Holder's Limited
                               </Typography>
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <div>
                                <Typography Typography style={{color:'grey'}} variant="subtitle2" gutterBottom>
                                3a Idowu Martins Victoria Island Lagos
                               </Typography>
                                </div>
                              </Grid>
                            </Grid>
                           </div>
                         </div>
                       </Grid>
                     </Grid>

                   </Grid>

                   <Grid item xs={12}>
                     <Divider/>
                   </Grid>
                   <Grid item xs={12}>
                   <Typography Typography variant="subtitle1" gutterBottom>
                      Notes
                     </Typography>
                   <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       Lorem ipsum dolor sit amet, consecteur adipiscing elit,sed do elusmod tempor
                       incididnut ut labore
                     </Typography>
                   </Grid>
                   <Grid item xs={12}>
                     <Divider/>
                   </Grid>

              <Grid xs={12}>
              <Paper elevation={2}>
              <div className={classes.pap}>
                <div>
                <React.Fragment>
                  <div className={classes.root}>
                    <Grid container>
                      <Grid item xs={12}>
                        <MUIDataTable
                          className={classes.datatable}
                          data={salesValue}
                          columns={columns}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                </div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
             <Grid container spacing={10}>
               <Grid item xs={6}>
               <div className={classes.pushForward}>
                    <Button
                     startIcon={<AttachIcon />}
                    size={'small'}
                     variant="contained">
                      Attach a file
                      </Button>
                      </div> 
               </Grid>
               <Grid item xs={6}>
                 <div>
                   <div className={classes.divRight}>
                     <Grid container spacing={1}>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                      Tax
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       $600
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       Discount
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       $600
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                        Shipping Fee
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       $600
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                        Sub Total
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       $600
                      </Typography>
                       </Grid>
                       <Grid item xs={12}>
                         <div className={classes.total}>
                          <Grid container spacing={10}>
                          <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                        Total
                      </Typography>
                       </Grid>
                       <Grid item xs={6}>
                       <Typography Typography style={{color:'grey'}} variant="subtitle1" gutterBottom>
                       $600
                      </Typography>
                       </Grid>
                          </Grid>
                         </div>

                       </Grid>
                     </Grid>

                   </div>
                 </div>
                 
               </Grid>
             </Grid>
            </Grid>

                  </Grid>
                  </div>
                </Paper>

              </Grid>

            </Grid>
        </div>
     );
}
 
export default BillinInvoice;