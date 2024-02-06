import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {BlogsPage} from '../../pages'
import {useLazyGetBlogsQuery} from "../../services/blogs.api";
import {useLocation} from "react-router-dom";

const BlogsPageContainer = () => {
    const [getBlogs, { status,  error, data }] = useLazyGetBlogsQuery()

    const location = useLocation()

    React.useEffect(() => {
        getBlogs(location.search)
    }, [])

    return (
        <BlogsPage />
    )
}

export default BlogsPageContainer
