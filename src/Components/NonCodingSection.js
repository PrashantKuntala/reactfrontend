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

  // set the imageUrl to the props and when tab is changed , update the state to subsector images  
  state = {
    selectedTab: 0,    
    imageUrl : this.props.images
  };

  // Used to update the NonCodingSection , when new replicate tab is selected
  componentWillReceiveProps(newProps){
    // console.log('Props changed for the non-coding section')
    // console.log(newProps);
    this.setState({
        selectedTab: 0,
        imageUrl: newProps.images
    });
    
 }

  handleChange = (event, selectedTab) => {
    
    selectedTab === 0 ? this.setState({
        selectedTab: selectedTab,
        imageUrl: this.props.images
    }) : 
    this.setState({
        selectedTab: selectedTab,
        imageUrl: {cutHeatmap:this.props.images.cutEnrichedHeatmap,sutHeatmap:this.props.images.sutEnrichedHeatmap,xutHeatmap:this.props.images.xutEnrichedHeatmap,trnaHeatmap:this.props.images.trnaHeatmap,xelementHeatmap:this.props.images.xelementHeatmap,centromereHeatmap:this.props.images.centromereHeatmap,arsHeatmap:this.props.images.arsHeatmap}
    })
    
  };

  render() {
  const { classes } = this.props;
  const { imageUrl } = this.state;
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
        
            <Typography component="div" >
                    {/* Chexmix and Subsector Heatmap Section */}
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
                    </Grid>  
            </Typography>
         
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
