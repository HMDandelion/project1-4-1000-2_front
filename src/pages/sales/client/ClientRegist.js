import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay, useDisclosure,
} from "@chakra-ui/react";
import ClientForm from "./ClientForm";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callClientModifyAPI, callClientRegistAPI} from "../../../apis/ClientAPICalls";
import {useNavigate} from "react-router-dom";

function ClientRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[ form, setForm ] = useState({
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

    const { success } = useSelector(state => state.clientReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/client`);
    }, [success]);

    const onClickRegistHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                phone: `${prevForm.phoneFirst}-${prevForm.phoneSecond}-${prevForm.phoneThird}`,
            };
            dispatch(callClientRegistAPI({clientRequest : updatedForm}));
            return updatedForm;
        });
    }

    return (
        <>
            <Button colorScheme='orange' size='sm' onClick={onOpen}>
                등록
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ClientForm client={form} setForm={setForm}/>
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

export default ClientRegist;