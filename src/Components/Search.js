import React from 'react';
import { withRouter} from 'react-router-dom';
import { AutoComplete } from 'antd';
import 'antd/dist/antd.css' ;

const Search =(props) =>{
    // console.log(props);
    
    // setTimeout(() => {
    //     props.history.push('/about')
    // },2000);

    return (
       
       <div>
       <AutoComplete
                dataSource={props.dataSource}
                style={{ width: 200 }}
                onSelect={(value)=> {
                console.log(value);
                const location = {
           pathname : '/'+value,
           state : {fromDashboard : true}
       }               
                props.history.push(location);
                console.log(props.history);              
                
              }}
              autoFocus={true}
                backfill={true}          
                placeholder="input here"                
                allowClear={true}

            />
       </div>
    )
}

// withRouter is a higherorder component that is supercharging the Navbar and
// applied the props that router send to this component.
export default withRouter(Search);