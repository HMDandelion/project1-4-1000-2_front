import {
    Button,
    FormControl, FormLabel, Input, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack,Text
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdCheckCircle} from "react-icons/md";
import {callOrderProduct} from "../../../../apis/ReleaseAPICalls";

function OrderProduct({isOpen,selectedOrder,onClose,setSelectedOrder}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const {orderProducts} =  useSelector(state => state.releaseReducer);


    useEffect(() => {
        if (selectedOrder) {
            dispatch(callOrderProduct({orderCode: selectedOrder.orderCode}));
        }
    }, [selectedOrder]);
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedOrder(null); }}>
                <ModalOverlay />
                <ModalContent size="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>주문 상품 목록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {orderProducts && orderProducts.length > 0 ? (
                            <>
                                <div style={{ height: '100px' }}></div>
                            <List spacing={3}>
                                {orderProducts.map((orderProduct, index) => (
                                    <ListItem key={index}>
                                        <ListIcon as={MdCheckCircle} color="green.500" textAlign="center" />
                                        <Text display="inline" fontWeight="bold" fontSize="lg" textAlign="center"> {/* 텍스트 크기 및 정렬 조정 */}
                                            {orderProduct.productName}
                                            {orderProduct.quantity}개
                                        </Text>
                                    </ListItem>
                                ))}
                            </List>
                            <div style={{ height: '100px' }}></div>
                            </>
                        ) : (<>
                            <div style={{ height: '100px' }}></div>
                    <Text fontSize="lg" textAlign="center">주문에 해당하는 상품이 없습니다.</Text>
                    <div style={{ height: '100px' }}></div>
                            </>
                            )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );

}
export default OrderProduct;