import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { authActions } from '../store/auth/auth.slice'
import {deviceActions} from "../store/devices/device.slice";
import {blogActions} from "../store/blogs/blogs.slice";

const actions = {
  ...authActions,
  ...deviceActions,
  ...blogActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
