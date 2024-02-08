import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useLazyGetPostQuery} from "../../services/posts.api";
import {useAppSelector} from "../../store/storeToolkit";
import {useLazyGetPostCommentsQuery} from "../../services/comments.api";

const PostContainer = () => {
    // const [updateBlog, { status,  error }] = useUpdateBlogMutation()
    const [getPost] = useLazyGetPostQuery()
    const [getComments] = useLazyGetPostCommentsQuery()

    const post = useAppSelector((state) => state.posts.post)
    const commentsInfo = useAppSelector((state) => state.comments)
    console.log('commentsInfo', commentsInfo)
    console.log('post', post)
    const [serverError, setServerError] = React.useState<string>('')

    const params = useParams()

    const navigate = useNavigate()

    // if (error && !serverError.length && 'status' in error){
    //     // @ts-ignore
    //     if (!error.data?.errorsMessages) {
    //         setServerError( JSON.stringify(error.data) ?? '')
    //     } else {
    //         // @ts-ignore
    //         setServerError(error.data?.errorsMessages[0]?.message)
    //     }
    // }

    // React.useMemo(() => {
    //     if (data) {
    //         setName(data.name)
    //         setDescription(data.description)
    //         setWebsiteUrl(data.websiteUrl)
    //     }
    // }, [data])

    // const openCreatePostPage = React.useCallback(() => {
    //     if (data) {
    //         navigate(`/posts/${data.id}/create`)
    //     }
    // }, [data])

    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault()
    //     let isValid = true
    //
    //     if (name.length < 1 || name.length > 15) {
    //         setNameError('The number of characters must be from 1 to 15')
    //         isValid = false
    //     } else {
    //         setNameError('')
    //     }
    //
    //     if (description.length < 1 || description.length > 500) {
    //         setDescriptionError('The number of characters must be from 1 to 500')
    //         isValid = false
    //     } else {
    //         setDescriptionError('')
    //     }
    //
    //     if (websiteUrl.length < 1 || !websiteUrlRegex.test(websiteUrl)) {
    //         setWebsiteUrlError('It should be url')
    //         isValid = false
    //     } else {
    //         setWebsiteUrlError('')
    //     }
    //
    //     if (name && description && websiteUrl && isValid) {
    //         updateBlog({
    //             id: params?.id ?? '',
    //             name,
    //             description,
    //             websiteUrl
    //         })
    //     }
    // }

    const handeBackNavigation = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        getPost(params?.id ?? '')
        getComments(params?.id ?? '')
    }, [params])

    return (
        <div className='padding-20'>
            <div className='df-start' style={{cursor: 'pointer'}} onClick={handeBackNavigation}>
                {"<"}-- Back
            </div>
        </div>
    );
};

export default React.memo(PostContainer)