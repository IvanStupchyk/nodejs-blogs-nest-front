import React from 'react';

// COMPONENTS, RESOURCES, CONSTANTS
import CreateBlog from "../../pages/CreateBlog/CreateBlog";
import {useCreateBlogMutation} from "../../services/blogs.api";
import {BlogModel} from "../../models/BlogModel";
import {websiteUrlRegex} from "../../constants/constants";

const CreateBlogContainer = () => {
    const [createBlog, { status,  error }] = useCreateBlogMutation()

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [websiteUrl, setWebsiteUrl] = React.useState<string>('');

    const [nameError, setNameError] = React.useState<string>('')
    const [descriptionError, setDescriptionError] = React.useState<string>('')
    const [websiteUrlError, setWebsiteUrlError] = React.useState<string>('')
    const [serverError, setServerError] = React.useState<string>('')

    if (error && !serverError.length && 'status' in error){
        // @ts-ignore
        setServerError(error.data?.errorsMessages[0]?.message)
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
            const newBlog = new BlogModel(name, description, websiteUrl)
            createBlog({
                name,
                description,
                websiteUrl
            })
            console.log('newBlog', newBlog)
        }
    }

    return (
        <CreateBlog
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
    );
};

export default React.memo(CreateBlogContainer)