import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callProductListAPI, callProductsAPI, callProductUpdateAPI} from "../../apis/ProductAPICalls";
import {callProductTotalAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";

function ProductUpdat({isOpen,onClose,selectedProduct, setSelectedProduct}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({
        productName:  '',
        price:  0,
        unit:  ''
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const toast = useToast(); // Chakra UI의 Toast를 사용하여 알림 메시지 표시
    const {  onOpen, onClose: onModalClose } = useDisclosure();

    useEffect(() => {
        if (selectedProduct) {
            setProductInfo({
                productName: selectedProduct.productName || '',
                price: selectedProduct.price || 0,
                unit: selectedProduct.unit || ''
            });
        }
    }, [selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({
            ...productInfo,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!productInfo.productName || productInfo.price <= 0 || !productInfo.unit) {
            onOpen();
            return;
        }

        try {
            await dispatch(callProductUpdateAPI({
                updateRequest: productInfo,
                onSuccess: async () => {
                    await dispatch(callProductsAPI({ currentPage: 1 }));
                    await dispatch(callProductListAPI());
                    await dispatch(callProductTotalAPI());
                    await dispatch(callTotalStockAPI());
                    await dispatch(callDestroysTotalAPI());
                    await dispatch(callProductDestroyAPI());
                    setIsUpdated(true);
                    toast({
                        title: "수정 완료",
                        description: "상품 정보가 성공적으로 수정되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate('/inventory/product', {replace: true});
                },
                productCode: selectedProduct.productCode
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
                    <ModalHeader color={"navy"}>상품 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedProduct &&
                            <>
                            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                                <VStack spacing={4} align="stretch">
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>상품명</FormLabel>
                                        <Input placeholder="상품명을 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='productName' value={productInfo.productName}
                                               onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>가격</FormLabel>
                                        <Input type="number" placeholder="가격을 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='price' value={productInfo.price}
                                               onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>단위</FormLabel>
                                        <Input placeholder="단위를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='unit' value={productInfo.unit}
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
export default ProductUpdat;