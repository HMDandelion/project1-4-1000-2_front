// Chakra imports
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React, {useState} from "react";
import Footer from "../components/footer/FooterAuth";
// Custom components
import {NavLink, Outlet} from "react-router-dom";
// Assets
import { FaChevronLeft } from "react-icons/fa";

function AuthLayout() {

    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <Flex position='relative' h='max-content'>
            <Flex
                h={{
                    sm: "initial",
                    md: "unset",
                    lg: "100vh",
                    xl: "97vh",
                }}
                w='100%'
                maxW={{ md: "66%", lg: "1313px" }}
                mx='auto'
                pt={{ sm: "50px", md: "0px" }}
                px={{ lg: "30px", xl: "0px" }}
                ps={{ xl: "70px" }}
                justifyContent='start'
                direction='column'>

                <Outlet/>
                <Box
                    display={{ base: "none", md: "block" }}
                    h='100%'
                    minH='100vh'
                    w={{ lg: "50vw", "2xl": "44vw" }}
                    position='absolute'
                    right='0px'>
                    <Flex
                        bg={`url(https://static.vecteezy.com/system/resources/previews/015/396/178/non_2x/dark-background-with-futuristic-orange-lines-color-combination-vector.jpg)`}
                        justify='center'
                        align='end'
                        w='100%'
                        h='100%'
                        bgSize='cover'
                        bgPosition='50%'
                        position='absolute'
                        borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}>
                    </Flex>
                </Box>
                <Footer />
            </Flex>
        </Flex>
    );
}

export default AuthLayout;