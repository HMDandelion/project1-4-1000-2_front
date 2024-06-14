import {Box, Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
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
                            <Th w='25%'>상품명</Th>
                            <Th w='15%'>주문단가</Th>
                            <Th w='15%'>주문수량</Th>
                            <Th w='20%'>반품수량</Th>
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
                                <Td>{product.quantity}</Td>
                                <Td>
                                    <NumberInput
                                        value={product.returnQuantity}
                                        max={product.quantity}
                                        min={1}
                                        onChange={(value) => onQuantityChange(product, value)}
                                        width='70px'
                                        size='sm'
                                        mr='3px'
                                        focusBorderColor='orange.500'
                                        errorBorderColor='red.500'
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
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