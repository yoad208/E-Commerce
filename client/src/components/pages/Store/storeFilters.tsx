import React, {FC, useEffect, useMemo, useState} from 'react';
import {
    Box, BoxProps, Button,
    Divider,
    Heading, HStack,
    Input,
    InputGroup,
    InputLeftElement, Radio, RadioGroup, Spacer,
    Stack,
    Text,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {useUrlParams} from "../../../hooks/useUrlParams";
import {Icon} from "@chakra-ui/icons";
import {AiFillStar} from "react-icons/all";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {useQueryString} from "../../../hooks/useQueryString";

const FilterByAvailability = () => {


    const {query} = useQueryString()

    const [inStockParam, setInStockParam] = useUrlParams(
        "inStock",
        query.get("inStock") || ""
    )
    const handleChange = (e: string) => {
        setInStockParam(e)
    }

    return <>
        <HStack pt={5} pb={2}>
            <Text
                as={'h3'}
                fontSize={'sm'}
                fontWeight={"bold"}
            >
                Availability
            </Text>
            <Spacer/>
            <Button
                size={'xs'}
                colorScheme={'blue'}
                onClick={() => setInStockParam("")}
            >
                clear
            </Button>
        </HStack>
        <RadioGroup onChange={handleChange} value={inStockParam}>
            <Stack>
                <Radio value='1'>
                    In stock
                </Radio>
                <Radio value='0'>
                    Out of stock
                </Radio>
            </Stack>
        </RadioGroup>
    </>
}

function FilterByPrice() {

    const {query} = useQueryString()

    const [minPrice, setMinPrice] = useUrlParams(
        "minPrice",
        query.get("minPrice") || ""
    )
    const [maxPrice, setMaxPrice] = useUrlParams(
        "maxPrice",
        query.get("maxPrice") || ""
    )


    return <>
        <Text as={'h3'} pt={5} pb={2} fontSize={'sm'} fontWeight={"bold"}>Price</Text>
        <Stack>
            <InputGroup>
                <Input
                    type={"number"}
                    placeholder={'from'}
                    onChange={e => {
                        setTimeout(() => {
                            setMinPrice(e.target.value)
                        }, 1000)
                    }}
                />
                <InputLeftElement>
                    $
                </InputLeftElement>
            </InputGroup>
            <InputGroup>
                <Input
                    type={"number"}
                    placeholder={'to'}
                    onChange={e => {
                        setTimeout(() => {
                            setMaxPrice(e.target.value)
                        }, 1000)
                    }}
                />
                <InputLeftElement>
                    $
                </InputLeftElement>
            </InputGroup>
        </Stack>
    </>
}

function FilterByColor() {

    const {query} = useQueryString()
    const {productsArray} = useProducts()
    const [allColors, setAllColors] = useState<string[]>([])
    const [colorsArray, setColorsArray] = useState<string[]>((
        query.get("colors")?.split('-') || [])
    )
    const [colorsParams, setColorsParams] = useUrlParams(
        "colors",
        query.get("colors") || ""
    )

    useEffect(() => {
        setColorsParams(colorsArray.toString().replaceAll(',', '-'))
    }, [colorsArray])

    useMemo(() => {
        (productsArray || []).map((PRC: IProducts) => {
            PRC.colors?.map(color => {
                if (allColors.find(c => c === color)) return allColors
                if (!allColors.find(c => c === color)) {
                    setAllColors([...allColors, color])
                }
            })
        })
    }, [(productsArray || []).keys()])

    const setChoosingColors = (color: string) => {
        if (colorsArray.find(c => c === color)) {
            setColorsArray(colorsArray.filter(c => c !== color))
        } else {
            setColorsArray([...colorsArray, color])
        }
    }

    return <>
        <Text as={'h3'} pt={5} pb={2} fontSize={'sm'} fontWeight={"bold"}>Colors</Text>
        <Wrap>
            {allColors.map(color => {
                return <WrapItem
                    key={color}
                    p={'2px'}
                    rounded={"full"}
                    borderWidth={1}
                    borderColor={colorsArray.find(c => c === color) ? 'black' : 'whitesmoke'}
                >
                    <Box
                        bg={color.toLowerCase()}
                        p={2}
                        rounded={"full"}
                        onClick={() => setChoosingColors(color)}
                    />
                </WrapItem>
            })}
        </Wrap>
    </>
}

function FilterBySize() {

    const {query} = useQueryString()
    const {productsArray} = useProducts()
    const [allSizes, setAllSizes] = useState<string[]>([])
    const [sizesArray, setSizesArray] = useState<string[]>(
        (query.get("sizes")?.split('-') || [])
    )
    const [sizesParams, setSizesParams] = useUrlParams(
        "sizes",
        query.get("sizes") || ""
    )

    useEffect(() => {
        setSizesParams(sizesArray.toString().replaceAll(',', '-'))
    }, [sizesArray])

    useMemo(() => {
        (productsArray || []).map((PRS: IProducts) => {
            PRS.sizes?.map(size => {
                if (allSizes.find(s => s === size)) return allSizes
                if (!allSizes.find(s => s === size)) {
                    setAllSizes([...allSizes, size])
                }
            })
        })
    }, [(productsArray || []).keys()])

    const setChoosingSizes = (size: string) => {
        if (sizesArray.find(s => s === size)) {
            setSizesArray(sizesArray.filter(s => s !== size))
        } else {
            setSizesArray([...sizesArray, size])
        }
    }

    return <>
        <Text as={'h3'} pt={5} pb={2} fontSize={'sm'} fontWeight={"bold"}>Sizes</Text>
        <Wrap pb={1}>
            {allSizes.map(size => {
                return <WrapItem
                    key={size}
                    cursor={"pointer"}
                    w={'15%'}
                    borderWidth={1}
                    bg={sizesArray.find(s => s === size) ? 'black' : 'white'}
                    color={!sizesArray.find(s => s === size) ? 'black' : "whitesmoke"}
                    rounded={"xl"}
                >
                    <Text
                        fontSize={12}
                        p={1}
                        w={"full"}
                        textAlign={'center'}
                        onClick={() => setChoosingSizes(size)}
                    >
                        {size.toUpperCase()}
                    </Text>
                </WrapItem>
            })}
        </Wrap>
    </>
}

function FilterByRating() {
    const {query} = useQueryString()
    const [ratingParams, setRatingParams] = useUrlParams(
        "rating",
        query.get("rating") || ""
    )

    return <>
        <HStack pt={5} pb={2}>
            <Text
                as={'h3'}
                fontSize={'sm'}
                fontWeight={"bold"}
            >
                Rating
            </Text>
            <Spacer/>
            <Button
                size={'xs'}
                colorScheme={'blue'}
                onClick={() => setRatingParams("")}
            >
                clear
            </Button>
        </HStack>
        <HStack>
            {Array.from({length: 5}).map((_, i) => (
                <Icon
                    key={i}
                    fontSize={"25px"}
                    color={ratingParams && i <= parseInt(ratingParams) - 1
                        ? "gold"
                        : "blackAlpha.200"}
                    onClick={() => setRatingParams((i + 1).toString())}
                    as={AiFillStar}
                />
            ))}
        </HStack>
    </>
}

export const StoreFilters: FC<BoxProps> = ({...rest}) => {

    return <Box {...rest}>
        <Heading
            as={'h3'}
            pb={2}
            fontSize={14}
        >
            Filter By
        </Heading>

        <Divider/>

        <FilterByAvailability/>

        <FilterByRating/>

        <FilterByPrice/>

        <FilterByColor/>

        <FilterBySize/>
    </Box>
}

export default StoreFilters;
