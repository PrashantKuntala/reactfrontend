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
    margin: 20
},
  treatmentBadge: {
    marginRight: 20,
  },
  sectionHolder:{
    background: "#fafafa",
  }
});


class ReplicateTabs extends React.Component {
 // selected Replicate
  state = {
    replicate: 0,
  };

  handleChange = (event, replicate) => {
    this.setState({ replicate });
  };

  render() {
    const { classes } = this.props;
    const { replicate } = this.state;
    
    console.log("inside ReplicateTables");    
    console.log(this.props.samples.length);


    let i = 0;
    let tabList = this.props.samples.map(sample=>{

      // Setting the badge based on Whether it is heatshock or YPD
      if(sample.treatments === "Normal"){
        var badge =  <Badge badgeContent={"Y"} color="primary" className={classes.treatmentBadge}> </Badge>
      }
      else{
        badge =  <Badge badgeContent={sample.treatments.charAt(0)} color="primary" className={classes.treatmentBadge}> </Badge>
      }
     
      i = i + 1;
      let tabname = <Typography>
        {badge} 
        { "Replicate "+ i.toString()}                  
      </Typography>;

      return (
        <Tab label={tabname} key={i} />
      )
    });


    let tabContent = this.props.samples.map(sample=>{   

      // Subsections per sample or replicate.
      return (  
       <Grid container spacing={24} direction="column" wrap="nowrap" 
       justify="flex-start" className={classes.mainContainer}> 

          <Grid item >
            <CodingSection images={sample.codingImages[0]}/>
          </Grid>
          <Grid item >
          <NonCodingSection images={sample.nonCodingImages[0]}/> 
          </Grid>
        </Grid>
      )

    });
    console.log("TabContent structure");
    console.log(tabContent);
    
    

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


          <CardContent className={classes.sectionHolder}>
          {/* below is a short circuit operation : https://stackoverflow.com/questions/40682064/what-does-operator-indicate-with-this-props-children-react-cloneelemen  */}

          {/* Need to dynamically allocate tabContents for each value, value and re[] */}
          {replicate === 0 && 
            <Typography component="div" style={{ padding: 8 * 3 }}>
              {tabContent[0]} 
            </Typography>
          }

          {replicate === 1 && 
            <Typography component="div" style={{ padding: 8 * 3 }}>
              {tabContent[1]} 
            </Typography>
          }
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