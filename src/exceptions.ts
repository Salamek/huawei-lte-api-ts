export class ResponseErrorException extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ResponseErrorException.prototype);
    }
}

export class ResponseErrorNotSupportedException extends ResponseErrorException { }


export class ResponseErrorLoginRequiredException extends ResponseErrorException { }


export class ResponseErrorSystemBusyException extends ResponseErrorException { }


export class ResponseErrorLoginCsrfException extends ResponseErrorException { }


export class LoginErrorUsernameWrongException extends ResponseErrorException { }


export class LoginErrorPasswordWrongException extends ResponseErrorException { }


export class LoginErrorAlreadyLoginException extends ResponseErrorException { }


export class LoginErrorUsernamePasswordWrongException extends ResponseErrorException { }


export class LoginErrorUsernamePasswordOverrunException extends ResponseErrorException { }


export class LoginErrorUsernamePasswordModifyException extends ResponseErrorException { }
