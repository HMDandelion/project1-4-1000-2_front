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
    Box, Text,
    Button, Flex, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    useDisclosure, useToast, Tabs, TabList, Tab
} from "@chakra-ui/react";
import ProductSave from "../../../modals/products/ProductSave";
import StockRatio from "../../../chart/StockRatio";
import DestroyRatio from "../../../chart/DestroyRatio";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../../apis/StorageAPICalls";
import PagingBar from "../../../components/common/PagingBar";

import {useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // 스타일 파일 추가
import { format } from 'date-fns';
import ProductUpdate from "../../../modals/products/ProductUpdate";
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import ProductClient from "../../../modals/products/ProductClient";
import StockUpdate from "../../../modals/products/StockUpdate";
import WarehouseAssignment from "../../../modals/products/WarehouseAssignment";
import StoreStock from "../../../modals/products/StoreStock";
import {statusToastAlert} from "../../../utils/ToastUtils";
import SearchRadioButton from "../../../components/button/SearchRadioButton";
import SelectMenu from "../../../components/common/SelectMenu";

function Products() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab,setActiveTab] = useState('products');
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();
    const { isOpen: isClientModalOpen, onOpen: onClientModalOpen, onClose: onClientModalClose } = useDisclosure();
    const { isOpen: isStockEditModalOpen, onOpen: onStockEditModalOpen, onClose: onStockEditModalClose } = useDisclosure();
    const { isOpen: isAssignmentModalOpen, onOpen: onAssignmentModalOpen, onClose: onAssignmentModalClose } = useDisclosure();
    const { isOpen: isStoreModalOpen, onOpen: onStoreModalOpen, onClose: onStoreModalClose } = useDisclosure();
    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredStocks, setFilteredStocks] = useState([]);


    const products = useSelector(state => state.productReducer.products);
    const stocks = useSelector(state => state.stockReducer.stocks);
    const total = useSelector(state => state.stockReducer.total);
    const productTotal = useSelector(state => state.stockReducer.productTotal);
    const productList = useSelector(state => state.productReducer.productList);
    const totalDestroy = useSelector(state => state.storageReducer.destroys);
    const productDestroy = useSelector(state => state.storageReducer.productDestroy);
    const todayStock = useSelector(state => state.stockReducer.todayStock);

    // 검색 옵션
    const menuList = ['상품명'];
    const [searchParams, setSearchParams] = useState({
        selectedOption : menuList[0],
        searchText : '',
    });

    const toast = useToast();

    const productColumns = [
        {
            Header: '코드',
            accessor: 'productCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        }, {
            Header: '가격',
            accessor: 'price'
        },
        {
            Header: '단위',
            accessor: 'unit'
        },
        {
            Header: '출시일',
            accessor: 'launchDate'
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
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '종류',
            accessor: 'type'
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
            HEADER:'창고 내 재고',
            accessor: 'store'
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
    }, [currentPage, activeTab]);

    useEffect(() => {
        if (startDate && endDate) {
            const filtered = stocks?.data?.content.filter(stock => {
                const createdAt = new Date(stock.createdAt);
                return createdAt >= startDate && createdAt <= endDate;
            });
            setFilteredStocks(filtered);
        } else {
            setFilteredStocks(stocks?.data?.content || []);
        }
    }, [startDate, endDate, stocks]);


// 상품 수정 버튼의 onClick 이벤트 핸들러
    const handleEditClick = (product) => (event) => {
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
                const title = '상품 생산 상태 변경 완료';
                const desc = '상품 생산 상태가 성공적으로 수정되었습니다.';
                statusToastAlert(title, desc, 'success');
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
                    <Button colorScheme="orange" size='sm' onClick={handleEditClick(product)} style={{ marginRight: '8px' }}>상품 수정</Button>
                    {product.status === 'in_production' && (
                        <Button colorScheme="red" size='sm' onClick={handleDeleteClick(product)} style={{ width: '100px' }}>생산 중단</Button>
                    )}
                    {product.status === 'production_discontinued' && (
                        <Button colorScheme="green" size='sm' onClick={handleDeleteClick(product)} style={{ width: '100px' }}>재 생산</Button>
                    )}
                    <ProductUpdate isOpen={isEditModalOpen} onClose={() => { onEditModalClose(); setSelectedProduct(null); }} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                </div>

            );
        })(),
        clients:(() => {
           return(
               <div>
                   <Button colorScheme='gray' size='sm' onClick={handleClientDetail(product)}>
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
                const title = '재고 삭제 완료';
                const desc = '재고가 성공적으로 삭제되었습니다.';
                statusToastAlert(title, desc, 'success');
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
    //재고의 창고 배정 정보 onClick이벤트 핸들러
    const handleStoreDetail = (stock) =>(event) =>{
        event.stopPropagation();
        setSelectedStock(stock);
        onStoreModalOpen();
    }

    const processedStocks = stocks?.data?.content.map(stock => ({
        ...stock,
        editStock: (() => {
            return (
                <div className="status-container" style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', width: '200px' }}>
                    <div className="status-container" style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', width: '200px' }}>
                        <div style={{ flex: '0 0 auto', marginRight: '8px' }}>
                            <Button colorScheme="orange" size='sm' onClick={handleStockUpdate(stock)}>재고 수정</Button>
                        </div>

                        <div style={{ flex: '0 0 auto', marginRight: '8px' }}>
                            {stock.assignmentStatus !== 'fully_assigned' ? (
                                <Button colorScheme="green" size='sm' onClick={handleWarehouseAssignment(stock)}>창고 배정</Button>
                            ) : (
                                <div style={{ color: 'navy', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px', width: '75.73px', fontSize: '1.5em', fontWeight: 'bold' }}>-</div>
                            )}
                        </div>

                        <div style={{ flex: '0 0 auto', marginRight: '8px' }}>
                            {stock.assignmentStatus === 'not_assignment' ? (
                                <Button colorScheme="red" size='sm' onClick={handleStockDelete(stock)}>재고 삭제</Button>
                            ) : (
                                <div style={{ color: 'navy', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px', width: '75.73px', fontSize: '1.5em', fontWeight: 'bold' }}>-</div>
                            )}
                        </div>

                        <StockUpdate isOpen={isStockEditModalOpen} onClose={() => { onStockEditModalClose(); setSelectedStock(null); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
                        <WarehouseAssignment isOpen={isAssignmentModalOpen} onClose={() => { onAssignmentModalClose(); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock}/>
                    </div>


                    <StockUpdate isOpen={isStockEditModalOpen} onClose={() => { onStockEditModalClose(); setSelectedStock(null); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
                    <WarehouseAssignment isOpen={isAssignmentModalOpen} onClose={() => { onAssignmentModalClose(); }} selectedStock={selectedStock} setSelectedStock={setSelectedStock}/>
                </div>

            );
        })(),
        isToday: stock.isToday ? (
            <div className="today-label">Today!</div>
        ) : '',
        store:(() => {
            return(
                <div>
                    <Button colorScheme='gray' size='sm'onClick={handleStoreDetail(stock)}>
                        재고배정창고
                    </Button>
                    <StoreStock isOpen={isStoreModalOpen} selectedStock={selectedStock}  onClose={() => { onStoreModalClose(); }} setSelectedStock={setSelectedStock} />
                </div>
            )
        })(),
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

    const handleSearch = (selectedOption, searchText) => {
        setSearchParams({ selectedOption, searchText });
        dispatch(callProductsAPI({ searchText }));
    };

    const handleSearchStock = () => {
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
        dispatch(callStocksAPI({ startDate: formattedStartDate, endDate: formattedEndDate }));
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
                <Flex flex="1" m="50px" alignItems="center">
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
                                <br/>
                                재고 수량이 추가 되었습니다.
                            </Text>
                        </Box>
                    )}
                </Flex>
            </Flex>
            <Box bg="#ffffff" m="10px" p="10px" borderRadius="5px" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
                <Tabs pb="30px" position="relative">
                    <TabList>
                        <Tab
                            onClick={() => setActiveTab('products')}
                            color={activeTab === 'products' ? 'orange' : 'gray'}
                            variant={activeTab === 'products' ? 'solid' : 'outline'}
                            mr="5px"
                        >
                            상품
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('inventory')}
                            color={activeTab === 'inventory' ? 'orange' : 'gray'}
                            variant={activeTab === 'inventory' ? 'solid' : 'outline'}
                        >
                            재고
                        </Tab>
                    </TabList>
                </Tabs>

                {activeTab === 'products' && (
                    <>
                        <Button colorScheme="orange" size='sm' onClick={handleSaveClick} float="right" ml={5}>상품 등록</Button>
                        <ProductSave isOpen={isSaveModalOpen} onClose={onSaveModalClose} />
                        {products && (
                            <>
                                <SelectMenu onSearch={handleSearch} menuList={menuList}/>
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
                        <Flex mb="20px" justifyContent="space-between">
                            <Flex alignItems="center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={
                                        <Button colorScheme="orange" variant="outline" size="sm" ml={2}>
                                            {startDate ? startDate.toLocaleDateString() : "날짜 선택"}
                                        </Button>
                                    }
                                />
                                <Box mx={2} color="orange">
                                    -
                                </Box>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={
                                        <Button colorScheme="orange" variant="outline" size="sm" ml={2}>
                                            {endDate ? endDate.toLocaleDateString() : "날짜 선택"}
                                        </Button>
                                    }
                                />
                                <Button onClick={handleSearchStock} colorScheme="orange" ml={2}>검색</Button>
                            </Flex>
                        </Flex>
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