import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    useColorModeValue, useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    callBomUpdateAPI, callMaterailsAPI,
    callProductAPI,
    callProductBomAPI,
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI
} from "../../apis/ProductAPICalls";
import {callProductTotalAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";

function BomUpdate({productCode,bom,isOpen,onClose,selectedProduct, setSelectedProduct}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bomInfo, setBomInfo] = useState({
        quantity:  0,
        sequence:  0,
        specCode:  0
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const materials = useSelector(state => state.productReducer.materials);

    useEffect(() => {
            dispatch(callMaterailsAPI());
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setBomInfo({
                quantity: selectedProduct.quantity || 0,
                sequence: selectedProduct.sequence || 0,
                specCode: selectedProduct.specCode || 0
            });
        }
    }, [selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBomInfo({
            ...bomInfo,
            [name]: value
        });
    };

    const handleMaterialChange = (e) => {
        setBomInfo({
            ...bomInfo,
            specCode: e.target.value, // 선택된 원자재의 코드를 bomInfo 상태의 specCode에 저장
        });
    };


    const handleSubmit = async () => {
        if (bomInfo.quantity< 0 || bomInfo.sequence < 0 || bomInfo.specCode< 0) {
            onOpen();
            return;
        }

        try {
            await dispatch(callBomUpdateAPI({
                updateRequest: bomInfo,
                onSuccess: async () => {
                    await  dispatch(callProductBomAPI({currentPage:1,productCode:productCode}));
                    await dispatch(callProductAPI({productCode:productCode}))
                    setIsUpdated(true);
                    toast({
                        title: "수정 완료",
                        description: "BOM 정보가 성공적으로 수정되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate(`/inventory/product/${productCode}`, {replace: true});
                },
                bomCode: selectedProduct.bomCode
            }));
        } catch (error) {
            console.error("상품 수정 중 오류 발생:", error);
            toast({
                title: "오류 발생",
                description: "상품 정보 수정 중 오류가 발생했습니다.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    };
    return(
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedProduct(null); }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>BOM 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedProduct &&
                            <>
                            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                                <VStack spacing={4} align="stretch">
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>원자재</FormLabel>
                                        <Select placeholder="원자재를 선택하세요" onChange={handleMaterialChange} value={bomInfo.specCode}>
                                            {materials && materials.map(material => (
                                                <option key={material.specCode} value={material.specCode}>
                                                    {material.materialName}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>수량</FormLabel>
                                        <Input type="number" placeholder="수량을 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='quantity' value={bomInfo.quantity}
                                               onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>조립 순서</FormLabel>
                                        <Input type="number" placeholder="조립 순서를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='sequence' value={bomInfo.sequence}
                                               onChange={handleChange} />
                                    </FormControl>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                            <Button colorScheme="orange" mr={3} onClick={handleSubmit}>수정하기</Button>
                    <Button colorScheme="orange" onClick={onClose}>닫기</Button>
                </ModalFooter>
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
                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default BomUpdate;