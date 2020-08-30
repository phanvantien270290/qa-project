/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import logo from '../../../logo.svg';
import NavHeader from '../components/nav-header.component';

interface NavProps {
    data: INavItem[],
    dispatch?: any,
    hiddenMenu?: string[],
    isHidden?: boolean
};

interface NavState {
    data: INavItem[]
}

class NavContainer extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);

        let data = props.data || this.defaultData();
        data = this.hideMenu(data);

        this.state = {
            data
        };
    }
    defaultData() {
        return [{
            index: 0,
            label: 'Demo 1',
            name: 'D1',
            children: [{
                index: 0, label: 'Item 1', name: 'D1-I1', path: '/demo/i1'
            }, {
                index: 1, label: 'Item 2', name: 'D1-I2', path: '/demo/i2'
            }]
        }, {
            index: 1,
            label: 'Demo 2',
            name: 'D2',
            children: [{
                index: 0, label: 'One Level', name: 'D2-1L', path: '/demo2/1l'
            }, {
                index: 1, label: 'Two Levels', name: 'D2-2L',
                children: [
                    { index: 0, label: 'Item 1', name: 'D2-I1', path: '/demo2/li1' },
                    { index: 1, label: 'Item 2', name: 'D2-I2', path: '/demo2/li2' }
                ]
            }]
        }];
    }
    drawNav(data: INavItem[]) {
        const navElems = [];
        for (let i in data) {
            navElems.push(this.drawNavItem(data[i], Number(i)));
        }
        return navElems;
    }
    drawNavItem(item: INavItem, index: number) {
        if (item.hidden !== true) {
            if (item.children) {
                const children = item.children;
                const navChildren = [];
                for (let j in children) {
                    if (children[j].hidden !== true) {
                        if (!children[j].children) {
                            navChildren.push(
                                <Dropdown.Item key={Math.random()} eventKey={`${index}.${j}`} href={children[j].path}>{children[j].label}</Dropdown.Item>
                            );
                        } else {
                            navChildren.push(this.drawNavItem(children[j], Number(j)));
                        }
                    }
                }
                if (navChildren.length) {
                    return (
                        <NavDropdown key={Math.random()} title={item.label} id="basic-nav-dropdown">{navChildren}</NavDropdown>
                    );
                } else {
                    return '';
                }
            } else {
                return (
                    <Nav.Link key={Math.random()} eventKey={`${index}`} href={item.path}>{item.label}</Nav.Link>
                );
            }
        } else {
            return '';
        }
    }
    hiddenMenuItem(item: INavItem) {
        const { hiddenMenu } = this.props;

        if (hiddenMenu && hiddenMenu.indexOf(item.name) >= 0) {
            item.hidden = true;
        } else {
            if (Array.isArray(item.children) && item.children.length) {
                for (let i in item.children) {
                    this.hiddenMenuItem(item.children[i]);
                }
            }
        }
    }
    hideMenu(data: INavItem[]) {
        const _data = [...data];
        if (Array.isArray(this.props.hiddenMenu) && this.props.hiddenMenu.length) {
            for (let i in _data) {
                this.hiddenMenuItem(_data[i]);
            }
        }
        return _data;
    }
    componentDidMount() {

    }
    render() {
        const profile = 'IPC';
        return (
            <Navbar fixed="top" sticky="top">
                <NavHeader name="" logo={`${logo}`} path='/'></NavHeader>
                <div style={{ display: this.props.isHidden ? "none" : "block" }}>
                    <Navbar.Collapse>
                        <Nav id="main-menu">
                            {this.drawNav(this.state.data)}
                        </Nav>
                        <Nav className={''}>
                            <NavDropdown key={"sign-in"} title={profile} id="basic-nav-dropdown">
                                <Dropdown.Item
                                    href={'/' + (profile ? "sign-out" : "sign-in")}>{profile ? "Sign Out" : "Sign in"}
                                </Dropdown.Item>
                                {
                                    profile ?
                                        (<Dropdown.Item href={`/settings`}>Settings</Dropdown.Item>)
                                        : ""
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        data: state.nav.data
    }
};

export default connect(mapStateToProps)(NavContainer);