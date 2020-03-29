import { createContext } from "react";
import { equals } from "ramda";

const SECONDS_TO_EXPIRE = 600; // 10 minutes

export function requestLogReducer(log, record) {
    const { route, ...rest } = record;
    return {
        ...log,
        [route]: {
            lastRequestTime: Math.round(Date.now() / 1000),
            ...rest,
        },
    };
}

export function isRequestStale(timestamp, deps, prevDeps) {
    if (!timestamp) return true;
    return (
        !equals(deps, prevDeps) ||
        Math.round(Date.now() / 1000) - timestamp > SECONDS_TO_EXPIRE
    );
}

export default createContext();
