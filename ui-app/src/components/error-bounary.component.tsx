/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React, { Component } from 'react';

interface Props { };
interface State { flag: boolean };

export default class ErrorBoundary extends Component<Props, State> {
    state: State = {
        flag: false
    };

    constructor(props: any) {
        super(props);
    }

    static getDerivedStateFromError(err: any) {
        // Update state so the next render will show the fallback UI.
        return { flag: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        const { flag } = this.state;
        if (flag) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}