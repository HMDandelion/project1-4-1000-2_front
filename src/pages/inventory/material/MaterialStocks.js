import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialSpecsAPI} from "../../../apis/MaterialSpecAPICalls";
import {HStack} from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {callMaterialDropAPI, callMaterialStocksAPI, callMaterialStocksWAPI} from "../../../apis/MaterialStockAPICalls";
import DropDownMenu from "../../../components/common/DropDownMenu";

function MaterialStocks() {
    const [currentPage, setCurrentPage] = useState(1);
    const [ warehouseCode, setWarehouseCode ] = useState(1);
    const [specCategoryCode, setCategoryCode] = useState(1);

    const [ searchType, setSearchType ] = useState("w");



    const dispatch = useDispatch();
    const {stocks, success} = useSelector(state => state.materialStockReducer);
    const { dropdown } = useSelector(state => state.materialDropReducer);

    useEffect(() => {
        if (searchType === "w") {
            dispatch(callMaterialDropAPI({searchType}))
                .then(() => {
                    // 첫 번째 작업이 완료된 후 두 번째 작업 실행
                    dispatch(callMaterialStocksAPI({currentPage, warehouseCode}));
                });
        } else {
            dispatch(callMaterialDropAPI({searchType}))
                .then(() => {
                    // 첫 번째 작업이 완료된 후 두 번째 작업 실행
                    dispatch(callMaterialStocksAPI({currentPage, specCategoryCode}));
                });
        }

        }, [currentPage, success,warehouseCode]
    );

    //검색
    const menuList = ['자재명'];
    const [searchParams, setSearchParams] = useState({
            selectedOption: menuList[0],
            searchText: ""
        }
    );
    const searchHandler = (selectedOption, searchText) => {
        setSearchParams({selectedOption, searchText});
    };


    const dropDownHandler = (obj) => {
        setWarehouseCode(obj);
    };


    const columns = [
        {
            Header: '코드',
            accessor: 'stockCode'
        },
        {
            Header: '자재명',
            accessor: 'materialName'
        },
        {
            Header: '분류명',
            accessor: 'categoryName'
        },
        {
            Header: '수량',
            accessor: 'actualQuantity'
        },
        {
            Header: '적재일자',
            accessor: 'storageDate'
        },
        {
            Header: '스펙',
            accessor: 'specification'
        }
    ];
    return (
        stocks &&
        <>
            <HStack spacing="10px">
                { console.log(dropdown)}
                <DropDownMenu dropDownList={dropdown} setValue={dropDownHandler}/>
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
            </HStack>
            <ComplexTable columnsData={columns} tableData={stocks.data} />
            <PagingBar pageInfo={stocks.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default MaterialStocks;