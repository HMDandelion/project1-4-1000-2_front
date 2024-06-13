import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Divider, Modal, ModalContent, ModalFooter, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {callClientRegistAPI} from "../../apis/ClientAPICalls";
import ClientForm from "../../pages/sales/client/ClientForm";
import MaterialClientSpecForm from "./MaterialClientSpecForm";
import SimpleSpecs from "../../pages/inventory/material/SimpleSpecs";
import {statusToastAlert} from "../../utils/ToastUtils";

function MaterialClientRegist() {
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
        phone: '',
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { success } = useSelector(state => state.clientReducer);

    useEffect(() => {
        if(success === true) navigate(`/purchase/material/clients`);
    }, [success]);


    const onClickRegistHandler = () => {
        // 추가필
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
            <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
                <ModalOverlay>
                    <ModalContent overflowY="scroll" mb={2}
                                  sx={{
                                      '&::-webkit-scrollbar': {
                                          display: 'none',
                                      },
                                      '-ms-overflow-style': 'none',}
                                  }>
                        <ClientForm client={form} setForm={setForm}/>
                        <Divider mt={2} mb={4} />
                        <SimpleSpecs addMaterial={addMaterial}/>
                        <MaterialClientSpecForm materials={materialForm} removeMaterial={removeMaterial}/>
                        <ModalFooter justifyContent='center'>
                            <Button colorScheme='orange' mx={1} onClick={onClickRegistHandler}>등록</Button>
                            <Button variant='outline' mx={1} onClick={onClose}>
                                취소
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
}
export default MaterialClientRegist;