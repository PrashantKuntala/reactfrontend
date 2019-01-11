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

const styles = theme=> ({
  card: {
    // border: `2px solid green`,
    maxWidth: 1100
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
    height: 443,
    width: 20,
    marginTop:11,
    marginLeft: -6   
  },
  enrichedcolorBar:{
    height: 443,
    width: 20,
    marginTop:11,
    marginLeft: -12.5 
  },
  mainContainer:{
      overflow: 'scroll'
  },
  composite: {
    width: 170,
    marginLeft: -4,
    marginBottom: -8,
    marginTop: 5
  },
  regionHeatmap:{
    width: 180
  },
  sectionTitle:{
      fontSize: 18,
  },
  scroller:{
    overflow: "hidden"
  },
  chexmixContent:{
      border : "2px solid red"
  },  
  
});

class CodingSection extends React.Component {

  // value is used to keep the tab active
  state = {
    selectedTab: 0,
    imageUrl : this.props.images
  };

 // Should be another way to do this , but for now this works
// How about sending the props themselves in the compressed way so that these prop changes can be made easy. 
  handleChange = (event, selectedTab) => {
    selectedTab === 0 ? this.setState({
        selectedTab: selectedTab,
        imageUrl: this.props.images
    }) : 
    this.setState({
        selectedTab: selectedTab,
        imageUrl: {allFeaturesHeatmap:this.props.images.allFeaturesHeatmap,allFeaturesColorbar:this.props.images.allFeaturesColorbar,boundFeaturesHeatmap:this.props.images.enrichedFeaturesHeatmap,boundFeaturesColorbar:this.props.images.enrichedFeaturesColorbar,
        nfrComposite:this.props.images.nfrEnrichedComposite,nfrHeatmap:this.props.images.nfrEnrichedHeatmap,tssComposite:this.props.images.tssEnrichedComposite,tssHeatmap:this.props.images.tssEnrichedHeatmap,tesHeatmap:this.props.images.tesEnrichedHeatmap,tesComposite:this.props.images.tesEnrichedComposite}
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
          Coding Features
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
                {/* Chexmix Heatmap Section */}
                <Grid container spacing={16} direction="row" wrap="nowrap" 
                justify="flex-start" className={classes.mainContainer}>

                        {/* Buffer Section */}
                        <Grid item ></Grid>

                        {/* Left Section */}
                        <Grid item className={classes.leftSection}>
                            <Grid container 
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={0}
                            wrap="nowrap">
                                <Grid item >
                                <img src={imageUrl.allFeaturesHeatmap} alt="All Features Heatmap"
                                className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                    <img src={imageUrl.allFeaturesColorbar}
                                    alt="Bound Features Colorbar"
                                    className={classes.colorBar}/>
                                </Grid>
                                <Grid item >
                                <img src={imageUrl.boundFeaturesHeatmap} alt="Bound Features Heatmap"
                                    className={classes.featureHeatmap}/>
                                </Grid>
                                <Grid item >
                                    <img src={imageUrl.boundFeaturesColorbar}
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
                                        <img src={imageUrl.nfrComposite} 
                                            alt="NFR Composite"
                                            className={classes.composite}/>
                                    </Grid>
                                    <Grid item >
                                        <img src={imageUrl.nfrHeatmap}
                                                alt="NFR Heatmap"
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
                                            <img src={imageUrl.tssComposite}
                                                alt="TSS Composite"
                                                className={classes.composite}/>
                                        </Grid>
                                        <Grid item >
                                            <img src={imageUrl.tssHeatmap} 
                                                    alt="TSS Heatmap"
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
                                            <img src={imageUrl.tesComposite} 
                                                alt="TES Composite"
                                                className={classes.composite}/>
                                        </Grid>
                                        <Grid item >
                                            <img src={imageUrl.tesHeatmap} 
                                                    alt="TES Heatmap"
                                                    className={classes.regionHeatmap}/>
                                        </Grid>                        
                                </Grid>
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

CodingSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodingSection);
