import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    ModalBody,
    ModalCloseButton,
    ModalHeader, Select,
    VStack
} from "@chakra-ui/react";

function DefectDetailForm({defectDetail, setForm}) {
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        if (name === 'defectFile') {
            setForm && setForm({
                ...defectDetail,
                [name]: e.target.files[0]
            });
        } else {
            setForm && setForm({
                ...defectDetail,
                [name]: value
            });
        }
    };
        return (
            <>
                <ModalHeader fontWeight='800'>불량 등록</ModalHeader>
                <ModalCloseButton/>
                <ModalBody borderTop='1px solid' borderColor='gray.200' p='30px 40px'>
                    <VStack spacing={4} align="stretch">
                        {/*<FormControl>*/}
                        {/*    <FormLabel fontWeight='800'>불량 코드</FormLabel>*/}
                        {/*    <InputGroup>*/}
                        {/*        <Input*/}
                        {/*            placeholder="불량 코드"*/}
                        {/*            name='defectCode'*/}
                        {/*            value={defectDetail.defectCode || ''}*/}
                        {/*            onChange={onChangeHandler}*/}
                        {/*        />*/}
                        {/*    </InputGroup>*/}
                        {/*</FormControl>*/}

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
                            <FormLabel fontWeight='800'>불량 처리</FormLabel>
                            <Select
                                placeholder="상태를 선택해 주세요"
                                name='defectStatus'
                                value={defectDetail.defectStatus || ''}
                                onChange={onChangeHandler}>
                                <option value="처리 시작">처리 시작</option>
                                <option value="처리 완료">처리 완료</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>
            </>
        );
    }

export default DefectDetailForm;