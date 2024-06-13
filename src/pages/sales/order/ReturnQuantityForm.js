import {Box, Heading, IconButton, Input, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {MinusIcon} from "@chakra-ui/icons";
import React from "react";

function ReturnQuantityForm({ selectedProducts, onQuantityChange, onProductRemove }) {
    return (
        <>
            <Heading size="sm" color='secondaryGray.900'>3. 반품 수량 입력</Heading>
            <Box overflowY="auto" h="200px" mt={4}>
                <Table variant="simple" size='sm'>
                    <Thead>
                        <Tr>
                            <Th w='7%'/>
                            <Th w='13%'>상품코드</Th>
                            <Th w='30%'>상품명</Th>
                            <Th w='20%'>주문단가</Th>
                            <Th w='15%'>주문수량</Th>
                            <Th w='15%'>반품수량</Th>
                        </Tr>
                    </Thead>
                    <Tbody sx={{ '& tr > td': { py: 1 } }}>
                        {selectedProducts.map(product => (
                            <Tr key={product.productCode}>
                                <Td>
                                    <IconButton
                                        icon={<MinusIcon />}
                                        size="sm"
                                        color="red"
                                        onClick={() => onProductRemove(product.productCode)}
                                    />
                                </Td>
                                <Td>{product.productCode}</Td>
                                <Td>{product.productName}</Td>
                                <Td>{product.price}원</Td>
                                <Td>{product.quantity}</Td>
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
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

export default ReturnQuantityForm;