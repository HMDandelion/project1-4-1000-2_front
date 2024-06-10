import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callWorkOrderDeleteAPI, WorkOrderAPICalls} from "../../apis/WorkOrderAPICalls";
import {useLocation, useNavigate} from "react-router-dom";
import ColumnsTable from "../../components/table/NewComplexTable";
import {Badge, Box, Button, Checkbox, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import PagingBar from "../../components/common/PagingBar";
import WorkOrderStatusBadge from "../../components/badge/WorkOrderStatusBadge";
import WorkOrderRegist from "./WorkOrderRegist";
import DeleteAlertButton from "../../components/button/DeleteAlertButton";
import WorkOrderModify from "./WorkOrderModify";

function WorkOrders(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const workOrderCode = location.state;
    const {  workOrders , success, deleted } = useSelector((state) => state.workOrderReducer);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRows, setSelectedRows] = useState([]); // 추가: 선택된 행을 추적하기 위한 상태

    const columns = [
        // {
        //     Header: '선택',
        //     accessor: 'selection',
        //     Cell: ({ row }) => (
        //         <Checkbox
        //             colorScheme='green'
        //             isChecked={selectedRows.includes(row.original.workOrderCode)} // 선택된 행일 경우 체크
        //             onChange={() => toggleRow(row.original.workOrderCode)} // 체크 박스 상태 변경 시 행 선택 상태 변경
        //         />
        //     )
        // },
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
        },
        {
            Header: '종결 여부',
            accessor: 'completionStatus',
            Cell: ({ value }) => (
                <WorkOrderStatusBadge value={value} />
            ),
        },
        {
            Header: '',
            accessor: 'modify',
            Cell: ({ row }) => {
                const { completionStatus, workOrderDate } = row.original;
                const today = new Date();
                const isEditable = completionStatus !== 'done' && new Date(workOrderDate) > today;

                return (
                    isEditable && (
                        <Button colorScheme='gray' size='xs' onClick={() => onOpen(row.original.workOrderCode)}>
                            수정
                        </Button>
                    )
                );
            }
        },
        {
            Header: '',
            accessor: 'delete',
            Cell: ({ row }) => (
                <DeleteAlertButton code={row.original.workOrderCode} deleteAPI={callWorkOrderDeleteAPI} />
            )
        }
    ];

    const tableTitle = "작업 지시서 관리";     // 테이블 제목
    const baseLink = "/production/work-order";   // 상세조회 React 주소
    const idAccessor = "workOrderCode";     // id로 사용할 컬럼 지정

    // 추가: 행 선택 토글 함수
    // const toggleRow = (id) => {
    //     setSelectedRows(prev => {
    //         if (prev.includes(id)) {
    //             return prev.filter(rowId => rowId !== id); // 이미 선택된 경우 선택 해제
    //         } else {
    //             return [...prev, id]; // 선택되지 않은 경우 선택
    //         }
    //     });
    // };

    useEffect(() => {
        if (deleted === true || currentPage) {
            dispatch(WorkOrderAPICalls({ currentPage }));
        }
    }, [deleted, dispatch, currentPage]);

    console.log(workOrders);

    return(
        <>
            {
                workOrders &&
                <div className="">
                    <Box display="flex" justifyContent="flex-end">
                        <WorkOrderRegist isOpen={isOpen} onClose={onClose}/>
                    </Box>
                    <WorkOrderModify code={workOrderCode} isOpen={isOpen} onClose={onClose}/>
                    <ColumnsTable columnsData={columns} tableData={workOrders.data} tableTitle={tableTitle} baseLink={baseLink} idAccessor={idAccessor} onRowClick={() => { }}/>
                    <PagingBar pageInfo={workOrders.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    )
}

export default WorkOrders;