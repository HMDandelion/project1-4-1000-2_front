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


function ProductionDetailForm({ productionDetail, setForm }) {
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        // 기존 상태를 업데이트하는 방식으로 setForm 호출
        setForm({
            ...productionDetail,
            [name]: value
        });
    };

    return (
        <>
            <ModalHeader fontWeight='800'>생산 보고서 등록</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='gray.200' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800'>작업 지시서 코드</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="작업 지시서"
                                name='workOrderCode'
                                value={productionDetail.workOrderCode || ''}
                                onChange={onChangeHandler}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>총 지시 수량</FormLabel>
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="라인 이름을 입력하세요"
                                name='lineName'
                                value={productionDetail.lineName || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>담당자</FormLabel>
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="담당자를 입력해주세요"
                                name='employeeName'
                                value={productionDetail.employeeName || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>생산 품목</FormLabel>
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="상품을 입력하세요"
                                name='productName'
                                value={productionDetail.productName || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>지시 수량</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="수량을 입력해주세요"
                                name='orderedQuantity'
                                value={productionDetail.orderedQuantity || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>생산 수량</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="수량을 입력해주세요"
                                name='productionQuantity'
                                value={productionDetail.productionQuantity || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>불량 수량</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="수량을 입력해주세요"
                                name='defectQuantity'
                                value={productionDetail.defectQuantity || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>양품 수량</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="수량을 입력해주세요"
                                name='completelyQuantity'
                                value={productionDetail.completelyQuantity || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>검수 일시</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="일시를 선택해 주세요"
                                name='inspectionDate'
                                value={productionDetail.inspectionDate || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>검수 상태</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="검수 상태를 선택해주세요"
                                name='inspectionStatusType'
                                value={productionDetail.inspectionStatusType || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>비고</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="비고를 입력해 주세요"
                                name='productionMemo'
                                value={productionDetail.productionMemo || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800'>생산 상태</FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="상태를 선택해 주세요"
                                name='productionStatusType'
                                value={productionDetail.productionStatusType || ''}
                                onChange={onChangeHandler}/>
                        </InputGroup>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}

export default ProductionDetailForm;
