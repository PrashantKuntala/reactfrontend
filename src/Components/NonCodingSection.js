import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

//  for Chexmix and Subsector tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  card: {
    // border: `2px solid green`,
    maxWidth: 1100
  },
  topSection: {
    // border: '2px solid gray'
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
  scroller:{
    overflow: "hidden"
  },  
  
};

class NonCodingSection extends React.Component {

  // value is used to keep the tab active
  state = {
    selectedTab: 0,
  };

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
    // console.log("Event for the coding section tab " );    
    // console.log(event);
    
  };

  render() {
  const { classes } = this.props;
  const imageUrl = this.props.images;
  const { selectedTab } = this.state;

  return (
    <div className={classes.card}>     
        {/* Header */}
        <Typography variant="overline" component="h5" gutterBottom className={classes.sectionTitle}>
          Non - Coding Features
        </Typography>

              
        <Paper> 
        
        {/* overriding the css using the css api for the tabs, 
        removed the scrollbar that appears otherwise 
        */}  

          <Tabs
            value={selectedTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable={true}
            scrollButtons="on"            
            classes={{scrollable:classes.scroller}}            
          >    
            <Tab label="Chexmix" key={0} />  
            <Tab label="Subsector" key={1} />
          </Tabs>

          <Divider/> 


          <CardContent className={classes.sectionHolder}>
          {/* below is a short circuit operation : https://stackoverflow.com/questions/40682064/what-does-operator-indicate-with-this-props-children-react-cloneelemen  */}
          {selectedTab === 0 && 
                    
            <Typography component="div" >
                {/* Chexmix Heatmap Section */}
                <Grid container spacing={16} direction="column" wrap="nowrap" 
                justify="flex-start" className={classes.mainContainer}>

                        {/* Buffer Section */}
                        <Grid item ></Grid>

                        {/* Top Section */}
                        <Grid item className={classes.topSection}>
                            <Grid container 
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={0}
                            >
                                <Grid item >
                                <img src={imageUrl.cutHeatmap} alt="CUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                <img src={imageUrl.sutHeatmap} alt="SUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                <img src={imageUrl.xutHeatmap} alt="XUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        {/* Buffer Section */}
                        <Grid item >
                            <Divider/>
                        </Grid>
                        
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
                                        <img src={imageUrl.arsHeatmap} alt="ARS Heatmap"
                                        className={classes.featureHeatmap}/>
                                    </Grid>
                            </Grid>
                                         
                </Grid>  
            </Typography>
                
          }

          {selectedTab === 1 && 
                    
            <Typography component="div" >
                {/* Subsector Heatmap Section */}
                <Grid container spacing={16} direction="column" wrap="nowrap" 
                justify="flex-start" className={classes.mainContainer}>

                        {/* Buffer Section */}
                        <Grid item ></Grid>

                        {/* Top Section */}
                        <Grid item className={classes.topSection}>
                            <Grid container 
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={0}
                            >
                                <Grid item >
                                <img src={imageUrl.cutEnrichedHeatmap} alt="enriched CUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                <img src={imageUrl.sutEnrichedHeatmap} alt="enriched SUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                <img src={imageUrl.xutEnrichedHeatmap} alt="enriched XUT Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        {/* Buffer Section */}
                        <Grid item >
                            <Divider/>
                        </Grid>
                        
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
                                        <img src={imageUrl.arsHeatmap} alt="ARS Heatmap"
                                        className={classes.featureHeatmap}/>
                                    </Grid>
                            </Grid>
                                         
                </Grid>  
            </Typography>
            
          }
          </CardContent>
          
      </Paper> 

    </div>
  );
  }
}

NonCodingSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NonCodingSection);
