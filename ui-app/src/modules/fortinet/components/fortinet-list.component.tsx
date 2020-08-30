/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect, useContext, forwardRef, useImperativeHandle, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Column, Options, Action, MaterialTableProps } from 'material-table';

import TableListComponent from '../../../components/material-table/table-list.component';

import { FortinetContext, IFortinetContextProps } from '../store/context';
import { getListFortinet } from '../store/actions';
import { IItemMaster } from '../../../interfaces/item-master.interface';
import { useSnackbar } from 'notistack';

interface Props {
    dispatch?: any,
    data: Array<any>
};
export interface refFortinetListProps {
    refreshData: (force?: boolean) => void;
    refreshPage: () => void;
}
interface ItemProps {
    dispatch?: any;
    data?: any;
    ref?: any;
    totalCount?: number;
    loading?: boolean;
    handleClickModal?: (rowData?: IItemMaster[]) => any;
    handleRefreshList?: () => void;
}
const pageSizeOptions = [10, 20, 50];

const initOptions: ISearchParams['options'] = {
    sort: { createAt: 'asc' },
    page: 0,
    limit: pageSizeOptions[0]
}
const FortinetListComponent: React.FC<ItemProps> = forwardRef((props, ref) => {
    const { enqueueSnackbar } = useSnackbar();
    const fortinetContext: IFortinetContextProps = useContext(FortinetContext);
    const { dispatch, data = [], totalCount = 0, loading = false, handleClickModal, handleRefreshList } = props;
    const [optionSearch, setOptionSearch] = useState(initOptions);
    const onChangePage = (page: number, pageSize: number) => {
        const newOptions = {
            ...optionSearch,
            page,
            limit: pageSize
        };
        fortinetContext.searchParams = {
            ...fortinetContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListFortinet(fortinetContext.searchParams));
    }

    useImperativeHandle(ref, () => ({
        refreshData(force?: boolean) {
            handleOnRefreshData(force);
        },
        refreshPage() {
            const newOptions = { ...initOptions, limit: optionSearch.limit };
            fortinetContext.searchParams = {
                ...fortinetContext.searchParams,
                options: newOptions
            }
            dispatch(getListFortinet(fortinetContext.searchParams));
            setOptionSearch(newOptions);

        }
    }))
    const handleOnSelectedChange = (rows: any) => {
    }
    const handleOnRefreshData = (force?: boolean) => {
        let newOptions: ISearchParams['options'] = { ...optionSearch, page: 0 };
        if (force) {//for create
            newOptions = { ...initOptions, limit: optionSearch.limit };
            handleRefreshList && handleRefreshList();
        }
        fortinetContext.searchParams = {
            ...fortinetContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListFortinet(fortinetContext.searchParams));
    }

    const columns: Column<any>[] = [
        {
            title: '',
            field: 'index',
            width: 50,
            render: ({ tableData, ...row }) => {
                return (
                    <div>
                        {(tableData.id + 1) + ((optionSearch.limit ?? 0) * (optionSearch.page ?? 0))}
                    </div>
                )
            }
        },
        {
            title: 'Product Name',
            field: 'serialNumber',
        },
        {
            title: 'Model',
            field: 'partNumber',
        },
        {
            title: 'OEM S/N',
            field: 'oemSerialNumber',
        },
        {
            title: 'MAC',
            field: 'macAddress',
        },
        {
            title: 'Date',
            field: 'date',
        },

    ];
    const options: Options<any> = {
        selection: true,
        sorting: false,
        search: false,
        draggable: false,
        actionsColumnIndex: -1,
        minBodyHeight: 300,
        paging: true,
        emptyRowsWhenPaging: false,
        maxBodyHeight: totalCount ? "calc(100vh - 400px)" : 'auto',
        pageSize: pageSizeOptions[0],
        pageSizeOptions: pageSizeOptions,

    }
    const actions: Action<any>[] = [
        {
            icon: 'print',
            tooltip: 'Print',
            hidden: totalCount === 0,
            onClick: (event: any, rowData: IItemMaster[]): any => {
                handleClickModal && handleClickModal(rowData);
            }
        },
        {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
                handleOnRefreshData(true);
            }
        }
    ]

    useEffect(() => {

        dispatch(getListFortinet(fortinetContext.searchParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <>
            <Grid item xs={12}>
                <TableListComponent
                    onChangePage={onChangePage}
                    columns={columns}
                    isLoading={loading}
                    totalCount={totalCount}
                    data={data}
                    options={options}
                    onSelectionChange={handleOnSelectedChange}
                    page={optionSearch?.page || 0}
                    actions={actions}
                    title="Fortinet"
                />
            </Grid>
        </>

    );
});
const mapStateToProps = (state: IState, props: Props) => {
    return {
        data: state.fortinet.getList.data || [],
        loading: state.fortinet.getList.loading,
        totalCount: state.fortinet.getList.totalCount,
    }
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(FortinetListComponent)