import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Box, Button, Grid, GridItem, useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";
import {WarningIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";


function DeleteAlertButton({code, deleteAPI}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(deleteAPI({code}));
        onClose();
    }

    return (
        <>
            <Button colorScheme='blackAlpha' size='xs' ml='5px' onClick={onOpen}>
                삭제
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
                                    정말로 삭제하시겠습니까?
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

export default DeleteAlertButton;