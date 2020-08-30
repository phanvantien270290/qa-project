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

import StatusComponent from '../../../components/status.component';
import { STATUS_DEVICE } from '../../../utils';
import { LabelTemplateContext, ILabelTemplateContextProps } from '../store/context';
import { getListLabelTemplate } from '../store/actions';
import { ILabelTemplate } from '../../../interfaces/label-template.interface';
import { deleteOneLabelTemplate } from '../store/services';
import { useSnackbar } from 'notistack';

interface Props {
    dispatch?: any,
    data: Array<any>
};
export interface refLabelTemplateListProps {
    refreshData: (force?: boolean) => void;
    refreshPage: () => void;
}
interface ItemProps {
    dispatch?: any;
    data?: any;
    ref?: any;
    totalCount?: number;
    loading?: boolean;
    handleClickModal?: (typeAction: IActionTypes, rowData?: ILabelTemplate) => any;
    handleRefreshList?: () => void;
}
const pageSizeOptions = [10, 20, 50];

const initOptions: ISearchParams['options'] = {
    sort: { id: 'asc' },
    page: 0,
    limit: pageSizeOptions[0]
}
const LabelTemplateListComponent: React.FC<ItemProps> = forwardRef((props, ref) => {
    let indexOrder = 0;
    const { enqueueSnackbar } = useSnackbar();
    const labelTemplateContext: ILabelTemplateContextProps = useContext(LabelTemplateContext);
    const { dispatch, data = [], totalCount = 0, loading = false, handleClickModal, handleRefreshList } = props;
    const [optionSearch, setOptionSearch] = useState(initOptions);
    const onChangePage = (page: number, pageSize: number) => {
        const newOptions = {
            ...optionSearch,
            page,
            limit: pageSize
        };
        labelTemplateContext.searchParams = {
            ...labelTemplateContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListLabelTemplate(labelTemplateContext.searchParams));
    }

    useImperativeHandle(ref, () => ({
        refreshData(force?: boolean) {
            handleOnRefreshData(force);
        },
        refreshPage() {
            const newOptions = { ...initOptions, limit: optionSearch.limit };
            labelTemplateContext.searchParams = {
                ...labelTemplateContext.searchParams,
                options: newOptions
            }
            dispatch(getListLabelTemplate(labelTemplateContext.searchParams));
            setOptionSearch(newOptions);

        }
    }))

    const handleOnRefreshData = (force?: boolean) => {
        let newOptions: ISearchParams['options'] = { ...optionSearch, page: 0 };
        if (force) {//for create
            newOptions = { ...initOptions, limit: optionSearch.limit };
            handleRefreshList && handleRefreshList();
        }
        labelTemplateContext.searchParams = {
            ...labelTemplateContext.searchParams,
            options: newOptions
        };
        setOptionSearch(newOptions);
        dispatch(getListLabelTemplate(labelTemplateContext.searchParams));
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
            title: 'Custommer',
            field: 'customerSettings',
            render: ({ customerSettings }) => {
                if (customerSettings && customerSettings.length) {
                    return (
                        <div>
                            {customerSettings[0].custId}
                        </div>
                    )

                }
            }

        }, {
            title: 'Status',
            field: 'obsoleted',
            render: ({ obsoleted }) =>
                <StatusComponent
                    type={!obsoleted ? "success" : "error"}
                    title={!obsoleted ? STATUS_DEVICE.ACTIVE : STATUS_DEVICE.INACTIVE} />
        },
        {
            title: 'Printer',
            field: 'printer',
            render: ({ printerSettings }) =>
                <div>
                    {printerSettings.name}
                </div>
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
            onClick: (event: any, rowData: ILabelTemplate): any => {
                handleClickModal && handleClickModal("view", rowData);
            }
        }, {
            icon: 'edit',
            tooltip: 'Edit',
            hidden: totalCount === 0,
            onClick: (event: any, rowData: ILabelTemplate): any => {
                handleClickModal && handleClickModal("edit", rowData);
            },

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
    const editable: MaterialTableProps<ILabelTemplate>['editable'] = {
        onRowDelete: (rowData: ILabelTemplate) =>
            new Promise((resolve, reject) => {
                if (rowData._id) {
                    deleteOneLabelTemplate(rowData._id).then((resp) => {
                        enqueueSnackbar(rowData.name + " " + resp.msg, { variant: resp.status ? 'success' : 'error' });
                        handleOnRefreshData();
                        resolve();
                    });
                }
            }),
        isDeletable: (rowData) => !!rowData._id
    }

    useEffect(() => {

        dispatch(getListLabelTemplate(labelTemplateContext.searchParams));
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
                    title="Label Template"
                />
            </Grid>
        </>

    );
});
const mapStateToProps = (state: IState, props: Props) => {
    return {
        data: state.labelTemplate.getList.data || [],
        loading: state.labelTemplate.getList.loading,
        totalCount: state.labelTemplate.getList.totalCount,
    }
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(LabelTemplateListComponent)