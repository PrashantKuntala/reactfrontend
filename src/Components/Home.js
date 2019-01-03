import React, { Component } from 'react';
import axios from 'axios';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

// Mui Datatable
import Datatable from './Datatable';
// import CustomTableHeader from './CustomTableHeader';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 12
    },
    center : {
        margin: 'auto',
        width: '70%',
        padding: 20,    
      },
    card: {
        maxWidth: 700,
        margin: 20
    },   
    avatar: {
        backgroundColor: red[500],
    },
});

class Home extends Component {
    state = {        
        data : []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/reviewSamples')
        .then(res => {
                // console.log(res.data.count);
                console.log(res.data.samples);

                // retrieve the sample data
                let values = res.data.samples.map(sample =>{
                    return [sample.sampleId,sample.standardGeneName,sample.treatments,sample.alias]
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
                <Typography component="p" variant="subtitle1" className={classes.center}>
                    Fetching Samples ...
                </Typography>
            );

        return (
            <div className={classes.center}>
            {samplesTable}
            {/* <CustomTableHeader/> */}            
            </div>
           
        )

    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
