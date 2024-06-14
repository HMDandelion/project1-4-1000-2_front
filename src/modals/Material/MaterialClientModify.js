import {
    Button, cookieStorageManager, Divider,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {statusToastAlert} from "../../utils/ToastUtils";
import SimpleSpecs from "../../pages/inventory/material/SimpleSpecs";
import MaterialClientSpecForm from "./MaterialClientSpecForm";
import ClientForm from "../../pages/sales/client/ClientForm";
import {callClientModifyAPI, callMaterialClientModifyAPI} from "../../apis/ClientAPICalls";

function ClientModify({ isOpen, onClose, client }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const phone = client?.phone.split('-');
    const [form, setForm] = useState({
        ...client,
        phoneFirst: phone[0],
        phoneSecond: phone[1],
        phoneThird: phone[2],
        specCodes:[]
    });
    const [ materialForm, setMaterialForm ] = useState(
        {
            materials: []
        }
    );
    const addMaterial = (newMaterial) => {
        const exists = materialForm.materials.some(
            (item) => item.specCode === newMaterial.specCode
        );
        if (!exists) {
            if (newMaterial.specCode && newMaterial.materialName && newMaterial.categoryName) {
                setMaterialForm((prevForm) => ({
                    ...prevForm,
                    materials: [...prevForm.materials, newMaterial]
                }));
            }
        } else {
            statusToastAlert('오류!', "동일한 자재를 추가할 수 없습니다", 'warning');
        }
    };
    const removeMaterial = (specCode) => {
        setMaterialForm((prevForm) => ({
            ...prevForm,
            materials: prevForm.materials.filter(
                (material) => material.specCode !== specCode
            )
        }));
    };

    const { success } = useSelector(state => state.clientReducer);

    useEffect(() => {
        if(success === true) navigate(`/purchase/material/clients/detail`, {state: client.clientCode});
        setMaterialForm((prevForm) => ({
            ...prevForm,
            materials: client.materials.map(material => ({
                ...material
            }))
        }));    }, [success]);

    const onClickUpdateHandler = () => {
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                phone: `${prevForm.phoneFirst}-${prevForm.phoneSecond}-${prevForm.phoneThird}`,
                specCodes: materialForm.materials.map(material => material.specCode)
            };
            dispatch(callMaterialClientModifyAPI({
                clientCode: client.clientCode,
                clientRequest : updatedForm
            }));
            return updatedForm;
        });
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay/>
            <ModalContent>
                <ClientForm client={form} setForm={setForm}/>
                <Divider mt={2} mb={4} />
                <SimpleSpecs addMaterial={addMaterial}/>
                <MaterialClientSpecForm materials={materialForm} removeMaterial={removeMaterial}/>
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