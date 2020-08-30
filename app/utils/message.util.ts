
/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

const DUPLICATE_MSG = {
    value: 'duplicate',
    message: 'duplicate data'
}
const UPDATE_MSG = {
    success: 'Update successful',
    error: 'update failed',

}
const CREATE_MSG = {
    success: 'created successfully',
    error: 'create failure',

}
const DELETE_MSG = {
    success: 'deleted successfully',
    error: 'delete failed',

}

/**
 *
 * @param msg  string
 * @param prefix  ex: 'Printer' duplicate
 * @param subfix  ex: Duplicate 'Printer'
 */
const convertMsg = (msg: string = '', prefix: string = '', subfix: string = '') => {
    let _msg = !prefix ? msg.charAt(0).toUpperCase() : msg.toLowerCase();
    let newMsg = `${prefix} ${_msg} ${subfix}`;
    if (msg.includes(DUPLICATE_MSG.value)) {
        return `${prefix} ${DUPLICATE_MSG.message} ${subfix}`
    }
    return newMsg;
}
export { DUPLICATE_MSG, DELETE_MSG, UPDATE_MSG, CREATE_MSG, convertMsg }