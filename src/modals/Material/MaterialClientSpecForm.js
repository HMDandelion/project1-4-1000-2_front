import Card from "../../components/card/Card";
import {Button, Flex, Heading, useColorModeValue} from "@chakra-ui/react";
import AgGrid from "../../components/table/AgGrid";
import React, {useEffect, useState} from "react";
import SetMaterialOrderButton from "../../components/button/SetMaterialOrderButton";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialSpecsAPI} from "../../apis/MaterialSpecAPICalls";

function MaterialClientSpecForm({materials, removeMaterial}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const specDeleteHandle = (specCode) => {
        removeMaterial(specCode);
    };
    const [columnData, setColumnData] = useState([
        { headerName: "코드", valueGetter: (p) => p.data.specCode, width: 100, resizable: false },
        { headerName: "자재명", valueGetter: (p) => p.data.materialName },
        { headerName: "분류", valueGetter: (p) => p.data.categoryName },
        { headerName: "", cellRenderer: (p) => <Button onClick={() => specDeleteHandle(p.data.specCode)}><DeleteIcon color="red.500" /></Button>, width: 100, resizable: false}
    ]);
    return (
        <>
            <Card>
                <Heading fontSize='xl' color={textColor} pb='15px'>
                    <Flex justify='space-between'>
                        <span>담당 자재</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={materials.materials}/>
            </Card>
        </>
    );
}
export default MaterialClientSpecForm;