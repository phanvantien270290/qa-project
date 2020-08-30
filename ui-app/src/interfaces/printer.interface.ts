export interface IPrinter {
    _id?: string,
    id?: string,
    name?: string,
    driver?: string,
    location?: string,
    dpi?: number,
    connection?: string,
    paperSize?: string,
    cutter?: string,
    status?: string,
    darkness?: {
        min: number,
        max: number
    },
    speed?: {
        min: number,
        max: number
    },
    teardown?: number,
    obsoleted?: boolean,
    [key: string]: any
}
export type IPrinterNullable = IPrinter | {};