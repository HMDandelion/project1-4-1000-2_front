import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    VStack
} from "@chakra-ui/react";

function DefectDetailForm({ defectDetail, setForm }) {
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        // 기존 상태를 업데이트하는 방식으로 setForm 호출
        setForm({
            ...defectDetail,
            [name]: value
        });
    };
    return (
        <>
            <ModalHeader fontWeight='800'>불량 등록</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='gray.200' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800'>불량 코드</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="불량 코드"
                                name='defectCode'
                                value={defectDetail.defectCode || ''}
                                onChange={onChangeHandler}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>첨부 파일</FormLabel>
                        <InputGroup>
                            <Input
                                type="file"
                                placeholder="파일을 첨부해 주세요"
                                name='defectFile'
                                value={defectDetail.defectFile || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>불량 사유</FormLabel>
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="불량 사유를 입력해주세요"
                                name='defectReason'
                                value={defectDetail.defectReason || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>처리 상태</FormLabel>
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="상태를 선택해 주세요"
                                name='defectStatus'
                                value={defectDetail.defectStatus || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}

export default DefectDetailForm;