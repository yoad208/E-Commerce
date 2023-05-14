import React, {FC} from 'react';
import {Avatar, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {ConnectAccountModal} from "../modals/connectAccountModal";
import {Logout} from "./logout";

export const UserAvatar: FC = () => {
    return <Menu>
        <MenuButton>
            <Avatar size='xs' src='https://bit.ly/broken-link'/>
        </MenuButton>
        <MenuList>
            <MenuItem borderBottomWidth={2} borderBottomColor={'blackAlpha.400'}>
                <ConnectAccountModal/>
            </MenuItem>
            <MenuItem>
                <Logout/>
            </MenuItem>
        </MenuList>
    </Menu>
}