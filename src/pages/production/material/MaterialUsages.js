import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialDropAPI, callMaterialStocksAPI} from "../../../apis/MaterialStockAPICalls";
import {HStack, Tab, TabList, Tabs} from "@chakra-ui/react";
import DropDownMenu from "../../../components/common/DropDownMenu";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {callMaterialUsagesAPI} from "../../../apis/MaterialUsageAPICalls";
import materialUsageReducer from "../../../modules/MaterialUsageModules";

function MaterialUsages() {
    const [currentPage, setCurrentPage] = useState(1);

    const [searchType, setSearchType] = useState("n");


    const dispatch = useDispatch();
    const {usages, success} = useSelector(state => state.materialUsageReducer);

    useEffect(() => {
        dispatch(callMaterialUsagesAPI({currentPage,searchType}))
        }, [currentPage, success, searchType]
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


    const columns = [
        {
            Header: '코드',
            accessor: 'usageCode'
        },
        {
            Header: '라인명',
            accessor: 'lineName'
        },
        {
            Header: '요구 자재',
            accessor: data => data.stockUsages[0].materialName +' 등 ' + data.stockUsages.length + "개"
        },
        {
            Header: '사용일시',
            accessor: 'usageDatetime'
        },
        {
            Header: '상테',
            accessor: 'status'
        }
    ];

    return (
        usages &&
        <>
            <Tabs pb="30px" positon='relative'>
                <TabList>
                    <Tab onClick={()=> setSearchType("n")}>미완료</Tab>
                    <Tab onClick={()=> setSearchType("c")}>완료</Tab>
                </TabList>
            </Tabs>
            <HStack spacing="10px">
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
            </HStack>
            <ComplexTable columnsData={columns} tableData={usages.data.content} />
            <PagingBar pageInfo={usages.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default MaterialUsages;