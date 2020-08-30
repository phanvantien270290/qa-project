// import ItemActionMenuRightComponent from './action-menu-right.component';
import SvgIcon from "@material-ui/core/SvgIcon";
type SvgIconComponent = typeof SvgIcon;
export interface MenuItemProps<ItemProps extends object> {
    title: string;
    hidden?: boolean;
    disabled?: boolean;
    id?: string;
    icon?: string | (() => React.ReactElement<any>) | SvgIconComponent;
    onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, data?: ItemProps | ItemProps[]) => void;

}
export interface MenuItemWithComboboxProps<ItemProps extends object> extends MenuItemProps<ItemProps> {
    combobox?: MenuItemProps<ItemProps>[] | [];

}
export interface MenuActionProps<ItemProps extends object> {
    actions?: MenuItemProps<ItemProps>[];
}

export interface TypeActionProps<ItemProps extends object> {
    leftAction?: MenuItemProps<ItemProps>[];
    rightAction?: MenuItemProps<ItemProps>[];

}