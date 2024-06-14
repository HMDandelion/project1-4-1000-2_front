import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";


function AgGrid({columnsData, tableData , onCellValueChanged}) {

    return (
        <>
            <div
                className="ag-theme-quartz"
                style={{height: 300}}
            >
                <AgGridReact
                    rowData={tableData}
                    columnDefs={columnsData}
                    onCellValueChanged={onCellValueChanged}
                    stopEditingWhenCellsLoseFocus={true}
                />
            </div>
        </>


)
    ;
}

export default AgGrid;