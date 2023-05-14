import {Dispatch, FC, FormEvent, useState} from 'react';
import {FormControl, Input, InputGroup, InputRightElement, Stack} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsSearch} from "react-icons/all";
import {useUrlParams} from "../../hooks/useUrlParams";
import {useQueryString} from "../../hooks/useQueryString";

type TSearch = {
    setIsOpen?: Dispatch<boolean>
}

export const Search: FC<TSearch> = ({setIsOpen}) => {
    const {query} = useQueryString()
    const [urlParams, setUrlParams] = useUrlParams("search", query.get("search") || "")
    const [searchParam, setSearchParam] = useState<string>(urlParams)

    const sentSearchParamsToUrl = (e: FormEvent) => {
        e.preventDefault()
        setUrlParams(searchParam)
        setIsOpen && setIsOpen(false)
    }
    return (
        <form onSubmit={sentSearchParamsToUrl}>
            <FormControl>
                <Stack isInline gap={2} align='center'>
                    <InputGroup overflow={"hidden"} color={"black"}>
                        <Input
                            px={2}
                            type='text'
                            variant={'solid'}
                            placeholder={'Search'}
                            defaultValue={searchParam}
                            onChange={e => setSearchParam(e.target.value)}
                        />
                        <InputRightElement
                            bg={"beige"}
                            rounded={'0 8px 8px 0'}
                            cursor={"pointer"}
                            onClick={sentSearchParamsToUrl}
                        >
                            <Icon type={'submit'} as={BsSearch}/>
                        </InputRightElement>
                    </InputGroup>
                </Stack>
            </FormControl>
        </form>
    );
}