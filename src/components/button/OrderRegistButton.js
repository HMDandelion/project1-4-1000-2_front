import {
    AlertDialog, AlertDialogBody,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, Box,
    Button,
    Grid,
    GridItem,
    useDisclosure
} from "@chakra-ui/react";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {WarningIcon} from "@chakra-ui/icons";
import {callOrderRegistAPI} from "../../apis/OrderAPICalls";

function OrderRegistButton({isPossible, estimateCode}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(callOrderRegistAPI({estimateCode}));
        onClose();
    }

    return (
        <>
            <Button colorScheme='orange' size='sm' isDisabled={!isPossible} onClick={onOpen}>
                주문 신청
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <Grid
                            h='100px'
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(5, 1fr)'
                            gap={4}
                        >
                            <GridItem rowSpan={2} colSpan={1}>
                                <Box mt='40px' ml='40px' p='15px 20px' borderRadius='14px' bg='green.100'>
                                    <WarningIcon color='green'/>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={4} color='secondaryGray.900'>
                                <AlertDialogHeader fontSize='lg' fontWeight='800'  p='55px 0 5px'>
                                    해당 견적으로 주문을 신청하시겠습니까?
                                </AlertDialogHeader>
                            </GridItem>
                        </Grid>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                취소
                            </Button>
                            <Button colorScheme='orange' onClick={onClickHandler} ml={3}>
                                확인
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default OrderRegistButton;