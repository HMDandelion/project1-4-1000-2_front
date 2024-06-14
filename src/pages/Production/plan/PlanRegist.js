import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Flex,
    VStack,
    Text,
    Button,
    Input,
    Badge
} from "@chakra-ui/react";
import ComplexTable from "../../../components/table/NewComplexTable";
import moment from "moment/moment";

function PlanRegist({ selectedProducts }) {
    const dispatch = useDispatch();
    const { plannings = { data: [] } } = useSelector(state => state.planningReducer);
    const [planningPeriod, setPlanningPeriod] = useState({ startAt: null, endAt: null });
    const [aggregatedProducts, setAggregatedProducts] = useState([]);

    useEffect(() => {
        if (selectedProducts) {
            const aggregated = selectedProducts.reduce((acc, product) => {
                const existingProductIndex = acc.findIndex(p => p.productCode === product.productCode);
                if (existingProductIndex !== -1) {
                    acc[existingProductIndex].quantity += product.quantity;
                } else {
                    acc.push({ ...product });
                }
                return acc;
            }, []);
            setAggregatedProducts(aggregated);
        } else {
            setAggregatedProducts([]);
        }
    }, [selectedProducts]);

    console.log('selectedProducts : ', selectedProducts);

    // Columns for the table
    const columns = [
        {
            Header: '상품코드',
            accessor: 'productCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '수량',
            accessor: 'quantity'
        },
        {
            Header: '재고',
            accessor: ''
        },
        {
            Header: '불량률',
            accessor: ''
        },
        {
            Header: '총 수량',
            accessor: 'plannedQuantity'
        },
        {
            Header: '적요',
            accessor: 'description'
        }
    ];

    const tableTitle = "생산 계획 등록";

    const handleRegisterClick = () => {
        // Implement registration logic here
        console.log("Register button clicked");
    };

    const handleDateChange = (fieldName, value) => {
        const today = moment().format("YYYY-MM-DD");
        if (moment(value).isBefore(today)) {
            alert("오늘 이전의 날짜를 선택할 수 없습니다.");
            return;
        }

        setPlanningPeriod(prevPeriod => ({
            ...prevPeriod,
            [fieldName]: value
        }));
    };

    return (
        <VStack spacing={4} align="stretch" p={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold">{tableTitle}</Text>
                <Button colorScheme="orange" onClick={handleRegisterClick}>등록</Button>
            </Flex>
            <VStack spacing={4} align="stretch">
                <Flex alignItems="center">
                    <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>생산 계획 기간</Badge>
                    <Input
                        type="date"
                        name="startAt"
                        value={planningPeriod.startAt || ""}
                        onChange={(e) => handleDateChange("startAt", e.target.value)}
                        min={moment().format("YYYY-MM-DD")}
                        mr={2}
                        w={150}
                    /> ~
                    <Input
                        type="date"
                        name="endAt"
                        value={planningPeriod.endAt || ""}
                        onChange={(e) => handleDateChange("endAt", e.target.value)}
                        min={moment().format("YYYY-MM-DD")}
                        ml={2}
                        w={150}
                    />
                </Flex>
            </VStack>
            <Box>
                <ComplexTable columnsData={columns} tableData={aggregatedProducts} onRowClick={() => {}} />
            </Box>
        </VStack>
    );
}

export default PlanRegist;
