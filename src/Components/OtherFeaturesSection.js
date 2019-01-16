import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = {
  card: {
    // border: `2px solid green`,
    maxWidth: 1100
  },
  bottomSection:{
    // border: '2px solid blue'
  },
  featureHeatmap:{
      width: 250,     
    //   border: '2px solid yellow'
  },
  mainContainer:{
      overflow: 'scroll'
  },
  sectionTitle:{
      fontSize: 18,
  },     
};

class OtherFeaturesSection extends React.Component {

  // set the imageUrl to the props and when tab is changed , update the state to subsector images  
  state = {    
    imageUrl : this.props.images
  };

  // Used to update the OtherFeaturesSection , when new replicate tab is selected
  componentWillReceiveProps(newProps){
    // console.log('Props changed for the non-coding section')
    // console.log(newProps);
    this.setState({        
        imageUrl: newProps.images
    });    
 }


  render() {
  const { classes } = this.props;
  const { imageUrl } = this.state;  
 
  return (
    <div className={classes.card}>     
        {/* Header */}
        <Typography variant="overline" component="h5" gutterBottom className={classes.sectionTitle}>
          Other Features
        </Typography>
              
        <Paper>  

          <CardContent className={classes.sectionHolder}>
        
            <Typography component="div" >
                    {/* Chexmix and Subsector Heatmap Section */}
                    <Grid container spacing={16} direction="column" wrap="nowrap" 
                    justify="flex-start" className={classes.mainContainer}>

                            {/* Buffer Section */}
                            <Grid item ></Grid>

                            {/* Bottom Section */}
                            <Grid item className={classes.bottomSection}>                               
                                <Grid container 
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    spacing={0}
                                >
                                        <Grid item >
                                            <img src={imageUrl.trnaHeatmap} alt="TRNA Heatmap"
                                            className={classes.featureHeatmap}/>
                                        </Grid>
                                        <Grid item >
                                            <img src={imageUrl.xelementHeatmap} alt="Xelement Heatmap"
                                            className={classes.featureHeatmap}/>
                                        </Grid>
                                        <Grid item >
                                            <img src={imageUrl.centromereHeatmap} alt="Centromere Heatmap"
                                            className={classes.featureHeatmap}/>
                                        </Grid>
                                        <Grid item >
                                            <img src={imageUrl.arsHeatmap} alt="ARS Heatmap"
                                            className={classes.featureHeatmap}/>
                                        </Grid>
                                </Grid>
                            </Grid>                 
                    </Grid>  
            </Typography>
         
          </CardContent>
          
      </Paper> 

    </div>
  );
  }
}

OtherFeaturesSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OtherFeaturesSection);
