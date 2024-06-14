import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialOrdersAPI} from "../../../apis/MaterialOrderAPICalls";
import {HStack} from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import {callMaterialClientsAPI} from "../../../apis/ClientAPICalls";
import {useNavigate} from "react-router-dom";
import MaterialClientRegist from "../../../modals/Material/MaterialClientRegist";

function MaterialClients() {
    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch();
    const { clients,success } = useSelector(state => state.clientReducer);
    const navigate = useNavigate();

    useEffect(() => {
            dispatch(callMaterialClientsAPI({currentPage}));

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
            accessor: 'clientCode'
        },
        {
            Header: '공급업체명',
            accessor: 'clientName'
        },
        {
            Header: '대표명',
            accessor: "representativeName"
        },
        {
            Header: '연락처',
            accessor: 'phone'
        },
        {
            Header: '담당자재',
            accessor: data => {
                const materialNames = data.materials.map(material => material.materialName);
                if (materialNames.length > 3) {
                    return materialNames.slice(0, 3).join(", ") + "...";
                }
                return materialNames.join(", ");
            }
        }
    ];
    const handleRowClick = (row) => {
        navigate(`/purchase/material/clients/detail`, {state: row.original.clientCode});
    };
    return (
        clients &&
        <>
            <HStack spacing="10px">
                <SelectMenu onSearch={searchHandler} menuList={menuList} />
                <MaterialClientRegist/>

            </HStack>
            <ComplexTable columnsData={columns} tableData={clients.data.content} onRowClick={handleRowClick}/>
            <PagingBar pageInfo={clients.pageInfo} setCurrentPage={setCurrentPage} />
        </>
    );
}
export default MaterialClients;