import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const styles = {
  card: {
    // border: '2px solid green'
   
  },
  paper: {
    height: 200,
    width: 200,
    padding: 20
  },
  leftSection: {
    // border: '2px solid gray'
  },
  rightSection:{
    // border: '2px solid blue'
  },
  featureHeatmap:{
      width: 200,
      height:500,
      marginTop:30,
    //   border: '2px solid yellow'
  },
  colorBar:{
    height: 442,
    width: 20,
    marginTop:9,
    marginLeft: -8   
  },
  mainContainer:{
      overflow: 'scroll'
  },
  composite: {
    width: 170,
    marginLeft: -10,
    marginBottom: -8,
    marginTop: 5
  },
  regionHeatmap:{
    width: 180
  }
};

const CodingSection = (props) => {
  const { classes } = props;

  return (
    <div className={classes.card}>
      <CardContent>
          {/* Header */}
        <Typography variant="h5" gutterBottom>
          Coding Section
        </Typography>
        <Divider />
        <br/>

       {/* Main Container*/}
       <Grid container spacing={24} direction="row" wrap="nowrap" justify="flex-start" className={classes.mainContainer}>

            {/* Left Section */}
            <Grid item className={classes.leftSection}>
                <Grid container 
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={0}
                wrap="nowrap">
                    <Grid item >
                    <img src="http://pluto.vmhost.psu.edu:8080/data/AllFeatures/8602_Tbp1_All_Features.png" alt="All Features Heatmap"
                    className={classes.featureHeatmap}/>
                    </Grid>
                    <Grid item >
                        <img src="https://via.placeholder.com/30x500" 
                        alt="Bound Features Colorbar"
                        className={classes.colorBar}/>
                    </Grid>
                    <Grid item >
                    <img src="http://pluto.vmhost.psu.edu:8080/data/BoundFeatures/8602_Tbp1_Bound_Features.png" alt="Bound Features Heatmap"
                        className={classes.featureHeatmap}/>
                    </Grid>
                    <Grid item >
                        <img src="https://via.placeholder.com/30x500" 
                        alt="Bound Features Colorbar"
                        className={classes.colorBar}/>
                    </Grid>
                </Grid>
            </Grid>
            
            {/* Buffer Section */}
            <Grid item ></Grid>
            
            {/* Right Section */}
            <Grid item className={classes.rightSection}>
        
            <Grid container 
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={8}
            wrap="nowrap">

                {/* NFR */}
                <Grid item >
                    <Grid container 
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    spacing={0}>
                        <Grid item >
                            <img src="http://pluto.vmhost.psu.edu:8080/data/NFR/8602_Tbp1_NFR_Composite.png" 
                                 alt="Bound Features Colorbar"
                                 className={classes.composite}/>
                        </Grid>
                        <Grid item >
                            <img src="http://pluto.vmhost.psu.edu:8080/data/NFR/8602_Tbp1_NFR_Heatmap.png" 
                                    alt="Bound Features Colorbar"
                                    className={classes.regionHeatmap}/>
                        </Grid>                        
                    </Grid>
                </Grid>

                {/* TSS */}
                <Grid item >
                    <Grid container 
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={0}>
                            <Grid item >
                                <img src="http://pluto.vmhost.psu.edu:8080/data/TSS/8602_Tbp1_TSS_Composite.png" 
                                    alt="Bound Features Colorbar"
                                    className={classes.composite}/>
                            </Grid>
                            <Grid item >
                                <img src="http://pluto.vmhost.psu.edu:8080/data/TSS/8602_Tbp1_TSS_Heatmap.png" 
                                        alt="Bound Features Colorbar"
                                        className={classes.regionHeatmap}/>
                            </Grid>                        
                        </Grid>
                </Grid>

                {/* TES */}
                <Grid item >
                    <Grid container 
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={0}>
                            <Grid item >
                                <img src="http://pluto.vmhost.psu.edu:8080/data/TES/8602_Tbp1_TES_Composite.png" 
                                    alt="Bound Features Colorbar"
                                    className={classes.composite}/>
                            </Grid>
                            <Grid item >
                                <img src="http://pluto.vmhost.psu.edu:8080/data/TES/8602_Tbp1_TES_Heatmap.png" 
                                        alt="Bound Features Colorbar"
                                        className={classes.regionHeatmap}/>
                            </Grid>                        
                    </Grid>
                </Grid>

            </Grid>

        </Grid>
       
       </Grid>

      </CardContent>    
    </div>
  );
}

CodingSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodingSection);
