import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {
    useLazyGetBlogQuery,
    useUpdateBlogMutation
} from "../../services/blogs.api";
import {websiteUrlRegex} from "../../constants/constants";
import ModifyBlog from "../../components/ModifyBlog/ModifyBlog";

const UpdateBlogContainer = () => {
    const [updateBlog, { status,  error }] = useUpdateBlogMutation()
    const [getBlog, { data }] = useLazyGetBlogQuery()

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [websiteUrl, setWebsiteUrl] = React.useState<string>('');

    const [nameError, setNameError] = React.useState<string>('')
    const [descriptionError, setDescriptionError] = React.useState<string>('')
    const [websiteUrlError, setWebsiteUrlError] = React.useState<string>('')
    const [serverError, setServerError] = React.useState<string>('')

    const params = useParams()

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

    React.useMemo(() => {
        if (data) {
            setName(data.name)
            setDescription(data.description)
            setWebsiteUrl(data.websiteUrl)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        let isValid = true

        if (name.length < 1 || name.length > 15) {
            setNameError('The number of characters must be from 1 to 15')
            isValid = false
        } else {
            setNameError('')
        }

        if (description.length < 1 || description.length > 500) {
            setDescriptionError('The number of characters must be from 1 to 500')
            isValid = false
        } else {
            setDescriptionError('')
        }

        if (websiteUrl.length < 1 || !websiteUrlRegex.test(websiteUrl)) {
            setWebsiteUrlError('It should be url')
            isValid = false
        } else {
            setWebsiteUrlError('')
        }

        if (name && description && websiteUrl && isValid) {
            updateBlog({
                id: params?.id ?? '',
                name,
                description,
                websiteUrl
            })
        }
    }

    const handeBackNavigation = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        getBlog(params?.id ?? '')
    }, [params])

    return (
        <div className='padding-20'>
            <div className='df-start' style={{cursor: 'pointer'}} onClick={handeBackNavigation}>
                {"<"}-- Back
            </div>
            <ModifyBlog
                title='Update Blog'
                buttonTitle='Update'
                handleSubmit={handleSubmit}
                name={name}
                description={description}
                websiteUrl={websiteUrl}
                status={status}
                serverError={serverError}
                setName={setName}
                setDescription={setDescription}
                setWebsiteUrl={setWebsiteUrl}
                nameError={nameError}
                descriptionError={descriptionError}
                websiteUrlError={websiteUrlError}
            />
        </div>
    );
};

export default React.memo(UpdateBlogContainer)