import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import {callProductsAPI} from "../../../apis/ProductAPICalls";
import {callStocksAPI} from "../../../apis/StockAPICalls";
import "../../../Products.css"
function Products() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab,setActiveTab] = useState('products');

    const products = useSelector(state => state.productReducer.products);
    const stocks = useSelector(state => state.stockReducer.stocks);

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
            Header: '오늘 나왔는지 여부',
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
        if(activeTab === 'products') {
            dispatch(callProductsAPI({currentPage}));
        }else if (activeTab === 'inventory'){
            dispatch(callStocksAPI({currentPage}));
        }
    }, [currentPage,activeTab]);

    const processedProducts = products?.data?.content.map(product => ({
        ...product,
        updatedAt: product.updatedAt ? product.updatedAt : '-'
    }));

    const processedStocks = stocks?.data?.content.map(stock => ({
        ...stock,
        isToday: stock.isToday ? (
            <div className="today-label">Today!</div>
        ) : <div className="today-label">Today!</div>,
        assignmentStatus: (() => {
            switch(stock.assignmentStatus) {
                case 'partially_assigned':
                    return (
                        <div className="status-container">
                            <div className="status-circle yellow" >!</div>
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
        })()
    }));



    return (
        <>
            <div className="tabs">
                <button onClick={() => setActiveTab('products')}>상품</button>
                <button onClick={() => setActiveTab('inventory')}>재고</button>
            </div>
            {
                activeTab === 'products' && products &&
                <ColumnsTable columnsData={productColumns} tableData={processedProducts} tableTitle={tableTitle}
                              baseLink={baseLink} idAccessor={idAccessor}/>
            }

            {activeTab === 'inventory' && stocks &&
                <ColumnsTable columnsData={stockColumns} tableData={processedStocks } tableTitle={stockTableTitle}
                              baseLink={stockBaseLink} idAccessor={stockIdAccessor}/>
            }
        </>
    );
}

export default Products;