import {IconButton, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import React, {useState} from "react";

function SelectMenu({selectedOption, setSelectedOption, menuList}) {
    const handleMenuItemClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <InputGroup>
                <InputLeftAddon borderRadius='30px'>
                    <Menu>
                        <MenuButton fontWeight='600' fontSize='14px' color='secondaryGray.600'>
                            {selectedOption}<ChevronDownIcon ml='5px'/>
                        </MenuButton>
                        <MenuList>
                            {
                                 menuList && menuList.map( menu =>
                                    <MenuItem fontWeight='600' fontSize='14px' color='secondaryGray.600'
                                              onClick={() => handleMenuItemClick(menu)}>{menu}</MenuItem>
                                )
                            }
                        </MenuList>
                    </Menu>
                </InputLeftAddon>
                <Input borderRadius='30px' w='200px' variant='outline' placeholder='검색어 입력' bg='secondaryGray.300'/>
                <IconButton aria-label='Search database' icon={<SearchIcon />} ml='5px' bg='secondaryGray.300'/>
            </InputGroup>
        </>
    );
}

export default SelectMenu;