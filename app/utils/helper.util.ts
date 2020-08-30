/**
 * @owner BlueSky
 * @description Define helpful functions
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { LABEL_RULE } from './enum.util';

const RegexData = {
    whitepspaces: /^\s+|\s+$/g, // remove whitepaces
};
export function leftPad(str: string, len: number, pad: string = '0') {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}

export function generateByLabelRule(origin: string, rule: LABEL_RULE, option: any = null): string {
    switch (rule) {
        case LABEL_RULE.CURRENT_DATE:
            const buildNo = (option && option.buildNo) ? leftPad(String(option.buildNo), 2) : '01';
            const date = new Date();
            const format = leftPad(String(date.getMonth() + 1), 2) + leftPad(String(date.getDate()), 2) + date.getFullYear();
            return `${origin}${buildNo}${format}`;
        case LABEL_RULE.INCREMENT:
            const next = (option && option.increment) ? leftPad(String(Number(option.increment) + 1), 4) : '0001';
            return origin + next;
        default:
            return origin;
    }
}

export function formatUriPath(uriPath: string) {
    if (!uriPath) return '';
    return uriPath.replace(/^[\/ | \W]*/g, '');
}
export function removeWhiteSpace(value: string = '', replaceString: string = ''): string {
    return value.replace(RegexData.whitepspaces, replaceString)
}
export const StringHelper = {
    isString: function (str: string): boolean {
        return !(!str || typeof str !== "string" || !str.trim());
    },
    isWords: function (str: string): boolean {
        return this.isString(str) && !/[^\w\-\s]/g.test(str);
    }
};