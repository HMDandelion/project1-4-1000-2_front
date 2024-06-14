import {
    Button,
    FormControl, FormLabel, Input, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Divider
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdCheckCircle, MdSubdirectoryArrowRight} from "react-icons/md";
import {callOrderProduct, callReleaseExpectedAPI} from "../../../../apis/ReleaseAPICalls";

function ReleaseExpected({isOpen,selectedOrder,onClose,setSelectedOrder}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const {releaseExpected} =  useSelector(state => state.releaseReducer);


    useEffect(() => {
        if (selectedOrder) {
            dispatch(callReleaseExpectedAPI({orderCode: selectedOrder.orderCode}));
        }
    }, [selectedOrder]);
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedOrder(null); }}>
                <ModalOverlay />
                <ModalContent size="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>출고 견적</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {releaseExpected && releaseExpected.length > 0 ? (
                            <>
                                <div style={{ height: '100px' }}></div>
                                <List spacing={3}>
                                    {releaseExpected.map((release, index) => (
                                        <ListItem key={index}>
                                            <ListIcon as={MdCheckCircle} color="green.500" textAlign="center" />
                                            <Text display="inline" fontWeight="extrabold" fontSize="2xl" textAlign="center" color="navy">
                                                {release.productName}
                                                {release.quantity}개
                                            </Text>
                                            <Divider mt="20px" borderColor="gray" />
                                            {release.warehouseName.map((name, subIndex) => (
                                                <ListItem key={subIndex} style={{ paddingLeft: '20px' }}>
                                                    <ListIcon as={MdSubdirectoryArrowRight} color="gray.500" textAlign="center" />
                                                    <Text display="inline" fontWeight="normal" fontSize="lg" textAlign="center" color="gray">
                                                    <span style={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>
                                                        {name}
                                                    </span>에서{' '}
                                                        <span style={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>
                                                        {release.releaseQuantity[subIndex]}
                                                    </span>개 출고 예정..
                                                    </Text>
                                                </ListItem>
                                            ))}
                                        </ListItem>
                                    ))}
                                </List>
                                <div style={{ height: '100px' }}></div>
                            </>
                        ) : (
                            <>
                                <div style={{ height: '100px' }}></div>
                                <Text fontSize="lg" textAlign="center">출고 견적 정보가 없습니다.</Text>
                                <div style={{ height: '100px' }}></div>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ReleaseExpected;