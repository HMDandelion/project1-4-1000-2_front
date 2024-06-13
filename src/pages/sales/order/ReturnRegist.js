import {
    Button, Center, Divider, Grid, GridItem,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter, ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ReturnSelectForm from "./ReturnSelectForm";
import ReturnQuantityForm from "./ReturnQuantityForm";
import ReturnTypeForm from "./ReturnTypeForm";
import PopoverCalendar from "../../../components/calendar/PopoverCalendar";

function ReturnRegist({order}) {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [manageType, setManageType] = useState('REFUND');
    const [deadline, setDeadline] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const { success } = useSelector(state => state.returnReducer);

    const products = order.orderProducts;

    const onClickRegistHandler = () => {
        const form = {};
        form.orderCode = order.orderCode;
        form.manageType = manageType;
        form.products = selectedProducts;
        if(manageType === 'EXCHANGE') form.deadline = deadline;

        //TODO : API Calls
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

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => {
            const calculated = product.quantity * product.price;
            return total + (isNaN(calculated) ? 0 : calculated);
        }, 0);
    }
    const formatNumber = (number) => new Intl.NumberFormat('ko-KR').format(number);

    return (
        <>
            <Button colorScheme='orange' size='sm' onClick={onOpen}>
                반품 접수
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='inside'>
                <ModalOverlay/>
                <ModalContent maxW='800px'>
                    <ModalBody>
                        <ModalHeader fontWeight='800' color='secondaryGray.900' px='0'>반품 신청</ModalHeader>
                        <Grid templateColumns='repeat(11, 1fr)'>
                            <GridItem colSpan={5}>
                                <ReturnTypeForm
                                    manageType={manageType}
                                    setManageType={setManageType}
                                    deadline={deadline}
                                    onDeadlineChange={setDeadline}
                                />
                            </GridItem>
                            <GridItem>
                                <Center height='260px'>
                                    <Divider orientation='vertical'/>
                                </Center>
                            </GridItem>
                            <GridItem colSpan={5}>
                                <ReturnSelectForm
                                    products={products}
                                    selectedProducts={selectedProducts}
                                    onProductAdd={handleProductAdd}
                                />
                            </GridItem>
                        </Grid>
                        <ReturnQuantityForm
                            selectedProducts={selectedProducts}
                            onQuantityChange={handleQuantityChange}
                            onProductRemove={handleProductRemove}
                        />
                    </ModalBody>
                    <ModalFooter justifyContent='space-between'>
                        <Text fontSize='xl' color='secondaryGray.900' fontWeight='700'>
                            견적 총액 {products && formatNumber(getTotalPrice(products))}원
                        </Text>
                        <HStack>
                            <Button colorScheme='orange' mx={1} onClick={onClickRegistHandler}>등록</Button>
                            <Button variant='outline' mx={1} onClick={onClose}>
                                취소
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ReturnRegist;
