import React from "react";

// Chakra imports
import {Flex, Link, useColorModeValue} from "@chakra-ui/react";

// Custom components
import {RocketIcon} from "./icons/Icons";
import {NavLink} from "react-router-dom";

export function SidebarBrand() {
    let logoColor = useColorModeValue("navy.700", "white");

    // 이미지 경로 설정
    const logoSrc = process.env.PUBLIC_URL + "/ilsaheonli.png";  // public 폴더에 있는 경우
    const activeColor = useColorModeValue("orange.400", "white");
    return (
        <Flex align='center' direction='column'>
            <Link
                as={NavLink}
                to="/"
                _activeLink={{ color: activeColor }}
            >
            <img
                src={logoSrc}
                alt="Logo"
                style={{
                    height: '50px',
                    width: '80px',
                    margin: '32px 0',
                    filter: logoColor === "white" ? "invert(1)" : "none"
                }}
            />
            </Link>
        </Flex>
    );
}

export default SidebarBrand;
