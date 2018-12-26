import React from "react";
import { withRouter} from 'react-router-dom';
import MUIDataTable from "mui-datatables";

class Datatable extends React.Component {
    handleRowClick = (rowData,rowMeta) => {
       console.log("row clicked \n" + rowData );
       console.log(rowMeta.dataIndex); // dataIndex starts with 0, but it doesnt matter in case of YEP samples. 
       console.log(rowMeta.rowIndex);
    //    rendering the sample Component without redirecting to a new tab.
    //    this.props.history.push('/'+ rowMeta.dataIndex)
    
    
    // redirect to the sample view in another page. the urlPrefix should come from a config file of somesort or
    //  inbuilt before compiling and building the final production page.
    //  since you have access to the window javascript global you can do this.
    //    console.log(window);
    let url = "http://localhost:3000/" + rowMeta.dataIndex;
    let win = window.open(url, '_blank');
    win.focus();             
    }

  render() {
    const columns = [ {
        name: "SampleId",
        options: {
         filter: false,
         sort: true,         
        }
       }, 
       {
        name: "Common Name",
        options: {
         filter: false,
         sort: true,         
        }
        }, {
            name: "Condition",
            options: {
             filter: true,
             sort: true,         
            }
            },
        {
            name: "Alias",
            options: {
             filter: false,
             sort: true,         
            }
            },
        ];

    const data = this.props.data;

    const options = {
      filterType: "multiselect",
      responsive: "scroll",
      selectableRows: false,
      rowsPerPage: 15,
      rowsPerPageOptions:[5,10,15,20,50,100],
      onRowClick: this.handleRowClick,
      print:false,
      downloadOptions:{filename: 'sampleData.csv', separator: ','} 
    };

    return (
      <MUIDataTable
        title={"Browse All Samples"}
        data={data}
        columns={columns}
        options={options}        
      />
    );
  }
}

export default withRouter(Datatable);
