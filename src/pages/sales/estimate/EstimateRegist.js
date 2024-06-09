import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import EstimateForm from "./EstimateForm";

function EstimateRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[ form, setForm ] = useState({
        clientCode : '',
        clientName : '',
        address : '',
        addressDetail : '',
        postcode: '',
        representativeName : '',
        phoneFirst: '',
        phoneSecond: '',
        phoneThird: '',
        phone: ''
    });

    // 등록 모달
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { success } = useSelector(state => state.estimateReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/estimate`);
    }, [success]);

    const onClickRegistHandler = () => {
        //TODO
    }

    return (
        <>
            <Button colorScheme='orange' size='sm' onClick={onOpen}>
                등록
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='inside'>
                <ModalOverlay/>
                <ModalContent maxW='800px'>
                    <ModalBody>
                        <EstimateForm/>
                    </ModalBody>
                    <ModalFooter justifyContent='center'>
                        <Button colorScheme='orange' mx={1} onClick={onClickRegistHandler}>등록</Button>
                        <Button variant='outline' mx={1} onClick={onClose}>
                            취소
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EstimateRegist;