type ErrorType = {
    message: string
    field: string
}

type ErrorsType = {
    errorsMessages: ErrorType[]
}

export type responseErrorType = {
    status: number,
    data: ErrorsType
}