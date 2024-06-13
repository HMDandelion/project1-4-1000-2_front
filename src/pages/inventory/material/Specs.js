import {useEffect, useState} from "react";
import {callMaterialSpecsAPI} from "../../../apis/MaterialSpecAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {HStack} from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import {useNavigate} from "react-router-dom";
import SpecRegist from "../../../modals/Material/SpecRegist";
import CategoryModal from "../../../modals/Material/CategoryModal";

function Specs() {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {specs, success} = useSelector(state => state.materialSpecReducer);
    const navigate = useNavigate();


    const menuList = ['자재명'];
    const [searchParams, setSearchParams] = useState({
            selectedOption: menuList[0],
            searchText: ""
        }
    );

    useEffect(() => {
            dispatch(callMaterialSpecsAPI({currentPage, searchParams}));
        }, [currentPage, success, searchParams]
    );
    const searchHandler = (selectedOption, searchText) => {
        setSearchParams({selectedOption, searchText});
    };


    const columns = [
        {
            Header: '코드',
            accessor: 'specCode'
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
            Header: '측정단위',
            accessor: 'unit'
        },
        {
            Header: '스펙',
            accessor: 'specification'
        },
        {
            Header: '비고',
            accessor: 'remarks'
        }
    ];
    const handleRowClick = (row) => {
        navigate(`/inventory/material/specs/detail`, {state: row.original.specCode});
    };
    return (
        specs &&
        <>
            <HStack spacing="10px">
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
                <SpecRegist/>
                <CategoryModal/>
            </HStack>
            <ComplexTable columnsData={columns} tableData={specs.data} onRowClick={handleRowClick}/>
            <PagingBar pageInfo={specs.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default Specs;