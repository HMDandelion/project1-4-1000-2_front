import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialDropAPI, callMaterialStocksAPI} from "../../../apis/MaterialStockAPICalls";
import {HStack, Tab, TabList, Tabs} from "@chakra-ui/react";
import DropDownMenu from "../../../components/common/DropDownMenu";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {callMaterialOrdersAPI} from "../../../apis/MaterialOrderAPICalls";

function MaterialOrders() {
    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch();
    const { orders,success } = useSelector(state => state.materialOrderReducer);

    useEffect(() => {
        console.log(currentPage);
        dispatch(callMaterialOrdersAPI({currentPage}));

        }, [currentPage, success]
    );

    //검색
    const menuList = ['공급업체명','자재명'];
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
            accessor: 'orderCode'
        },
        {
            Header: '공급업체명',
            accessor: 'clientName'
        },
        {
            Header: '주문자제',
            accessor: data => data.orderSpecList[0].materialSpec.materialName +' 등 ' + data.orderSpecList.length + "개"
        },
        {
            Header: '계약일자',
            accessor: 'orderDate'
        },
        {
            Header: '배송예정일',
            accessor: 'deliveryDueDate'
        },
        {
            Header: '상태',
            accessor: 'status'
        }
    ];

    return (
        orders &&
        <>
            <HStack spacing="10px">
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
            </HStack>
            <ComplexTable columnsData={columns} tableData={orders.data.content} />
            <PagingBar pageInfo={orders.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default MaterialOrders;