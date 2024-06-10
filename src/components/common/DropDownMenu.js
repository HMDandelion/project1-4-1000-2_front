import {Button, Menu, MenuButton, MenuIcon, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";

function DropDownMenu({setValue, dropDownList}) {
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
            setSelectedOption(dropDownList[0].name);
        },[dropDownList]
    );
    const clickHandler = (drop) => {
        setSelectedOption(drop.name);
        setValue(drop.code);
    };
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}
                        px="20px"
                        py="8px"
                        display="flex"
                        whiteSpace='nowrap'
                        borderRadius="3xl"
                        borderWidth="1px"
                        fontSize='14px'
                        fontWeight='600'
                        color="secondaryGray.600"
                        borderColor="secondaryGray.200">
                {selectedOption}
            </MenuButton>
            <MenuList>
                {dropDownList.map((drop) => (
                    <MenuItem
                        key={drop.code}
                        fontWeight="600"
                        fontSize="14px"
                        color="secondaryGray.600"
                        onClick={() => clickHandler(drop)}
                    >
                        {drop.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
export default DropDownMenu;