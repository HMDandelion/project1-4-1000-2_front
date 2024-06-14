import {
    Button, Center, Divider, Grid, GridItem,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter, ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import ReturnSelectForm from "./ReturnSelectForm";
import ReturnQuantityForm from "./ReturnQuantityForm";
import ReturnTypeForm from "./ReturnTypeForm";
import {callReturnRegistAPI} from "../../../apis/ReturnAPICalls";
import {useDispatch} from "react-redux";

function ReturnRegist({order}) {
    const dispatch = useDispatch();

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
        if(manageType === 'EXCHANGE') form.deadline = deadline;
        form.products = selectedProducts.map(product => ({
            ...product,
            quantity: product.returnQuantity,
            refundPrice: product.price
        }));

        dispatch(callReturnRegistAPI({ returnRequest : form }));
    }

    const onCloseHandler = () => {
        onClose();
        setSelectedProducts([]);
        setManageType('REFUND');
        setDeadline(undefined);
    }

    const handleProductAdd = (product) => {
        if (!selectedProducts.includes(product)) {
            setSelectedProducts([
                ...selectedProducts,
                { ...product, returnQuantity: 1 }
            ]);
        }
    };

    const handleProductRemove = (productCode) => {
        setSelectedProducts(selectedProducts.filter(p => p.productCode !== productCode));
    };

    const handleQuantityChange = (product, quantity) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.productCode === product.productCode ? { ...p, returnQuantity: parseInt(quantity, 10) } : p))
        );
    };

    return (
        <>
            <Button colorScheme='orange' size='sm' onClick={onOpen}>
                반품 접수
            </Button>
            <Modal isOpen={isOpen} onClose={onCloseHandler} size='xl' scrollBehavior='inside'>
                <ModalOverlay/>
                <ModalContent maxW='800px'>
                    <ModalBody>
                        <ModalHeader fontWeight='800' color='secondaryGray.900' px='0'>반품 신청</ModalHeader>
                        <Grid templateColumns='repeat(11, 1fr)' mt={4}>
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
                    <ModalFooter justifyContent='flex-end' borderTop='1px' borderColor='gray.200'>
                        <HStack>
                            <Button colorScheme='orange' mx={1} onClick={onClickRegistHandler}>등록</Button>
                            <Button variant='outline' mx={1} onClick={onCloseHandler}>
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
