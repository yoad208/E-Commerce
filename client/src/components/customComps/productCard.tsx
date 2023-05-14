import React, {FC, useEffect} from "react";
import {IProducts} from "../../interfaces/Iproducts.interface";
import {useNavigate} from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    CardProps,
    HStack,
    Image, Spacer,
    Stack,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import {slicingFormat} from "../../utilities/stringSlicingFormat";
import {formatCurrency} from "../../utilities/formatCurrency";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import {FavouritesButton} from "./favouritesButton";
import {useProducts} from "../../hooks/useProducts";
import {useWishList} from "../../hooks/useWishList";
import {v4 as uuidV4} from "uuid";
import {IWishListItem} from "../../interfaces/IWishList.interface";

interface cardProps extends CardProps {
    product: IProducts
}

export const ProductCard: FC<cardProps> = ({product, ...rest}) => {

    const navigate = useNavigate()
    const [isLargerThen480] = useMediaQuery('(min-width: 480px)')
    const {
        deleteFromWishList,
        addToWishList,
        wishListData
    } = useWishList()

    const {updateSpecificProduct} = useProducts()

    const item = wishListData?.find(item =>
        item.productID === product.id
    )

    const navigateToCurrentPage = () => navigate(`/store/item/${product.id}`)
    const handleFavorites = (item: IWishListItem) => {
        if (item) {
            updateSpecificProduct({...product, isFav: false})
            return deleteFromWishList(item.id)
        } else {
            updateSpecificProduct({...product, isFav: true})
            return addToWishList({
                id: uuidV4(),
                productID: product.id,
                color: product.colors[0],
                size: product.sizes[0]
            })
        }
    }

    return <Card {...rest}>
        <CardHeader pos={"relative"} p={0}>
            <Image
                borderRadius={'md'}
                objectPosition={'center'}
                objectFit={'cover'}
                src={product.picture}
                alt={product.productName}
            />
            <Text
                color={'blackAlpha.600'}
                fontSize={14}
                cursor={"pointer"}
                _hover={{transition: '.5s', color: 'blackAlpha.700'}}
                onClick={navigateToCurrentPage}
            >
                {slicingFormat(product.productName, 0, (isLargerThen480 ? 20 : 16))}
            </Text>
            <FavouritesButton
                pos={"absolute"}
                top={1}
                right={1}
                cursor={"pointer"}
                color={product.isFav ? "black" : "blackAlpha.400"}
                icon={AiFillHeart}
                onClick={() => handleFavorites(item as IWishListItem)}
            />
        </CardHeader>
        <CardBody px={1} py={0}>
            <Stack>
                <HStack>
                    <Text fontWeight={'bold'}>{formatCurrency(product.price)}</Text>
                    <Spacer/>
                    <HStack spacing={0}>
                        {Array.from({length: product.rating},
                            (_, i) => i + 1).map((i) => (
                            <Icon key={i} color={"gold"} as={AiFillStar}/>
                        ))}
                    </HStack>
                </HStack>
            </Stack>
        </CardBody>
    </Card>;

}
