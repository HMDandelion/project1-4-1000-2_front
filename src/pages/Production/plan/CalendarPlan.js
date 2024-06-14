import {Box, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import ColumnsTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PlanModify from "./PlanModify";
import {callPlanningsAPI} from "../../../apis/PlanningAPICalls";

function CalendarPlan(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const planCode = location.state;
    const {  plans , success, deleted } = useSelector((state) => state.planningReducer);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const column = [
        {
            Header: '생산 계획 기간',
            accessor: ''
        },
        {
            Header: '코드',
            accessor: 'productCode'
        },
        {
            Header: '품목',
            accessor: 'productName'
        },
        {
            Header: '총 수량',
            accessor: 'plannedQuantity'
        },
        {
            Header: '적요',
            accessor: 'description'
        }
    ];

    const tableTitle = "";     // 테이블 제목
    const baseLink = "/production/work-order";   // 상세조회 React 주소
    const idAccessor = "planCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        if (deleted === true || currentPage) {
            dispatch(callPlanningsAPI({ currentPage }));
        }
    }, [deleted, dispatch, currentPage]);


    console.log(plans);

    return(
        <>
            {
                plans &&
                <div className="">
                    <PlanModify code={planCode} isOpen={isOpen} onClose={onClose}/>
                    <ColumnsTable columnsData={column} tableData={plans.data} tableTitle={tableTitle} baseLink={baseLink} idAccessor={idAccessor} onRowClick={() => { }}/>
                    <PagingBar pageInfo={plans.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    )
}
export default CalendarPlan;