import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    Button, Divider, Grid, GridItem,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter, ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import PopoverCalendar from "../../../components/calendar/PopoverCalendar";
import {callEstimateModifyAPI} from "../../../apis/EstimateAPICalls";
import ProductSelectForm from "./ProductSelectForm";
import PriceAndQuantityForm from "./PriceAndQuantityForm";
import {callSimpleProductsAPI} from "../../../apis/ProductAPICalls";

function EstimateModify({isOpen, onClose, estimate}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deadline, setDeadline] = useState(estimate.deadline);
    const [selectedProducts, setSelectedProducts] = useState();

    const { success } = useSelector(state => state.estimateReducer);

    useEffect(() => {
        if(success === true) navigate(`/sales/estimate/detail`, {state: estimate.estimateCode});
    }, [success]);

    const { simpleProducts: products } = useSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(callSimpleProductsAPI());
    }, []);

    useEffect(() => {

        if (products && estimate.products) {
            const updatedProducts = estimate.products.map(product => {
                const matchedProduct = products.find(p => p.productCode === product.productCode);
                if (matchedProduct) {
                    return {
                        ...product,
                        estimatePrice: product.price,
                        price: matchedProduct.price
                    };
                }
                return {
                    ...product,
                    estimatePrice: product.price
                };
            });
            setSelectedProducts(updatedProducts);
        }
    }, [products, estimate]);


    const onClickUpdateHandler = () => {
        const form = {};
        form.deadline = deadline;
        form.products = selectedProducts.map(product => ({
            ...product,
            price: product.estimatePrice
        }));

        dispatch(callEstimateModifyAPI({
            estimateCode: estimate.estimateCode,
            estimateRequest : form
        }));
    }

    const onClickCancelHandler = () => {
        onClose();
        setDeadline(estimate.deadline);
        setSelectedProducts(estimate.products.map(product => ({
            ...product,
            estimatePrice: product.price
        })));
    }

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

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => {
            const calculated = product.quantity * product.estimatePrice;
            return total + (isNaN(calculated) ? 0 : calculated);
        }, 0);
    }
    const formatNumber = (number) => new Intl.NumberFormat('ko-KR').format(number);

    return (
            <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='inside'>
                <ModalOverlay/>
                <ModalContent maxW='800px'>
                    <ModalBody>
                        <ModalHeader fontWeight='800' color='secondaryGray.900' px='0'>견적 내용 설정</ModalHeader>
                        <Grid
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(1, 100%)'
                        >
                            <GridItem>
                                {
                                    selectedProducts &&
                                    <ProductSelectForm
                                        products={products}
                                        selectedProducts={selectedProducts}
                                        onProductAdd={handleProductAdd}
                                    />
                                }

                            </GridItem>
                            <Divider my='20px'/>
                            <GridItem>
                                {
                                    selectedProducts &&
                                    <PriceAndQuantityForm
                                        selectedProducts={selectedProducts}
                                        onQuantityChange={handleQuantityChange}
                                        onPriceChange={handlePriceChange}
                                        onProductRemove={handleProductRemove}
                                    />
                                }

                            </GridItem>
                        </Grid>
                    </ModalBody>
                    <ModalFooter justifyContent='space-between'>
                        <Text fontSize='xl' color='secondaryGray.900' fontWeight='700'>
                            견적 총액 {selectedProducts && formatNumber(getTotalPrice(selectedProducts))}원
                        </Text>
                        <HStack>
                            <PopoverCalendar deadline={deadline} handleDeadline={setDeadline}/>
                            <Button colorScheme='orange' mx={1} onClick={onClickUpdateHandler}>수정</Button>
                            <Button variant='outline' mx={1} onClick={onClickCancelHandler}>
                                취소
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    );
}

export default EstimateModify;