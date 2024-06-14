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
import {callWarehousesAPI, callWarehouseSaveAPI, callWarehouseUpdateAPI} from "../../apis/WarehouseAPICalls";

function WarehouseSave({isOpen,onClose,warehouse,handleWarehouseSelect}){
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
        const fetchEmployees = () => {
            dispatch(callEmployeesAPI());
        };
        fetchEmployees();
    }, []);


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


    const handleSubmit = async () => {
        if (warehouseInfo.name == null || warehouseInfo.location == null || warehouseInfo.volume == null || warehouseInfo.employeeCode == null) {
            onOpen();
            return;
        }
        try {
            await dispatch(callWarehouseSaveAPI({
                updateRequest: warehouseInfo,
                onSuccess: () => {
                    toast({
                        title: "등록 완료",
                        description: "창고가 성공적으로 등록되었습니다!",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    onClose(); // 모달 창 닫기
                    setWarehouseInfo({
                        name:  '',
                        location:  '',
                        volume:  0,
                        employeeCode:0
                    })
                    dispatch(callWarehousesAPI());
                    navigate(`/inventory/warehouse`);
                }
            }));
        } catch (error) {
            console.error("창고 등록 중 오류 발생:", error);
            setIsErrorModalOpen(true);
        }
    };

    return(
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose();  }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>창고 등록</ModalHeader>
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
                                            <Input placeholder="수량을 입력하세요" _placeholder={{ fontSize: 'sm' }}
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
                                            <Input type="number" placeholder="크기를 입력하세요" _placeholder={{ fontSize: 'sm' }}
                                                   name='volume' value={warehouseInfo.volume}
                                                   onChange={handleChange} />
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

                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default WarehouseSave;