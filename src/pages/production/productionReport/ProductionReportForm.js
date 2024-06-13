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


function ProductionReportForm({ productionReport, setForm }) {
    const onChangeHandler = e => {
        console.log(e.target)
        setForm && setForm({
            ...productionReport,
            [e.target.name] : e.target.value
        });
    }
    return (
        <>
            <ModalHeader fontWeight='800'>생산 보고서 등록</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='gray.200' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800'>생산 상품</FormLabel>
                        <InputGroup>
                        <Input
                            type="text"
                            placeholder="상품명을 입력하세요"
                            name='stylizationName'
                            value={productionReport.stylizationName || ''}
                            onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>총 지시 수량</FormLabel>
                        <InputGroup>
                        <Input
                            type="number"
                            placeholder="수량을 입력하세요"
                            name='totalOrderedQuantity'
                            value={productionReport.totalOrderedQuantity || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>총 생산 수량</FormLabel>
                        <InputGroup>
                        <Input
                            type="number"
                            placeholder="수량을 입력하세요"
                            name='totalProductionQuantity'
                            value={productionReport.totalProductionQuantity || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>

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
                        <FormLabel fontWeight='800'>생산 상태</FormLabel>
                        <InputGroup>
                        <Input
                            placeholder="현재 상태를 선택해주세요"
                            name='productionStatus'
                            value={productionReport.productionStatus || ''}
                            onChange={onChangeHandler}/>
                            </InputGroup>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}

export default ProductionReportForm;
