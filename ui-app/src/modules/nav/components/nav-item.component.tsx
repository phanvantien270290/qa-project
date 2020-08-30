/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, NavLinkProps } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BarChart from '@material-ui/icons/BarChart';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const INavItemPropType = {
    item: PropTypes.any,
    icon: PropTypes.bool // elementType
}

type INavItemProps = PropTypes.InferProps<typeof INavItemPropType>

const NavItemComponent: React.FC<INavItemProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const { item, icon } = props,
        isExpanded = !!item.children;
    if (item.hidden) {
        return null;
    }


    const onClick = (e: any) => {
        e.preventDefault();
        setOpen(!open);
    }

    const draw = () => {
        let itemProps = null;
        if (item.path) {
            itemProps = {
                component:
                    forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />),
                to: item.path
            }
        } else {
            itemProps = {
                onClick: onClick
            };
        }
        return (
            <ListItem button className={classes.menuItem} {...itemProps}>
                {!!icon && (
                    <ListItemIcon className={classes.menuItemIcon}>
                        <BarChart />
                    </ListItemIcon>
                )}
                <ListItemText primary={item.label} inset={!icon} />
                {
                    isExpanded ?
                        (open ? <ExpandLess /> : <ExpandMore />) : null
                }
            </ListItem>
        );
    }

    const drawChildren = (items: INavItem[]) => {
        return (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    {items.map((item, index) => (
                        <NavItemComponent item={item} key={index} icon={false} />
                    ))}
                </List>
            </Collapse>
        );
    }

    return (
        <div>
            {draw()}
            {
                isExpanded ?
                    drawChildren(item.children) : null
            }
        </div>
    );
}

const useStyles = makeStyles(theme =>
    createStyles({
        menuItem: {},
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

export default NavItemComponent;