import {
    Box, Button, Divider, Grid, GridItem,
    Heading, HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement, ModalHeader,
    Radio,
    RadioGroup, Select,
    Stack, Table, Tbody, Td, Th, Thead, Tr,
    VStack
} from "@chakra-ui/react";
import {AddIcon, MinusIcon, SearchIcon} from "@chakra-ui/icons";
import React, {useState} from "react";

function WorkOrderForm() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products] = useState([
        { code: '210645', name: 'KF80 새부리형', price: 24000 },
        { code: '210646', name: '덴탈마스크', price: 12000 },
        { code: '210647', name: 'KF94 새부리형', price: 30000 },
        { code: '210648', name: 'KF94 일반형', price: 27000 },
        { code: '210649', name: 'KF80 일반형', price: 23000 },
        { code: '210720', name: '다양한마스크', price: 10000 },
    ]);

    const handleProductAdd = (product) => {
        if (!selectedProducts.includes(product)) {
            setSelectedProducts([
                ...selectedProducts,
                { ...product, estimatePrice: product.price, quantity: 1 }
            ]);
        }
    };

    const handleProductRemove = (productCode) => {
        setSelectedProducts(selectedProducts.filter(p => p.code !== productCode));

    };

    const handleQuantityChange = (product, quantity) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.code === product.code ? { ...p, quantity: parseInt(quantity, 10) } : p))
        );
        console.log("product : ", product);
    };

    const handlePriceChange = (product, price) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.code === product.code ? { ...p, estimatePrice: parseInt(price, 10) } : p))
        );
    };

    return (
        <>
            <ModalHeader fontWeight='800' color='secondaryGray.900' px='0'>작업 지시서 등록</ModalHeader>
            <Grid
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(1, 100%)'
            >
                <GridItem>
                    <ClientForm />
                </GridItem>
                <Divider my='20px'/>
                <GridItem>
                    <ProductSelection
                        products={products}
                        selectedProducts={selectedProducts}
                        onProductAdd={handleProductAdd}
                    />
                </GridItem>
                <Divider my='20px'/>
                <GridItem>
                    <PriceAndQuantityInput
                        selectedProducts={selectedProducts}
                        onQuantityChange={handleQuantityChange}
                        onPriceChange={handlePriceChange}
                        onProductRemove={handleProductRemove}
                    />
                </GridItem>
            </Grid>

        </>
    );
}

const ClientForm = () => {
    const [clientType, setClientType] = useState('existing');
    const [existingClient, setExistingClient] = useState('');
    const [newClient, setNewClient] = useState({
        name: '',
        address: '',
        addressDetail: '',
        // 다른 필드들 추가
    });

    const handleExistingClientChange = (e) => setExistingClient(e.target.value);
    const handleNewClientChange = (e) => setNewClient({ ...newClient, [e.target.name]: e.target.value });
};

const ProductSelection = ({ products, selectedProducts, onProductAdd }) => {
    return (
        <>
            <Heading size="md" color='secondaryGray.900'>1. 라인 선택</Heading>
            <Box overflowY="auto" h="200px" mt={4}>
                <Table variant="simple" size='sm'>
                    <Thead>
                        <Tr>
                            <Th w='30px'/>
                            <Th w='50px'>상품코드</Th>
                            <Th w='200px'>상품명</Th>
                            <Th w='100px'>정가</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody sx={{ '& tr > td': { py: 1 } }}>
                        {products.map(product => (
                            <Tr key={product.code}>
                                <Td>
                                    <IconButton
                                        icon={<AddIcon />}
                                        size="sm"
                                        color='green'
                                        onClick={() => onProductAdd(product)}
                                        isDisabled={selectedProducts.some(p => p.code === product.code)}
                                    />
                                </Td>
                                <Td>{product.code}</Td>
                                <Td>{product.name}</Td>
                                <Td>{product.price}원</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

const PriceAndQuantityInput = ({ selectedProducts, onQuantityChange, onPriceChange, onProductRemove }) => {
    return (
        <>
            <Heading size="md" color='secondaryGray.900'>2. 단가 및 수량 입력</Heading>
            <Box overflowY="auto" h="200px" mt={4}>
                <Table variant="simple" size='sm'>
                    <Thead>
                        <Tr>
                            <Th w='5%'/>
                            <Th w='10%'>상품코드</Th>
                            <Th w='20%'>상품명</Th>
                            <Th w='15%'>정가</Th>
                            <Th w='20%'>견적가</Th>
                            <Th w='15%'>수량</Th>
                            <Th w='15%'>합계</Th>
                        </Tr>
                    </Thead>
                    <Tbody sx={{ '& tr > td': { py: 1 } }}>
                        {selectedProducts.map(product => (
                            <Tr key={product.code}>
                                <Td>
                                    <IconButton
                                        icon={<MinusIcon />}
                                        size="sm"
                                        color="red"
                                        onClick={() => onProductRemove(product.code)}
                                    />
                                </Td>
                                <Td>{product.code}</Td>
                                <Td>{product.name}</Td>
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
                                <Td>{product.estimatePrice * product.quantity}원</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};


export default WorkOrderForm;