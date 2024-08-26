import React from 'react';
import {useNavigate} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useCreateBlogMutation} from "../../services/blogs.api";
import {websiteUrlRegex} from "../../constants/constants";
import ModifyBlog from "../../components/BlogPostForm/BlogPostForm";
import {URLS} from "../../constants/apiRouter";

const CreateBlogContainer = () => {
    const [createBlog, { status,  error, isSuccess }] = useCreateBlogMutation()

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [websiteUrl, setWebsiteUrl] = React.useState<string>('');

    const [nameError, setNameError] = React.useState<string>('')
    const [descriptionError, setDescriptionError] = React.useState<string>('')
    const [websiteUrlError, setWebsiteUrlError] = React.useState<string>('')
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
            createBlog({
                name,
                description,
                websiteUrl
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            navigate(URLS.Blogs_Route)
        }
    }, [isSuccess])

    return (
        <ModifyBlog
            title='Create Blog'
            buttonTitle='Create'
            firstTitle='Name'
            secondTitle='Description'
            thirdTitle='Website Url'
            handleSubmit={handleSubmit}
            firstInputValue={name}
            secondInputValue={description}
            thirdInputValue={websiteUrl}
            status={status}
            serverError={serverError}
            setFirstInputValue={setName}
            setSecondInputValue={setDescription}
            setThirdInputValue={setWebsiteUrl}
            firstInputValueError={nameError}
            secondInputValueError={descriptionError}
            thirdInputValueError={websiteUrlError}
        />
    );
};

export default React.memo(CreateBlogContainer)