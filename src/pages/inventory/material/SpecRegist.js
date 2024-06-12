import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalContent, ModalFooter, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {callClientRegistAPI} from "../../../apis/ClientAPICalls";
import ClientForm from "../../sales/client/ClientForm";
import SpecForm from "./SpecForm";

function SpecRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[ form, setForm ] = useState({
        materialName : '',
        categoryCode : '',
        unit : '',
        specification: '',
        remarks : '',
        safetyStock: ''
    });

    // 등록 모달
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { success } = useSelector(state => state.clientReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/clients`);
    }, [success]);

    const onClickRegistHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                phone: `${prevForm.phoneFirst}-${prevForm.phoneSecond}-${prevForm.phoneThird}`,
            };
            dispatch(callClientRegistAPI({clientRequest : updatedForm}));
            console.log("updatedForm", updatedForm);
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
                    <SpecForm spec={form} setForm={setForm}/>
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
export default SpecRegist;