export interface IPrinterSetting {
    id?: string,
    name?: string,
    copies?: number |string,
    darkness?: number | string,
    speed?: number | string,
    teardown?: number | string,
    tearoff?: number | string,
    offset?: {
        x: number | string,
        y: number | string
    },
    autoCalibrate?: boolean,

}