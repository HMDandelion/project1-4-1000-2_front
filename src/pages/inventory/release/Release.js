import {Box, Button, useDisclosure} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callReleaseOrdersAPI} from "../../../apis/ReleaseAPICalls";
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import PagingBar from "../../../components/common/PagingBar";
import "../../../Products.css"
import OrderProduct from "../../../theme/components/modals/release/OrderProduct";


function Release(){

    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.releaseReducer);
    const { ordersPage } = useSelector(state => state.releaseReducer);

    const { isOpen: isOrderProductModalOpen, onOpen: onOrderProductModalOpen, onClose: oOrderProductModalClose } = useDisclosure();

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
            Header: '',
            accessor: 'isReleasePossible'
        }
    ]

    const orderTableTitle = "접수 주문 내역";
    const orderBaseLink = "/circulation/release";
    const orderIdAccessor = "orderCode";


    //상품의 거래처 onClick이벤트 핸들러
    const handleOrderProduct = (order) =>(event) =>{
        event.stopPropagation();
        setSelectedOrder(order);
        onOrderProductModalOpen();
    }

    let processedOrders;

    if(orders) {
        processedOrders = orders.data.map(order => ({
            ...order,
            isReleasePossible: order.isReleasePossible ? (
                <div className="status-container">
                    <div className="status-circle green">&#10003;</div>
                    <span className="status-text">출고가능</span>
                </div>
            ) : <div className="status-container">
                <div className="status-circle red">&#10005;</div>
                <span className="status-text">출고불가능</span>
            </div>,
            orderProducts:(() => {
                return(
                    <div>
                        <Button colorScheme='orange' size='sm' onClick={handleOrderProduct(order)}>
                            상세보기
                        </Button>
                        <OrderProduct isOpen={isOrderProductModalOpen} selectedOrder={selectedOrder}  onClose={() => { oOrderProductModalClose(); }} setSelectedOrder={setSelectedOrder} />
                    </div>
                )
            })()
        }));
    }

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