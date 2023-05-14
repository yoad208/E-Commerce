import React, {FC} from "react";
import {Box, BoxProps, Button, Divider, Heading, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import categories from "../../../json/categories.json";
import {useUrlParams} from "../../../hooks/useUrlParams";
import {useQueryString} from "../../../hooks/useQueryString";

export const StoreShopByCategory: FC<BoxProps> = ({...rest}) => {

    const {query} = useQueryString()
    const [categoryID, setCategoryID] = useUrlParams(
        "categoryID",
        query.get("categoryID") || ""
    )

    return <Box {...rest}>
        <HStack pb={2}>
            <Heading as={'h3'} fontSize={14}>
                Shop By Categories
            </Heading>
            <Spacer/>
            <Button
                size={'xs'}
                colorScheme={'blue'}
                onClick={() => setCategoryID('')}
            >
                Clear
            </Button>
        </HStack>

        <Divider/>
        <Stack spacing={1.5}>
            {categories.map(category => {
                return <Text
                    key={category.categoryID}
                    cursor={"pointer"}
                    fontWeight={"medium"}
                    color={query.get("categoryID") === category.categoryID ? "blackAlpha.800" : "blackAlpha.500"}
                    onClick={() => setCategoryID(category.categoryID)}
                >
                    {category.categoryName.toLowerCase()}
                </Text>
            })}
        </Stack>
    </Box>
}