import {Box, Button, useDisclosure} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callReleaseOrdersAPI} from "../../../apis/ReleaseAPICalls";
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import PagingBar from "../../../components/common/PagingBar";
import "../../../Products.css"
import OrderProduct from "../../../theme/components/modals/release/OrderProduct";
import ReleaseExpected from "../../../theme/components/modals/release/ReleaseExpected";
import ReleaseLack from "../../../theme/components/modals/release/ReleaseLack";


function Release(){

    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.releaseReducer);
    const { ordersPage } = useSelector(state => state.releaseReducer);

    const { isOpen: isOrderProductModalOpen, onOpen: onOrderProductModalOpen, onClose: onOrderProductModalClose } = useDisclosure();
    const { isOpen: isExpectedReleaseModalOpen, onOpen: onExpectedReleaseModalOpen, onClose: onExpectedReleaseModalClose } = useDisclosure();
    const { isOpen: isLackModalOpen, onOpen: onLackModalOpen, onClose: onLackModalClose } = useDisclosure();

    const [currentOrderPage, setCurrentOrderPage] = useState(1);
    const [selectedOrder,setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(callReleaseOrdersAPI({currentPage:currentOrderPage}));
    },[currentOrderPage])
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
        }
    ]

    const orderTableTitle = "접수 주문 내역";
    const orderBaseLink = "/circulation/release";
    const orderIdAccessor = "orderCode";


    //주문 상품 정보onClick이벤트 핸들러
    const handleOrderProduct = (order) =>(event) =>{
        event.stopPropagation();
        setSelectedOrder(order);
        onOrderProductModalOpen();
    }

    //출고 견적 onClick이벤트 핸들러
    const handleReleaseExpected = (order) =>(event) =>{
        event.stopPropagation();
        setSelectedOrder(order);
        onExpectedReleaseModalOpen();
    }

    //부족 재고 onClick이벤트 핸들러
    const handleReleaseLack = (order) =>(event) =>{
        event.stopPropagation();
        setSelectedOrder(order);
        onLackModalOpen();
    }

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
                        <Button colorScheme='orange' size='sm' onClick={handleOrderProduct(order)}>
                            상세보기
                        </Button>
                        <OrderProduct isOpen={isOrderProductModalOpen} selectedOrder={selectedOrder}  onClose={() => { onOrderProductModalClose(); }} setSelectedOrder={setSelectedOrder} />
                    </div>
                )
            })(),
            releaseInformation:(() => {
                return(<>
                    {order.isReleasePossible &&(
                        <>
                            <Button colorScheme="green" size='sm' onClick={handleReleaseExpected(order)}>출고 견적</Button>
                            <ReleaseExpected isOpen={isExpectedReleaseModalOpen} selectedOrder={selectedOrder}  onClose={() => { onExpectedReleaseModalClose(); }} setSelectedOrder={setSelectedOrder}/>
                        </>
                    )}
                    {!order.isReleasePossible &&(
                    <>
                        <Button colorScheme="red" size='sm' onClick={handleReleaseLack(order)}>부족 재고</Button>
                        <ReleaseLack isOpen={isLackModalOpen} selectedOrder={selectedOrder}  onClose={() => { onLackModalClose(); }} setSelectedOrder={setSelectedOrder}/>
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
            endPage: 5,
            maxPage: orders.pageInfo.maxPage,
            startPage: 1
        }
    }
    return(
        <>{orders && (
            <Box flex="2">
                <CustomizedTable columnsData={storageColumns} tableData={processedOrders} tableTitle={orderTableTitle} baseLink={orderBaseLink} idAccessor={orderIdAccessor} />
                <PagingBar pageInfo={orderPageInfo}  setCurrentPage={setCurrentOrderPage}/>
            </Box>
        )}
        </>
    )
}
export default Release;