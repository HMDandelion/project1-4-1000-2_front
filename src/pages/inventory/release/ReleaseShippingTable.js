import ReleaseWaitTable from "../../../components/table/product/ReleaseWaitTable";
import React, {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {Button, useDisclosure} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {callShippingsRelaseAPI} from "../../../apis/ReleaseAPICalls";
import OrderInformation from "../../../theme/components/modals/release/OrderInformation";
import {TripleArrowIcon} from "../../../components/icons/ArrowIcon";
import {FaCheck} from "react-icons/fa";
import CompleteAlertButton from "../../../components/button/CompleteAlertButton";
import ShippingAlertButton from "../../../components/button/ShippingAlertButton";

function ReleaseShippingTable({currentShipPage,setCurrentShipPage,currentCompletePage,setCurrentCompletePage,cancelRef}) {
    const { shippings } = useSelector(state => state.releaseReducer);
    const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const { isOpen: isOrderInfoModalOpen, onOpen: onOrderInfoModalOpen, onClose: onOrderInfoModalClose } = useDisclosure();
    const { isOpen: isCompleteModalOpen, onOpen: onCompleteModalOpen, onClose: onCompleteModalClose } = useDisclosure();

    useEffect(() => {
        console.log('currentPage', currentShipPage);
        dispatch(callShippingsRelaseAPI({ currentPage: currentShipPage }));
    }, [currentShipPage]);

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
            Header: 'D-DAY',
            accessor: 'dday'
        },
        {
            Header: '주문 명세서',
            accessor: 'orderInformation'
        },
        {
            Header: '',
            accessor: 'completeButton'
        },
        {
            Header: '배송 시작 시간',
            accessor: 'shippingStartAt',
        }
    ];

    const shipTableTitle = "배송 진행 내역";
    const shipBaseLink = "/circulation/release";
    const shipIdAccessor = "orderCode";

    // 주문 정보
    const handleOrderInformation = (shipping) => (event) => {
        event.stopPropagation();
        setSelectedShipping(shipping);
        onOrderInfoModalOpen();
    };
    const handleComplete = (shipping) => (event) => {
        event.stopPropagation();
        setSelectedShipping(shipping);
        onCompleteModalOpen();
    };

// 기존의 processedShipping 부분을 다음과 같이 수정
    let processedShipping;
    if (shippings) {
        processedShipping = shippings.data.map(shipping => ({
            ...shipping,
            orderInformation: (() => {
                return (
                    <div>
                        <Button colorScheme='orange' size='sm' onClick={handleOrderInformation(shipping)}>
                            주문정보
                        </Button>
                    </div>
                );
            })(),
            completeButton: (() => {
                return (
                    <Button colorScheme="green" size="sm" onClick={handleComplete(shipping)}>
                        주문 완료 처리 <FaCheck />
                    </Button>
                );
            })(),
        }));
    }


    return (
        <>
            {shippings && shippings.pageInfo && (
                <>
                    <ReleaseWaitTable
                        columnsData={shipColumns}
                        tableData={processedShipping}
                        tableTitle={shipTableTitle}
                        baseLink={shipBaseLink}
                        idAccessor={shipIdAccessor}
                    />
                    {selectedShipping && isOrderInfoModalOpen && (
                        <>
                        <OrderInformation
                            isOpen={isOrderInfoModalOpen}
                            selectedRelease={selectedShipping}
                            onClose={onOrderInfoModalClose}
                            setSelectedRelease={setSelectedShipping}
                        />
                        </>
                    )}
                    {selectedShipping && isCompleteModalOpen && (
                        <>
                            <CompleteAlertButton
                                isOpen={isCompleteModalOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onCompleteModalClose}
                                currentShipPage={currentShipPage}
                                currentCompletePage={currentCompletePage}
                                release={selectedShipping}
                            />
                        </>
                    )}


                    <PagingBar
                        pageInfo={shippings.pageInfo}
                        setCurrentPage={setCurrentShipPage}
                    />
                </>
            )}
        </>
    );
}

export default ReleaseShippingTable;
