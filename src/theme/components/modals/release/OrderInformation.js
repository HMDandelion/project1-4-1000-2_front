import {
    Button,
    FormControl, FormLabel, Input, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Box, Flex, Divider
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdCheckCircle} from "react-icons/md";
import {callOrderInformation, callOrderProduct} from "../../../../apis/ReleaseAPICalls";

function OrderInformation({isOpen,selectedRelease,onClose,setSelectedRelease}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const { orderInformations } =  useSelector(state => state.releaseReducer);

    useEffect(() => {
        if (selectedRelease) {
            dispatch(callOrderInformation({orderCode: selectedRelease.orderCode}));
        }
    }, [selectedRelease]);
    if(orderInformations){
        console.log('영',orderInformations)
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose();  }}>
                <ModalOverlay />
                <ModalContent maxWidth="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>주문 명세서</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {orderInformations && orderInformations.orderProducts &&
                        orderInformations.orderProducts.some(product => product.productCode !== null) ? (
                            <>
                                <Box my={4}>
                                    <Text fontWeight="bold" fontSize="2xl" textDecoration="underline" color="navy">주문 정보</Text>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">주문코드</Text>
                                        <Text fontSize="lg">{orderInformations.orderCode}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">마감시간</Text>
                                        <Text fontSize="lg">{orderInformations.deadline}</Text>
                                    </Flex>
                                </Box>
                                <Divider mt="20px"/>
                                <Box my={4}>
                                    <Text fontWeight="bold" fontSize="2xl" textDecoration="underline" color="navy">거래처 정보</Text>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">거래처 이름</Text>
                                        <Text fontSize="lg">{orderInformations.client.clientName}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">대표자명</Text>
                                        <Text fontSize="lg">{orderInformations.client.representativeName}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">주소</Text>
                                        <Text fontSize="lg">{orderInformations.client.address} {orderInformations.client.addressDetail}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontSize="lg" color="orange" minWidth="100px">핸드폰 번호</Text>
                                        <Text fontSize="lg">{orderInformations.client.phone}</Text>
                                    </Flex>
                                </Box>
                                <Divider mt="20px"/>
                                <Box my={4}>
                                    <Text fontWeight="bold" fontSize="2xl" textDecoration="underline" color="navy">주문 상품</Text>
                                    <List spacing={3}>
                                        {orderInformations.orderProducts.map((orderProduct, index) => (
                                            <ListItem key={index}>
                                                <Flex alignItems="center">
                                                    <ListIcon as={MdCheckCircle} color="green.500" />
                                                    <Text fontSize="lg" color="orange" minWidth="80px">상품명</Text>
                                                    <Text fontSize="lg">{orderProduct.productName || 'N/A'}</Text>
                                                </Flex>
                                                <Flex>
                                                    <Text fontSize="lg" color="orange" minWidth="80px" marginLeft="20px">수량</Text>
                                                    <Text fontSize="lg">{orderProduct.quantity ? `${orderProduct.quantity}개` : 'N/A'}</Text>
                                                </Flex>
                                                <Flex>
                                                    <Text fontSize="lg" color="orange" minWidth="80px"  marginLeft="20px">가격</Text>
                                                    <Text fontSize="lg">{orderProduct.price ? `${orderProduct.price}원` : 'N/A'}</Text>
                                                </Flex>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </>
                        ) : (
                            <Box my={8}>
                                <Text fontSize="lg" textAlign="center">주문에 해당하는 상품이 없습니다.</Text>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );


}
export default OrderInformation;