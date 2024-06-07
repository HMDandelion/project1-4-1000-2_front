import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";


function AgGrid({columnsData, tableData}) {

    return (
        <>
            <div
                className="ag-theme-quartz"
                style={{height: 300}}
            >
                <AgGridReact
                    rowData={tableData}
                    columnDefs={columnsData}
                />
            </div>
        </>


)
    ;
}

export default AgGrid;