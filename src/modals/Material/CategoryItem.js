import React from "react";
import {Box, Button, Flex, Text} from '@chakra-ui/react';
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {callMaterialCateDeleteAPI} from "../../apis/MaterialSpecAPICalls";

function CategoryItem({category}) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        let code = category.code;
        console.log(code);
        dispatch(callMaterialCateDeleteAPI({code}));
    };
    return (
        <Box p={2} borderWidth={1} borderRadius="md" boxShadow="md" mb={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Text ml={3}>{category.name}</Text>
                <Button onClick={onClickHandler}><DeleteIcon color="red.500" /></Button>
            </Flex>
        </Box>
    );
}
export default CategoryItem;