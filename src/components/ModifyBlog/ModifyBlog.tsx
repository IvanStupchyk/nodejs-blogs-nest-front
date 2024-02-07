import React, {Dispatch, SetStateAction} from 'react';
import {Button, TextField} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";

type CreateBlogPropsType = {
    title: string
    buttonTitle: string
    handleSubmit: (event: any) => void
    name: string
    description: string
    websiteUrl: string
    status: string
    serverError: string | undefined
    setName: Dispatch<SetStateAction<string>>
    setDescription: Dispatch<SetStateAction<string>>
    setWebsiteUrl: Dispatch<SetStateAction<string>>
    nameError: string
    descriptionError: string
    websiteUrlError: string
}

const ModifyBlog = (props: CreateBlogPropsType) => {
    const {
        handleSubmit,
        name,
        description,
        websiteUrl,
        status,
        serverError,
        setName,
        setDescription,
        setWebsiteUrl,
        nameError,
        descriptionError,
        websiteUrlError,
        title,
        buttonTitle
    } = props

    return (
        <div className='padding-20' style={{width: '300px'}}>
            <h2 className='margin-btm-20'>{title}</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    label="Description"
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!descriptionError}
                    helperText={descriptionError}
                />
                <TextField
                    label="Website Url"
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    error={!!websiteUrlError}
                    helperText={websiteUrlError}
                />

                <div className='sign_in_form__login_warning_container'>
                    {
                        status === 'rejected' &&
                      <p className='sign_in_form__login_warning'>
                          {serverError}
                      </p>
                    }
                    {
                        status === 'pending' &&
                      <img src={spinner} className='sign_in_form__spinner_container' alt='spinner icon'/>
                    }
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={status === 'pending'}
                    fullWidth
                    style={{
                        backgroundColor: '#F8346B',
                        marginTop: '10px',
                    }}
                >
                    {buttonTitle}
                </Button>
            </form>
        </div>
    );
};

export default React.memo(ModifyBlog)