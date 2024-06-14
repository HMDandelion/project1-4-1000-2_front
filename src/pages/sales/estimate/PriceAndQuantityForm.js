import {Box, Heading, IconButton, Input, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {MinusIcon} from "@chakra-ui/icons";
import React from "react";

function PriceAndQuantityForm({ selectedProducts, onQuantityChange, onPriceChange, onProductRemove }) {
    return (
        <>
            <Heading size="md" color='secondaryGray.900'>2. 단가 및 수량 입력</Heading>
            <Box overflowY="auto" h="200px" mt={4}>
                <Table variant="simple" size='sm'>
                    <Thead>
                        <Tr>
                            <Th w='5%'/>
                            <Th w='80px'>상품코드</Th>
                            <Th >상품명</Th>
                            <Th >정가</Th>
                            <Th >견적가</Th>
                            <Th>수량</Th>
                            <Th>합계</Th>
                        </Tr>
                    </Thead>
                    <Tbody sx={{ '& tr > td': { py: 1 } }}>
                        {selectedProducts.map(product => (
                            <Tr key={product.productCode}>
                                <Td>
                                    <IconButton
                                        icon={<MinusIcon />}
                                        size="xs"
                                        color="red"
                                        onClick={() => onProductRemove(product.productCode)}
                                    />
                                </Td>
                                <Td>{product.productCode}</Td>
                                <Td>{product.productName}</Td>
                                <Td>{product.price}원</Td>
                                <Td>
                                    <Input
                                        variant='outline'
                                        type="number"
                                        value={product.estimatePrice}
                                        onChange={(e) => onPriceChange(product, e.target.value)}
                                        width='90px'
                                        size='sm'
                                        mr='3px'
                                    />
                                    원
                                </Td>
                                <Td>
                                    <Input
                                        variant='outline'
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => onQuantityChange(product, e.target.value)}
                                        width='50px'
                                        size='sm'
                                        mr='3px'
                                    />
                                    개
                                </Td>
                                <Td>{isNaN(product.estimatePrice * product.quantity) ?
                                    0 : product.estimatePrice * product.quantity}원</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

export default PriceAndQuantityForm;