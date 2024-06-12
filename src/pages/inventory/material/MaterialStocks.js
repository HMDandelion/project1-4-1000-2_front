import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HStack, Tab, TabList, Tabs} from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {callMaterialDropAPI, callMaterialStocksAPI} from "../../../apis/MaterialStockAPICalls";
import DropDownMenu from "../../../components/common/DropDownMenu";

function MaterialStocks() {
    const [currentPage, setCurrentPage] = useState(1);
    const [warehouseCode, setWarehouseCode] = useState(1);
    const [specCategoryCode, setCategoryCode] = useState(1);

    const [searchType, setSearchType] = useState("w");


    const dispatch = useDispatch();
    const {stocks, success} = useSelector(state => state.materialStockReducer);
    const {dropdown} = useSelector(state => state.materialDropReducer);

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

        }, [currentPage, success, warehouseCode, specCategoryCode, searchType]
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
        if (searchType === "w") {
            setWarehouseCode(obj);
        } else {
            setCategoryCode(obj)
        }
    };


    const columnsW = [
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
            accessor: row => `${row.actualQuantity} ${row.unit}`
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
    const columnsC = [
        {
            Header: '코드',
            accessor: 'stockCode'
        },
        {
            Header: '자재명',
            accessor: 'materialName'
        },
        {
            Header: '창고명',
            accessor: 'warehouseName'
        },
        {
            Header: '수량',
            accessor: row => `${row.actualQuantity} ${row.unit}`
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
            <Tabs pb="30px" positon='relative'>
                <TabList>
                    <Tab onClick={()=> setSearchType("w")}>창고별</Tab>
                    <Tab onClick={()=> setSearchType("c")}>분류별</Tab>
                </TabList>
            </Tabs>
            <HStack spacing="10px">
                <DropDownMenu dropDownList={dropdown} setValue={dropDownHandler} mr="20px"/>
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
            </HStack>
            <ComplexTable columnsData={searchType === "w" ? columnsW : columnsC} tableData={stocks.data} />
            <PagingBar pageInfo={stocks.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default MaterialStocks;