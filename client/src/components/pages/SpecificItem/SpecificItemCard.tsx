import {FC, useState} from 'react';
import {ISpecificProduct} from "../../../interfaces/IspecificProduct.interface";
import {Box, Button, Card, CardBody, CardHeader, CardProps, HStack, Image, Stack, Text} from "@chakra-ui/react";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import {ProductTabs} from "./productTabs";
import {FavouritesButton} from "../../customComps/favouritesButton";
import {useShoppingCart} from "../../../hooks/useShoppingCart";
import {v4 as uuidV4} from "uuid";
import {useWishList} from "../../../hooks/useWishList";
import {isAuthenticated} from "react-auth-kit/dist/utils/utils";
import {useToastMessages} from "../../../hooks/useToastMessages";
import {useAuthUser, useIsAuthenticated} from "react-auth-kit";

interface specificProductCard extends CardProps {
    product: ISpecificProduct
}

export const SpecificItemCard: FC<specificProductCard> = ({product, ...rest}) => {

    const [selectedColor, setSelectedColor] = useState( product.colors[0] || '')
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] ||'')
    const {addToCart} = useShoppingCart()
    const {wishListData, addToWishList, deleteFromWishList} = useWishList()
    const {ErrorToast} = useToastMessages()
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()

    const handleAddToCart = () => {
        if (!isAuthenticated()) return ErrorToast('You must be logged in to add to cart')
        if (selectedColor !== undefined && selectedSize !== undefined) {
            addToCart({
                id: uuidV4(),
                userID: auth()?.id,
                productID: product?.id,
                color: selectedColor,
                size: selectedSize,
                quantity: 1,
                isChecked: false
            })
        }
    }

    const handleFavorites = () => {
        if (!isAuthenticated()) return ErrorToast('You must be logged in to add to favorites')
        let existingItem = wishListData?.find(i => i.productID === product.id)
        if (existingItem) return deleteFromWishList(existingItem.id)
        return addToWishList({
            id: uuidV4(),
            userID: auth()?.id,
            productID: product.id,
            color: product.colors[0],
            size: product.sizes[0]
        })
    }

    return <Card {...rest}>
        <CardHeader>
            <Image w={"full"} h={450} maxW={'100%'} objectFit={'cover'} src={product?.picture} alt="image"/>
        </CardHeader>
        <CardBody>
            <Stack flexDir={"column"}>
                <Text fontSize={20}>
                    {product?.productName}
                </Text>

                <HStack spacing={0}>
                    {Array.from({length: product?.rating},
                        (_, i) => i + 1).map((i) => (
                        <Icon key={i} color={"gold"} as={AiFillStar}/>
                    ))}
                </HStack>

                {/*<Text><b>availability:</b> ({product?.inStock ? "in-stock" : "out-of-stock"})</Text>*/}

                <Text fontWeight={"extrabold"} fontSize={20}>
                    {formatCurrency(product?.price)}
                </Text>

                {product?.colors.length > 0 && <Text>colors:</Text>}
                <HStack>
                    {product?.colors.map((color) => (
                        <Box
                            key={color}
                            p={1}
                            borderWidth={color === selectedColor ? 1 : 0}
                            borderColor={"blue"}
                            rounded={"full"}
                            shadow={"md"}
                            _hover={{shadow: "inner"}}
                            cursor={'pointer'}
                            onClick={() => setSelectedColor(color)}
                        >
                            <Box
                                bg={color}
                                w={'1.5rem'}
                                h={'1.5rem'}
                                rounded={"full"}
                            />
                        </Box>
                    ))}
                </HStack>

                {product?.sizes.length > 0 && <Text>sizes:</Text>}
                <HStack>
                    {product?.sizes.map((size) => (
                        <Box
                            key={size}
                            py={2}
                            borderWidth={size === selectedSize ? 1 : 0}
                            borderColor={"blue"}
                            w={'2.5rem'}
                            rounded={"full"}
                            shadow={"md"}
                            _hover={{shadow: "inner"}}
                            textAlign={'center'}
                            cursor={'pointer'}
                            onClick={() => setSelectedSize(size)}
                        >
                            <Text
                                fontSize={14}
                                fontWeight={'bold'}
                                color={'gray.500'}
                            >
                                {size.toUpperCase()}
                            </Text>
                        </Box>
                    ))}
                </HStack>

                <HStack pt={5}>
                    <Button
                        children={'ADD TO CART'}
                        color={"white"}
                        bg={'blackAlpha.800'}
                        _hover={{bg: 'blackAlpha.700'}}
                        w={'full'}
                        maxW={'80%'}
                        onClick={handleAddToCart}
                    />
                    <FavouritesButton
                        icon={AiFillHeart}
                        fontSize={28}
                        cursor={'pointer'}
                        color={wishListData?.find(i => i.productID === product.id) ? 'blackAlpha.900' : 'blackAlpha.300'}
                        onClick={handleFavorites}
                    />
                </HStack>
                <ProductTabs product={product}/>
            </Stack>
        </CardBody>
    </Card>
}
