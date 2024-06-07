import WorkOrderList from "./WorkOrderList";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {WorkOrderAPICalls} from "../../apis/WorkOrderAPICalls";
import {useNavigate} from "react-router-dom";
import ColumnsTable from "../../components/table/ComplexTable";

function WorkOrders(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { workOrders } = useSelector(state => state.WorkOrderReducer);

    const columns = [
        {
            Header: '코드',
            accessor: 'workOrderCode'
        },
        {
            Header: '작업 지시 일자',
            accessor: 'workOrderDate'
        },
        {
            Header: '작성 날짜',
            accessor: 'workWrittenDate'
        },
        {
            Header: '라인',
            accessor: 'lineName'
        },
        {
            Header: '담당자',
            accessor: 'employeeName'
        },
        {
            Header: '품목',
            accessor: 'productName'
        },
        {
            Header: '지시 수량',
            accessor: 'orderedQuantity'
        },        {
            Header: '종결 여부',
            accessor: 'completionStatus'
        }
    ]

    const tableTitle = "작업 지시서 관리";     // 테이블 제목
    const baseLink = "/production/work-order";   // 상세조회 React 주소
    const idAccessor = "workOrderCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        dispatch(WorkOrderAPICalls({currentPage}));
    }, [dispatch, currentPage]);

    console.log(workOrders);
    return(
        <>
            {
                workOrders &&
                <div className="">
                    <div>
                        <button onClick={() => navigate('/production/work-order-regist')}>등록</button>
                    </div>
                    {/*<WorkOrderList data={workOrders.data}/>*/}
                    <ColumnsTable columnsData={columns} tableData={workOrders.data} tableTitle={tableTitle}
                                  baseLink={baseLink} idAccessor={idAccessor}/>
                </div>
            }
        </>
    )
}

export default WorkOrders;