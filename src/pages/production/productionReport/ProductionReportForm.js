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


function ProductionReportForm({ productionReport, setForm }) {
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'productionFile') {
            setForm && setForm({
                ...productionReport,
                [name]: e.target.files[0]
            });

        } else {
            setForm && setForm({
                ...productionReport,
                [name]: value
            });
        }
    };
    return (
        <>
            <ModalHeader fontWeight='800'>생산 보고서 등록</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='gray.200' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    {/*<FormControl>*/}
                    {/*    <FormLabel fontWeight='800'>생산 상품</FormLabel>*/}
                    {/*    <InputGroup>*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="상품명을 입력하세요"*/}
                    {/*        name='stylizationName'*/}
                    {/*        value={productionReport.stylizationName || ''}*/}
                    {/*        onChange={onChangeHandler}/>*/}
                    {/*    </InputGroup>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl>*/}
                    {/*    <FormLabel fontWeight='800'>총 지시 수량</FormLabel>*/}
                    {/*    <InputGroup>*/}
                    {/*    <Input*/}
                    {/*        type="number"*/}
                    {/*        placeholder="수량을 입력하세요"*/}
                    {/*        name='totalOrderedQuantity'*/}
                    {/*        value={productionReport.totalOrderedQuantity || ''}*/}
                    {/*        onChange={onChangeHandler}/>*/}
                    {/*        </InputGroup>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl>*/}
                    {/*    <FormLabel fontWeight='800'>총 생산 수량</FormLabel>*/}
                    {/*    <InputGroup>*/}
                    {/*    <Input*/}
                    {/*        type="number"*/}
                    {/*        placeholder="수량을 입력하세요"*/}
                    {/*        name='totalProductionQuantity'*/}
                    {/*        value={productionReport.totalProductionQuantity || ''}*/}
                    {/*        onChange={onChangeHandler}/>*/}
                    {/*        </InputGroup>*/}
                    {/*</FormControl>*/}

                    <FormControl>
                        <FormLabel fontWeight='800'>시작 일시</FormLabel>
                        <InputGroup>
                        <Input
                            type="datetime-local"
                            placeholder="일시를 선택하세요"
                            name='startAt'
                            value={productionReport.startAt || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>마감 일시</FormLabel>
                        <InputGroup>
                        <Input
                            type="datetime-local"
                            placeholder="일시를 선택하세요"
                            name='completedAt'
                            value={productionReport.completedAt || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>첨부 파일</FormLabel>
                        <InputGroup>
                        <Input
                            type="file"
                            placeholder="파일을 첨부하세요"
                            name='productionFile'
                            value={productionReport.productionFile || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>검수 상태</FormLabel>
                        <Select
                            placeholder="상태를 선택해 주세요"
                            name='productionStatusType'
                            value={productionReport.productionStatusType || ''}
                            onChange={onChangeHandler}>
                            <option value="생산 완료">생산 완료</option>
                            <option value="생산 중지">생산 중지</option>
                            <option value="생산 등록">생산 등록</option>
                            <option value="대기중">대기중</option>
                        </Select>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}

export default ProductionReportForm;
