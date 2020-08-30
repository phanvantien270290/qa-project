export interface ILabelOption {
    product?: String;
    description?: String;
    ean?: String;
    sku?: String;
    upc?: String;
    coo?: String[];
    assembled?: String[];
    [key: string]: any;
}