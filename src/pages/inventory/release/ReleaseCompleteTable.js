import ReleaseWaitTable from "../../../components/table/product/ReleaseWaitTable";
import React, {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {Button, useDisclosure} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {callCompletesRelaseAPI, callShippingsRelaseAPI} from "../../../apis/ReleaseAPICalls";
import OrderInformation from "../../../theme/components/modals/release/OrderInformation";

function ReleaseCompleteTable({currentCompletePage,setCurrentCompletePage}) {
    const { completes } = useSelector(state => state.releaseReducer);
    const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1);
    const [selectedComplete, setSelectedComplete] = useState(null);
    const { isOpen: isOrderInfoModalOpen, onOpen: onOrderInfoModalOpen, onClose: onOrderInfoModalClose } = useDisclosure();

    useEffect(() => {
        console.log('currentPage', currentCompletePage);
        dispatch(callCompletesRelaseAPI({ currentPage: currentCompletePage }));
    }, [currentCompletePage]);

    const shipColumns = [
        {
            Header: '코드',
            accessor: 'orderCode'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '마감 준수',
            accessor: 'isDeadline'
        },
        {
            Header: '주문 명세서',
            accessor: 'orderInformation'
        },
        {
            Header: '주문 완료 시간',
            accessor: 'completedAt',
        }
    ];

    const shipTableTitle = "주문 완료 내역";
    const shipBaseLink = "/circulation/release";
    const shipIdAccessor = "orderCode";

    // 주문 정보
    const handleOrderInformation = (complete) => (event) => {
        event.stopPropagation();
        setSelectedComplete(complete);
        onOrderInfoModalOpen();
    };


    let processedComplete = {};
    if (completes) {
        processedComplete = completes.data.map(complete => ({
            ...complete,
            orderInformation: (() => {
                return (
                    <div>
                        <Button colorScheme='orange' size='sm' onClick={handleOrderInformation(complete)}>
                            주문정보
                        </Button>
                    </div>
                );
            })(),
            isDeadline: complete.isDeadline ? (
                <div className="status-container">
                    <div className="status-circle green">&#10003;</div>
                    <span className="status-text" style={{ color: 'green' }}>마감준수</span>
                </div>
            ) : <div className="status-container">
                <div className="status-circle red">&#10005;</div>
                <span className="status-text" style={{ color: 'red' }}>미준수</span>
            </div>,
        }));
    }

    return (
        <>
            {completes && completes.pageInfo && (
                <>
                    <ReleaseWaitTable
                        columnsData={shipColumns}
                        tableData={processedComplete}
                        tableTitle={shipTableTitle}
                        baseLink={shipBaseLink}
                        idAccessor={shipIdAccessor}
                    />
                    {selectedComplete && isOrderInfoModalOpen && (
                        <OrderInformation
                            isOpen={isOrderInfoModalOpen}
                            selectedRelease={selectedComplete}
                            onClose={onOrderInfoModalClose}
                            setSelectedRelease={selectedComplete}
                        />
                    )}
                    <PagingBar
                        pageInfo={completes.pageInfo}
                        setCurrentPage={setCurrentCompletePage}
                    />
                </>
            )}
        </>
    );
}

export default ReleaseCompleteTable;
