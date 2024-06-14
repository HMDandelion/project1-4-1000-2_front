import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Button } from "@chakra-ui/react";
import PlanForm from "./PlanForm";
import { callPlanningModifyAPI } from "../../../apis/PlanningAPICalls";
import { useNavigate } from "react-router-dom";

function PlanModify({ isOpen, onClose, plans = [] }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(plans);
    const { success, error } = useSelector(state => state.planningReducer);

    useEffect(() => {
        if (success === true) navigate(`/production/planning/${plans.planCode}`);
    }, [success]);

    useEffect(() => {
        setForm(plans);
    }, [plans]);

    const onClickUpdateHandler = async () => {
        try {
            dispatch(callPlanningModifyAPI({
                planCode: form.planCode,
                planRequest: form
            }));
            onClose();
        } catch (error) {
            console.error("Error updating plan:", error);
        }
    };
    // console.log( 'form.planCode ',  form.planCode)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <PlanForm form={form} setForm={setForm}/>
                <ModalFooter justifyContent="center">
                    <Button colorScheme="orange" mx={1} onClick={onClickUpdateHandler}>
                        수정
                    </Button>
                    <Button variant="outline" mx={1} onClick={onClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default PlanModify;
