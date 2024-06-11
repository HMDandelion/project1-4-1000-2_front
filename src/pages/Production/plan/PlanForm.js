import {
    Button,
    FormControl, FormLabel, HStack, Input,
    ModalBody,
    ModalCloseButton,
    ModalHeader, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import React from "react";

function PlanForm( { setForm, plan } ) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const {onOpen, onClose, isOpen} = useDisclosure()

    const onChangeHandler = e => {
        setForm && setForm({
            ...plan,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <ModalHeader fontWeight='800' color={textColor}>생산 계획 수정</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>거래처명</FormLabel>
                        <Input placeholder="거래처명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                               name='clientName' value={plan.productCode}
                               onChange={onChangeHandler}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>대표명</FormLabel>
                        <Input placeholder="대표명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                               name='representativeName' value={plan.productName}
                               onChange={onChangeHandler}/>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}
export default PlanForm;