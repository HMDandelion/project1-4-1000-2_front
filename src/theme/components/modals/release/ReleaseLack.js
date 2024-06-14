import {
    Button,
    FormControl, FormLabel, Input, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Divider, Box
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdCancel, MdCheckCircle, MdSubdirectoryArrowRight} from "react-icons/md";
import {callOrderProduct, callReleaseExpectedAPI, callReleaseLackAPI} from "../../../../apis/ReleaseAPICalls";

function ReleaseLack({isOpen,selectedOrder,onClose,setSelectedOrder}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const {releaseLack} =  useSelector(state => state.releaseReducer);


    useEffect(() => {
        if (selectedOrder) {
            dispatch(callReleaseLackAPI({orderCode: selectedOrder.orderCode}));
        }
    }, [selectedOrder]);
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedOrder(null); }}>
                <ModalOverlay />
                <ModalContent size="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>재고 상태</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {releaseLack && releaseLack.length > 0 ? (
                            <>
                                <Box height="50px"></Box>
                                <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="red.500">부족 재고</Text>
                                <Divider mt="5px" mb="30px" borderColor="gray" />
                                <List spacing={3}>
                                    {releaseLack.filter(release => release.isLack).map((release, index) => (
                                        <ListItem key={index} textAlign="center">
                                            <ListIcon as={MdCancel} color="red.500" />
                                            <Text display="inline" fontWeight="bold" fontSize="lg" color="red.500">
                                                {release.productName}
                                            </Text>
                                            <Text display="inline" fontWeight="bold" fontSize="lg" color="red.500" ml="20px">
                                                {release.lackQuantity}개
                                            </Text>

                                        </ListItem>
                                    ))}
                                </List>
                                <Box height="50px"></Box>
                                <Text fontSize="2xl" textAlign="center" fontWeight="bold" color="green.500">충분한 재고</Text>
                                <Divider mt="5px" mb="30px" borderColor="gray" />
                                <List spacing={3}>
                                    {releaseLack.filter(release => !release.isLack).map((release, index) => (
                                        <ListItem key={index} textAlign="center">
                                            <ListIcon as={MdCheckCircle} color="green.500" />
                                            <Text display="inline" fontWeight="bold" fontSize="lg" color="green.500">
                                                {release.productName}
                                            </Text>

                                        </ListItem>
                                    ))}
                                </List>
                                <Box height="50px"></Box>
                            </>
                        ) : (
                            <>
                                <Box height="100px"></Box>
                                <Text fontSize="lg" textAlign="center">부족 재고 정보가 없습니다.</Text>
                                <Box height="100px"></Box>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ReleaseLack;