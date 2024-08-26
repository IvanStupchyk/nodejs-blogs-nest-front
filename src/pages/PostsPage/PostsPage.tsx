import React from 'react'
import {PostViewType} from "../../types/general";
import {URLS} from "../../constants/apiRouter";
import {Link} from "react-router-dom";

type PostsPagePropsType = {
    posts: PostViewType[]
    totalCount: number
    handleDeletePost: (blogId: string, postId: string) => void
}
const PostsPage = (props: PostsPagePropsType) => {
    const {
        posts,
        totalCount,
        handleDeletePost
    } = props

    return <div className="df-column-start padding-20">
        <h1 style={{fontSize: '20px', marginBottom: '40px'}}>Posts</h1>
        <p style={{marginBottom: '20px'}}>Total posts: {totalCount}</p>
        {
            posts.length ?
                posts.map(p => {
                    return <div className='blog__container' key={p.id}>
                        <Link
                            to={`${URLS.Posts_Route}/${p.id}`}
                            style={{
                                color: "#000"
                            }}
                        >
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Title:</span>
                                <span>{p.title}</span>
                            </div>
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Description:</span>
                                <span>{p.shortDescription}</span>
                            </div>
                            <div className='df margin-btm-20'>
                                <span className='margin-right-10'>Content:</span>
                                <span>
                                    {p.content}
                            </span>
                            </div>
                        </Link>
                            <div
                                onClick={() => handleDeletePost(p.blogId, p.id)}
                                className='general_btn'
                            >
                                Delete
                            </div>
                    </div>
                }) : ''
        }
    </div>
}

export default React.memo(PostsPage)

