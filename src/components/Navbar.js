// Chakra Imports
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link as ChakraLink, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import NavbarLinks from "./NavbarLinks";
import {useLocation, Link as ReactRouterLink} from "react-router-dom";

export default function Navbar(props) {
    const [ scrolled, setScrolled ] = useState(false);
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(x => x);

    useEffect(() => {
        window.addEventListener('scroll', changeNavbar);

        return () => {
            window.removeEventListener('scroll', changeNavbar);
        };
    });

    const { secondary, message, brandText } = props;

    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useColorModeValue('navy.700', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');
    let navbarPosition = 'fixed';
    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(20px)';
    let navbarShadow = 'none';
    let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let paddingX = '15px';
    let gap = '0px';
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // 메뉴와 서브메뉴 매핑
    const menuMap = {
        sales: { label: '영업·판매', isLast: false },
            client: { label: '거래처 관리', isLast: false },
            estimate: { label: '견적 관리', isLast: false },
            order: { label: '주문 관리', isLast: false },
            return: { label: '반품 관리', isLast: false },

        production: { label: '생산·품질', isLast: false },
        usage:{label:'사용 관리', isLast: false},
        logistics: { label: '재고·유통', isLast: false },

        detail: { label: '상세 조회', isLast: true },

        material: {label: '원자재', isLast: false},
            inventory:{label: '재고·유통', isLast: false},
            specs:{label: '스펙 관리', isLast:false},
            stocks:{label:'재고 관리', isLast: false},
            "in-stock":{label:'입고', isLast:false},
            analyze:{label:'분석', isLast: false},

        purchase:{label:'구매·발주',isLast:false},
            orders:{label:'주문 관리', isLast:false},
            clients:{label:'공급업체 관리', isLast:false},


    };

    const getPageTitle = (pathName) => {
        for (let i = pathName.length - 1; i >= 0; i--) {
            const part = pathName[i];
            if (menuMap[part] && !menuMap[part].isLast) {
                return menuMap[part].label;
            }
        }
        return null;
    }

    return (
        <Box
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            backgroundPosition='center'
            backgroundSize='cover'
            borderRadius='16px'
            borderWidth='1.5px'
            borderStyle='solid'
            transitionDelay='0s, 0s, 0s, 0s'
            transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
            transition-property='box-shadow, background-color, filter, border'
            transitionTimingFunction='linear, linear, linear, linear'
            alignItems={{ xl: 'center' }}
            display={secondary ? 'block' : 'flex'}
            minH='75px'
            justifyContent={{ xl: 'center' }}
            lineHeight='25.6px'
            mx='auto'
            mt={secondaryMargin}
            pb='8px'
            right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
            px={{
                sm: paddingX,
                md: '10px'
            }}
            ps={{
                xl: '12px'
            }}
            pt='8px'
            top={{ base: '12px', md: '16px', lg: '20px', xl: '20px' }}
            w={{
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)'
            }}>
            <Flex
                w='100%'
                flexDirection={{
                    sm: 'column',
                    md: 'row'
                }}
                alignItems={{ xl: 'center' }}
                mb={gap}>
                <Box mb={{ sm: '8px', md: '0px' }}>
                    <Breadcrumb>
                        <BreadcrumbItem key="/" color={secondaryText} fontSize='sm' mb='5px'>
                            <ChakraLink as={ReactRouterLink} to="/">
                                메인 대시보드
                            </ChakraLink>
                        </BreadcrumbItem>
                        {pathNames.map((segment, index) => {
                            const to = `/${pathNames.slice(0, index + 1).join('/')}`;
                            const isLastSegment = index === pathNames.length - 1;

                            if (index === 0 && segment === "") {
                                return null;
                            }
                            const label = menuMap[segment]?.label;
                            return (
                                <BreadcrumbItem key={to} color={secondaryText} fontSize='sm' mb='5px'>
                                    <ChakraLink as={ReactRouterLink} to={to}>
                                        {label || segment}
                                    </ChakraLink>
                                    {!isLastSegment && ' / '}
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>

                    <ChakraLink
                        color={mainText}
                        href='#'
                        bg='inherit'
                        borderRadius='inherit'
                        fontWeight='bold'
                        fontSize='34px'
                        _hover={{ color: { mainText } }}
                        _active={{
                            bg: 'inherit',
                            transform: 'none',
                            borderColor: 'transparent'
                        }}
                        _focus={{
                            boxShadow: 'none'
                        }}>
                        {getPageTitle(pathNames)}
                    </ChakraLink>
                </Box>
                <Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
                    <NavbarLinks
                        onOpen={props.onOpen}
                        logoText={props.logoText}
                        secondary={props.secondary}
                        fixed={props.fixed}
                        scrolled={scrolled}
                    />
                </Box>
            </Flex>
            {secondary ? <Text color='white'>{message}</Text> : null}
        </Box>
    );
}

Navbar.propTypes = {
    brandText: PropTypes.string,
    variant: PropTypes.string,
    secondary: PropTypes.bool,
    fixed: PropTypes.bool,
    onOpen: PropTypes.func
};
