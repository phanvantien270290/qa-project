/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NavItemComponent from './nav-item.component';
const drawerWidth = 240;

interface INavProps {
    items: INavItem[]
}

const NavListComponent: React.FC<INavProps> = ({ items }) => {
    const classes = useStyles();
    return (
        <List component="nav" className={classes.appMenu} disablePadding>
            {items.map((item, index) => (
                <NavItemComponent item={item} key={index} icon={true} />
            ))}
        </List>
    );
}

const useStyles = makeStyles(theme =>
    createStyles({
        appMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

export default NavListComponent;