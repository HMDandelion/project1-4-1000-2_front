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
    callProductsAPI, callProductSpecAPI,
    callProductUpdateAPI, callSpecUpdateAPI
} from "../../apis/ProductAPICalls";
import {callProductTotalAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";

function SpecUpdate({productCode,spec,isOpen,onClose,selectedProduct, setSelectedProduct}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [specInfo, setSpecInfo] = useState({
        color:  '',
        type:  '',
        size:  ''
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();

    useEffect(() => {
        if (selectedProduct) {
            setSpecInfo({
                color: selectedProduct.color || '',
                type: selectedProduct.type || '',
                size: selectedProduct.size || ''
            });
        }
    }, [selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpecInfo({
            ...specInfo,
            [name]: value
        });
    };


    const handleSubmit = async () => {
        if (specInfo.color==null || specInfo.type==null || specInfo.size==null) {
            onOpen();
            return;
        }

        try {
            await dispatch(callSpecUpdateAPI({
                updateRequest: specInfo,
                onSuccess: async () => {
                    await  dispatch(callProductBomAPI({currentPage:1,productCode:productCode}));
                    await dispatch(callProductAPI({productCode:productCode}))
                    await dispatch(callProductSpecAPI({specCurrentPage:1,productCode}))
                    setIsUpdated(true);
                    toast({
                        title: "수정 완료",
                        description: "상품 스펙이 성공적으로 수정되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate(`/inventory/product/${productCode}`, {replace: true});
                },
                specCode: selectedProduct.specCode
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
                    <ModalHeader color={"navy"}>상품 스펙 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedProduct &&
                            <>
                            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                                <VStack spacing={4} align="stretch">
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>색상</FormLabel>
                                        <Input placeholder="색상을 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='color' value={specInfo.color}
                                               onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>종류</FormLabel>
                                        <Input placeholder="종류를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='type' value={specInfo.type}
                                               onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight='800' color={textColor}>사이즈</FormLabel>
                                        <Input placeholder="사이즈를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                               name='size' value={specInfo.size}
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
export default SpecUpdate;