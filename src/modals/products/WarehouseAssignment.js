import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Divider
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    callBomUpdateAPI,
    callMaterailsAPI, callProductAPI, callProductBomAPI,
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI
} from "../../apis/ProductAPICalls";
import {
    callProductTotalAPI,
    callStocksAPI,
    callStockUpdateAPI,
    callStockWarehouseAPI,
    callTotalStockAPI
} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI, callStockAssignment} from "../../apis/StorageAPICalls";
import {callWarehousesAPI} from "../../apis/WarehouseAPICalls";

function WarehousAssginment({isOpen,onClose,selectedStock, setSelectedStock}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const [isQuantityErrorModalOpen, setIsQuantityErrorModalOpen] = useState(false);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stockInfo, setStockInfo] = useState({
        initialQuantity:  0,
        warehouseCode:  0,
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const warehouses = useSelector(state => state.warehouseReducer.warehouses);
    const stockWarehouse = useSelector(state => state.stockReducer.stockWarehouse);

    useEffect(() => {
        const fetchWarehouses = async () => {
            dispatch(callWarehousesAPI());
            if(selectedStock) {
                dispatch(callStockWarehouseAPI({stockCode: selectedStock.stockCode}));
            }
        };
        fetchWarehouses();
        if(warehouses){
            console.log("창고리스트",warehouses)
        }

    }, [selectedStock]);
    if(selectedStock){
        console.log("배정 재고",stockWarehouse)
    }
    useEffect(() => {
        if (selectedStock) {
            setStockInfo({
                initialQuantity: selectedStock.quantity || 0,
                warehouseCode: selectedStock.specCode || 0
            });
        }
    }, [selectedStock]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStockInfo({
            ...stockInfo,
            [name]: value
        });
    };

    const handleWarehouseChange = (e) => {
        setStockInfo({
            ...stockInfo,
            warehouseCode: e.target.value
        });
    };


    const handleSubmitWithErrorCheck = async () => {
        if (!stockInfo.initialQuantity || !stockInfo.warehouseCode) {
            setIsErrorModalOpen(true);
            return;
        }

        if (stockInfo.initialQuantity > stockWarehouse.leftQuantity) {
            setIsQuantityErrorModalOpen(true);
            return;
        }

        try {
            await dispatch(callStockAssignment({
                updateRequest: stockInfo,
                onSuccess: async () => {
                    dispatch(callStocksAPI({ currentPage: 1 }));
                    dispatch(callProductListAPI());
                    dispatch(callProductTotalAPI());
                    dispatch(callTotalStockAPI());
                    dispatch(callDestroysTotalAPI());
                    dispatch(callProductDestroyAPI());
                    setIsUpdated(true);
                    toast({
                        title: "배정 완료",
                        description: "창고에 재고가 성공적으로 배정되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate(`/inventory/product`, { replace: true });
                },
                stockCode: selectedStock.stockCode,
            }));
        } catch (error) {
            console.error("재고 배정 중 오류 발생:", error);
            toast({
                title: "오류 발생",
                description: "재고 배정 중 오류가 발생했습니다.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            {stockWarehouse &&(
                <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>재고 배정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="lg" color="textColor">
                            총 재고 <span style={{ fontSize: '1.2em', color: 'orange' }}>{stockWarehouse.initialQuantity}</span> 개 중 <span style={{ fontSize: '1.2em', color: 'orange' }}>{stockWarehouse.assignmentQuantity}</span> 개 배정됨
                        </Text>
                        <Text fontSize="lg" color="textColor">
                            남은 재고 <span style={{ fontSize: '1.2em', color: 'orange' }}>{stockWarehouse.initialQuantity - stockWarehouse.assignmentQuantity}</span> 개
                        </Text>
                        <Divider mt={'20px'} />
                        <FormControl mt={4}>
                            <FormLabel>창고 선택</FormLabel>
                            <Select
                                placeholder="창고를 선택하세요"
                                value={stockInfo.warehouseCode}
                                onChange={handleWarehouseChange}
                            >
                                {warehouses.map((warehouse) => (
                                    <option key={warehouse.warehouseCode} value={warehouse.warehouseCode}>
                                        {warehouse.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>수량 입력</FormLabel>
                            <Input
                                type="number"
                                name="initialQuantity"
                                value={stockInfo.initialQuantity}
                                onChange={handleChange}
                                max={stockWarehouse.leftQuantity}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmitWithErrorCheck}>
                            배정하기
                        </Button>
                        <Button variant="ghost" onClick={onClose}>닫기</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
                    </>)
            }

            <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>오류</ModalHeader>
                    <ModalBody>모든 값을 입력해주세요.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsErrorModalOpen(false)}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isQuantityErrorModalOpen} onClose={() => setIsQuantityErrorModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>오류</ModalHeader>
                    <ModalBody>입력한 수량이 남은 재고보다 많습니다.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsQuantityErrorModalOpen(false)}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default WarehousAssginment;