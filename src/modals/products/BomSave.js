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
import ProductSave from "./ProductSave";
import ColumnsTable from "../../components/table/ComplexTable";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    callMaterailsAPI,
    callProductAPI,
    callProductBomAPI,
    callProductBomRegistAPI,
    callProductListAPI,
    callProductRegistAPI,
    callProductsAPI
} from "../../apis/ProductAPICalls";
import {callProductTotalAPI, callTotalStockAPI} from "../../apis/StockAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../apis/StorageAPICalls";

function BomSave({onClose,productCode,isOpen}){

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const [bomInfo, setBomInfo] = useState({
        quantity: 0,
        sequence: 0,
        specCode: 0
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const toast = useToast(); // Chakra UI의 Toast를 사용하여 알림 메시지 표시
    const {  onOpen, onClose: onModalClose } = useDisclosure();

    const materials = useSelector(state => state.productReducer.materials);

    useEffect(() => {
        const fetchMaterials = async () => {
            dispatch(callMaterailsAPI());
        };
        fetchMaterials();
        if(materials){
            console.log("원자재",materials)
        }
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBomInfo({
            ...bomInfo,
            [name]: value
        });
    };

    const handleMaterialChange = (e) => {
        setBomInfo({
            ...bomInfo,
            specCode: e.target.value, // 선택된 원자재의 코드를 bomInfo 상태의 specCode에 저장
        });
    };

    const handleSubmit = () => {
        if (bomInfo.quantity<=0 || bomInfo.sequence <= -1 || bomInfo.specCode<=0) {
            setIsErrorModalOpen(true); // 오류 모달 상태를 true로 설정하여 오류 모달 창을 열기
            return;
        }
        dispatch(callProductBomRegistAPI({
            registRequest: bomInfo,
            onSuccess: () => {
                // 상품 등록 성공 시 데이터 재로딩
                dispatch(callProductBomAPI({currentPage:1,productCode}))
                    .then(dispatch(callProductAPI({productCode})))
                    .then(() => {
                        setIsRegistered(true); // 등록 성공 시 isRegistered 상태를 true로 설정
                        toast({ // 등록 성공 알림 메시지 표시
                            title: "등록 완료",
                            description: "bom이 성공적으로 등록되었습니다!",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        });
                        onClose();
                        navigate(`/inventory/product/${productCode}`);
                    });
            },
            productCode:productCode
        }));
    };

    return(
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>BOM 등록</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                            <VStack spacing={4} align="stretch">
                                <FormControl>
                                    <FormLabel fontWeight='800' color={textColor}>원자재</FormLabel>
                                    <Select placeholder="원자재를 선택하세요" onChange={handleMaterialChange} value={bomInfo.specCode}>
                                        {materials && materials.map(material => (
                                            <option key={material.specCode} value={material.specCode}>
                                                {material.materialName}
                                            </option>
                                        ))}

                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight='800' color={textColor}>수량</FormLabel>
                                    <Input type="number" placeholder="원자재수량을 입력하세요" _placeholder={{fontSize: 'sm'}}
                                           name='quantity' value={bomInfo.quantity}
                                           onChange={handleChange}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight='800' color={textColor}>조립순서</FormLabel>
                                    <Input type="number" placeholder="조립 순번을 입력하세요" _placeholder={{fontSize: 'sm'}}
                                           name='sequence' value={bomInfo.sequence}
                                           onChange={handleChange}/>
                                </FormControl>
                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="orange" mr={3} onClick={handleSubmit}>등록하기</Button>
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

                </ModalContent>
            </Modal>
        </>
    )
}
export default BomSave;