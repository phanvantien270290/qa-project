/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect, useContext, forwardRef, useImperativeHandle, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Column, Options, Action, MaterialTableProps } from 'material-table';

import TableListComponent from '../../../components/material-table/table-list.component';

import StatusComponent from '../../../components/status.component';
import { STATUS_DEVICE } from '../../../utils';
import { PrinterContext, IPrinterContextProps } from '../store/context';
import { getListPrinter } from '../store/actions';
import { IPrinter } from '../../../interfaces/printer.interface';
import { deleteOnePrinter } from '../store/services';
import { useSnackbar } from 'notistack';

interface Props {
    dispatch?: any,
    data: Array<any>
};
export interface refPrinterListProps {
    refreshData: (force?: boolean) => void;
    refreshPage: () => void;
}
interface ItemProps {
    dispatch?: any;
    data?: any;
    ref?: any;
    totalCount?: number;
    loading?: boolean;
    handleClickModal?: (typeAction: IActionTypes, rowData?: IPrinter) => any;
    handleRefreshList?: () => void;
}
const pageSizeOptions = [10, 20, 50];

const initOptions: ISearchParams['options'] = {
    sort: { id: 'asc' },
    page: 0,
    limit: pageSizeOptions[0]
}
const PrintListComponent: React.FC<ItemProps> = forwardRef((props, ref) => {
    let indexOrder = 0;
    const { enqueueSnackbar } = useSnackbar();
    const printerContext: IPrinterContextProps = useContext(PrinterContext);
    const { dispatch, data = [], totalCount = 0, loading = false, handleClickModal, handleRefreshList } = props;
    const [optionSearch, setOptionSearch] = useState(initOptions);
    // const [confirmOpen, setConfirmOpen] = useState(false);
    const onChangePage = (page: number, pageSize: number) => {
        const newOptions = {
            ...optionSearch,
            page,
            limit: pageSize
        };
        printerContext.searchParams = {
            ...printerContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListPrinter(printerContext.searchParams));
    }

    useImperativeHandle(ref, () => ({
        refreshData(force?: boolean) {
            handleOnRefreshData(force);
        },
        refreshPage() {
            const newOptions = { ...initOptions, limit: optionSearch.limit };
            printerContext.searchParams = {
                ...printerContext.searchParams,
                options: newOptions
            }
            dispatch(getListPrinter(printerContext.searchParams));
            setOptionSearch(newOptions);

        }
    }))

    const handleOnRefreshData = (force?: boolean) => {
        let newOptions: ISearchParams['options'] = { ...optionSearch, page: 0 };
        if (force) {//for create
            newOptions = { ...initOptions, limit: optionSearch.limit };
            handleRefreshList && handleRefreshList();
        }
        printerContext.searchParams = {
            ...printerContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListPrinter(printerContext.searchParams));
    }

    const columns: Column<any>[] = [
        {
            title: '',
            field: 'index',
            width: 50,
            render: () => {
                return (
                    <div>
                        {++indexOrder + ((optionSearch.limit ?? 0) * (optionSearch.page ?? 0))}
                    </div>
                )
            }
        },
        {
            title: 'Name',
            field: 'name',
        }, {
            title: 'Location',
            field: 'location'
        }, {
            title: 'Status',
            field: 'status',
            render: ({ status }) =>
                <StatusComponent
                    type={status === STATUS_DEVICE.ACTIVE ? "success" : "error"}
                    title={status} />
        }
    ];
    const options: Options<any> = {
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
            icon: 'view',
            tooltip: 'View',
            hidden: totalCount === 0,
            onClick: (event: any, rowData: IPrinter): any => {
                handleClickModal && handleClickModal("view", rowData);
            }
        }, {
            icon: 'edit',
            tooltip: 'Edit',
            hidden: totalCount === 0,
            onClick: (event: any, rowData: IPrinter): any => {
                handleClickModal && handleClickModal("edit", rowData);
            },

        },
        // {
        //     icon: 'delete',
        //     tooltip: 'Delete',
        //     hidden: totalCount === 0,
        //     onClick: (event: any, rowData: IPrinter): any => {
        //         if (rowData._id && window.confirm("You want to delete " + rowData.name)) {
        //             deleteOnePrinter(rowData._id).then((resp) => {
        //                 enqueueSnackbar(rowData.name + " " + resp.msg, { variant: resp.status ? 'success' : 'error' });
        //                 handleOnRefreshData();
        //             });
        //         }
        //     }
        // },
        {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
                handleOnRefreshData(true);
            }
        }
    ]
    const editable: MaterialTableProps<IPrinter>['editable'] = {
        onRowDelete: (rowData: IPrinter) =>
            new Promise((resolve, reject) => {
                if (rowData._id) {
                    deleteOnePrinter(rowData._id).then((resp) => {
                        enqueueSnackbar(rowData.name + " " + resp.msg, { variant: resp.status ? 'success' : 'error' });
                        handleOnRefreshData();
                        resolve();
                    });
                }
            }),
        isDeletable: (rowData) => !!rowData._id
    }

    useEffect(() => {

        dispatch(getListPrinter(printerContext.searchParams));
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
                    page={optionSearch?.page || 0}
                    actions={actions}
                    editable={editable}
                    title="Printer"
                />
            </Grid>

            {/* {confirmOpen &&
                <ConfirmDialog
                    title="Delete Post?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={() => deleteOnePrinter('1212')}
                >
                    Are you sure you want to delete this post?
  </ConfirmDialog>} */}
        </>

    );
});
const mapStateToProps = (state: IState, props: Props) => {
    return {
        data: state.printer.data || [],
        loading: state.printer.loading,
        totalCount: state.printer.totalCount,
    }
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(PrintListComponent)