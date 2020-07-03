import React from "react";
import Typography from '@material-ui/core/Typography';
import "../Reports/report.css";
import { Grid } from '@material-ui/core';
const ListBoard = (props) => {

    function selectColorBar(value){
    switch(value){
      case 'blue':
       return 'color_blue_bar';
       case 'green':
       return 'color_green_bar'; 
       case 'yellow':
       return 'color_yellow_bar'; 
       case 'pink':
       return 'color_pink_bar'; 
       case 'orchild':
       return 'color_orchild_bar';
       default:
          return 'color_purple_bar'; 

    }
    }

const listcontents = props.contents.map((content) =>
  <Typography key={content} variant="subtitle1" color="textSecondary">
  {content}
 </Typography>
);

    return ( 
     <div>
         <Grid container spacing={1}>
             <Grid item xs={2}>
             <div className={`list_board ${selectColorBar(props.bar)}`}/> 
             </Grid>
             <Grid item xs={10}>
              <div className="push_title">
              <Typography  variant="h6" color="textSecondary">
              {props.title}
              </Typography>
              </div>   
             </Grid>
             <Grid item xs={12}>
                 <div className="list_content">
                  {listcontents}
                 </div>
             </Grid>
         </Grid>
        
     </div>

     );
}
 
export default ListBoard;