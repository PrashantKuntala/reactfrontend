import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';

// additional components
import CodingSection from './CodingSection';
import NonCodingSection from './NonCodingSection';
import OtherFeaturesSection from './OtherFeaturesSection';
import MotifSection from './MotifSection';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  scroller:{
    overflow: "hidden"
  },
  card: {
    marginTop: 20
},
  treatmentBadge: {
    marginRight: 20,
  },
  sectionHolder:{
    background: "#fafafa",
  },
  contentHolder:{
  //  setting the padding based on the screen size
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      padding: 8,
    },
    [theme.breakpoints.up('md')]: {
      // backgroundColor: theme.palette.primary.main,
      padding: 8 * 3,
    },
    [theme.breakpoints.up('lg')]: {
      // backgroundColor: "green",
      padding: 8 * 3,
    },
  }
});


class ReplicateTabs extends React.Component {
 // selected Replicate
  state = {
    replicate: 0,
    samples : this.props.samples[0]
  };

  handleChange = (event, replicate) => {
    this.setState({ replicate: replicate, samples:this.props.samples[replicate] });
    console.log("Replicate Changed to sampleId : " + this.props.samples[replicate].sampleId);
        
  };
  

  render() {
    const { classes } = this.props;
    const { replicate } = this.state;

    
    console.log("inside ReplicateTables");    
    console.log(this.props.samples);


    let i = 0;
    let tabList = this.props.samples.map(sample=>{

      // Setting the badge based on Whether it is heatshock or YPD
      // make sure you have space inside the <Badge> tag, since some content is expected.
      const badge = sample.treatments === "Normal" ?
        <Badge badgeContent={" "} color="primary" className={classes.treatmentBadge}> </Badge>
      :
      <Badge badgeContent={" "} color="secondary" className={classes.treatmentBadge}> </Badge>
  
     
      i = i + 1;
      let tabname = <Typography>
        {badge} 
        { "Replicate "+ i.toString()}                  
      </Typography>;
      return (
        <Tab label={tabname} key={i} />
      )
    });
    

  return (
      <div className={classes.root}>

        <Paper className={classes.card}> 
        
        {/* overriding the css using the css api for the tabs, 
        removed the scrollbar that appears otherwise 
        */}  

          <Tabs
            value={replicate}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable={true}
            scrollButtons="on"            
            classes={{scrollable:classes.scroller}}
          >    
            {tabList}
          </Tabs>

          <Divider/> 

          {/* Main Content */}
          <CardContent className={classes.sectionHolder}> 

            <Typography component="div" className={classes.contentHolder}>
              <Grid container spacing={24} direction="column" wrap="nowrap" 
                    justify="flex-start" className={classes.mainContainer}> 
                {/* Subsections for each replicate */}
                <Grid item>
                  <CodingSection images={this.state.samples.codingImages[0]}/>
                </Grid>
                <Grid item >
                  <NonCodingSection images={this.state.samples.nonCodingImages[0]}/> 
                </Grid> 
                <Grid item >
                  <OtherFeaturesSection images={this.state.samples.nonCodingImages[0]}/> 
                </Grid> 
                <Grid item>
                  <MotifSection images={this.state.samples.motifImages[0]} motifCount={this.state.samples.motifCount}/>
                </Grid>          
              </Grid>
            </Typography>

          </CardContent>          
      </Paper> 
      </div>
    );
  }
}

ReplicateTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReplicateTabs);