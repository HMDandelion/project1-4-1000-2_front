import React, { useState } from 'react';
import {
    Button, FormControl, FormLabel, HStack, Input,
    Modal, ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, useColorModeValue,
    useDisclosure,
    useToast, VStack
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {callProductListAPI, callProductRegistAPI, callProductsAPI} from "../../apis/ProductAPICalls";
import {useNavigate} from "react-router-dom";
import {callProductTotalAPI, callStocksAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";
import DaumPostcodeEmbed from "react-daum-postcode";


function ProductSave({ onClose }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({
        productName: '',
        price: 0,
        unit: ''
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const toast = useToast(); // Chakra UI의 Toast를 사용하여 알림 메시지 표시
    const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({
            ...productInfo,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if (!productInfo.productName || productInfo.price <= 0 || !productInfo.unit) {
            onOpen();
            return;
        }
        dispatch(callProductRegistAPI({
            registRequest: productInfo,
            onSuccess: () => {
                // 상품 등록 성공 시 데이터 재로딩
                dispatch(callProductsAPI({currentPage: 1}))
                    .then(dispatch(callProductListAPI()))
                    .then(dispatch(callProductTotalAPI()))
                    .then(dispatch(callTotalStockAPI()))
                    .then(dispatch(callDestroysTotalAPI()))
                    .then(dispatch(callProductDestroyAPI()))
                    .then(() => {
                    setIsRegistered(true); // 등록 성공 시 isRegistered 상태를 true로 설정
                    toast({ // 등록 성공 알림 메시지 표시
                        title: "등록 완료",
                        description: "상품이 성공적으로 등록되었습니다!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    onClose();
                    navigate('/inventory/product');
                });
            }
        }));
    };


    return(
        <>
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel fontWeight='800' color={textColor}>상품명</FormLabel>
                    <Input placeholder="상품명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                           name='productName' value={productInfo.productName}
                           onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight='800' color={textColor}>가격</FormLabel>
                    <Input type="number" placeholder="가격을 입력하세요" _placeholder={{fontSize: 'sm'}}
                           name='price' value={productInfo.price}
                           onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight='800' color={textColor}>상품명</FormLabel>
                    <Input placeholder="단위를 입력하세요" _placeholder={{fontSize: 'sm'}}
                           name='unit' value={productInfo.unit}
                           onChange={handleChange}/>
                </FormControl>
            </VStack>
        </ModalBody>

            <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={handleSubmit}>등록하기</Button>
            <Button colorScheme="orange" onClick={onClose}>닫기</Button>
            </ModalFooter>
            <Modal isOpen={isOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>오류</ModalHeader>
                    <ModalBody>모든 값을 입력해주세요.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProductSave;
