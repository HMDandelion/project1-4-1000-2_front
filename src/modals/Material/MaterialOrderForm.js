import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import React, {useEffect} from "react";
import ClientSelectForm from "../../pages/sales/estimate/ClientSelectForm";

function MaterialOrderForm({handleClientType, handleNewClient, handleExistingClient, order, setForm}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { onOpen, onClose, isOpen } = useDisclosure()

    const onChangeHandler = e => {
        setForm && setForm({
            ...order,
            [e.target.name] : e.target.value
        });
    }

    const addressCompleteHandler = (data, state) => {
        setForm && setForm({
            ...order,
            address : data.address,
            postcode : data.zonecode,
        })
        onClose();
    }

    return (
        <>
            <ModalHeader fontWeight='800' color={textColor}>주문 설정</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                <ClientSelectForm
                    handleClientType={handleClientType}
                    handleNewClient={handleNewClient}
                    handleExistingClient={handleExistingClient}
                    clientDivide='material'
                />
            </ModalBody>
        </>
    );
}

export default MaterialOrderForm;