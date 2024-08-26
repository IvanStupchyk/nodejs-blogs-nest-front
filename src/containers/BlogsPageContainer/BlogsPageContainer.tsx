import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {BlogsPage} from '../../pages'
import {useDeleteBlogMutation, useLazyGetBlogsQuery} from "../../services/blogs.api";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../store/storeToolkit";

const BlogsPageContainer = () => {
    const [getBlogs] = useLazyGetBlogsQuery()
    const [deleteBlog] = useDeleteBlogMutation()

    const blogs = useAppSelector((state) => state.blogs.blogs)
    const totalCount = useAppSelector((state) => state.blogs.totalCount)
    const location = useLocation()

    React.useEffect(() => {
        getBlogs(location.search)
    }, [])

    const handleDeleteBlog = React.useCallback((blogId: string) => {
        deleteBlog(blogId)
    }, [])

    return (
        <BlogsPage
            totalCount={totalCount}
            blogs={blogs}
            handleDeleteBlog={handleDeleteBlog}
        />
    )
}

export default BlogsPageContainer
