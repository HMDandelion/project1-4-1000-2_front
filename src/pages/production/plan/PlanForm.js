import React from "react";
import {
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    VStack,
    HStack,
    Textarea,
    Grid,
    GridItem,
    Text, useColorModeValue
} from "@chakra-ui/react";
import moment from "moment";

function PlanForm({ form, setForm }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const onChangeHandler = (e, index) => {
        const { name, value } = e.target;
        setForm((prevForm) =>
            prevForm.map((item, i) => (i === index ? { ...item, [name]: value } : item))
        );
    };

    const onDateChangeHandler = (e, dateType) => {
        const value = e.target.value;
        setForm((prevForm) =>
            prevForm.map((item) => ({ ...item, [dateType]: value }))
        );
    };

    return (
        <>
            <ModalHeader fontWeight='800' color={textColor}>생산 계획 수정</ModalHeader>
            <ModalCloseButton />
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>생산 계획 기간</FormLabel>
                        <HStack spacing={4}>
                            <Input
                                type="date"
                                value={moment(form[0]?.startAt).format("YYYY-MM-DD")}
                                onChange={(e) => onDateChangeHandler(e, "startAt")}
                            />
                            <Input
                                type="date"
                                value={moment(form[0]?.endAt).format("YYYY-MM-DD")}
                                onChange={(e) => onDateChangeHandler(e, "endAt")}
                            />
                        </HStack>
                    </FormControl>
                </VStack>
            </ModalBody>
            <ModalBody
                maxHeight="400px" // 원하는 높이로 설정합니다.
                overflowY="scroll"
                p='30px 40px'
            >
                <VStack spacing={4} align="stretch">
                    {form && form.map((item, index) => (
                        <React.Fragment key={index}>
                            <HStack spacing={4} align="center">
                                <FormControl>
                                    <FormLabel>코드</FormLabel>
                                    <Text>{item.productCode}</Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>품목</FormLabel>
                                    <Text>{item.productName}</Text>
                                </FormControl>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>총 수량</FormLabel>
                                        <Input
                                            name="requiredQuantity"
                                            value={item.requiredQuantity}
                                            onChange={(e) => onChangeHandler(e, index)}
                                        />
                                    </FormControl>
                                    <Text>개</Text>
                                </HStack>
                            </HStack>
                            <FormControl>
                                <FormLabel>적요</FormLabel>
                                <Textarea
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => onChangeHandler(e, index)}
                                />
                            </FormControl>
                        </React.Fragment>
                    ))}
                </VStack>
            </ModalBody>
        </>
    );
}

export default PlanForm;
