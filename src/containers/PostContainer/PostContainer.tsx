import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useLazyGetPostQuery, useLikePostMutation} from "../../services/posts.api";
import {useAppSelector} from "../../store/storeToolkit";
import {
    useCreateCommentMutation, useDeleteCommentMutation,
    useLazyGetPostCommentsQuery,
    useLikeCommentMutation
} from "../../services/comments.api";
import Post from "../../components/Post/Post";
import {PostLikeUserInfoType} from "../../types/general";
import {likeStatus} from "../../constants/constants";
import Comments from "../../components/Comments/Comments";

const PostContainer = () => {
    const [getPost] = useLazyGetPostQuery()
    const [getComments] = useLazyGetPostCommentsQuery()
    const [likePost] = useLikePostMutation()
    const [likeComment] = useLikeCommentMutation()
    const [createComment, {isSuccess}] = useCreateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()

    const post = useAppSelector((state) => state.posts.post)
    const commentsInfo = useAppSelector((state) => state.comments)
    const userId = useAppSelector((state) => state.auth.userId)

    const [commentText, setCommentText] = React.useState<string>('')

    const params = useParams()

    const navigate = useNavigate()

    const changePostLikeStatus = (likeStatus: likeStatus) => {
        likePost({
            id: params.id ?? '',
            likeStatus
        })
    }

    const addComment = React.useCallback(() => {
        createComment({
            postId: params?.id ?? '',
            content: commentText
        })
    }, [params, commentText])

    const changeCommentLikeStatus = React.useCallback((likeStatus: likeStatus, commentId: string) => {
        likeComment({
            id: commentId,
            likeStatus
        })
    }, [])

    const newestLikesMemo = React.useMemo((): PostLikeUserInfoType[] => {
        if (post) {
            return post.extendedLikesInfo.newestLikes
        }

        return []
    }, [post])

    const handeBackNavigation = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        getPost(params?.id ?? '')
        getComments(params?.id ?? '')
    }, [params])

    React.useEffect(() => {
        if (isSuccess) {
            setCommentText('')
        }
    }, [isSuccess])

    return (
        <div className='padding-20 width-all'>
            <div className='df-start' style={{cursor: 'pointer'}} onClick={handeBackNavigation}>
                {"<"}-- Back to posts
            </div>
            {
                post
                    ? <Post
                        blogName={post.blogName}
                        postTitle={post.title}
                        postContent={post.content}
                        createdAt={post.createdAt}
                        postLikeStatus={post.extendedLikesInfo.myStatus}
                        dislikesCount={post.extendedLikesInfo.dislikesCount}
                        likesCount={post.extendedLikesInfo.likesCount}
                        newestLikes={newestLikesMemo}
                        changePostLikeStatus={changePostLikeStatus}
                    />
                    : <div>Post not found</div>
            }
            <Comments
                totalCount={commentsInfo.totalCount}
                changeCommentLikeStatus={changeCommentLikeStatus}
                comments={commentsInfo.comments}
                addComment={addComment}
                commentText={commentText}
                setCommentText={setCommentText}
                userId={userId}
                deleteComment={deleteComment}
            />
        </div>
    );
};

export default React.memo(PostContainer)