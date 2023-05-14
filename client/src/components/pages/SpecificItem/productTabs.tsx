import React, {FC, useEffect} from 'react';
import {
    HStack,
    Spacer,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Tbody, Td,
    Text, Th,
    Thead, Tr
} from "@chakra-ui/react";
import {ISpecificProduct} from "../../../interfaces/IspecificProduct.interface";


type TProductTabs = {
    product: ISpecificProduct
}
export const ProductTabs: FC<TProductTabs> = ({product}) => {

    return <Tabs pt={5} maxW={'100$'} size='md' variant='enclosed'>
        <TabList gap={5}>
            <Tab _selected={{ color: 'white', bg: 'blackAlpha.800' }}>Specifications</Tab>
            <Tab _selected={{ color: 'white', bg: 'blackAlpha.800' }}>About</Tab>
            <Tab _selected={{ color: 'white', bg: 'blackAlpha.800' }}>Reviews</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <TableContainer textAlign={"left"}>
                    <Table size={'sm'} variant={'striped'}>
                        <Thead borderBottomWidth={1} borderColor={'blackAlpha.700'}>
                            <Tr>
                                <Th>key</Th>
                                <Th>value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.entries(product?.itemSpecifics)
                                    .map(([key, value]) => (
                                        <Tr key={key}>
                                            <Td fontWeight={'bold'}>{key}</Td>
                                            <Td>{value}</Td>
                                        </Tr>
                                    ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel>
                <p>{product?.description}</p>
            </TabPanel>
            <TabPanel>
                <p>reviews</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
}
