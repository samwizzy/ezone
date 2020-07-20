import React from "react";
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import DocumentIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import {
    Paper,
    Grid,
    Typography,
  } from '@material-ui/core';
const FileContainer = (props) => {
    return ( 
        <div>
          <Paper elevation={3} style={{width:'300px',padding:'5px',borderRadius:'20px'}}>
              <Grid container spacing={3}>
                  <Grid item>
                   {props.icon === 'pdf'?
                   <PdfIcon style={{color:'red',fontSize:'40px'}} />
                   :
                   (((props.icon === 'png')||props.icon === 'jpeg'||props.icon === 'jpg')?<ImageIcon style={{color:'red',fontSize:'40px'}}/>:<DocumentIcon color="primary"  style={{fontSize:'40px'}}/>)
                   }
                  </Grid>
                  <Grid item>
                      <div style={{marginTop:'7.5px'}}>
                        {(`${props.name}`).length > 18 ?
                    <Typography variant="h6" component="h6">{`${(`${props.name}`).substr(0,16)}...`}</Typography>
                        :
                      <Typography variant="h6" component="h6">{props.name}</Typography>
                      }
                      </div>
                 
                  </Grid>
              </Grid>
          </Paper>
        </div>
     );
}
 
export default FileContainer;