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
import {FaTruck} from "react-icons/fa";


function SidebarContent(props) {
    const activeColor = useColorModeValue("orange.400", "white");
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
                    {/* 재고 유통 */}
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor} isExpanded={activeIndex === 1}>
                            <h2>
                                <AccordionButton onClick={() => handleAccordionClick(1)} color={activeIndex === 1 ? activeColor : inactiveColor}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight="bold"
                                            color={inactiveColor}
                                            mx="auto"
                                            pt="4px"
                                            pb="4px"
                                        >
                                            <GlobeIcon h="24px" w="24px" pr="5px" />
                                            재고·유통
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                        <Accordion allowToggle>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box flex="1" textAlign="left">원자재</Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/material/in-stock"
                                                                _activeLink={{color: activeColor}}>
                                                                입고
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/material/analyze"
                                                                _activeLink={{color: activeColor}}>
                                                                분석
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/material/specs"
                                                                _activeLink={{color: activeColor}}>
                                                                스펙관리
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/material/stocks"
                                                                _activeLink={{color: activeColor}}>
                                                                재고관리
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                </AccordionPanel>
                                            </AccordionItem>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box flex="1" textAlign="left">재고</Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/product"
                                                                _activeLink={{ color: activeColor }}
                                                            >
                                                                재고·상품
                                                            </Link>
                                                        </ListItem>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/inventory/warehouse"
                                                                _activeLink={{ color: activeColor }}
                                                            >
                                                                창고
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                </AccordionPanel>
                                            </AccordionItem>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box flex="1" textAlign="left">
                                                            유통
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <UnorderedList>
                                                        <ListItem>
                                                            <Link
                                                                as={NavLink}
                                                                to="/circulation/release"
                                                                _activeLink={{ color: activeColor }}
                                                            >
                                                                출고
                                                            </Link>
                                                        </ListItem>
                                                    </UnorderedList>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    {/* 영업 판매 */}
                    <Accordion allowToggle>

                        <AccordionItem border="none" color={inactiveColor}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            color={inactiveColor}
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'>
                                            <Link as={NavLink}
                                                  to="/sales"
                                                  _activeLink={{ color: activeColor }}
                                            >
                                                <WalletIcon h='24px' w='24px' pr='5px'/>
                                                영업·판매</Link>
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList listStyleType='none'>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/sales/order"
                                              _activeLink={{color: activeColor}}
                                        >주문 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/sales/return"
                                              _activeLink={{color: activeColor}}
                                        >반품 관리</Link>
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
                    {/* 구매 발주 */}
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            color={inactiveColor}
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'>
                                            <Link as={NavLink}
                                                  to="/123"
                                                  _activeLink={{ color: activeColor }}
                                            >
                                                <CartIcon h='24px' w='24px' pr='5px'/>
                                                구매·발주</Link>
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <UnorderedList>
                                    <Accordion allowToggle>
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex="1" textAlign="left">원자재</Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <UnorderedList>
                                                    <ListItem>
                                                        <Link
                                                            as={NavLink}
                                                            to="/purchase/material/orders"
                                                            _activeLink={{color: activeColor}}>
                                                            주문관리
                                                        </Link>
                                                    </ListItem>
                                                </UnorderedList>
                                                <UnorderedList>
                                                    <ListItem>
                                                        <Link
                                                            as={NavLink}
                                                            to="/purchase/material/clients"
                                                            _activeLink={{color: activeColor}}>
                                                            공급업체 관리
                                                        </Link>
                                                    </ListItem>
                                                </UnorderedList>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    {/* 생산 품질 */}
                    <Accordion allowToggle>
                        <AccordionItem border="none" color={inactiveColor}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Text
                                            fontSize={"md"}
                                            fontWeight='bold'
                                            color={inactiveColor}
                                            mx='auto'
                                            pt='4px'
                                            pb='4px'>
                                            <Link as={NavLink}
                                                  to="/production"
                                                  _activeLink={{ color: activeColor }}
                                            >
                                                <SupportIcon h='24px' w='24px' pr='5px'/>
                                                생산·품질</Link>
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
                                        to="/production/reports"
                                        _activeLink={{color: activeColor}}>
                                        생산 관리</Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link as={NavLink}
                                              to="/production/material/usage"
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
