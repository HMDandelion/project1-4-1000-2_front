import {FaFileAlt} from "react-icons/fa";
import ReleaseWaitTable from "../../../components/table/product/ReleaseWaitTable";
import OrderProduct from "../../../theme/components/modals/release/OrderProduct";
import ReleaseAlertButton from "../../../components/button/ReleaseAlertButton";
import PagingBar from "../../../components/common/PagingBar";
import React, {useEffect, useState} from "react";
import {Button, useDisclosure} from "@chakra-ui/react";
import ReleaseExpected from "../../../theme/components/modals/release/ReleaseExpected";
import ReleaseLack from "../../../theme/components/modals/release/ReleaseLack";
import {TripleArrowIcon} from "../../../components/icons/ArrowIcon";
import {callReleaseOrdersAPI, callReleaseWaitAPI} from "../../../apis/ReleaseAPICalls";
import {useDispatch, useSelector} from "react-redux";

function ReleaseOrder({setSelectedOrder,selectedOrder,currentOrderPage,currentWaitPage,setCurrentOrderPage,setCurrentWaitPage,handleOrderProduct,handleReleaseExpected,handleReleaseLack,handleRelease}){


    const cancelRef = React.useRef();
    const dispatch = useDispatch();
    const { ordersPage } = useSelector(state => state.releaseReducer);
    const { orders } = useSelector(state => state.releaseReducer);

    // const { isOpen:isReleaseCheckOpen, onOpen:onReleaseCheckOpen, onClose:onReleaseCheckClose } = useDisclosure();
    // const { isOpen: isOrderProductModalOpen, onOpen: onOrderProductModalOpen, onClose: onOrderProductModalClose } = useDisclosure();
    const { isOpen: isExpectedReleaseModalOpen, onOpen: onExpectedReleaseModalOpen, onClose: onExpectedReleaseModalClose } = useDisclosure();
    const { isOpen: isLackModalOpen, onOpen: onLackModalOpen, onClose: onLackModalClose } = useDisclosure();



    useEffect(() => {
        dispatch(callReleaseOrdersAPI({currentPage:currentOrderPage}));
    },[])
    const storageColumns = [
        {
            Header: '코드',
            accessor: 'orderCode'
        },
        {
            Header: '거래처',
            accessor: 'clientName'
        },

        {
            Header: '마감일',
            accessor: 'deadline'
        },
        {
            Header: 'D-DAY',
            accessor: 'dday',
        },
        {
            Header: '주문 상품',
            accessor: 'orderProducts'
        },
        {
            Header: '출고 정보',
            accessor: 'releaseInformation'
        },
        {
            Header: '',
            accessor: 'isReleasePossible'
        },
        {
            Header:'',
            accessor: 'releaseButton'
        }
    ]

    const orderTableTitle = "접수 주문 내역";
    const orderBaseLink = "/circulation/release";
    const orderIdAccessor = "orderCode";




    let processedOrders;
    if(orders) {
        processedOrders = orders.data.map(order => ({
                ...order,
                isReleasePossible: order.isReleasePossible ? (
                    <div className="status-container">
                        <div className="status-circle green">&#10003;</div>
                        <span className="status-text" style={{ color: 'green' }}>출고가능</span>
                    </div>
                ) : <div className="status-container">
                    <div className="status-circle red">&#10005;</div>
                    <span className="status-text" style={{ color: 'red' }}>출고불가능</span>
                </div>,
                orderProducts:(() => {
                    return(
                        <div>
                            <Button colorScheme='blackAlpha' size='sm' onClick={handleOrderProduct(order)}>
                                상세보기
                            </Button>
                        </div>
                    )
                })(),
                releaseInformation:(() => {
                    return(<>
                            {order.isReleasePossible &&(
                                <>
                                    <Button colorScheme="green" size='sm' onClick={handleReleaseExpected(order)}>출고 견적</Button>
                                    <ReleaseExpected isOpen={isExpectedReleaseModalOpen} selectedOrder={order}  onClose={() => { onExpectedReleaseModalClose(); }} setSelectedOrder={setSelectedOrder}/>
                                </>
                            )}
                            {!order.isReleasePossible &&(
                                <>
                                    <Button colorScheme="red" size='sm' onClick={handleReleaseLack(order)}>부족 재고</Button>
                                    <ReleaseLack isOpen={isLackModalOpen} selectedOrder={order}  onClose={() => { onLackModalClose(); }} setSelectedOrder={setSelectedOrder}/>
                                </>
                            )}
                        </>
                    );
                })(),
                releaseButton:(() => {
                    return(<>
                            {order.isReleasePossible&& (
                                <>
                                    <Button colorScheme='green' size='sm' onClick={handleRelease(order)}>
                                        출고 진행 <TripleArrowIcon />
                                    </Button>

                                </>
                            )}
                        </>
                    );
                })(),
            }
        ))}


    let orderPageInfo={};
    if(ordersPage) {
        orderPageInfo = {
            currentPage: orders.pageInfo.currentPage,
            endPage: 10,
            maxPage: orders.pageInfo.maxPage,
            startPage: 1
        }
    }
    return(
        <>
            <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <FaFileAlt style={{ fontSize: '40px', color: 'orange' }} />
            </div>
            <ReleaseWaitTable
                columnsData={storageColumns}
                tableData={processedOrders}
                tableTitle={orderTableTitle}
                baseLink={orderBaseLink}
                idAccessor={orderIdAccessor}
            />
            {console.log('테스트')}
            {/*<OrderProduct isOpen={isOrderProductModalOpen} selectedOrder={selectedOrder}  onClose={() => { onOrderProductModalClose(); }} setSelectedOrder={setSelectedOrder} />*/}
            {/*<ReleaseAlertButton currentWaitPage={currentWaitPage} isOpen={isReleaseCheckOpen} leastDestructiveRef={cancelRef} onClose={() => {onReleaseCheckClose();}} currentOrderPage={currentOrderPage} order={selectedOrder}/>*/}
            <PagingBar
                pageInfo={orderPageInfo}
                setCurrentPage={setCurrentOrderPage}
            />
        </>
    )
}
export default ReleaseOrder;