import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    Box,
    Button,
    Flex, Tab,
    TabList,
    Tabs,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {callWarehouseAPI, callWarehousesAPI} from "../../../apis/WarehouseAPICalls";
import {callCancelAssignmentAPI, callStoragesAPI, callWarehouseMove} from "../../../apis/StorageAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import { useNavigate } from 'react-router-dom';
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import '../../../Products.css'
import StockUpdate from "../../../modals/products/StockUpdate";
import WarehouseUpdate from "../../../modals/products/WarehouseUpdate";
import WarehouseSave from "../../../modals/products/WarehouseSave";
import StoreStock from "../../../modals/products/StoreStock";
import DestroyRegist from "../../../modals/products/DestroyRegist";
import CancelAssignment from "../../../modals/products/CancelAssignment";
import PagingBar from "../../../components/common/PagingBar";
import {statusToastAlert} from "../../../utils/ToastUtils";

function Warehouses() {
    const dispatch = useDispatch();
    const { warehouses } = useSelector(state => state.warehouseReducer);
    const { storageMove } = useSelector(state => state.storageReducer);
    const { storages } = useSelector(state => state.storageReducer);
    const { warehouse} = useSelector(state => state.warehouseReducer);
    const { storagesPage } = useSelector(state => state.storageReducer);
    const { movePage } = useSelector(state => state.storageReducer);
    const { isOpen: isWarehouseUpdateModalOpen, onOpen: onWarehouseUpdateModalOpen, onClose: onWarehouseUpdateModalClose } = useDisclosure();
    const { isOpen: isWarehouseSaveModalOpen, onOpen: onWarehouseSaveModalOpen, onClose: onWarehouseSaveModalClose } = useDisclosure();
    const { isOpen: isDestroyModalOpen, onOpen: onDestroyModalOpen, onClose: onDestroyModalClose } = useDisclosure();
    const { isOpen: isCancelModalOpen, onOpen: onCancelModalOpen, onClose: onCancelModalClose } = useDisclosure();
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMovePage, setCurrentMovePage] = useState(1);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        dispatch(callWarehousesAPI());
    }, [dispatch]);
    useEffect(() => {
        if (warehouses && warehouses.length > 0) {
            handleWarehouseSelect(warehouses[0]);
        }
    }, [warehouses]);
    useEffect(() => {
        if(warehouse) {
            dispatch(callStoragesAPI({currentPage: currentPage, warehouseCode: warehouse.warehouseCode}));
        }
    },[currentPage])
    useEffect(() => {
        if(warehouse){
            dispatch(callWarehouseMove({currentPage:currentMovePage,warehouseCode:warehouse.warehouseCode}));
        }
    },[currentMovePage])

    const handleWarehouseSelect = (warehouse) => {
        if(warehouse) {
            setSelectedWarehouse(warehouse);
            dispatch(callWarehouseMove({currentPage:currentMovePage,warehouseCode:warehouse.warehouseCode}));
            dispatch(callStoragesAPI({currentPage:currentPage,warehouseCode: warehouse.warehouseCode}));
            dispatch(callWarehouseAPI({warehouseCode: warehouse.warehouseCode}));
        }
    };


    const activeBorderColor = useColorModeValue("orange.600", "white");
    const inactiveColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
    const textColor = useColorModeValue("navy", "navy");
    const defaultTextColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");

    const moveColumns = [
        {
            Header: '코드',
            accessor: 'storageCode'
        },
        {
            Header: '유형',
            accessor: 'moveType'
        },
        {
            Header: '시간',
            accessor: 'createdAt'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '수량',
            accessor: 'storageQuantity'
        },
        {
            Header: '창고명',
            accessor: 'warehouseName'
        },
        {
            Header: '',
            accessor: 'isToday'
        },
        {
            Header: '',
            accessor: 'button'
        }
    ]

    const storageColumns = [
        {
            Header: '코드',
            accessor: 'storageCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '수량',
            accessor: 'actualQuantity'
        },
        {
            Header: '창고배정일',
            accessor: 'createdDate',
        },
        {
            Header: '파손',
            accessor: 'destroyQuantity'
        },
        {
            Header: '창고',
            accessor: 'warehouseName'
        },
        {
            Header: '보관일',
            accessor: 'storageDate'
        },
        {
            Header: '',
            accessor: 'isToday'
        },
        {
            Header:'',
            accessor:'button'
        }
    ]

    const moveTableTitle = "이동 내역";     // 테이블 제목
    const baseLink = "/inventory/warehouse";   // 상세조회 React 주소
    const idAccessor = "createdAt";     // id로 사용할 컬럼 지정

    const storageTableTitle = "보관 재고 리스트";     // 테이블 제목
    const storageBaseLink = "/inventory/storage";   // 상세조회 React 주소
    const storageIdAccessor = "storageCode";     // id로 사용할 컬럼 지정



    let processedMove;
    let processedStorages;
    const handleCancel = (storage) => (event) => {
        event.stopPropagation();
        setSelectedStorage(storage);
        dispatch(callCancelAssignmentAPI({
            onSuccess: () => {
                const title = '취소 완료';
                const desc = '창고 배정이 성공적으로 취소되었습니다.';
                statusToastAlert(title, desc, 'success');
                navigate(`/inventory/warehouse`);
                handleWarehouseSelect(warehouse);},
            storageCode:storage.storageCode}));
    };
    if(storageMove){
        const today = new Date();
        const isToday = (date) => {
            const givenDate = new Date(date);
            return givenDate.getFullYear() === today.getFullYear() &&
                givenDate.getMonth() === today.getMonth() &&
                givenDate.getDate() === today.getDate();
        };

        processedMove = storageMove.data.map(el => ({
            ...el,
            isToday: el.createdAt && isToday(el.createdAt) ? (
                <div className="today-label" size={'md'}>Today!</div>
            ) : '',
            button : (() => {
                return(
                    <div>
                        <Button colorScheme="red" size='sm' onClick={handleCancel(el)} float="right" ml={5}>창고 배정 취소</Button>
                        {/*<CancelAssignment warehouse={selectedWarehouse} handleWarehouseSelect={handleWarehouseSelect} isOpen={isCancelModalOpen} selectedStorage={selectedStorage}  onClose={() => { onCancelModalClose(); }} setSelectedStorages={setSelectedStorage} />*/}
                    </div>
                )
            })()
        }));
    }
    const handleSaveDestroy = (storage) => (event) => {
        event.stopPropagation();
        setSelectedStorage(storage);
        onDestroyModalOpen();
    };
    if(storages) {
        processedStorages = storages.map(storage => ({
            ...storage,
            isToday: storage.isToday ? (
                <div className="today-label">Today!</div>
            ) : '',
            button : (() => {
                return(
                    <div>
                        <Button colorScheme="orange"size='sm' onClick={handleSaveDestroy(storage)} float="right" ml={5}>파손 등록</Button>
                        <DestroyRegist warehouse={selectedWarehouse} handleWarehouseSelect={handleWarehouseSelect} isOpen={isDestroyModalOpen} selectedStorage={selectedStorage}  onClose={() => { onDestroyModalClose(); }} setSelectedStock={setSelectedStorage} />
                    </div>
                )
            })()
        }));
    }

// 창고 수정 버튼 핸들러
    const handleWarehouseUpdate = () =>  {
        onWarehouseUpdateModalOpen();
    };
    //창고 추가 버튼 핸들러
    const handleWarehouseAdd = () =>  {
        onWarehouseSaveModalOpen();
    };

    let pageResult={};
    let movePageResult = {};
    if(storages){
        pageResult = {
            currentPage : storagesPage.data.pageable.pageNumber+1,
            startPage : 1,
            endPage : 10,
            maxPage : storagesPage.data.totalPages
        }
    }
    if(storageMove){
        movePageResult = {
            currentPage : movePage.data.pageInfo.currentPage,
            startPage : 1,
            endPage : 10,
            maxPage :  movePage.data.pageInfo.maxPage
        }
    }

    // if(storagePageResult){
    //     pageResult = {
    //         currentPage : storagesPage.data.pageable.pageNumber+1,
    //         startPage : 1,
    //         endPage : 10,
    //         maxPage : storagesPage.data.totalPages
    //     }
    // }

    return (
        <Box p={4}>
            <Box mb={4} display="flex" flexWrap="wrap" borderBottom={`2px solid ${inactiveColor}`}>
                {warehouses && (
                    <Tabs pb="30px" position="relative">
                        <TabList>
                            {warehouses.map(warehouse => (
                                <Tab
                                    key={warehouse.warehouseCode}
                                    onClick={() => handleWarehouseSelect(warehouse)}
                                    bg={selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? "orange.500" : "transparent"}
                                    border="none"
                                    borderTop={`2px solid ${selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? activeBorderColor : "transparent"}`}
                                    color={selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? "white" : defaultTextColor}
                                    borderRadius="0"
                                    m={0}
                                    px={4}
                                    py={2}
                                >
                                    {warehouse.name}
                                </Tab>
                            ))}
                        </TabList>
                    </Tabs>
                )}

                <Button
                    onClick={handleWarehouseAdd}
                    bg="orange.500"
                    border="none"
                    borderTop={`2px solid transparent`}
                    color="white"
                    m={0}
                    px={4}
                    py={2}
                    ml={2}
                >
                    + 창고 추가
                </Button>
                <WarehouseSave handleWarehouseSelect={handleWarehouseSelect} isOpen={isWarehouseSaveModalOpen} onClose={() => { onWarehouseSaveModalClose(); }} warehouse={warehouse}/>
            </Box>
            {warehouse && storageMove && storages && (
                <>
                    <Flex mt={4}>
                        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mr={4} position="relative">
                            <Button
                                position="absolute"
                                top="4"
                                right="4"
                                colorScheme="orange"
                                onClick={handleWarehouseUpdate}
                            >
                                수정
                            </Button>
                            <WarehouseUpdate handleWarehouseSelect={handleWarehouseSelect} isOpen={isWarehouseUpdateModalOpen} onClose={() => { onWarehouseUpdateModalClose(); }} warehouse={warehouse}/>
                            <Text color={textColor} mb={2} fontSize="lg" fontWeight="bold" fontSize='3xl' fontWeight='800' color={textColor} m='10px'>{warehouse.name}</Text>
                            <Box mb={4}>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>위치</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.location}</Text>
                                </Box>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>크기</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.volume}</Text>
                                </Box>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>담당자</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.employeeName}</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Box flex="2">
                            <CustomizedTable columnsData={moveColumns} tableData={processedMove} tableTitle={moveTableTitle} baseLink={baseLink} idAccessor={idAccessor} />
                            <PagingBar pageInfo={movePageResult}  setCurrentPage={setCurrentMovePage}/>
                        </Box>
                    </Flex>
                    <Box flex="2">
                        <CustomizedTable columnsData={storageColumns} tableData={processedStorages} tableTitle={storageTableTitle} baseLink={storageBaseLink} idAccessor={storageIdAccessor} />
                        <PagingBar pageInfo={pageResult}  setCurrentPage={setCurrentPage}/>
                    </Box>
                </>
            )}
        </Box>
    );

}

export default Warehouses;
