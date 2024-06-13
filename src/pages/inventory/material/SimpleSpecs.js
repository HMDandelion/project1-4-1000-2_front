import {useEffect, useState} from "react";
import {callMaterialSpecsAPI} from "../../../apis/MaterialSpecAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {Flex, HStack} from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import {useNavigate} from "react-router-dom";

function SimpleSpecs({addMaterial}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(5);

    const dispatch = useDispatch();
    const {specs, success} = useSelector(state => state.materialSpecReducer);
    const navigate = useNavigate();

    const [newMaterial, setNewMaterial] = useState({
        specCode: '',
        materialName: '',
        categoryName: ''
    });
    const handleRowClick = (row) => {
        setNewMaterial({
            specCode: row.original.specCode,
            materialName: row.original.materialName,
            categoryName: row.original.categoryName
        });

    };
    useEffect(() => {
            addMaterial(newMaterial);
        }, [newMaterial]
    );
    const menuList = ['자재명'];
    const [searchParams, setSearchParams] = useState({
            selectedOption: menuList[0],
            searchText: ""
        }
    );

    useEffect(() => {
            dispatch(callMaterialSpecsAPI({currentPage, searchParams, size}));
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
        }
    ];

    return (
        specs &&
        <>
            <HStack spacing="10px">
                <Flex justifyContent="center">
                    <SelectMenu onSearch={searchHandler} menuList={menuList} />
                </Flex>
            </HStack>
            <ComplexTable columnsData={columns} tableData={specs.data} onRowClick={handleRowClick} />
            <PagingBar pageInfo={specs.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default SimpleSpecs;