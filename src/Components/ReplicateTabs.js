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
       <div>
        <CodingSection images={sample.codingImages[0]}/>
        <br/>
        <br/>
        <CodingSection images={sample.codingImages[0]}/>  
       </div>
      )

    });

    return (
      <div className={classes.root}>

        <Paper className={classes.card}> 
        
        {/* overriding the css using the css api for the tabs, 
        removed the scrollbar that appears otherwise 
        */}  

          <Tabs
            value={value}
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
          {value === 0 && 
            <TabContainer>         
              {tabContent[0]} 
            </TabContainer>
          }

          {value === 1 && 
            <TabContainer>         
              {tabContent[1]} 
            </TabContainer>
          }
          </CardContent>
          
      </Paper> 
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);