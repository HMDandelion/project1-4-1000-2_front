import React from "react";

// Chakra imports
import {Flex, useColorModeValue} from "@chakra-ui/react";

// Custom components
import {RocketIcon} from "./icons/Icons";

export function SidebarBrand() {
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex align='center' direction='column'>
            <RocketIcon h='26px' w='175px' my='32px' color={logoColor} />
        </Flex>
    );
}

export default SidebarBrand;
