function WorkOrderList({data}){
    return(
        <>
            <table className="product-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>작업 지시 일자</th>
                    <th>작성 날짜</th>
                    <th>라인</th>
                    <th>담당자</th>
                    <th>품목</th>
                    <th>지시수량</th>
                    <th>종결여부</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(workOrder => (
                        <tr key={workOrder.workOrderCode}>
                            <td>{workOrder.workOrderCode}</td>
                            <td>{workOrder.workOrderDate}</td>
                            <td>{workOrder.workWrittenDate}</td>
                            <td>{workOrder.lineName}</td>
                            <td>{workOrder.employeeName}</td>
                            <td>{workOrder.productName}</td>
                            <td>{workOrder.orderedQuantity}</td>
                            <td>{workOrder.completionStatus === 'inProgress' ? '진행중' : '완료'}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
export default WorkOrderList;