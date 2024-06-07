import React, { useState } from 'react';
import {
    Button,
    Modal, ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {callProductRegistAPI, callProductsAPI} from "../../apis/ProductAPICalls";
import {useNavigate} from "react-router-dom";


function ProductSave({ onClose }) {
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
                dispatch(callProductsAPI({currentPage: 1})).then(() => {
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
            <div>
                <label htmlFor="productName">상품명:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={productInfo.productName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">가격:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={productInfo.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="unit">단위:</label>
                <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={productInfo.unit}
                    onChange={handleChange}
                />
            </div>
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
