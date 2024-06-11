import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    Button,
    Container, HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import EstimateForm from "./EstimateForm";
import PopoverCalendar from "../../../components/calendar/PopoverCalendar";
import {callEstimateRegistAPI} from "../../../apis/EstimateAPICalls";

function EstimateRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [clientType, setClientType] = useState('existing');
    const [existingClient, setExistingClient] = useState('');
    const [newClient, setNewClient] = useState();
    const [deadline, setDeadline] = useState();

    // 등록 모달
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { success } = useSelector(state => state.estimateReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/estimate`);
    }, [success]);

    useEffect(() => console.log('selectProducts : ', selectedProducts), [selectedProducts]);
    useEffect(() => console.log('clientType : ', clientType), [clientType]);
    useEffect(() => console.log('existingClient : ', existingClient), [existingClient]);
    useEffect(() => console.log('newClient : ', newClient), [newClient]);
    useEffect(() => console.log('deadline : ', deadline), [deadline]);

    const onClickRegistHandler = () => {
        const form = {};
        form.deadline = deadline;
        form.products = selectedProducts;

        if(clientType === 'existing')
            form.clientCode = existingClient;
        else
            form.client = newClient;

        dispatch(callEstimateRegistAPI({ estimateRequest : form }));
    }

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => {
            const calculated = product.quantity * product.estimatePrice;
            return total + (isNaN(calculated) ? 0 : calculated);
        }, 0);
    }
    const formatNumber = (number) => new Intl.NumberFormat('ko-KR').format(number);

    return (
        <>
            <Button colorScheme='orange' size='sm' onClick={onOpen}>
                등록
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='inside'>
                <ModalOverlay/>
                <ModalContent maxW='800px'>
                    <ModalBody>
                        <EstimateForm
                            handleClientType={setClientType}
                            handleNewClient={setNewClient}
                            handleExistingClient={setExistingClient}
                            handleSelectedProducts={setSelectedProducts}
                        />
                    </ModalBody>
                    <ModalFooter justifyContent='space-between'>
                        <Text fontSize='xl' color='secondaryGray.900' fontWeight='700'>
                            견적 총액 {formatNumber(getTotalPrice(selectedProducts))}원
                        </Text>
                        <HStack>
                            <PopoverCalendar handleDeadline={setDeadline}/>
                            <Button colorScheme='orange' mx={1} onClick={onClickRegistHandler}>등록</Button>
                            <Button variant='outline' mx={1} onClick={onClose}>
                                취소
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EstimateRegist;