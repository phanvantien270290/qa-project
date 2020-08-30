/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
import { ListComponent } from '../components/list.component';

interface Props {
    dispatch?: any,
    data: Array<any>
};

const DashboardContainer = (props: Props) => {
    const { dispatch, data } = props;
    useEffect(() => {
        dispatch(fetchApi());
    }, [dispatch]);

    return (
        <ListComponent data={data}></ListComponent>
    );
}

const mapStateToProps = (state: IState, props: Props) => {
    return {
        data: state.dashboard.data || []
    };
};

export default connect(mapStateToProps)(DashboardContainer);