import React, { Component } from 'react';
import axios from 'axios';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

// Mui Datatable
import Datatable from './Datatable';


const styles = theme => ({
    center : {
        margin: 'auto',
        maxWidth: 1140,
        // padding: 10,    
      },
});

class Home extends Component {
    state = {        
        data : []
    }

    componentDidMount() {
        axios.get('http://172.29.0.74:8080/reviewSamples')
        .then(res => {
                // console.log(res.data.count);
                console.log(res.data.samples);

                // retrieve the sample data
                let values = res.data.samples.map(sample =>{
                    return [sample.sampleId,sample.standardGeneName,sample.treatments,sample.growthMedia,sample.alias]
                });
                // let myJsonString = JSON.stringify(values);
                // console.log(myJsonString);
                this.setState({
                    data: values
                });
            });
            
       
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;


        // creating individuals posts
        const samplesTable = data.length ? (   
            <Datatable data={this.state.data}/>
            ) : (
                <Typography component="div" className={classes.center}>                   
                    <Typography component="p" variant="subtitle1" >
                        Fetching Samples
                    </Typography>
                    <LinearProgress variant="query" />
                </Typography>
            );

        return (
            <div className={classes.center}>
            {samplesTable}
            {/* <CustomTableHeader/> */}   
            {/* <LinearProgress variant="query" /> */}
            </div>
           
        )

    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
