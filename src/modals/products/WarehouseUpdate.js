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
    callDestroysTotalAPI,
    callEmployeesAPI,
    callProductDestroyAPI, callStoragesAPI,
    callWarehouseMove
} from "../../apis/StorageAPICalls";
import {callWarehouseUpdateAPI} from "../../apis/WarehouseAPICalls";

function WarehouseUpdate({isOpen,onClose,warehouse,handleWarehouseSelect}){
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [warehouseInfo, setWarehouseInfo] = useState({
        name:  '',
        location:  '',
        volume:  0,
        employeeCode:0
    });
    const toast = useToast();
    const {  onOpen, onClose: onModalClose } = useDisclosure();
    const employees = useSelector(state => state.productReducer.employees);

    useEffect(() => {
            dispatch(callEmployeesAPI());
    }, []);

    useEffect(() => {
        if (warehouse) {
            setWarehouseInfo({
                name: warehouse.name || '',
                location: warehouse.location || '',
                volume: warehouse.volume || 0,
                employeeCode: warehouse.employeeCode || 0
            });
        }
    }, [warehouse]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouseInfo({
            ...warehouseInfo,
            [name]: value
        });
    };

    const handleEmployeeChange = (e) => {
        setWarehouseInfo({
            ...warehouseInfo,
            employeeCode: e.target.value
        });
    };


    const handleSubmit =  () => {
        if (warehouseInfo.name == null || warehouseInfo.location == null || warehouseInfo.volume < 0 || warehouseInfo.employeeCode == null) {
            onOpen();
            return;
        }
        try {
             dispatch(callWarehouseUpdateAPI({
                updateRequest: warehouseInfo,
                onSuccess: () => {
                    toast({
                        title: "수정 완료",
                        description: "창고 정보가 성공적으로 수정되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    // 현재 페이지로 다시 이동하여 컴포넌트를 새로 마운트하도록 함
                    navigate(`/inventory/warehouse`);
                    handleWarehouseSelect(warehouse);
                },
                warehouseCode: warehouse.warehouseCode
            }));
        } catch (error) {
            console.error("상품 수정 중 오류 발생:", error);
            setIsErrorModalOpen(true);
        }
    };

    return(
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose();  }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>창고 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {warehouse && warehouseInfo &&
                            <>
                                <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                                    <VStack spacing={4} align="stretch">
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>담당자</FormLabel>
                                            <Select placeholder="담당자를 선택하세요" onChange={handleEmployeeChange} value={warehouseInfo.employeeCode}>
                                                {employees && employees.data.map(employee => (
                                                    <option key={employee.employeeCode} value={employee.employeeCode}>
                                                        {employee.employeeName}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>창고명</FormLabel>
                                            <Input placeholder="창고명을 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                                   name='name' value={warehouseInfo.name}
                                                   onChange={handleChange} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>위치</FormLabel>
                                            <Input placeholder="위치를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                                   name='location' value={warehouseInfo.location}
                                                   onChange={handleChange} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight='800' color={textColor}>크기</FormLabel>
                                            <Input placeholder="크기를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                                   name='volume' value={warehouseInfo.volume}
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
export default WarehouseUpdate;