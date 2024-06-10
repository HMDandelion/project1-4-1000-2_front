import {Box} from "@chakra-ui/react";
import React, {useState} from "react";

function SearchRadioButton({isChecked, setIsChecked, text}) {

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <Box
                as="button"
                px="20px"
                py="8px"
                bg={isChecked && "secondaryGray.600"}
                display="flex"
                whiteSpace='nowrap'
                borderRadius="3xl"
                borderWidth="1px"
                fontSize='14px'
                fontWeight='600'
                color={isChecked ? "secondaryGray.300" : "secondaryGray.600"}
                borderColor={isChecked ? "secondaryGray.400" : "secondaryGray.200"}
                onClick={toggleCheck}
                _hover={{ borderColor: "secondaryGray.400" }}
                transition="color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease"
            >
                {text}
            </Box>
        </>
    );
}

export default SearchRadioButton;