import React, {Dispatch, SetStateAction} from 'react';
import {Button, TextField} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";

type CreateBlogPropsType = {
    title: string
    buttonTitle: string
    firstTitle: string
    secondTitle: string
    thirdTitle: string
    handleSubmit: (event: any) => void
    firstInputValue: string
    secondInputValue: string
    thirdInputValue: string
    status: string
    serverError: string | undefined
    setFirstInputValue: Dispatch<SetStateAction<string>>
    setSecondInputValue: Dispatch<SetStateAction<string>>
    setThirdInputValue: Dispatch<SetStateAction<string>>
    firstInputValueError: string
    secondInputValueError: string
    thirdInputValueError: string
    isCreatePostButton?: boolean
    openCreatePostPage?: () => void
}

const BlogPostForm = (props: CreateBlogPropsType) => {
    const {
        handleSubmit,
        firstInputValue,
        secondInputValue,
        thirdInputValue,
        status,
        serverError,
        setFirstInputValue,
        setSecondInputValue,
        setThirdInputValue,
        firstInputValueError,
        secondInputValueError,
        thirdInputValueError,
        title,
        buttonTitle,
        firstTitle,
        secondTitle,
        thirdTitle,
        isCreatePostButton,
        openCreatePostPage
    } = props

    return (
        <div className='padding-20' style={{width: '300px'}}>
            <h2 className='margin-btm-20'>{title}</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label={firstTitle}
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={firstInputValue}
                    onChange={(e) => setFirstInputValue(e.target.value)}
                    error={!!firstInputValueError}
                    helperText={firstInputValueError}
                />
                <TextField
                    label={secondTitle}
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={secondInputValue}
                    onChange={(e) => setSecondInputValue(e.target.value)}
                    error={!!secondInputValueError}
                    helperText={secondInputValueError}
                />
                <TextField
                    label={thirdTitle}
                    variant="standard"
                    required
                    fullWidth
                    style={{
                        marginBottom: '20px',
                        height: '50px'
                    }}
                    value={thirdInputValue}
                    onChange={(e) => setThirdInputValue(e.target.value)}
                    error={!!thirdInputValueError}
                    helperText={thirdInputValueError}
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
                        marginBottom: '10px'
                    }}
                >
                    {buttonTitle}
                </Button>

                {
                    isCreatePostButton &&
                  <>
                    <span>or</span>
                    <Button
                      onClick={openCreatePostPage}
                      variant="contained"
                      color="primary"
                      disabled={status === 'pending'}
                      fullWidth
                      style={{
                          marginTop: '10px',
                      }}
                    >
                      Create Post
                    </Button>
                  </>
                }
            </form>
        </div>
    );
};

export default React.memo(BlogPostForm)