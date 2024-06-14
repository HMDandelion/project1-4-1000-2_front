import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Center,
    Divider,
    Flex,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import SimpleSpecs from "../../pages/inventory/material/SimpleSpecs";
import {statusToastAlert} from "../../utils/ToastUtils";
import MaterialOrderForm from "./MaterialOrderForm";
import MaterialOrderSpecForm from "./MaterialOrderSpecForm";
import {callMaterialOrderRegistAPI} from "../../apis/MaterialOrderAPICalls";
import PlanSelector from "./PlanSelector";
import PopoverCalendar from "../../components/calendar/PopoverCalendar";

function MaterialOrderRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [clientType, setClientType] = useState();
    const [existingClient, setExistingClient] = useState();
    const [orderDate, setOrderDate] = useState();
    const [deliveryDueDate, setDeliveryDueDate] = useState();
    const [planCode, setPlanCode] = useState();


    const {success} = useSelector(state => state.clientReducer);
    const [form, setForm] = useState({
        orderDate: '',
        clientCode: '',
        employeeCode: '',
        planCode: '',
        orderSpecList: []
    });
    const [materialForm, setMaterialForm] = useState(
        {
            materials: []
        }
    );
    const addMaterial = (newMaterial) => {
        const exists = materialForm.materials.some(
            (item) => item.specCode === newMaterial.specCode
        );
        if (!exists) {
            if (newMaterial.specCode && newMaterial.materialName && newMaterial.categoryName) {
                setMaterialForm((prevForm) => ({
                    ...prevForm,
                    materials: [...prevForm.materials, newMaterial]
                }));
            }
        } else {
            statusToastAlert('오류!', "동일한 자재를 추가할 수 없습니다", 'warning');
        }
    };
    const setMaterials = (updatedData) => {
        const updatedMaterials = materialForm.materials.map(material => {
            if (material.specCode === updatedData.specCode) {
                return {
                    ...material,
                    orderQuantity: updatedData.orderQuantity,
                    price: updatedData.price
                };
            }
            return material;
        });
    };
    const removeMaterial = (specCode) => {
        setMaterialForm((prevForm) => ({
            ...prevForm,
            materials: prevForm.materials.filter(
                (material) => material.specCode !== specCode
            )
        }));
    };

    useEffect(() => {
        if (success === true) navigate(`/purchase/material/clients`);
    }, [success]);

    const onClickRegistHandler = () => {
        // 추가필
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                orderSpecList: materialForm.materials.map(material => ({
                    specCode: material.specCode,
                    price: material.price,
                    orderQuantity: material.orderQuantity
                })),
                clientCode: existingClient,
                planCode: planCode,
                orderDate: orderDate,
                deliveryDueDate: deliveryDueDate

            };
            dispatch(callMaterialOrderRegistAPI({orderRequest: updatedForm}));
            return updatedForm;
        });
    };

    const setNewClient = () => {
        //마감까지 개발되지 않을 기능입니다.
    };
    const testHandle = () => {
        console.log(materialForm);
    };

    return (
        <>
            <Button colorScheme="orange" size="sm" onClick={onOpen}>
                등록
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay>
                    <ModalContent overflowY="scroll" mb={2} sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                    }
                    }>
                        <MaterialOrderForm handleClientType={setClientType} handleNewClient={setNewClient} handleExistingClient={setExistingClient} />
                        <Divider mt={2} mb={4} />
                        {/* 생산계획 추가 */}
                        {/* 날짜 입력 2개 */}
                        <Flex justifyContent="center">
                            <PlanSelector setPlanCode={setPlanCode} existingPlan={planCode} />
                            <Center height='300px'>
                                <Divider orientation='vertical' />
                            </Center>
                            <Box w="250px" ml="100">
                                <Text fontWeight="600" color="secondaryGray.900" mt="60px">주문일자 입력</Text>
                                <PopoverCalendar deadline={orderDate} handleDeadline={setOrderDate} />

                                <Text fontWeight="600" color="secondaryGray.900" mt="10px">배송에정일 입력</Text>
                                <PopoverCalendar deadline={deliveryDueDate} handleDeadline={setDeliveryDueDate} />
                            </Box>
                        </Flex>
                        <Divider mt={2} mb={4} />
                        <SimpleSpecs addMaterial={addMaterial} />
                        <MaterialOrderSpecForm materials={materialForm} removeMaterial={removeMaterial} setMaterials={setMaterials}/>
                        <ModalFooter justifyContent="center">
                            <Button colorScheme="orange" mx={1} onClick={onClickRegistHandler}>등록</Button>
                            <Button variant="outline" mx={1} onClick={onClose}>
                                취소
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
}
export default MaterialOrderRegist;