import {IconButton, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import React, {useState} from "react";

function SelectMenu({onSearch, menuList}) {
    const [selectedOption, setSelectedOption] = useState(menuList[0]);
    const [searchText, setSearchText] = useState('');

    const handleSearchClick = () => {
        onSearch(selectedOption, searchText);
    };

    return (
        <>
            <InputGroup>
                <InputLeftAddon borderRadius='30px'>
                    <Menu>
                        <MenuButton fontWeight='600' fontSize='14px' color='secondaryGray.600'>
                            {selectedOption}
                            {menuList.length > 1 && <ChevronDownIcon ml='5px'/>}
                        </MenuButton>
                        {
                            menuList.length > 1 &&
                            <MenuList>
                                {
                                    menuList.map( menu =>
                                        <MenuItem fontWeight='600' fontSize='14px' color='secondaryGray.600'
                                                  onClick={() => setSelectedOption(menu)}>{menu}</MenuItem>
                                    )
                                }
                            </MenuList>
                        }
                    </Menu>
                </InputLeftAddon>
                <Input placeholder='검색어 입력' onChange={e => setSearchText(e.target.value)}
                       variant='outline' bg='secondaryGray.300' borderRadius='30px' w='200px' />
                <IconButton aria-label='Search database' icon={<SearchIcon />}
                            onClick={handleSearchClick}
                            ml='5px' bg='secondaryGray.300'/>
            </InputGroup>
        </>
    );
}

export default SelectMenu;