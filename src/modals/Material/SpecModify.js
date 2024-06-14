import {Button, Modal, ModalContent, ModalFooter, ModalOverlay,} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SpecForm from "./SpecForm";
import {callMaterialSpecModifyAPI} from "../../apis/MaterialSpecAPICalls";

function SpecModify({isOpen, onClose, spec, specCode}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ...spec.spec,
    });

    const {success} = useSelector(state => state.materialSpecReducer);

    useEffect(() => {
        console.log(form);

        if (success === true) navigate(`/inventory/material/specs/${specCode}`);
    }, [success]);

    const onClickUpdateHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm
            };
            dispatch(callMaterialSpecModifyAPI({
                specCode: specCode,
                specRequest: updatedForm
            }));
            return updatedForm;
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <SpecForm spec={form} setForm={setForm}/>
                <ModalFooter justifyContent="center">
                    <Button colorScheme="orange" mx={1} onClick={onClickUpdateHandler}>수정</Button>
                    <Button variant="outline" mx={1} onClick={onClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SpecModify;