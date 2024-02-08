import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import { PostsPage } from '../../pages'
import {useAppSelector} from "../../store/storeToolkit";
import {useLocation} from "react-router-dom";
import {useDeletePostMutation, useLazyGetAllPostsQuery} from "../../services/posts.api";

const PostsPageContainer = () => {
    const [getPosts] = useLazyGetAllPostsQuery()
    const [deletePost] = useDeletePostMutation()

    const posts = useAppSelector((state) => state.posts.posts)
    const totalCount = useAppSelector((state) => state.posts.totalCount)
    const location = useLocation()

    React.useEffect(() => {

        getPosts(location.search)
    }, [])

    const handleDeletePost = React.useCallback((blogId: string, postId: string) => {
        deletePost({
            blogId,
            postId
        })
    }, [])

  return (
      <PostsPage
        posts={posts}
        totalCount={totalCount}
        handleDeletePost={handleDeletePost}
      />
  )
}

export default PostsPageContainer
