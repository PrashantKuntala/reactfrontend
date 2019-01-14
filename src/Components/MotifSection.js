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
      width: 250,
      height:500,
    //   marginTop:30,
    //   border: '2px solid yellow'
  },
  motifComposite:{
    height: 200,
    width: 275,
  },
  motifHeatmap:{
    width: 250,
    height:500,
    //   border: '2px solid yellow',
    marginTop:-20
  },
  motifLogo:{
     width: 250,
     height: 100,
     marginTop: 78
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
  chexmixContent:{
      border : "2px solid red"
  },  
  
});

class MotifSection extends React.Component {

  // value is used to keep the tab active
  state = {
    selectedTab: 0,
    imageUrl : this.props.images
  };

// Used to update the MotifSection , when new replicate tab is selected
  componentWillReceiveProps(newProps){
    // console.log('Props changed for the coding section')
    // console.log(newProps);
    this.setState({
        selectedTab: 0,
        imageUrl: newProps.images
    });
    
 }

 // Should be another way to do this , but for now this works
// How about sending the props themselves in the compressed way so that these prop changes can be made easy. 
  handleChange = (event, selectedTab) => {
    
    switch(selectedTab) {
        case 1:
            this.setState({
                selectedTab: selectedTab,
                imageUrl: {motif1Logo:this.props.images.motif2Logo, motif1Composite: this.props.images.motif2Composite, motif1Heatmap:this.props.images.motif2Heatmap,
                    motif1FourColor:this.props.images.motif2FourColor}
            });
          break;
        case 2:
        this.setState({
            selectedTab: selectedTab,
            imageUrl: {motif1Logo:this.props.images.motif3Logo, motif1Composite: this.props.images.motif3Composite, motif1Heatmap:this.props.images.motif3Heatmap,
                motif1FourColor:this.props.images.motif3FourColor}
        })
        break;
        default:
            this.setState({
                selectedTab: selectedTab,
                imageUrl: this.props.images
            })
      }
  };

  render() {
  const { classes } = this.props;
  const { imageUrl } = this.state;
  const { selectedTab } = this.state;
//   console.log(this.props.motifCount);

  var tablist = [<Tab label="Motif 1" key={0} />,  
  <Tab label="Motif 2" key={1} />,
  <Tab label="Motif 3" key={2}/>]
   
 // setting the number of motif tabs , based on motifCount   
  switch(this.props.motifCount) {
    
    case 0:
    tablist = [
        <Tab label="Motif" disabled key={3}/>,
    ]    
    break;

    case 1:
    tablist = [
        <Tab label="Motif 1" key={0} />,
    ]    
    break;

    case 2:
    tablist = [
        <Tab label="Motif 1" key={0} />,  
        <Tab label="Motif 2" key={1} />,
    ]        
    break;

    default:
    tablist = [
        <Tab label="Motif 1" key={0} />,  
        <Tab label="Motif 2" key={1} />,
        <Tab label="Motif 3" key={2}/>
    ]
  }

 
const motifContent = this.props.motifCount <= 0 ? 
<CardContent className={classes.sectionHolder}> 
    <Typography variant="overline" gutterBottom style={{textAlign:"center"}}>
    No Motifs were Reported 
    </Typography>
</CardContent> : 

<CardContent className={classes.sectionHolder}>
    <Typography component="div" >
        {/* Chexmix Heatmap Section */}
        <Grid container spacing={24} direction="row" 
        justify="center" className={classes.mainContainer}>

                {/* Left Section */}
                <Grid item className={classes.leftSection}>
                    <Grid container 
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={0}
                    >
                        <Grid item >
                        <img src={imageUrl.motif1Logo} alt="Motif Logo"
                        className={classes.motifLogo}/>
                        </Grid>                               
                        <Grid item >
                        <img src={imageUrl.motif1FourColor} alt="FourColor Plot"
                            className={classes.featureHeatmap}/>
                        </Grid>                                
                    </Grid>
                </Grid>
                
                {/* Buffer Section */}
                <Grid item ></Grid>
                
                {/* Right Section */}
                <Grid item className={classes.rightSection}>
                    <Grid container 
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={0}
                    >
                        <Grid item >
                        <img src={imageUrl.motif1Composite} alt="Motif Composite"
                        className={classes.motifComposite}/>
                        </Grid>                               
                        <Grid item >
                        <img src={imageUrl.motif1Heatmap} alt="Motif Heatmap"
                            className={classes.motifHeatmap}/>
                        </Grid>                                
                    </Grid>
                </Grid>
                                
        </Grid>  
    </Typography>
</CardContent>

  
  return (
    <div className={classes.card}>     
        {/* Header */}
        <Typography variant="overline" component="h5" gutterBottom className={classes.sectionTitle}>
          Motif Analysis
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
            {tablist}
            
          </Tabs>

          <Divider/> 

            {motifContent}
          
          
      </Paper> 

    </div>
  );
  }
}

MotifSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MotifSection);
