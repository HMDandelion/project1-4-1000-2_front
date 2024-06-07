import {NavLink} from "react-router-dom";
// chakra imports
import {
    Accordion,
    AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel,
    Box,
    Flex,
    Link, List, ListItem,
    Stack,
    Text, UnorderedList,
    useColorModeValue
} from "@chakra-ui/react";
// Custom components
import Brand from "./SidebarBrand";
import React, {useState} from "react";
import {CartIcon, GlobeIcon, HomeIcon, RocketIcon, SupportIcon, WalletIcon} from "./icons/Icons";


function SidebarContent(props) {
    const activeColor = useColorModeValue("orange.600", "white");
    const inactiveColor = useColorModeValue(
        "secondaryGray.600",
        "secondaryGray.600"
    );
    const [activeIndex, setActiveIndex] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleAccordionClick = (index) => {
        setActiveIndex(prevIndex => prevIndex === index ? null : index);
        // setIsClicked(!isClicked);
    };

    // SIDEBAR
    return (
        <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
            <Brand />
            <Stack direction='column' mb='auto' mt='8px'>
                <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
                    <Text
                        fontSize={"md"}
                        fontWeight='bold'
                        color={inactiveColor}
                        mx='auto'
                        ps={{
                            sm: "10px",
                            xl: "16px",
                        }}
                        pt='18px'
                        pb='12px'>
                        <Link
                            as={NavLink}
                            to="/"
                            _activeLink={{ color: activeColor }}
                        >
                            <HomeIcon h='24px' w='24px' pr='5px'/>
                            대시보드</Link>
                    </Text>
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor} isExpanded={activeIndex === 1}>
                            <h2>
                                <AccordionButton onClick={() => handleAccordionClick(1)} color={activeIndex === 1 ? activeColor : inactiveColor}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'
                                            color={activeIndex === 1 ? activeColor : inactiveColor}
                                        >
                                                <GlobeIcon h='24px' w='24px' pr='5px'/>
                                                재고·유통
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/123"
                                              _activeLink={{color: activeColor}}
                                        >재고 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/123"
                                              _activeLink={{color: activeColor}}
                                        >유통 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/123"
                                              _activeLink={{color: activeColor}}
                                        >원자재</Link>
                                    </ListItem>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor} isExpanded={activeIndex === 2}>
                            <h2>
                                <AccordionButton onClick={() => handleAccordionClick(2)} color={activeIndex === 2 ? activeColor : inactiveColor}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'
                                            color={activeIndex === 2 ? activeColor : inactiveColor}
                                        >
                                                <WalletIcon h='24px' w='24px' pr='5px'/>
                                                영업·판매
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/sales/order"
                                              _activeLink={{color: activeColor}}
                                        >주문 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/sales/client"
                                              _activeLink={{color: activeColor}}
                                        >거래처 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/sales/estimate"
                                              _activeLink={{color: activeColor}}
                                        >견적 관리</Link>
                                    </ListItem>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor} isExpanded={activeIndex === 3}>
                            <h2>
                                <AccordionButton onClick={() => handleAccordionClick(3)} color={activeIndex === 3 ? activeColor : inactiveColor}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'
                                            color={activeIndex === 3 ? activeColor : inactiveColor}
                                        >
                                            <CartIcon h='24px' w='24px' pr='5px'/>
                                            구매·발주
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/123"
                                              _activeLink={{color: activeColor}}
                                        >원자재 관리</Link>
                                    </ListItem>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor} isExpanded={activeIndex === 4}>
                            <h2>
                                <AccordionButton onClick={() => handleAccordionClick(4)} color={activeIndex === 4 ? activeColor : inactiveColor}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'
                                            color={activeIndex === 4 ? activeColor : inactiveColor}
                                        >
                                                <SupportIcon h='24px' w='24px' pr='5px'/>
                                                생산·품질
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/production/plan"
                                              _activeLink={{color: activeColor}}
                                        >생산 계획 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/production/work-order"
                                              _activeLink={{color: activeColor}}
                                        >작업 지시서 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/123"
                                              _activeLink={{color: activeColor}}
                                        >원자재</Link>
                                    </ListItem>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SidebarContent;
