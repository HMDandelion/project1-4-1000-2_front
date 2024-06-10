import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI,
    callProductUpdateStatusAPI
} from "../../../apis/ProductAPICalls";
import {
    callProductTotalAPI,
    callStockDeleteAPI,
    callStocksAPI,
    callStockTodayAPI,
    callTotalStockAPI
} from "../../../apis/StockAPICalls";
import "../../../Products.css"
import {
    Box,Text,
    Button, Flex, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    useDisclosure, useToast
} from "@chakra-ui/react";
import ProductSave from "../../../modals/products/ProductSave";
import StockRatio from "../../../chart/StockRatio";
import DestroyRatio from "../../../chart/DestroyRatio";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../../apis/StorageAPICalls";
import PagingBar from "../../../components/common/PagingBar";

import {useNavigate} from "react-router-dom";

import ProductUpdate from "../../../modals/products/ProductUpdate";
import CustomizedTable from "../../../components/table/productTable/CustomizedTable";
import ProductClient from "../../../modals/products/ProductClient";
import StockUpdate from "../../../modals/products/StockUpdate";
import WarehouseAssignment from "../../../modals/products/WarehouseAssignment";

function Products() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab,setActiveTab] = useState('products');
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();
    const { isOpen: isClientModalOpen, onOpen: onClientModalOpen, onClose: onClientModalClose } = useDisclosure();
    const { isOpen: isStockEditModalOpen, onOpen: onStockEditModalOpen, onClose: onStockEditModalClose } = useDisclosure();
    const { isOpen: isAssignmentModalOpen, onOpen: onAssignmentModalOpen, onClose: onAssignmentModalClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const navigate = useNavigate();


    const products = useSelector(state => state.productReducer.products);
    const stocks = useSelector(state => state.stockReducer.stocks);
    const total = useSelector(state => state.stockReducer.total);
    const productTotal = useSelector(state => state.stockReducer.productTotal);
    const productList = useSelector(state => state.productReducer.productList);
    const totalDestroy = useSelector(state => state.storageReducer.destroys);
    const productDestroy = useSelector(state => state.storageReducer.productDestroy);
    const todayStock = useSelector(state => state.stockReducer.todayStock);

    const toast = useToast();

    const productColumns = [
        {
            Header: '코드',
            accessor: 'productCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '출시일',
            accessor: 'launchDate'
        },
        {
            Header: '가격',
            accessor: 'price'
        },
        {
            Header: '단위',
            accessor: 'unit'
        },
        {
            Header: '생산 상태 변화 일',
            accessor: 'updatedAt'
        },
        {
            Header: '생산 상태',
            accessor: 'status'
        },
        {
            Header: '거래처',
            accessor: 'clients'
        },
        {
            Header: '',
            accessor: 'edit'
        }
    ]
    const stockColumns = [
        {
            Header: '코드',
            accessor: 'stockCode'
        },
        {
            Header: '수량',
            accessor: 'quantity'
        },
        {
            Header: '등록일',
            accessor: 'createdAt'
        },
        {
            Header: '창고배정현황',
            accessor: 'assignmentStatus',
        },
        {
            Header: '종류',
            accessor: 'type'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '',
            accessor: 'editStock'
        },
        {
            Header: '',
            accessor: 'isToday',
        }
    ]

    const tableTitle = "상품 리스트";     // 테이블 제목
    const baseLink = "/inventory/product";   // 상세조회 React 주소
    const idAccessor = "productCode";     // id로 사용할 컬럼 지정

    const stockTableTitle = "재고 리스트";     // 테이블 제목
    const stockBaseLink = "/inventory/product";   // 상세조회 React 주소
    const stockIdAccessor = "stockCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        const fetchData =  () => {
            setLoading(true);
             dispatch(callStockTodayAPI());
             dispatch(callProductTotalAPI());
             dispatch(callTotalStockAPI());
             dispatch(callProductListAPI());
             dispatch(callDestroysTotalAPI());
             dispatch(callProductDestroyAPI());
            console.log("버튼 상태 ",activeTab)
            if (activeTab === 'products') {
                 dispatch(callProductsAPI({ currentPage }));
            } else if (activeTab === 'inventory') {
                 dispatch(callStocksAPI({ currentPage }));
            }
            setLoading(false);
        };

        fetchData();
    }, [currentPage, activeTab]);




// 상품 수정 버튼의 onClick 이벤트 핸들러
    const handleEditClick = (product) => (event) => {
        console.log("버블링",product);
        event.stopPropagation(); // 이벤트 버블링 방지
        setSelectedProduct(product);
        onEditModalOpen(); // 수정 모달 열기 함수 호출
    };

    //상품의 거래처 onClick이벤트 핸들러
    const handleClientDetail = (product) =>(event) =>{
        event.stopPropagation();
        setSelectedProduct(product);
        onClientModalOpen();
    }
// 상품 등록 버튼의 onClick 이벤트 핸들러
    const handleSaveClick = () => {
        onSaveModalOpen(); // 등록 모달 열기 함수 호출
    };
    // 상품 생산상태 변화 버튼의 onClick 이벤트 핸들러
    const handleDeleteClick = (product) => (event) => {
        event.stopPropagation();
        setSelectedProduct(product);
        dispatch(callProductUpdateStatusAPI({
            onSuccess: () => {
                toast({
                    title: "상품 생산 상태 변경 완료",
                    description: "상품 생산 상태가 성공적으로 수정되었습니다!",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                 dispatch(callProductsAPI({ currentPage: 1 }));
                 dispatch(callProductListAPI());
                dispatch(callDestroysTotalAPI());
                dispatch(callProductDestroyAPI());
                 dispatch(callProductTotalAPI());
                 dispatch(callTotalStockAPI());


                onEditModalClose ();
                navigate('/inventory/product', {replace: true});
            },
            selectedProduct:product.productCode
        }));
    };


    const processedProducts = products?.data?.content.map(product => ({
        ...product,
        updatedAt: product.updatedAt ? product.updatedAt : '-',
        status: (() => {
            switch(product.status) {
                case 'in_production':
                    return (
                        <div className="status-container">
                            <div className="status-circle green">&#10003;</div>
                            <span className="status-text">생산가능</span>
                        </div>
                    );
                case 'production_discontinued':
                    return (
                        <div className="status-container">
                            <div className="status-circle red">&#10005;</div>
                            <span className="status-text">생산중단</span>
                        </div>
                    );
                default:
                    return product.status;
            }
        })(),
        edit: (() => {
            return (
                <div className="status-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button colorScheme="orange"size='xs' onClick={handleEditClick(product)} style={{ marginRight: '8px' }}>상품 수정</Button>
                    {product.status === 'in_production' && (
                        <>
                        <Button colorScheme="red"size='xs' onClick={handleDeleteClick(product)}>생산 중단</Button>
                        </>
                    )}
                    {product.status === 'production_discontinued' && (
                        <>
                        <Button colorScheme="green" size='xs' onClick={handleDeleteClick(product)}>재 생산</Button>
                        </>
                        )}
                    <ProductUpdate isOpen={isEditModalOpen} onClose={() => { onEditModalClose(); setSelectedProduct(null); }} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                </div>
            );
        })(),
        clients:(() => {
           return(
               <div>
                   <Button colorScheme='gray' size='xs' onClick={handleClientDetail(product)}>
                       상세보기
                   </Button>
                   <ProductClient isOpen={isClientModalOpen} selectedProduct={selectedProduct}  onClose={() => { onClientModalClose(); }} setSelectedProduct={setSelectedProduct} />
               </div>
           )
        })()
    }));

// 재고 수정 버튼의 onClick 이벤트 핸들러
    const handleStockUpdate = (stock) => (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        setSelectedStock(stock);
        onStockEditModalOpen(); // 수정 모달 열기 함수 호출
    };

// 재고 삭제 버튼의 onClick 이벤트 핸들러
    const handleStockDelete = (stock) => (event) => {
        event.stopPropagation();
        setSelectedStock(stock);
        dispatch(callStockDeleteAPI({
            onSuccess: () => {
                toast({
                    title: "재고 삭제 완료",
                    description: "재고가 성공적으로 삭제되었습니다!",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                dispatch(callStocksAPI({ currentPage: 1 }));
                dispatch(callProductListAPI());
                dispatch(callDestroysTotalAPI());
                dispatch(callProductDestroyAPI());
                dispatch(callProductTotalAPI());
                dispatch(callTotalStockAPI());


                onEditModalClose ();
                navigate('/inventory/product', {replace: true});
            },
            selectedStock:stock.stockCode
        }));
    };
    //재고 창고 배정
    const handleWarehouseAssignment=(stock) => (event) => {
        event.stopPropagation();
        setSelectedStock(stock);
        onAssignmentModalOpen();
    };


    const processedStocks = stocks?.data?.content.map(stock => ({
        ...stock,
        editStock: (() => {
            return (
                <div className="status-container" style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', width: '200px' }}>
                    <Button colorScheme="orange" size='xs' onClick={handleStockUpdate(stock)} style={{ marginRight: '8px' }}>재고 수정</Button>
                    <Button colorScheme="green" size='xs' onClick={handleWarehouseAssignment(stock)} style={{ marginRight: '8px', visibility: stock.assignmentStatus !== 'fully_assigned' ? 'visible' : 'hidden' }}>창고 배정</Button>
                    <Button colorScheme="red" size='xs' onClick={handleStockDelete(stock)} style={{ marginRight: '8px', visibility: stock.assignmentStatus === 'not_assignment' ? 'visible' : 'hidden' }}>재고 삭제</Button>
                    <StockUpdate isOpen={isStockEditModalOpen} onClose={() => { onStockEditModalClose(); setSelectedStock(null); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
                    <WarehouseAssignment isOpen={isAssignmentModalOpen} onClose={() => { onAssignmentModalClose(); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock}/>
                </div>
            );
        })(),
        isToday: stock.isToday ? (
            <div className="today-label">Today!</div>
        ) : '',
        assignmentStatus: (() => {
            switch(stock.assignmentStatus) {
                case 'partially_assigned':
                    return (
                        <div className="status-container">
                            <div className="status-circle yellow">!</div>
                            <span className="status-text">일부배정</span>
                        </div>
                    );
                case 'fully_assigned':
                    return (
                        <div className="status-container">
                            <div className="status-circle green">&#10003;</div>
                            <span className="status-text">모두배정</span>
                        </div>
                    );
                case 'not_assignment':
                    return (
                        <div className="status-container">
                            <div className="status-circle red">&#10005;</div>
                            <span className="status-text">미배정</span>
                        </div>
                    );
                default:
                    return null;
            }
        })(),
        type: (() => {
            switch(stock.type) {
                case 'products':
                    return (
                        <div>
                            생산품
                        </div>
                    );
                case 're_inspection':
                    return (
                        <div className="status-container">
                            재생산품
                        </div>
                    );
                default:
                    return null;
            }
        })()
    }));

        console.log("products",productList)

    console.log("상품 량",products);
        console.log("total",total);
        console.log("productTotal",productTotal);
        console.log("stocks",stocks)

    console.log("totalDestroy",totalDestroy)
    console.log("productDestroy",productDestroy)
    console.log("todayStock",todayStock);

    //페이징
    let productPageInfo={};
        let stockPageInfo = {};

    if(products){
    productPageInfo = {
        currentPage:products.data.pageable.pageNumber+1,
        startPage:1,
        endPage:10,
        maxPage:products.data.totalPages
    }
    console.log("상품 페이지정보",productPageInfo);
    }
    if(stocks){
        stockPageInfo = {
            currentPage:stocks.data.pageable.pageNumber+1,
            startPage:1,
            endPage:10,
            maxPage:stocks.data.totalPages
        }
        console.log("재고 페이지정보",stockPageInfo);
    }
    return (
        <>
            <Flex justifyContent="space-between">
                <Box flex="1" m="10px">
                    <Box bg="#ffffff" p="10px" borderRadius="5px" w="100%">
                        {productList && total && productTotal && (
                            <StockRatio
                                products={productList.data}
                                total={total}
                                productTotal={productTotal}
                                style={{ width: '100%' }}
                            />
                        )}
                    </Box>
                    <Box bg="#ffffff" p="10px" borderRadius="5px" mt="10px" w="100%">
                        {totalDestroy && productDestroy && (
                            <DestroyRatio
                                totalDestroy={totalDestroy.data}
                                productDestroy={productDestroy.data}
                                style={{ width: '100%' }}
                            />
                        )}
                    </Box>
                </Box>
                <Flex flex="1" m="100px" alignItems="center">
                    {todayStock && (
                        <Box color="navy" textAlign="left">
                            <Text fontSize="2.65em" fontWeight="bold">{todayStock.data.today}일</Text>
                            <Text fontSize="2.65em" color="navy" fontWeight="bold">
                                <Text as="span" color="orange" fontSize="4em" fontWeight="bold">
                                    {todayStock.data.todayCase}
                                </Text>
                                건의 재고와<br />
                                <Text as="span" color="orange" fontSize="4em" fontWeight="bold">
                                    {todayStock.data.todayQuantity}
                                </Text>
                                재고 수량이 추가 되었습니다.
                            </Text>
                        </Box>
                    )}
                </Flex>
            </Flex>
            <Box bg="#ffffff" m="10px" p="10px" borderRadius="5px" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
                <Flex className="tabs" mb="10px">
                    <Button
                        onClick={() => setActiveTab('products')}
                        colorScheme={activeTab === 'products' ? 'orange' : 'gray'}
                        variant={activeTab === 'products' ? 'solid' : 'outline'}
                        mr="5px"
                    >
                        상품
                    </Button>
                    <Button
                        onClick={() => setActiveTab('inventory')}
                        colorScheme={activeTab === 'inventory' ? 'orange' : 'gray'}
                        variant={activeTab === 'inventory' ? 'solid' : 'outline'}
                    >
                        재고
                    </Button>
                </Flex>

                {activeTab === 'products' && (
                    <>
                        <Button colorScheme="orange" size='xs' onClick={handleSaveClick} float="right" ml={5}>상품 등록</Button>
                        <ProductSave isOpen={isSaveModalOpen} onClose={onSaveModalClose} />
                        {products && (
                            <>
                                <CustomizedTable
                                    columnsData={productColumns}
                                    tableData={processedProducts}
                                    tableTitle={tableTitle}
                                    baseLink={baseLink}
                                    idAccessor={idAccessor}
                                />
                                <PagingBar pageInfo={productPageInfo} setCurrentPage={setCurrentPage} />
                            </>
                        )}
                    </>
                )}

                {activeTab === 'inventory' && stocks && (
                    <>
                        <CustomizedTable
                            columnsData={stockColumns}
                            tableData={processedStocks}
                            tableTitle={stockTableTitle}
                            baseLink={stockBaseLink}
                            idAccessor={stockIdAccessor}
                        />
                        <PagingBar pageInfo={stockPageInfo} setCurrentPage={setCurrentPage} />
                    </>
                )}
            </Box>
        </>
    );


}

export default Products;