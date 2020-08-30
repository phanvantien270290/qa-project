/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MenuActionProps } from './action-menu-interface';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";

const ITEM_HEIGHT = 48;
const ActionMenuRightComponent: React.FC<MenuActionProps<any>> = ({ actions = [], children }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event?: React.MouseEvent<HTMLElement>, onClick?: any) => {
        if (typeof onClick === 'function') {
            onClick(event);
        }
        setAnchorEl(null);
    };
    const getIcon = (icon: any) => {
        return (icon && typeof icon !== 'string') ? icon : <Icon>{icon}</Icon>;
    }
    return (
        <div>
            {!actions.length ? null : (
                <React.Fragment>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <MenuList
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={(event: any) => handleClose(event)}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {actions.map(({ title, disabled, icon, onClick }) => (
                            <MenuItem
                                key={title}
                                disabled={!!disabled}
                                onClick={(event: any) => handleClose(event, onClick)}
                            >
                                <ListItemIcon>
                                    {getIcon(icon)}
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>
                                    {title}
                                </Typography>
                            </MenuItem>
                        ))}
                    </MenuList>
                </React.Fragment>
            )}
        </div>
    );
}
export default ActionMenuRightComponent;