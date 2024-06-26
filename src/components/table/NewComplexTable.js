import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue, Button,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Card from "../card/Card";
import {useNavigate} from "react-router-dom";

export default function ComplexTable({columnsData, tableData, tableTitle, onRowClick}) {

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{sm: "scroll", lg: "hidden"}}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    {tableTitle && tableTitle}
                </Text>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{sm: "10px", lg: "12px"}}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index} onClick={() => onRowClick(row)}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{sm: "14px"}}
                                            maxH='30px !important'
                                            py='8px'
                                            minW={{sm: "150px", md: "200px", lg: "auto"}}
                                            borderColor='transparent'>
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.render("Cell")}
                                            </Text>
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}
