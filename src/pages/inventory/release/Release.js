import {
    Box,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callReleaseAPI, callReleaseOrdersAPI, callReleaseWaitAPI} from "../../../apis/ReleaseAPICalls";
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import PagingBar from "../../../components/common/PagingBar";
import "../../../Products.css"
import OrderProduct from "../../../theme/components/modals/release/OrderProduct";
import ReleaseExpected from "../../../theme/components/modals/release/ReleaseExpected";
import ReleaseLack from "../../../theme/components/modals/release/ReleaseLack";
import {TripleArrowIcon} from "../../../components/icons/ArrowIcon";
import {statusToastAlert} from "../../../utils/ToastUtils";
import ReleaseAlertButton from "../../../components/button/ReleaseAlertButton";
import {HomeIcon} from "../../../components/icons/Icons";
import ReleaseWaitTable from "../../../components/table/product/ReleaseWaitTable";
import * as PropTypes from "prop-types";
import {FaBuilding, FaTruck,FaFileAlt} from "react-icons/fa";
import OrderInformation from "../../../theme/components/modals/release/OrderInformation";
import ShippingAlertButton from "../../../components/button/ShippingAlertButton";


function Release(){

    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.releaseReducer);
    const { ordersPage } = useSelector(state => state.releaseReducer);
    const { releases } = useSelector(state => state.releaseReducer);
    const { releasesPage } = useSelector(state => state.releaseReducer);

    const { isOpen:isReleaseCheckOpen, onOpen:onReleaseCheckOpen, onClose:onReleaseCheckClose } = useDisclosure();
    const { isOpen: isOrderProductModalOpen, onOpen: onOrderProductModalOpen, onClose: onOrderProductModalClose } = useDisclosure();
    const { isOpen: isExpectedReleaseModalOpen, onOpen: onExpectedReleaseModalOpen, onClose: onExpectedReleaseModalClose } = useDisclosure();
    const { isOpen: isLackModalOpen, onOpen: onLackModalOpen, onClose: onLackModalClose } = useDisclosure();
    const { isOpen: isOrderInfoModalOpen, onOpen: onOrderInfoModalOpen, onClose: onOrderInfoModalClose } = useDisclosure();
    const { isOpen: isShippingModalOpen, onOpen: onShippingModalOpen, onClose: onShippingModalClose } = useDisclosure();

    const [currentOrderPage, setCurrentOrderPage] = useState(1);
    const [currentWaitPage, setCurrentWaitPage] = useState(1);
    const [selectedOrder,setSelectedOrder] = useState(null);
    const [selectedRelease,setSelectedRelease] = useState(null);
    const cancelRef = React.useRef();

    useEffect(() => {
        dispatch(callReleaseOrdersAPI({currentPage:currentOrderPage}));
        dispatch(callReleaseWaitAPI({currentPage:currentWaitPage}))
    },[currentOrderPage,currentWaitPage])

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

    const waitColumns = [
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
            accessor: 'dday',
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
            Header: '출고시간',
            accessor: 'releaseCreatedAt'
        },
        {
            Header: '마감일',
            accessor: 'deadline'
        }
    ]


    const orderTableTitle = "접수 주문 내역";
    const orderBaseLink = "/circulation/release";
    const orderIdAccessor = "orderCode";

    const releaseTableTitle = "출고 대기 중 재고";
    const releaseBaseLink = "/circulation/release";
    const releaseIdAccessor = "orderCode";


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

    //출고 진행 onClick이벤트 핸들러
    const handleRelease = (order) =>(event) =>{
        event.stopPropagation();
        setSelectedOrder(order);
        onReleaseCheckOpen();
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

    //주문 정보
    const handleOrderInformation = (release) =>(event) =>{
        event.stopPropagation();
        setSelectedRelease(release);
        onOrderInfoModalOpen();
    }

    //주문 정보
    const handleShipping = (release) =>(event) =>{
        event.stopPropagation();
        setSelectedRelease(release);
        onShippingModalOpen();
    }
    let processedReleases;
    if(releases) {
        processedReleases = releases.data.map(release => ({
                ...release,
            orderInformation:(() => {
                    return(
                        <div>
                            <Button colorScheme='orange' size='sm' onClick={handleOrderInformation(release)}>
                                주문정보
                            </Button>

                        </div>
                    )
                })(),
                shipButton:(() => {
                    return(<>
                            <Button colorScheme='blue' size='sm' onClick={handleShipping(release)}>
                                배송 처리 진행 <TripleArrowIcon />
                            </Button>

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
    let releasePageInfo={};
    if(releasesPage){
        releasePageInfo = {
            currentPage: releases.pageInfo.currentPage,
            endPage: 10,
            maxPage: releases.pageInfo.maxPage,
            startPage: 1
        }
    }
    return (
        <>
            {orders && releases && (
                <>
                    <Box flex="2">
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
                        <OrderProduct isOpen={isOrderProductModalOpen} selectedOrder={selectedOrder}  onClose={() => { onOrderProductModalClose(); }} setSelectedOrder={setSelectedOrder} />
                        <ReleaseAlertButton currentWaitPage={currentWaitPage} isOpen={isReleaseCheckOpen} leastDestructiveRef={cancelRef} onClose={() => {onReleaseCheckClose();}} currentOrderPage={currentOrderPage} order={selectedOrder}/>
                        <PagingBar
                            pageInfo={orderPageInfo}
                            setCurrentPage={setCurrentOrderPage}
                        />
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box flex="1" mx="1" style={{ minWidth: '300px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                                <HomeIcon style={{ fontSize: '40px', color: 'orange' }} />
                            </div>
                            <ReleaseWaitTable
                                columnsData={waitColumns}
                                tableData={processedReleases}
                                tableTitle={releaseTableTitle}
                                baseLink={releaseBaseLink}
                                idAccessor={releaseIdAccessor}
                            />
                            <OrderInformation isOpen={isOrderInfoModalOpen} selectedRelease={selectedRelease}  onClose={() => { onOrderInfoModalClose(); }} setSelectedRelease={setSelectedRelease} />
                            <ShippingAlertButton isOpen={isShippingModalOpen} leastDestructiveRef={cancelRef} onClose={() => {onShippingModalClose();}} currentOrderPage={currentOrderPage} release={selectedRelease}/>
                            <PagingBar
                                pageInfo={releasePageInfo}
                                setCurrentPage={setCurrentWaitPage}
                            />
                        </Box>
                        <Box flex="1" mx="1" style={{ minWidth: '300px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                                <FaTruck style={{ fontSize: '40px', color: 'orange' }} />
                            </div>
                            <ReleaseWaitTable
                                columnsData={waitColumns}
                                tableData={processedReleases}
                                tableTitle={releaseTableTitle}
                                baseLink={releaseBaseLink}
                                idAccessor={releaseIdAccessor}
                            />
                            <PagingBar
                                pageInfo={releasePageInfo}
                                setCurrentPage={setCurrentWaitPage}
                            />
                        </Box>
                        <Box flex="1" mx="1" style={{ minWidth: '300px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                                <FaBuilding style={{ fontSize: '40px', color: 'orange' }} />
                            </div>
                            <ReleaseWaitTable
                                columnsData={waitColumns}
                                tableData={processedReleases}
                                tableTitle={releaseTableTitle}
                                baseLink={releaseBaseLink}
                                idAccessor={releaseIdAccessor}
                            />
                            <PagingBar
                                pageInfo={releasePageInfo}
                                setCurrentPage={setCurrentWaitPage}
                            />
                        </Box>
                    </Box>
                </>
            )}
        </>
    );

}
export default Release;

