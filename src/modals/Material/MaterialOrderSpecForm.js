import {Button, Flex, Heading, Input, InputGroup, NumberInput, useColorModeValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@chakra-ui/icons";
import Card from "../../components/card/Card";
import AgGrid from "../../components/table/AgGrid";

function MaterialOrderSpecForm({materials, removeMaterial, setMaterials}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [ gridApi, setGridApi ] = useState(null);
    const [ columnApi, setColumnApi ] = useState(null);

    useEffect(() => {
        if (gridApi && columnApi) {
            gridApi.sizeColumnsToFit();
        }
        },[gridApi,columnApi]
    );
    const specDeleteHandle = (specCode) => {
        removeMaterial(specCode);
    };
    const onGridReady = (params) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);
    };
    const QuantityCellEditor = (props) => {
        const [value, setValue] = useState(props.value);

        const handleChange = (e) => {
            const newValue = e.target.value;
            // 숫자만 입력 받도록 제한
            if (/^\d*$/.test(newValue)) {
                setValue(newValue);
            }
        };

        const handleBlur = () => {
            props.api.stopEditing();
            props.node.setDataValue('orderQuantity', value);
            updateOriginalData(props.data);
        };

        return (
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', boxSizing: 'border-box' }}
            />
        );
    };

    const PriceCellEditor = (props) => {
        const [value, setValue] = useState(props.value);

        const handleChange = (e) => {
            const newValue = e.target.value;
            // 숫자만 입력 받도록 제한
            if (/^\d*$/.test(newValue)) {
                setValue(newValue);
            }
        };

        const handleBlur = () => {
            props.api.stopEditing();
            props.node.setDataValue('price', value);
            updateOriginalData(props.data);
        };

        return (
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', boxSizing: 'border-box' }}
            />
        );
    };

    const updateOriginalData = (updatedData) => {
        const updatedMaterials = materials.map(material => {
            if (material.specCode === updatedData.specCode) {
                return {
                    ...material,
                    orderQuantity: updatedData.orderQuantity,
                    price: updatedData.price
                };
            }
            return material;
        });
        // 원본 데이터 업데이트
        // 예를 들어, 상태로 업데이트할 경우
        setMaterials(updatedMaterials);

    };

    const onCellValueChanged = (params) => {
        const updatedData = params.data;
        console.log(materials);
        const updatedMaterials = materials.materials.map(material => {
            if (material.specCode === updatedData.specCode) {
                return {
                    ...material,
                    orderQuantity: updatedData.orderQuantity,
                    price: updatedData.price
                };
            }
            return material;
        });
        console.log(updatedMaterials);

        setMaterials(updatedMaterials);
    };

    const [columnData, setColumnData] = useState([
        { headerName: "코드", field: 'specCode', width: 100, resizable: false },
        { headerName: "자재명", field: "materialName" },
        { headerName: "주문수량", field: "orderQuantity", width: 150, editable:true, cellEditorFramework: QuantityCellEditor },
        { headerName: "가격", field: "price", width: 150, editable:true, cellEditorFramework: PriceCellEditor },
        { headerName: "", cellRenderer: (p) => <Button onClick={() => specDeleteHandle(p.data.specCode)}><DeleteIcon color="red.500" /></Button>, width: 100, resizable: false}
    ]);
    return (
        <>
            <Card>
                <Heading fontSize='xl' color={textColor} pb='15px'>
                    <Flex justify='space-between'>
                        <span>주문 목록</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={materials.materials}
                        onGridReady={onGridReady}
                        onCellValueChanged={onCellValueChanged}
                />
            </Card>
        </>
    );
}

export default MaterialOrderSpecForm;