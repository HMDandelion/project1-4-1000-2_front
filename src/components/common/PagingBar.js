import React, {useState} from 'react';
import { Box, Button, IconButton, Text, Input, Flex } from '@chakra-ui/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowBackIcon,
    ArrowForwardIcon
} from '@chakra-ui/icons';


function PagingBar({pageInfo, setCurrentPage}) {
    const { currentPage, startPage, endPage, maxPage } = pageInfo;
    const [inputPage, setInputPage] = useState(currentPage);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value !== '') {
            setInputPage(parseInt(value, 10));
        }
    };

    const handleInputConfirm = () => {
        if(inputPage > maxPage) setInputPage(maxPage);
        else if(inputPage < 1) setInputPage(1);
        setCurrentPage(inputPage);
    };


    return (
        <Flex alignItems="center" justifyContent="center" my={4}>
            <IconButton
                icon={<ArrowBackIcon />}
                size='sm'
                onClick={() => {
                    setCurrentPage(1);
                    setInputPage(1);
                }}
                aria-label="First Page"
                variant="ghost"
                isDisabled={currentPage <= 1}
            />
            <IconButton
                icon={<ChevronLeftIcon />}
                onClick={ () => {
                    setCurrentPage(currentPage - 1);
                    setInputPage(currentPage - 1);
                } }
                aria-label="Previous Page"
                variant="ghost"
                isDisabled={currentPage <= 1}
            />
            <Flex alignItems="center" mx={2}>
                <Input
                    width="50px"
                    size='sm'
                    textAlign="center"
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleInputConfirm()}
                    onBlur={handleInputConfirm}
                />
                <Text mx={2}>/ {maxPage} 페이지</Text>
            </Flex>
            <IconButton
                icon={<ChevronRightIcon />}
                onClick={ () => {
                    setCurrentPage(currentPage + 1);
                    setInputPage(currentPage + 1);
                } }
                aria-label="Next Page"
                variant="ghost"
                isDisabled={currentPage >= maxPage}
            />
            <IconButton
                icon={<ArrowForwardIcon />}
                size='sm'
                onClick={ () => {
                    setCurrentPage(maxPage);
                    setInputPage(maxPage);
                }}
                aria-label="Last Page"
                variant="ghost"
                isDisabled={currentPage >= maxPage}
            />
        </Flex>
    );


}

export default PagingBar;