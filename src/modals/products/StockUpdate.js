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
    callBomUpdateAPI,
    callMaterailsAPI, callProductAPI, callProductBomAPI,
    callProductListAPI,
    callProductsAPI,
    callProductUpdateAPI
} from "../../apis/ProductAPICalls";
import {callProductTotalAPI, callStocksAPI, callStockUpdateAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";
import {statusToastAlert} from "../../utils/ToastUtils";

function StockUpdate({isOpen,onClose,selectedStock, setSelectedStock}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stockInfo, setStockInfo] = useState({
        productCode:  0,
        type:  ''
    });
    const [isUpdated, setIsUpdated] = useState(false);
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const productList = useSelector(state => state.productReducer.productList);

    useEffect(() => {
            dispatch(callProductListAPI());
    }, []);

    useEffect(() => {
        if (selectedStock) {
            setStockInfo({
                productCode: selectedStock.productCode || 0,
                type: selectedStock.type || ''
            });
        }
    }, [selectedStock]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStockInfo({
            ...stockInfo,
            [name]: value
        });
    };

    const handleStockChange = (e) => {
        setStockInfo({
            ...stockInfo,
            productCode: e.target.value, // 선택된 원자재의 코드를 bomInfo 상태의 specCode에 저장
        });
    };

    const handleSubmit = async () => {
        if (stockInfo.productCode< 0 || stockInfo.type == null) {
            onOpen();
            return;
        }

        try {
            await dispatch(callStockUpdateAPI({
                updateRequest: stockInfo,
                onSuccess:  () => {
                     dispatch(callStocksAPI({ currentPage: 1 }));
                     dispatch(callProductListAPI());
                     dispatch(callProductTotalAPI());
                     dispatch(callTotalStockAPI());
                     dispatch(callDestroysTotalAPI());
                     dispatch(callProductDestroyAPI());
                    setIsUpdated(true);
                    const title = '수정 완료';
                    const desc = '재고 정보가 성공적으로 수정되었습니다.';
                    statusToastAlert(title, desc, 'success');
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate(`/inventory/product`, {replace: true});
                },
                stockCode: selectedStock.stockCode
            }));
        } catch (error) {
            console.error("상품 수정 중 오류 발생:", error);
            const title = '오류 발생';
            const desc = '상품 정보 수정 중 오류가 발생했습니다.';
            statusToastAlert(title, desc, 'error');
        }
    };
    return(
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedStock(null); }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>재고 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedStock &&
                            <>
                                <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                                    <VStack spacing={4} align="stretch">
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>상품</FormLabel>
                                            <Select placeholder="상품을 선택하세요" onChange={handleStockChange} value={stockInfo.productCode}>
                                                {productList && productList.data.map(product => (
                                                    <option key={product.productCode} value={product.productCode}>
                                                        {product.productName}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>종류</FormLabel>
                                            <Select placeholder="종류를 선택하세요" _placeholder={{ fontSize: 'sm' }}
                                                    name='type' value={stockInfo.type}
                                                    onChange={handleChange}>
                                                <option value="products">생산품</option>
                                                <option value="re_inspection">재생산품</option>
                                            </Select>
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
export default StockUpdate;