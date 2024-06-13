import {
    Box, Button, Center, Divider, Flex, FormControl, Grid, GridItem,
    Heading, HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement, ModalHeader, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger,
    Radio,
    RadioGroup, Select,
    Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AddIcon, MinusIcon, SearchIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import {useDispatch, useSelector} from "react-redux";
import {callSimpleSalesClientsAPI} from "../../../apis/ClientAPICalls";
import ClientSelectForm from "./ClientSelectForm";
import PriceAndQuantityForm from "./PriceAndQuantityForm";
import ProductSelectForm from "./ProductSelectForm";
import {callSimpleProductsAPI} from "../../../apis/ProductAPICalls";

function EstimateForm({handleClientType, handleNewClient, handleExistingClient, handleSelectedProducts}) {
    const dispatch = useDispatch();

    const [selectedProducts, setSelectedProducts] = useState([]);

    const { simpleProducts: products } = useSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(callSimpleProductsAPI());
    }, []);

    useEffect(() => handleSelectedProducts(selectedProducts), [selectedProducts]);

    const handleProductAdd = (product) => {
        if (!selectedProducts.includes(product)) {
            setSelectedProducts([
                ...selectedProducts,
                { ...product, estimatePrice: product.price, quantity: 1 }
            ]);
        }
    };

    const handleProductRemove = (productCode) => {
        setSelectedProducts(selectedProducts.filter(p => p.productCode !== productCode));
    };

    const handleQuantityChange = (product, quantity) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.productCode === product.productCode ? { ...p, quantity: parseInt(quantity, 10) } : p))
        );
    };

    const handlePriceChange = (product, price) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.productCode === product.productCode ? { ...p, estimatePrice: parseInt(price, 10) } : p))
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
                    <ClientSelectForm
                        handleClientType={handleClientType}
                        handleNewClient={handleNewClient}
                        handleExistingClient={handleExistingClient}
                    />
                </GridItem>
                <Divider my='20px'/>
                <GridItem>
                    <ProductSelectForm
                        products={products}
                        selectedProducts={selectedProducts}
                        onProductAdd={handleProductAdd}
                    />
                </GridItem>
                <Divider my='20px'/>
                <GridItem>
                    <PriceAndQuantityForm
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

export default EstimateForm;