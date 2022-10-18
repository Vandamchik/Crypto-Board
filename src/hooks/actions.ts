import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { watchListActions } from "../store/reducers/watchListSlice";

const actions = {
    ...watchListActions
}

export function useActions() {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}