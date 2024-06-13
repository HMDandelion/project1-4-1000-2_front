import {Box, Heading, IconButton, Input, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import React from "react";

function ReturnSelectForm({ products, selectedProducts, onProductAdd }) {
    return (
        <>
            <Heading size="sm" color='secondaryGray.900'>2. 반품 품목 선택</Heading>
            <Box overflowY="auto" h="200px" mt={4}>
                <Table variant="simple" size='sm'>
                    <Thead>
                        <Tr>
                            <Th/>
                            <Th w='70px'>상품코드</Th>
                            <Th w='200px'>상품명</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody sx={{ '& tr > td': { py: 1 } }}>
                        {products && products.map(product => (
                            <Tr key={product.productCode}>
                                <Td>
                                    <IconButton
                                        icon={<AddIcon />}
                                        size="sm"
                                        color='green'
                                        onClick={() => onProductAdd(product)}
                                        isDisabled={selectedProducts.some(p => p.productCode === product.productCode)}
                                    />
                                </Td>
                                <Td>{product.productCode}</Td>
                                <Td>{product.productName}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
}

export default ReturnSelectForm;