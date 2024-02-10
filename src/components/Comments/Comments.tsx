import React from 'react';
import './styles.scss'

// COMPONENTS, RESOURCES, CONSTANTS
import bgImageIcon from "../../assets/icons/bg-image.svg";
import likeEnable from "../../assets/icons/like-enabled.svg";
import likeDisable from "../../assets/icons/like-disabled.svg";
import dislikeDisable from "../../assets/icons/dislike-disabled.svg";
import dislikeEnable from "../../assets/icons/dislike-enabled.svg";
import {dateFormat} from "../../utils/utils";
import {CommentViewType} from "../../types/general";
import {likeStatus} from "../../constants/constants";

type CommentsPropsType = {
    totalCount: number
    comments: CommentViewType[]
    changeCommentLikeStatus: (likeStatus: likeStatus, commentId: string) => void
    addComment: () => void
    commentText: string
    setCommentText: (event: any) => void
    userId: string
    deleteComment: (commentId: string) => void
}
const Comments = (props: CommentsPropsType) => {
    const {
        totalCount,
        comments,
        changeCommentLikeStatus,
        addComment,
        commentText,
        setCommentText,
        userId,
        deleteComment
    } = props

    return (<div className='df-column-start margin-top-20 width-all'>
            <h1 className='margin-btm-20'>Comments ({totalCount})</h1>
            <div className='df-start width-all margin-btm-15'>
                <textarea
                    className='comment__add_field'
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                ></textarea>
                <button
                    disabled={!commentText.length}
                    className='general_btn'
                    onClick={addComment}>
                    Add Comment
                </button>
            </div>
            <ul className='df-column-start width-all'>
                {
                    comments.length ?
                        comments.map(c => (
                            <li className='comment__container position-rel' key={c.id}>
                                <div className='df-center margin-btm-10'>
                                    <div className='post__blog_image_container df-center margin-right-10'>
                                        <img
                                            className='center-img'
                                            src={bgImageIcon}
                                            alt='blog icon'
                                            style={{
                                                height: '20px'
                                            }}
                                        />
                                    </div>
                                    <p style={{fontWeight: 'bold', fontSize: '18px'}}>{c.commentatorInfo.userLogin}</p>
                                    <span className='comment__date'>{dateFormat(c.createdAt, true)}</span>
                                </div>
                                <span className='margin-btm-10'>{c.content}</span>
                                {

                                }
                                {
                                    userId === c.commentatorInfo.userId &&
                                    <div
                                      onClick={() => deleteComment(c.id)}
                                      className='general_btn_second comment__delete_btn'
                                    >
                                      Delete
                                    </div>
                                }
                                <div className='df-center comment__likes_container'>
                                <div className='df-center margin-right-15'>
                                        <div
                                            onClick={() => changeCommentLikeStatus(c.likesInfo.myStatus === 'None' || c.likesInfo.myStatus === 'Dislike'
                                                ? likeStatus.Like
                                                : c.likesInfo.myStatus === 'Like'
                                                    ? likeStatus.None
                                                    : likeStatus.None, c.id)}
                                            className='post__like_container'
                                            style={{height: '16px', width: '16px'}}
                                        >
                                            <img src={
                                                c.likesInfo.myStatus === 'None' || c.likesInfo.myStatus === 'Dislike'
                                                    ? likeDisable
                                                    : likeEnable
                                            }
                                                 alt='like'
                                                 className='center-img'
                                            />
                                        </div>
                                        <span style={{color: '#797476', fontSize: '12px'}}>{c.likesInfo.likesCount}</span>
                                    </div>
                                    <div className='df-center margin-right-15'>
                                        <div
                                            onClick={() => changeCommentLikeStatus(c.likesInfo.myStatus === 'None' || c.likesInfo.myStatus === 'Like'
                                                ? likeStatus.Dislike
                                                : c.likesInfo.myStatus === 'Dislike'
                                                    ? likeStatus.None
                                                    : likeStatus.None, c.id)}
                                            className='post__like_container'
                                            style={{height: '16px', width: '16px'}}
                                        >
                                            <img src={
                                                c.likesInfo.myStatus === 'None' || c.likesInfo.myStatus === 'Like'
                                                    ? dislikeDisable
                                                    : dislikeEnable
                                            }
                                                 alt='like'
                                                 className='center-img'
                                            />
                                        </div>
                                        <span style={{color: '#797476', fontSize: '12px'}}>{c.likesInfo.dislikesCount}</span>
                                    </div>
                                </div>
                            </li>
                        )) : ''
                }
            </ul>
        </div>
    );
};

export default React.memo(Comments)