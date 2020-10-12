
export enum PasswordTypeEnum {
    BASE_64 = 0,
    BASE_64_AFTER_PASSWORD_CHANGE = 3,  // Im not sure about this name...
    SHA256 = 4,
}

export enum LoginErrorEnum {
    USERNAME_WRONG = 108001,
    PASSWORD_WRONG = 108002,
    ALREADY_LOGIN = 108003,
    USERNAME_PWD_WRONG = 108006,
    USERNAME_PWD_ORERRUN = 108007,
    USERNAME_PWD_MODIFY = 115002
}


export enum LoginStateEnum {
    LOGGED_IN = 0,
    LOGGED_OUT = -1,
    REPEAT = -2
}


export enum SessionErrorEnum {
    VOICE_BUSY = 120001,
    WRONG_TOKEN = 125001,
    WRONG_SESSION = 125002,
    WRONG_SESSION_TOKEN = 125003
}

