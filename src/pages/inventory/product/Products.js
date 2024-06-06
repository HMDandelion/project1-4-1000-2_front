import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import {callProductsAPI} from "../../../apis/ProductAPICalls";

function Products() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // useSelector에서 products 상태를 직접 받아옵니다.
    const products = useSelector(state => state.productReducer.products);

    const columns = [
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

    const tableTitle = "상품 리스트";     // 테이블 제목
    const baseLink = "/inventory/product";   // 상세조회 React 주소
    const idAccessor = "productCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        dispatch(callProductsAPI({currentPage}));
    }, [currentPage]);

    console.log("ㅇㅇ"+products);
    return (

        <>
            {

                products &&
                <>
                    <ColumnsTable columnsData={columns} tableData={products.data.content} tableTitle={tableTitle}
                                  baseLink={baseLink} idAccessor={idAccessor}/>
                </>
            }
        </>


    );
}

export default Products;