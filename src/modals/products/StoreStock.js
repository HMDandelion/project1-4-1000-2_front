import {
    Button,
    FormControl, FormLabel, Input, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue, useDisclosure, useToast, VStack, Text, Flex, Box, Divider
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    callMaterailsAPI,
    callProductClient,
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI
} from "../../apis/ProductAPICalls";
import {MdCheckCircle} from "react-icons/md";
import {callStoreAPI} from "../../apis/StorageAPICalls";


function StoreStock({isOpen,onClose,selectedStock, setSelectedStock}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const highlightColor = useColorModeValue('orange.600', 'yellow.400'); // 강조 색상 설정
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const store =  useSelector(state => state.storageReducer.store);
    useEffect(() => {
        if (selectedStock) {
            dispatch(callStoreAPI({stockCode: selectedStock.stockCode}));
        }
    }, [selectedStock]);
    if(store) {
        console.log("핫", store)
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedStock(null); }}>
                <ModalOverlay />
                <ModalContent size="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>상품 거래처 목록</ModalHeader>
                    <Divider mt={'10'} />
                    <ModalCloseButton />
                    <ModalBody mt={'10'} mb={'10'}>
                        {store && store.data.length > 0 ? (
                            <List spacing={3}>
                                {store.data.map((item, index) => (
                                    <ListItem key={index}>
                                        <Flex align="center" justify="center">
                                            <ListIcon as={MdCheckCircle} color="green.500" />
                                            <Box ml={2} mb={4}>
                                                <Text display="inline" fontWeight="bold" fontSize="2xl" color={highlightColor}>
                                                    {item.warehouseName}
                                                </Text>
                                                <Text display="inline" fontWeight="bold" fontSize="2xl" color={highlightColor} ml={4}>
                                                    {item.initialQuantity}개
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <>
                                <div style={{ height: '100px' }}></div>
                                <Text fontSize="lg" textAlign="center">거래처 정보가 없습니다.</Text>
                                <div style={{ height: '100px' }}></div>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default StoreStock;