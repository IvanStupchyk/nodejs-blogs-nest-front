import React from 'react'
import {BlogType} from "../../types/general";
import './styles.scss'
import {URLS} from "../../constants/apiRouter";
import {Link} from "react-router-dom";

type BlogsPagePropsType = {
    blogs: BlogType[]
    totalCount: number
    handleDeleteBlog: (blogId: string) => void
}
const BlogsPage = (props: BlogsPagePropsType) => {
    const {
        blogs,
        totalCount,
        handleDeleteBlog
    } = props

    return <div className="df-column-start padding-20">
        <h1 style={{fontSize: '20px', marginBottom: '40px'}}>Blogs</h1>
        <p style={{marginBottom: '20px'}}>Total blogs: {totalCount}</p>
        {
            blogs.length ?
                blogs.map(b => {
                    return <div className='blog__container' key={b.id}>
                        <Link
                            to={`${URLS.Blogs_Route}/${b.id}`}
                            style={{
                                color: '#000'
                            }}
                        >
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Name:</span>
                                <span>{b.name}</span>
                            </div>
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Description:</span>
                                <span>{b.description}</span>
                            </div>
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Website:</span>
                                <span>
                                    {b.websiteUrl}
                                </span>
                            </div>
                        </Link>
                        <div
                            onClick={() => handleDeleteBlog(b.id)}
                            className='general_btn'
                        >
                            Delete
                        </div>
                    </div>
                }) : ''
        }
    </div>
}

export default React.memo(BlogsPage)
