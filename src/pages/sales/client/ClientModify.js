import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react";
import ClientForm from "./ClientForm";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callClientModifyAPI} from "../../../apis/ClientAPICalls";
import {useNavigate} from "react-router-dom";

function ClientModify({ isOpen, onClose, client }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const phone = client?.phone.split('-');
    const [form, setForm] = useState({
        ...client,
        phoneFirst: phone[0],
        phoneSecond: phone[1],
        phoneThird: phone[2]
    });

    const { success } = useSelector(state => state.clientReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/client/${client.clientCode}`);
    }, [success]);

    const onClickUpdateHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                phone: `${prevForm.phoneFirst}-${prevForm.phoneSecond}-${prevForm.phoneThird}`,
            };
            dispatch(callClientModifyAPI({
                clientCode: client.clientCode,
                clientRequest : updatedForm
            }));
            return updatedForm;
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ClientForm client={form} setForm={setForm}/>
                <ModalFooter justifyContent='center'>
                    <Button colorScheme='orange' mx={1} onClick={onClickUpdateHandler}>수정</Button>
                    <Button variant='outline' mx={1} onClick={onClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ClientModify;