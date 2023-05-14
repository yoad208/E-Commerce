import './App.css'
import React, {FC} from "react";
import {Box} from "@chakra-ui/react";
import {Routes, Route} from 'react-router-dom'
import {Home} from "./components/pages/Home/home";
import {Layout} from "./components/layout/layout";
import {Settings} from "./components/pages/Settings/settings";
import {Store} from "./components/pages/Store/store";
import {SpecificItem} from "./components/pages/SpecificItem/specificItem";
import {ShoppingCart} from "./components/pages/Cart/shoppingCart";
import {WishList} from "./components/pages/WishList/wishList";


const App: FC = () => {
    return (
        <Box position='relative' minH={'91.5vh'}>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={'/favourites'} element={<WishList/>}/>
                        <Route path={'/shoppingCart'} element={<ShoppingCart/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                        <Route path={'/store'} element={<Store/>}/>
                        <Route path={'/store/item/:id'} element={<SpecificItem/>}/>
                    </Route>
                </Routes>
        </Box>
    )
}

export default App
