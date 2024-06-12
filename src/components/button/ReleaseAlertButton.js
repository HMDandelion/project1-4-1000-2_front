import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Box, Button, Grid, GridItem, useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useRef} from "react";
import {WarningIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {callReleaseAPI, callReleaseOrdersAPI} from "../../apis/ReleaseAPICalls";
import {statusToastAlert} from "../../utils/ToastUtils";
import {useNavigate} from "react-router-dom";
import {callWarehousesAPI} from "../../apis/WarehouseAPICalls";


function ReleaseAlertButton({orders,isOpen, leastDestructiveRef,onClose,currentOrderPage,order}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(callReleaseOrdersAPI({currentPage:currentOrderPage}));
    // }, [orders]);

    //출고 확인 후 핸들러
    const onClickHandler = () => {
        dispatch(callReleaseAPI({
            onSuccess: () => {
                const title = '출고 완료';
                const desc = '출고가 완료 되었습니다.';
                statusToastAlert(title, desc, 'success');
                dispatch(callReleaseOrdersAPI({currentPage:currentOrderPage}));
            },
            orderCode: order.orderCode
        }));
        onClose();
    };

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={leastDestructiveRef}
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
                                    <WarningIcon color='red' />
                                </Box>
                            </GridItem>
                            <GridItem colSpan={4} color='secondaryGray.900'>
                                <AlertDialogHeader fontSize='lg' fontWeight='800' p='40px 0 5px'>
                                    정말로 출고하시겠습니까?
                                </AlertDialogHeader>
                                <AlertDialogBody p='0'>
                                    이 작업은 되돌릴 수 없습니다.
                                </AlertDialogBody>
                            </GridItem>
                        </Grid>
                        <AlertDialogFooter>
                            <Button ref={leastDestructiveRef} onClick={onClose}>
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

export default ReleaseAlertButton;