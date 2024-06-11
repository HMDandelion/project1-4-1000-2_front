import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import PlanForm from "./PlanForm";
import {callPlanningModifyAPI} from "../../../apis/PlanningAPICalls";

function PlanModify({ isOpen, onClose, plan }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ...plan,

    });

    const { success } = useSelector(state => state.planningReducer);

    useEffect(() => {
        if(success === true) navigate(`/production/planning/${plan.planCode}`);
    }, [success]);

    const onClickUpdateHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                phone: `${prevForm.phoneFirst}-${prevForm.phoneSecond}-${prevForm.phoneThird}`,
            };
            dispatch(callPlanningModifyAPI({
                planCode: plan.planCode,
                planRequest : updatedForm
            }));
            return updatedForm;
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <PlanForm plan={form} setForm={setForm}/>
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

export default PlanModify;