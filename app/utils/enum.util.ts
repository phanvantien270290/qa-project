/**
 * @owner BlueSky
 * @description Define Enums
 * @since 1.0.0
 * @date Apr 02, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export enum LABEL_RULE {
    NONE = 'NONE',
    CURRENT_DATE = 'CURRENT_DATE',
    INCREMENT = 'INCREMENT'
};

export enum YESNO {
    NO = 'NO',
    YES = 'YES'
};

export enum LOG_LEVEL {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    HTTP = 'http',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly'
}

export enum LMS_API_DATA_MODE {
    JSON,
    CSV
}

export enum STATUS {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    INACTIVE = 'INACTIVE',
    NEW = 'NEW',
    OBSOLETED = 'OBSOLETED',
    OPEN = 'OPEN'
}