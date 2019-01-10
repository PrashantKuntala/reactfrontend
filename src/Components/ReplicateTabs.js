import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

// additional components
import CodingSection from './CodingSection';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  scroller:{
    overflow: "hidden"
  },
  card: {
    margin: 20
},
chip: {
  margin: theme.spacing.unit / 4,
  fontSize: 14,  
  },  
  customWidth: {
    maxWidth: 500,
    fontSize:12
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  center : {
    margin: 'auto',
    width: '100%',

  },
  treatmentBadge: {
    marginLeft: 20,
  },
  
  
});

class ScrollableTabsButtonAuto extends React.Component {
    // value is used to keep the tab active
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log("inside ReplicateTables");
    
    console.log(this.props.samples.length);
    let i = 0;
    let tabList = this.props.samples.map(sample=>{

      // Setting the badge based on Whether it is heatshock or YPD
      if(sample.treatments === "Normal"){
        var badge =  <Badge badgeContent={sample.treatments.charAt(0)} color="primary" className={classes.treatmentBadge}> </Badge>
      }
      else{
        badge =  <Badge badgeContent={sample.treatments.charAt(0)} color="primary" className={classes.treatmentBadge}> </Badge>
      }
     
            i = i + 1;
            let tabname = <Typography>
             { "Replicate "+ i.toString()} 
             {badge}           
            </Typography>;

      return (
        <Tab label={tabname} key={i} />
      )
    });

    let tabContent = this.props.samples.map(sample=>{
      // To check if the sample is a merged replicate
      // if (sample.isMergedReplicate){
      //   console.log("Found merged Replicate");        
      // } 
      // else{
      //   console.log("Not Merged");        
      // }

      // The components that form the replicate sections
      return (
       <div className={classes.center}>
        <CodingSection images={sample.codingImages[0]}/>       
       </div>
      )

    });

    return (
      <div className={classes.root}>
        <Paper className={classes.card}> 
        {/* overriding the css using the css api for the tabs, removed the scrollbar that appears otherwise */}       
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable={true}
            scrollButtons="on"            
            classes={{scrollable:classes.scroller}}

          >
            {/* <Tab icon={
              <Grid container spacing={16} alignItems={"center"}>                
                <Grid item>
                <WhatShot /> 
                </Grid>
                <Grid item>
                Replicate 1
                </Grid>
              </Grid>               
            }/> */}

            {tabList}
            {/* <Tab label="Replicate 1"/>
            <Tab label="Replicate 2"/> */}
            
          </Tabs>
          <Divider/> 

          {/* below is a short circuit operation : https://stackoverflow.com/questions/40682064/what-does-operator-indicate-with-this-props-children-react-cloneelemen  */}
        {value === 0 && <TabContainer>
          {/* <Grid container spacing={0} alignItems={"center"} className={classes.chipArray}>                
                <Grid item>
                <Tooltip title="Assay Type" classes={{ tooltip: classes.customWidth }}>
                  <Chip 
                  icon={<WhatShot />}                
                  label="ChIP-exo"
                  color="primary"                                   
                  className={classes.chip}                       
                  />
                  </Tooltip>
                </Grid>
                <Grid item>
                <Tooltip title="Growth Media" classes={{ tooltip: classes.customWidth }}>
                  <Chip
                  icon={<GrowthMediaIcon />}                 
                  label="YPD"    
                  color="primary"
                  className={classes.chip}                                
                  />
                  </Tooltip>
                </Grid>
                <Grid item>                  
                  <Tooltip title="Treatments" classes={{ tooltip: classes.customWidth }}>
                  <Chip 
                  icon={<FlashOn />}                
                  label="HeatShock"
                  color="primary"                                   
                  className={classes.chip}                  
                  />
                  </Tooltip>
                </Grid>
                
          </Grid>
          <br/> */}
          {tabContent[0]}    

      {/* <CardActions>
        <Button size="small" variant="outlined">Learn More</Button>
      </CardActions> */}
   

            </TabContainer>}

            {value === 1 && <TabContainer>

{/* <Grid container spacing={0} alignItems={"center"} className={classes.chipArray}>                
      <Grid item>
      <Tooltip title="Assay-type" classes={{ tooltip: classes.customWidth }}>
        <Chip 
        icon={<WhatShot />}                
        label="ChIP-exo"
        color="primary"                                   
        className={classes.chip} 
        variant="outlined"    
        />
        </Tooltip>
      </Grid>
      <Grid item>
      <Tooltip title="Growth Media" classes={{ tooltip: classes.customWidth }}>
        <Chip
        icon={<GrowthMediaIcon />}                 
        label="YPD"    
        color="primary"
        className={classes.chip}
        variant="outlined"              
        />
        </Tooltip>
      </Grid>
      <Grid item>                  
        <Tooltip title="Treatments" classes={{ tooltip: classes.customWidth }}>
        <Chip 
        icon={<FlashOn />}                
        label="HeatShock"
        color="primary"                                   
        className={classes.chip}
        variant="outlined"               
        />
        </Tooltip>
      </Grid>
      
</Grid> */}

{tabContent[0]}
  
     

</TabContainer>}
       
        </Paper>        
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);