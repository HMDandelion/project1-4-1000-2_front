import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
    Grid,
    GridItem, ChakraProvider
} from "@chakra-ui/react";
import {useState} from "react";
import ProductionReportForm from "./ProductionReportForm";
import ProductionDetailForm from "./ProductionDetailForm";
import DefectDetailForm from "./DefectDetailForm";
import {useDispatch} from "react-redux";
import {callProductionReportReigstAPI} from "../../../apis/ProductionAPICalls";

function ProductionReportRegist({isOpen, onClose}) {
    const [reportData, setReportData] = useState({
        stylizationName: '',
        totalOrderedQuantity: 0,
        totalProductionQuantity: 0,
        startAt: '',
        completedAt: '',
        productionFile: null,
        productionStatus: '대기중',
        productionDetails: [] // 보고서에 속하는 생산 상세 목록
    });

    const handleReportDataChange = (updatedData) => {
        console.log(updatedData)
        setReportData({...reportData, ...updatedData});
    };

    const handleDetailDataChange = (index, updatedData) => {
        const updatedProductionDetails = [...reportData.productionDetails];
        updatedProductionDetails[index] = {...updatedProductionDetails[index], ...updatedData};
        setReportData({...reportData, productionDetails: updatedProductionDetails});
    };

    const handleDefectDataChange = (detailIndex, defectIndex, updatedData) => {
        const updatedProductionDetails = [...reportData.productionDetails];
        updatedProductionDetails[detailIndex].defectDetails[defectIndex] = {...updatedProductionDetails[detailIndex].defectDetails[defectIndex], ...updatedData};
        setReportData({...reportData, productionDetails: updatedProductionDetails});
    };

    const addProductionDetail = () => {
        setReportData({
            ...reportData,
            productionDetails: [...reportData.productionDetails, {
                workOrderCode: '',
                lineName: '',
                employeeName: '',
                productName: '',
                orderedQuantity: 0,
                productionQuantity: 0,
                defectQuantity: 0,
                completelyQuantity: 0,
                inspectionDate: '',
                inspectionStatusType: '검수 전',
                productionMemo: '',
                productionStatusType: '대기중',
                defectDetails: []
            }]
        });
    };

    const addDefectDetail = (productionDetailIndex) => {
        const updatedProductionDetails = [...reportData.productionDetails];
        updatedProductionDetails[productionDetailIndex].defectDetails.push({
            productionDetailCode: '',
            defectCode: '',
            defectFile: null,
            defectReason: '',
            defectStatus: '처리 시작'
        });
        setReportData({
            ...reportData,
            productionDetails: updatedProductionDetails
        });
    };

    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(callProductionReportReigstAPI({reportRequest: reportData}));
        console.log('Report Data:', reportData);
        onClose();
    };

    return (
        <ChakraProvider>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent maxW="80vw">
                    <ModalHeader>보고서 등록</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={4}>
                            <GridItem colSpan={1} rowSpan={1}>
                                <ProductionReportForm productionReport={reportData} setForm={handleReportDataChange}/>
                            </GridItem>
                            {reportData.productionDetails.map((detail, index) => (
                                <GridItem key={index} colSpan={2} rowSpan={1}>
                                    <ProductionDetailForm
                                        productionDetail={detail}
                                        setForm={(updatedDetail) => handleDetailDataChange(index, updatedDetail)}
                                    />
                                    {detail.defectDetails.map((defect, defectIndex) => (
                                        <DefectDetailForm
                                            key={defectIndex}
                                            defectDetail={defect}
                                            setForm={(updatedDefect) => handleDefectDataChange(index, defectIndex, updatedDefect)}
                                        />
                                    ))}
                                    <Button onClick={() => addDefectDetail(index)}>불량 추가</Button>
                                </GridItem>
                            ))}
                            <Button onClick={addProductionDetail}>생산 상세 추가</Button>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>닫기</Button>
                        <Button variant="ghost" onClick={handleSave}>저장</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}

export default ProductionReportRegist;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Grid, HStack, VStack, Spinner, Input, Text, Button } from "@chakra-ui/react";
// import { callProductionReportsAPI, callProductionDetailAPI, callDefectDetailAPI } from "../../../apis/ProductionAPICalls";
// import SelectMenu from "../../../components/common/SelectMenu";
// import ComplexTable from "../../../components/table/NewComplexTable";
// import DropDownMenu from "../../../components/common/DropDownMenu";
// import { useNavigate, useParams } from "react-router-dom";
//
// // 통합 페이지 컴포넌트
// function RegistProductionReport() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { productionReports, productionReport, defectDetails } = useSelector((state) => state.productionReportReducer);
//
//     const [statusType, setStatusType] = useState('type1');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [formData, setFormData] = useState({
//         productionStatusCode: "",
//         totalProductionQuantity: "",
//         startAt: "",
//         completedAt: "",
//         productionFile: "",
//         productionStatus: "",
//         workOrderCode: "",
//         productionQuantity: "",
//         defectQuantity: "",
//         completelyQuantity: "",
//         inspectionDate: "",
//         inspectionStatusType: "",
//         productionMemo: "",
//         productionStatusType: "",
//         defectCode: "",
//         defectFile: "",
//         defectReason: "",
//         defectStatus: ""
//     });
//
//     const { productionStatusCode } = useParams();
//
//     useEffect(() => {
//         dispatch(callProductionReportsAPI({ currentPage, statusType }));
//         if (productionStatusCode) {
//             dispatch(callProductionDetailAPI({ productionStatusCode }));
//             dispatch(callDefectDetailAPI({ productionStatusCode }));
//         }
//     }, [currentPage, statusType, dispatch, productionStatusCode]);
//
//     const searchHandler = (selectedOption, selectedLabel) => {
//         if (selectedOption === '상태') {
//             setStatusType(selectedLabel);
//         }
//     };
//
//     const searchOptions = {
//         type1: ['PRODUCTION_COMPLETED', 'ADDITIONAL_PRODUCTION', 'PRODUCTION_HOLD', 'REGISTER_PRODUCTION', 'WAIT']
//     };
//
//     const menuList = searchOptions[statusType];
//
//     const handleRowClick = (row) => {
//         navigate(`/production/reports/${row.original.productionStatusCode}/detail`);
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//
//     const handleRegister = () => {
//         // 서버로 formData를 전송하는 로직을 추가하세요
//         console.log('등록할 데이터:', formData);
//     };
//
//     return (
//         <>
//             <HStack spacing='10px'>
//                 <DropDownMenu dropDownList={searchOptions.type1} setValue={searchHandler} mr="20px" />
//                 <SelectMenu onSearch={searchHandler} menuList={menuList} />
//             </HStack>
//             <ComplexTable columnsData={columns} tableData={productionReports} onRowClick={handleRowClick} />
//
//             <Box mt={4}>
//                 <Grid templateColumns="repeat(2, 1fr)" gap={6}>
//                     <Box w="100%" p={4} bg="gray.100">
//                         {/* 왼쪽 상단 박스: productionReports 정보 등록 */}
//                         <VStack spacing={4} align="stretch">
//                             <Text>Production Report Information</Text>
//                             <Input placeholder="작업 지시서 코드" name="productionStatusCode" value={formData.productionStatusCode} onChange={handleInputChange} />
//                             <Input placeholder="라인" name="totalProductionQuantity" value={formData.totalProductionQuantity} onChange={handleInputChange} />
//                             <Input placeholder="담당자" name="startAt" value={formData.startAt} onChange={handleInputChange} />
//                             <Input placeholder="품명" name="completedAt" value={formData.completedAt} onChange={handleInputChange} />
//                             <Input placeholder="지시 수량" name="productionFile" value={formData.productionFile} onChange={handleInputChange} />
//                             <Input placeholder="작업 지시서 코드" name="productionStatusCode" value={formData.productionStatusCode} onChange={handleInputChange} />
//                             <Input placeholder="라인" name="totalProductionQuantity" value={formData.totalProductionQuantity} onChange={handleInputChange} />
//                             <Input placeholder="담당자" name="startAt" value={formData.startAt} onChange={handleInputChange} />
//                             <Input placeholder="품명" name="completedAt" value={formData.completedAt} onChange={handleInputChange} />
//                             <Input placeholder="지시 수량" name="productionFile" value={formData.productionFile} onChange={handleInputChange} />
//                             <Input placeholder="종결 여부" name="productionStatusType" value={formData.productionStatusType} onChange={handleInputChange} />
//
//                         </VStack>
//                     </Box>
//                     <Box w="100%" p={4} bg="gray.100">
//                         {/* 오른쪽 상단 박스: Defect Details */}
//                         <VStack spacing={4} align="stretch">
//                             <Text>Defect Details</Text>
//                             <Input placeholder="불량 코드" name="defectCode" value={formData.defectCode} onChange={handleInputChange} />
//                             <Input placeholder="불량 사유" name="defectReason" value={formData.defectReason} onChange={handleInputChange} />
//                             <Input placeholder="처리 상태" name="defectStatus" value={formData.defectStatus} onChange={handleInputChange} />
//                         </VStack>
//                     </Box>
//                 </Grid>
//
//                 <Box w="100%" p={4} bg="gray.300" mt={4}>
//                     {/* 중간 큰 영역: 작업지시서 정보와 productionDetail 정보 */}
//                     <VStack spacing={4} align="stretch">
//                         <Text>작업 지시서 정보 및 Production Detail</Text>
//                         <Input placeholder="작업   지시서 Field 1" name="workOrderCode" value={formData.workOrderCode} onChange={handleInputChange} />
//                         <Input placeholder="작업 지시서 Field 2" name="productionQuantity" value={formData.productionQuantity} onChange={handleInputChange} />
//                         <Input placeholder="Production Detail Field 1" name="defectQuantity" value={formData.defectQuantity} onChange={handleInputChange} />
//                         <Input placeholder="Production Detail Field 2" name="completelyQuantity" value={formData.completelyQuantity} onChange={handleInputChange} />
//                         <Input placeholder="검수 일시" name="inspectionDate" value={formData.inspectionDate} onChange={handleInputChange} />
//                         <Input placeholder="검수 결과" name="inspectionStatusType" value={formData.inspectionStatusType} onChange={handleInputChange} />
//                         <Input placeholder="비고" name="productionMemo" value={formData.productionMemo} onChange={handleInputChange} />
//                         <Input placeholder="생산 상태" name="productionStatusType" value={formData.productionStatusType} onChange={handleInputChange} />
//                     </VStack>
//                 </Box>
//             </Box>
//
//             <Button mt={4} colorScheme="blue" onClick={handleRegister}>등록</Button>
//         </>
//     );
// }
