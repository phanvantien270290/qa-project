/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useState, useEffect } from 'react';
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, TextFieldProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import { updateLabelTemplate, createLabelTemplate } from '../../store/services';

import { TabPanel, TabContainer, ITabProps } from '../../../../components/tabs';
import { ILabelTemplate, ILabelTemplateNullable } from '../../../../interfaces/label-template.interface';
import TabLabelGeneralComponent, { tabGeneralProps } from './tabs/tab-label-general.component';
import TabLabelSettingComponent, { tabLabelSettingProps } from './tabs/tab-label-setting.component';
import TabViewLabelTemplateComponent from './tabs/tab-view.component';
import { confirmMessage, actionMessage } from '../../../../services/message.services';

import { getLabelTemplate } from '../../store/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
    }),
);

interface IDialogProps {
    open?: boolean;
    rowData?: ILabelTemplate;
    title?: string;
    type?: IActionTypes;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose: (newData?: ILabelTemplateNullable) => void;
    onSubmit: (newData: ILabelTemplateNullable) => void;
}
const initRowData: ILabelTemplate = {
    id: '',
    customerSettings: [
        { custId: '', partNumber: [] }
    ],
    name: '',
    printerSettings: {
        id: '',
        name: '',
        copies: "0",
        darkness: "0",
        speed: "0",
        teardown: "0",
        tearoff: "0",
        offset: {
            x: "0",
            y: "0"
        },
        autoCalibrate: false,

    },
    thumbnail: {
        base64: '',
        mimeType: '',
        name: ''
    },
    size: '',
    version: '',
    obsoleted: false,

}
let originalRowData: ILabelTemplateNullable = initRowData;

const LabelTemplateDialogForm: React.FC<IDialogProps> = (props): any => {
    const {
        rowData = initRowData,
        open = false,
        type = 'create',
        onClose, onSubmit,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,

    } = props;
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const labelTemplateData = useSelector((state: IState) => { return { data: state.labelTemplate.getOne.data, loading: state.labelTemplate.getOne.loading } })
    const [tabActive, setTabActive] = useState(0);
    const [typeAction, setTypeAction] = useState<IActionTypes>(type);
    const [newRowData, setNewRowData] = useState<ILabelTemplate>(initRowData);
    const [isLoading, setIsLoading] = useState(false);
    const useFormData = useForm<ILabelTemplate>({ defaultValues: initRowData });
    const { handleSubmit, reset, getValues, setError, clearErrors } = useFormData;
    const PropsTextDefaults: TextFieldProps = { disabled: isLoading || labelTemplateData.loading, fullWidth: true, margin: 'dense', variant: 'outlined' as "outlined" }

    const handleRefreshData = () => {
        if (newRowData._id) {
            handleFindOne(true);
        } else {
            setUseData(initRowData)
        }
    }
    const getValueWithoutRegister = (): ILabelTemplate => {
        return { ...newRowData, ...getValues() };
    }
    const isDataChanged = (dataChange: any): boolean => {
        const newData = { thumbnail: newRowData.thumbnail, ...dataChange };
        return _.isEqual(originalRowData, newData);

    }
    const handleClose = (event: any) => {
        if (isDataChanged(getValues())) { return onClose(); }

        let conf = window.confirm(confirmMessage.editted);
        if (conf) { onClose(); }
    };
    const onHandleSubmit = handleSubmit((data: any): any => {
        if (isDataChanged(data)) {
            return enqueueSnackbar(actionMessage.notChange, { variant: "warning" })
        }
        if (!newRowData.thumbnail || !newRowData.thumbnail?.name) {
            return setError('thumbnail', { type: 'required', message: 'Thumbnail is required' })
        }
        const _newRowData: ILabelTemplate = getValueWithoutRegister();
        if (_newRowData.customerSettings) {
            _newRowData.customerSettings = _newRowData.customerSettings.filter((customer) => customer.custId);
        }
        if (newRowData._id) {
            handleUpdateLabelTemplate({ _id: _newRowData._id || '', data: _newRowData });
        } else {
            handleCreateLabelTemplate({ data: _newRowData });
        }
    }, (errors: any) => {
        if (!newRowData.thumbnail || !newRowData.thumbnail?.name) {
            setError('thumbnail', { type: 'required', message: 'Thumbnail is required' })
        }
    })
    const handleCreateLabelTemplate = (params: ICRUDParameter<ILabelTemplate>) => {
        setIsLoading(true);
        createLabelTemplate(params).then((resp: any) => {
            if (resp.data) {
                enqueueSnackbar(resp.data.msg, { variant: resp.data.status ? 'success' : 'error' })
                if (resp.data.status) {
                    setTimeout(() => onSubmit(newRowData), 300);
                }
            }
            setIsLoading(false);
        })
    }
    const handleUpdateLabelTemplate = (params: ICRUDParameter<ILabelTemplate>) => {
        setIsLoading(true);
        updateLabelTemplate(params).then((resp: any) => {
            if (resp.data) {
                enqueueSnackbar(resp.data.msg, { variant: resp.data.status ? 'success' : 'error' })
                if (resp.data.status) {
                    setTimeout(() => onSubmit(newRowData), 300);
                }
            }
            setIsLoading(false);
        })
    }
    const onHandleAction = (type: IActionTypes) => {
        if (type === 'create') {
            setUseData(initRowData);
        }
        if (type === 'edit') {
            setTimeout(() => originalRowData = { thumbnail: { ...newRowData.thumbnail }, ...getValues() }, 500);
        }

        setTypeAction(type);
    }
    const setUseData = (rowData: ILabelTemplate) => {
        setTabActive(0);
        reset(rowData);
        setNewRowData(rowData);
        setTimeout(() => { originalRowData = { thumbnail: { ...rowData.thumbnail }, ...getValues() } }, 500);
    }
    const handleFindOne = (force?: boolean) => {

        if ((open && rowData._id && !newRowData._id) || (force && rowData._id)) {
            const params: IFindOneParams = { _id: rowData._id };
            dispatch(getLabelTemplate(params));
        }
    }
    const handleOnChangedSelect = (name: string, value: any) => {
        let _propsChange = {};

        if (name === 'thumbnail') {
            _propsChange = { thumbnail: value };
            !value.name && setError('thumbnail', { type: 'required', message: 'Thumbnail is required' })
            value.name && clearErrors('thumbnail');
        }
        if (name === 'printer') {
            _propsChange = {
                printerSettings: { ...newRowData.printerSettings, id: value ? value.id : '', name: value ? value.name : '' }
            }
        }

        setNewRowData({
            ...newRowData,
            ..._propsChange
        })
    }
    const handleChangeTab = (newTabActive: number) => {
        setTabActive(newTabActive);
    }
    useEffect(() => {
        let newData = initRowData;
        if (labelTemplateData.data && typeAction !== 'create') {
            if (!labelTemplateData.data.customerSettings || labelTemplateData.data.customerSettings.length === 0) {
                labelTemplateData.data.customerSettings = initRowData.customerSettings?.slice();
            }
            newData = labelTemplateData.data;
        }
        setUseData(newData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelTemplateData.data]);
    useEffect(() => {
        handleFindOne();
        return (() => { originalRowData = Object.assign({}, initRowData) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tabsConfig: ITabProps<tabGeneralProps | tabLabelSettingProps> = {
        tabActived: tabActive,
        tabs: [{
            label: 'General', index: 0,
            ChildComponent: TabLabelGeneralComponent,
            propsComponent: { propsText: PropsTextDefaults, onChange: handleOnChangedSelect, rowData: newRowData, useForm: useFormData }
        }, {
            label: 'Settings', index: 1,
            ChildComponent: TabLabelSettingComponent,
            propsComponent: { propsText: PropsTextDefaults, onChange: handleOnChangedSelect, rowData: newRowData, useForm: useFormData }
        }]
    }
    return (
        <Dialog
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="labeltemplate-dialog-title"
            aria-describedby="labeltemplate-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="labeltemplate-dialog-title">
                <div className={classes.header}>
                    <div> {(typeAction === 'edit' && 'Edit') || (typeAction === 'create' && 'Create a new ')} Label Template</div>
                    <div>

                        {['view', 'edit'].includes(typeAction) &&
                            <IconButton onClick={() => onHandleAction('create')} title="Create" aria-label="create" >
                                <AddOutlinedIcon />
                            </IconButton>}
                        {

                            (typeAction === 'view') &&
                            <IconButton onClick={() => onHandleAction('edit')} title="Edit" aria-label="edit" >
                                <EditIcon />
                            </IconButton>
                        }
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers={true}>
                {typeAction !== 'view' ?
                    <TabContainer tabs={tabsConfig.tabs} tabActived={tabsConfig.tabActived} onChangeTab={handleChangeTab}>
                        {tabsConfig.tabs.map(({ label, index, ChildComponent, propsComponent, ...propsTabs }) =>
                            <TabPanel isReRender={false} key={label} value={tabsConfig.tabActived} index={index} style={{ height: 365 }}>
                                <ChildComponent  {...propsComponent} />
                            </TabPanel>)}
                    </TabContainer>
                    :
                    <TabViewLabelTemplateComponent rowData={newRowData} loading={labelTemplateData.loading} />}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                {typeAction !== 'view' ?
                    <>
                        <Button onClick={handleRefreshData} disabled={isLoading || labelTemplateData.loading} color="primary">RESET</Button>
                        <Button onClick={onHandleSubmit} disabled={isLoading || labelTemplateData.loading} color="primary">{typeAction === 'edit' ? 'UPDATE' : 'CREATE'}</Button>
                    </>

                    : null}

            </DialogActions>
        </Dialog >
    );
}
export default LabelTemplateDialogForm;