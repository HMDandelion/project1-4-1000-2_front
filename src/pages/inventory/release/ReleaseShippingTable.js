import ReleaseWaitTable from "../../../components/table/product/ReleaseWaitTable";
import React, {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {Button, useDisclosure} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {callShippingsRelaseAPI} from "../../../apis/ReleaseAPICalls";
import OrderInformation from "../../../theme/components/modals/release/OrderInformation";

function ReleaseShippingTable() {
    const { shippings } = useSelector(state => state.releaseReducer);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const { isOpen: isOrderInfoModalOpen, onOpen: onOrderInfoModalOpen, onClose: onOrderInfoModalClose } = useDisclosure();

    useEffect(() => {
        console.log('currentPage', currentPage);
        dispatch(callShippingsRelaseAPI({ currentPage: currentPage }));
    }, [currentPage]);

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
            accessor: 'shipButton'
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
        console.log('슬라임', shipping.orderCode);
        onOrderInfoModalOpen();
    };

    let processedShipping = {};
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
                        <OrderInformation
                            isOpen={isOrderInfoModalOpen}
                            selectedRelease={selectedShipping}
                            onClose={onOrderInfoModalClose}
                            setSelectedRelease={setSelectedShipping}
                        />
                    )}
                    <PagingBar
                        pageInfo={shippings.pageInfo}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </>
    );
}

export default ReleaseShippingTable;
