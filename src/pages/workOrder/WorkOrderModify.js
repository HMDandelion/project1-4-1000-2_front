import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {callClientModifyAPI} from "../../apis/ClientAPICalls";
import {Button, Modal, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/react";
import ClientForm from "../sales/client/ClientForm";
import {callWorkOrderModifyAPI} from "../../apis/WorkOrderAPICalls";

function WorkOrderModify({isOpen, onClose, workOrder}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({

    });

    const { success } = useSelector(state => state.workOrderReducer);

    // useEffect(() => {
    //     if(success === true) navigate(`/sales/client/${client.clientCode}`);
    // }, [success]);

    const onClickUpdateHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
            };
            dispatch(callWorkOrderModifyAPI({
                workOrderCode: workOrder.workOrderCode
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
export default WorkOrderModify;