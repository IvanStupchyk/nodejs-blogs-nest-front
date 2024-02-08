import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import CreateBlog from "../../components/BlogPostForm/BlogPostForm";
import {URLS} from "../../constants/apiRouter";
import {useCreatePostMutation} from "../../services/posts.api";

const CreatePostContainer = () => {
    const [createPost, { status,  error, isSuccess }] = useCreatePostMutation()

    const [title, setTitle] = React.useState<string>('');
    const [shortDescription, setShortDescription] = React.useState<string>('');
    const [content, setContent] = React.useState<string>('');

    const params = useParams()

    const [titleError, setTitleError] = React.useState<string>('')
    const [shortDescriptionError, setShortDDescriptionError] = React.useState<string>('')
    const [contentError, setContentError] = React.useState<string>('')
    const [serverError, setServerError] = React.useState<string>('')

    const navigate = useNavigate()

    if (error && !serverError.length && 'status' in error){
        // @ts-ignore
        if (!error.data?.errorsMessages) {
            setServerError( JSON.stringify(error.data) ?? '')
        } else {
            // @ts-ignore
            setServerError(error.data?.errorsMessages[0]?.message)
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        let isValid = true

        if (title.length < 1 || title.length > 30) {
            setTitleError('The number of characters must be from 1 to 30')
            isValid = false
        } else {
            setTitleError('')
        }

        if (shortDescription.length < 1 || shortDescription.length > 100) {
            setShortDDescriptionError('The number of characters must be from 1 to 100')
            isValid = false
        } else {
            setShortDDescriptionError('')
        }

        if (content.length < 1 || content.length > 1000) {
            setContentError('The number of characters must be from 1 to 1000')
            isValid = false
        } else {
            setContentError('')
        }

        if (title && shortDescription && content && isValid) {
            createPost({
                blogId: params?.id ?? '',
                title,
                shortDescription,
                content
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            navigate(URLS.Posts_Route)
        }
    }, [isSuccess])

    return (
        <CreateBlog
            title='Create Post'
            buttonTitle='Create'
            firstTitle='Post title'
            secondTitle='Short description'
            thirdTitle='Content'
            handleSubmit={handleSubmit}
            firstInputValue={title}
            secondInputValue={shortDescription}
            thirdInputValue={content}
            status={status}
            serverError={serverError}
            setFirstInputValue={setTitle}
            setSecondInputValue={setShortDescription}
            setThirdInputValue={setContent}
            firstInputValueError={titleError}
            secondInputValueError={shortDescriptionError}
            thirdInputValueError={contentError}
        />
    );
};

export default React.memo(CreatePostContainer)