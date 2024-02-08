import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { authActions } from '../store/auth/auth.slice'
import {deviceActions} from "../store/devices/device.slice";
import {blogActions} from "../store/blogs/blogs.slice";
import {postActions} from "../store/posts/posts.slice";
import {commentActions} from "../store/comments/comments.slice";

const actions = {
  ...authActions,
  ...deviceActions,
  ...blogActions,
  ...postActions,
  ...commentActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
