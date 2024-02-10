import React from 'react';
import './styles.scss'

// COMPONENTS, RESOURCES, CONSTANTS
import bgImageIcon from "../../assets/icons/bg-image.svg";
import likeEnable from "../../assets/icons/like-enabled.svg";
import likeDisable from "../../assets/icons/like-disabled.svg";
import dislikeDisable from "../../assets/icons/dislike-disabled.svg";
import dislikeEnable from "../../assets/icons/dislike-enabled.svg";
import {dateFormat} from "../../utils/utils";
import {PostLikeUserInfoType} from "../../types/general";
import {likeStatus} from "../../constants/constants";

type PostPropsType = {
    blogName: string
    postTitle: string
    postContent: string
    postLikeStatus: string
    createdAt: Date
    dislikesCount: number
    likesCount: number
    newestLikes: PostLikeUserInfoType[]
    changePostLikeStatus: (likeStatus: likeStatus) => void
}
const Post = (props: PostPropsType) => {
    const {
        blogName,
        postTitle,
        postContent,
        createdAt,
        postLikeStatus,
        dislikesCount,
        likesCount,
        newestLikes,
        changePostLikeStatus
    } = props

    const sendLikeStatus = postLikeStatus === 'None' || postLikeStatus === 'Dislike'
        ? likeStatus.Like
        : postLikeStatus === 'Like'
            ? likeStatus.None
            : likeStatus.None

    const sendDislikeStatus = postLikeStatus === 'None' || postLikeStatus === 'Like'
        ? likeStatus.Dislike
        : postLikeStatus === 'Dislike'
            ? likeStatus.None
            : likeStatus.None

    return (
        <div className='post__container'>
            <div className='df-center margin-btm-30'>
                <div className='post__blog_image_container df-center margin-right-10'>
                    <img
                        className='center-img'
                        src={bgImageIcon}
                        alt='blog icon'
                        style={{
                            height: '22px'
                        }}
                    />
                </div>
                <p style={{fontWeight: 'bold'}}>{blogName}</p>
            </div>
            <h2 style={{fontSize: '22px', lineHeight: '24px'}} className='margin-btm-5'>
                {postTitle}
            </h2>
            <div className='post__date margin-btm-40'>
                {dateFormat(createdAt, true)}
            </div>
            <div className='df-center margin-btm-10'>
                <div className='df-center margin-right-15'>
                    <div
                        onClick={() => changePostLikeStatus(sendLikeStatus)}
                        className='post__like_container'
                    >
                        <img src={
                            postLikeStatus === 'None' || postLikeStatus === 'Dislike'
                                ? likeDisable
                                : likeEnable
                        }
                             alt='like'
                             className='center-img'
                        />
                    </div>
                    <span style={{fontWeight: 'bold', fontSize: '14px'}}>{likesCount}</span>
                </div>
                <div className='post__liker_container'>
                    {
                        newestLikes.length ?
                            newestLikes.map((l, i) => (
                                <span className='post__like_owner' key={l.login}>
                                    {
                                        l.login.length > 10
                                            ? `${l.login.charAt(0).toUpperCase() + l.login.slice(1)}...`
                                            : l.login.charAt(0).toUpperCase() + l.login.slice(1)
                                    }
                                    {
                                        newestLikes.length - 1 !== i &&
                                      <span>,</span>
                                    }
                                </span>
                            )) : ''
                    }
                </div>
                <div className='df-center margin-right-15'>
                    <div
                        onClick={() => changePostLikeStatus(sendDislikeStatus)}
                        className='post__like_container'
                    >
                        <img src={
                            postLikeStatus === 'None' || postLikeStatus === 'Like'
                                ? dislikeDisable
                                : dislikeEnable
                        }
                             alt='like'
                             className='center-img'
                        />
                    </div>
                    <span style={{fontWeight: 'bold', fontSize: '14px'}}>{dislikesCount}</span>
                </div>
            </div>
            <div className='post__image_container df-center margin-btm-10'>
                <img
                    src={bgImageIcon}
                    className="center-img"
                    style={{height: '43px', width: '57px'}}
                    alt='post bg'
                />
            </div>
            <div>{postContent}</div>
        </div>
    );
};

export default React.memo(Post)