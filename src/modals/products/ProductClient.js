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
import {useNavigate} from "react-router-dom";
import {
    callMaterailsAPI,
    callProductClient,
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI
} from "../../apis/ProductAPICalls";
import {MdCheckCircle} from "react-icons/md";

function ProductClient({isOpen,onClose,selectedProduct, setSelectedProduct}){
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const productClient =  useSelector(state => state.productReducer.productClient);

    console.log("응",selectedProduct)
    useEffect(() => {
        if (selectedProduct) {
            dispatch(callProductClient({productCode: selectedProduct.productCode}));
        }
    }, [selectedProduct]);
    if(productClient){
        console.log("거래처",productClient);
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedProduct(null); }}>
                <ModalOverlay />
                <ModalContent size="xl"> {/* 모달 크기 조정 */}
                    <ModalHeader color={"navy"}>상품 거래처 목록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {productClient && productClient.data.length > 0 ? (
                            <>
                                <div style={{ height: '100px' }}></div>
                            <List spacing={3}>
                                {productClient.data.map((client, index) => (
                                    <ListItem key={index}>
                                        <ListIcon as={MdCheckCircle} color="green.500" textAlign="center" />
                                        <Text display="inline" fontWeight="bold" fontSize="lg" textAlign="center"> {/* 텍스트 크기 및 정렬 조정 */}
                                            {client}
                                        </Text>
                                    </ListItem>
                                ))}
                            </List>
                            <div style={{ height: '100px' }}></div>
                            </>
                        ) : (<>
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
export default ProductClient;