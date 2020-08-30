/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MenuActionProps, MenuItemWithComboboxProps } from './action-menu-interface';
import { Grid, Button, MenuItem, Popper, Grow, Typography, ClickAwayListener, MenuList, Paper, ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 500
        },
        button: {
            "&:not(:first-child)": {
                marginLeft: theme.spacing(1)
            }
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        menuIcon: {
            minWidth: 40
        }
    }),
);

const DropdownMenuComponent: React.FC<any> = ({ title, disabled, actions = [] }): any => {
    const classes = useStyles();
    const [open, SetOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        SetOpen((prevOpen) => !prevOpen);
    }
    const handleClose = (event: React.MouseEvent<EventTarget>, callback?: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        if (typeof callback === 'function') {
            callback(event);
        }

        SetOpen(false);
    };
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            SetOpen(false);
        }
    }
    const getIcon = (icon: any) => {
        return (icon && typeof icon !== 'string') ? icon : <Icon>{icon}</Icon>;
    }
    const handleActionMenu = (items: MenuItemWithComboboxProps<any>[]) => {
        const newMenu = [];
        for (var i in items) {
            const { title, onClick, icon, disabled } = items[i];
            newMenu.push(
                <MenuItem key={title} disabled={!!disabled} onClick={(event) => handleClose(event, onClick)}>
                    <ListItemIcon className={classes.menuIcon}>
                        {getIcon(icon)}
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        {title}
                    </Typography>
                </MenuItem>
            );
        }
        return newMenu;
    }
    const newMenu = handleActionMenu(actions);

    // return focus to the button when we transitioned from !open -> open
    const prevOpen: any = React.useRef(open);
    React.useEffect(() => {

        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment >
            <Button
                className={classes.button}
                ref={anchorRef}
                disabled={disabled}
                onClick={handleToggle}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="primary"
                variant="contained"
                endIcon={<ExpandMoreIcon />}
            >
                {title}
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {newMenu ? newMenu.map((item) => item) : null}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    )
}

const ActionMenuLeftComponent: React.FC<MenuActionProps<any>> = ({ actions = [] }) => {
    const classes = useStyles();
    const getIcon = (icon: any) => {
        return (icon && typeof icon !== 'string') ? icon : <Icon>{icon}</Icon>;
    }

    const handleActionMenu = (items: MenuItemWithComboboxProps<any>[]) => {
        const newMenu = [];
        for (let i in items) {
            const { title, onClick, icon, combobox, disabled, id } = items[i];
            if (combobox) {
                newMenu.push(<DropdownMenuComponent key={title} disabled={disabled} title={title} actions={combobox} />);
                continue;
            }
            newMenu.push(
                <Button className={classes.button} key={title}
                    onClick={(event: any) => { if (typeof onClick === 'function') { onClick(event) } }}
                    variant="contained" color="primary"
                    startIcon={getIcon(icon)}
                    disabled={!!disabled}
                    id={id}
                    title={title}>{title}
                </Button>
            )

        }
        return newMenu;
    }
    const newMenu = handleActionMenu(actions);
    return (
        <Grid item className={classes.root} >
            {newMenu ? newMenu.map((item) => item) : null}
        </Grid>
    )
}
export default ActionMenuLeftComponent;