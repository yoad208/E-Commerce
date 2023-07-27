import {memo, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQueryString} from "./useQueryString";


export const useUrlParams = (name: string, value: string) => {
    const navigate = useNavigate();
    const {location, query} = useQueryString();
    const [urlParams, setUrlParams] = useState<string>(query?.get(name) || value);
    const [queryString, setQueryString] = useState<string>();


    const locationPathname = query.toString().length > 0
        ? '/store'
        : location.pathname;

    useMemo(() => setUrlParams(value), [name, value]);

    useMemo(() => {
        if (urlParams === "") {
            query.delete(name);
            setQueryString(query.toString())
        } else {
            query.set(name, urlParams);
            setQueryString(query.toString())
        }
    }, [urlParams]);

    useEffect(() => navigate(`${locationPathname}?${queryString}`),[queryString]);

    return [urlParams, setUrlParams] as const
}
