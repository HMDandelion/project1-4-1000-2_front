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

function EstimateForm() {
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
            <ModalHeader fontWeight='800' color='secondaryGray.900' px='0'>견적 내용 설정</ModalHeader>
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

    return (
        <>
            <RadioGroup onChange={setClientType} value={clientType} mt={4}>
                <Stack direction="row" spacing={5}>
                    <Radio value="existing">기존 거래처 선택</Radio>
                    <Radio value="new">신규 거래처 등록</Radio>
                </Stack>
            </RadioGroup>

            {clientType === 'existing' ? (
                <VStack mt={4} spacing={4}>
                    <InputGroup>
                        <Input placeholder="거래처명으로 검색" value={existingClient} onChange={handleExistingClientChange} />
                        <InputRightElement>
                            <IconButton icon={<SearchIcon />} />
                        </InputRightElement>
                    </InputGroup>
                    {/* 기존 거래처 선택 항목, 예시로 간단한 드롭다운 */}
                    <Select placeholder="거래처 선택">
                        <option value="1">종로관화</option>
                        <option value="2">유관순</option>
                    </Select>
                </VStack>
            ) : (
                <VStack mt={4} spacing={4}>
                    <Input placeholder="거래처명" name="name" value={newClient.name} onChange={handleNewClientChange} />
                    <Input placeholder="대표자명" name="representative" value={newClient.representative} onChange={handleNewClientChange} />
                    <Input placeholder="연락처" name="contact" value={newClient.contact} onChange={handleNewClientChange} />
                    <Input placeholder="주소" name="address" value={newClient.address} onChange={handleNewClientChange} />
                    <Input placeholder="상세주소" name="addressDetail" value={newClient.addressDetail} onChange={handleNewClientChange} />
                </VStack>
            )}
        </>
    );
};

const ProductSelection = ({ products, selectedProducts, onProductAdd }) => {
    return (
        <>
            <Heading size="md" color='secondaryGray.900'>1. 상품 선택</Heading>
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


export default EstimateForm;