import {
    Button, FormControl, FormLabel, HStack, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useColorModeValue, useDisclosure, VStack
} from "@chakra-ui/react";

function ClientRegist({ isOpen, onClose }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader fontWeight='800' color={textColor}>거래처 설정</ModalHeader>
                <ModalCloseButton/>
                <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel fontWeight='800' color={textColor}>거래처명</FormLabel>
                            <Input placeholder="거래처명을 입력하세요" _placeholder={{fontSize: 'sm'}}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight='800' color={textColor}>대표명</FormLabel>
                            <Input placeholder="대표명을 입력하세요" _placeholder={{fontSize: 'sm'}}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight='800' color={textColor}>연락처</FormLabel>
                            <HStack spacing={2}>
                                <Input maxLength={3} /><span>-</span>
                                <Input maxLength={4} /><span>-</span>
                                <Input maxLength={4} />
                            </HStack>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight='800' color={textColor}>주소</FormLabel>
                            <HStack spacing={2}>
                                <Input placeholder="우편번호" width="40%" _placeholder={{fontSize: 'sm'}}/>
                                <Button colorScheme="gray">주소 검색</Button>
                            </HStack>
                            <Input placeholder="주소" mt={2} _placeholder={{fontSize: 'sm'}}/>
                            <Input placeholder="상세주소" mt={2} _placeholder={{fontSize: 'sm'}}/>
                        </FormControl>
                    </VStack>
                </ModalBody>


                <ModalFooter justify='center'>
                    <Button colorScheme='orange' mx={1}>확인</Button>
                    <Button variant='ghost' mx={1} onClick={onClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ClientRegist;