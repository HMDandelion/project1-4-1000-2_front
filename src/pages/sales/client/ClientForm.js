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

function ClientForm({ client, setForm }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { onOpen, onClose, isOpen } = useDisclosure()

    const onChangeHandler = e => {
        setForm && setForm({
            ...client,
            [e.target.name] : e.target.value
        });
    }

    const addressCompleteHandler = (data, state) => {
        setForm && setForm({
            ...client,
            address : data.address,
            postcode : data.zonecode,
        })
        onClose();
    }

    return (
        <>
            <ModalHeader fontWeight='800' color={textColor}>거래처 설정</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>거래처명</FormLabel>
                        <Input placeholder="거래처명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                               name='clientName' value={client.clientName}
                               onChange={onChangeHandler}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>대표명</FormLabel>
                        <Input placeholder="대표명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                               name='representativeName' value={client.representativeName}
                               onChange={onChangeHandler}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>연락처</FormLabel>
                        <HStack spacing={2}>
                            <Input maxLength={3} onChange={onChangeHandler} name='phoneFirst' value={client.phoneFirst}/><span>-</span>
                            <Input maxLength={4} onChange={onChangeHandler} name='phoneSecond' value={client.phoneSecond}/><span>-</span>
                            <Input maxLength={4} onChange={onChangeHandler} name='phoneThird' value={client.phoneThird}/>
                        </HStack>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>주소</FormLabel>
                        <HStack spacing={2}>
                            <Input placeholder="우편번호" width="40%" _placeholder={{fontSize: 'sm'}}
                                   name="postcode" value={client.postcode}
                                   onChange={onChangeHandler}/>
                            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} isLazy
                                     placement='right' closeOnBlur={false}>
                                <PopoverTrigger>
                                    <Button colorScheme="orange" variant="outline">주소 검색</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow/>
                                    <PopoverBody>
                                        <DaumPostcodeEmbed onComplete={addressCompleteHandler} onClose={onClose}/>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                        <Input placeholder="주소" mt={2} _placeholder={{fontSize: 'sm'}}
                               name="address" value={client.address}
                               onChange={onChangeHandler}/>
                        <Input placeholder="상세주소" mt={2} _placeholder={{fontSize: 'sm'}}
                               name="addressDetail" value={client.addressDetail}
                               onChange={onChangeHandler}/>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}

export default ClientForm;