import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQueryString} from "./useQueryString";

export const useUrlParams = (name: string, value: string) => {
    const navigate = useNavigate();
    const {location, query} = useQueryString();
    const [urlParams, setUrlParams] = useState<string>(query?.get(name) || value);

    const locationPathname = location.pathname !== "/" ? location.pathname : "/store";

    useMemo(() => setUrlParams(value), [name, value]);

    useEffect(() => {
        if (!urlParams) {
            query.delete(name);
            navigate(`${locationPathname}?${query.toString()}`)
        } else {
            query.set(name, urlParams);
        }
        if (query.toString().length > 0) {
            navigate(`${locationPathname}?${query.toString()}`)
        }
    }, [urlParams]);

    return [urlParams, setUrlParams] as const
}
