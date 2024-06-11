import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Divider, ChakraProvider
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
import {
    callDestroysTotalAPI,
    callProductDestroyAPI,
    callRegistDestroy, callRegistDestroyAPI,
    callStockAssignment, callStoragesAPI
} from "../../apis/StorageAPICalls";
import {callWarehousesAPI} from "../../apis/WarehouseAPICalls";

function DestroyRegist({isOpen,onClose,selectedStorage, setSelectedStorage,warehouse},handleWarehouseSelect){

        console.log("갈리오", selectedStorage);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const [isQuantityErrorModalOpen, setIsQuantityErrorModalOpen] = useState(false);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [destroy, setDestroy] = useState({
        destroyQuantity:  0
    });
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestroy({
            ...destroy,
            [name]: value
        });
    };

    const handleSubmitWithErrorCheck =  () => {
        if (destroy.destroyQuantity<=0) {
            setIsErrorModalOpen(true);
            return;
        }

        if (destroy.destroyQuantity > selectedStorage.actualQuantity) {
            setIsQuantityErrorModalOpen(true);
            return;
        }

        try {
             dispatch(callRegistDestroyAPI({
                updateRequest: destroy,
                 onSuccess: () => {
                     dispatch(callStoragesAPI({warehouseCode: warehouse.warehouseCode}));
                     toast({
                         title: "파손 등록 완료",
                         description: "파손이 성공적으로 등록되었습니다!",
                         status: "success",
                         duration: 1000,
                         isClosable: true,
                     });
                     onClose(); // 모달 창 닫기
                     // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                     navigate(`/inventory/warehouse`);
                 },
                 storageCode: selectedStorage.storageCode,
            }));
        } catch (error) {
            console.error("상품 수정 중 오류 발생:", error);
            setIsErrorModalOpen(true);
        }
    };

    return (
        <>{selectedStorage && (
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>파손 등록</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontSize="lg" color="navy">
                                현재 재고 수량 <span style={{ fontSize: '1.2em', color: 'orange' }}>{selectedStorage.actualQuantity}</span> 개이고
                            </Text>
                            <Text fontSize="lg" color="navy">
                                현재 파손 재고는 <span style={{ fontSize: '1.2em', color: 'orange' }}>{selectedStorage.destroyQuantity}</span> 개 입니다.
                            </Text>
                            <Divider mt={'20px'} />
                            <FormControl mt={4}>
                                <FormLabel >파손 수량 입력</FormLabel>
                                <Text fontSize="lg" color="navy">
                                    <span style={{ fontSize: '1.2em', color: 'orange' }}>{selectedStorage.actualQuantity}</span> 개 이하로 입력
                                </Text>
                                <Input
                                    type="number"
                                    name="destroyQuantity"
                                    value={destroy.destroyQuantity}
                                    onChange={handleChange}
                                    max={selectedStorage.actualQuantity}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="orange" mr={3}
                                onClick={handleSubmitWithErrorCheck}
                            >
                                등록하기
                            </Button>
                            <Button variant="ghost" onClick={onClose}>닫기</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                    </>
        )}
            <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>오류</ModalHeader>
                    <ModalBody>0 이상을 입력해주세요.</ModalBody>
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
export default DestroyRegist;