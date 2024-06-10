import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import WorkOrderForm from "./WorkOrderForm";

function WorkOrderRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[ form, setForm ] = useState({

    });

    // 등록 모달
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { success } = useSelector(state => state.workOrderReducer);

    useEffect(() => {
        if(success === true) navigate(`/production/work-order`);
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
                        <WorkOrderForm/>
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

export default WorkOrderRegist;