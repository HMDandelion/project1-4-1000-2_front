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
import {callOrderCancelAPI} from "../../apis/OrderAPICalls";

function OrderCancelButton({isPossible, code, cancelAPI}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(cancelAPI({code}));
        onClose();
    }

    return (
        <>
            <Button colorScheme='orange' size='sm' isDisabled={!isPossible} onClick={onOpen}>
                취소하기
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
                                <Box mt='40px' ml='40px' p='15px 20px' borderRadius='14px' bg='red.100'>
                                    <WarningIcon color='red'/>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={4} color='secondaryGray.900'>
                                <AlertDialogHeader fontSize='lg' fontWeight='800'  p='40px 0 5px'>
                                    해당 건을 취소하시겠습니까?
                                </AlertDialogHeader>
                                <AlertDialogBody p='0'>
                                    이 작업은 되돌릴 수 없습니다.
                                </AlertDialogBody>
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

export default OrderCancelButton;