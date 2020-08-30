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
import { TextFieldProps, Grid } from '@material-ui/core';

import { IItemMaster, IItemMasterNullable } from '../../../../interfaces/item-master.interface';
import { confirmMessage, actionMessage } from '../../../../services/message.services';
import { getListLabelTemplate } from '../../../label-template/store/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        root: {
            flexGrow: 1,
            textAlign: "left",
            marginBottom: theme.spacing(3)
        },
    }),
);

interface IDialogProps {
    open?: boolean;
    rowData?: IItemMaster[];
    title?: string;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose: (newData?: IItemMasterNullable) => void;
    onSubmit: (newData: IItemMasterNullable) => void;
}
const initRowData: IItemMaster[] = [];
let originalRowData: IItemMasterNullable = initRowData;

const FortinetPrintDialogForm: React.FC<IDialogProps> = (props): any => {
    const {
        rowData = initRowData,
        open = false,
        onClose, onSubmit,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,

    } = props;
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const fortinet = useSelector((state: IState) => { return { data: state.labelTemplate.getOne.data, loading: state.labelTemplate.getOne.loading } })
    const [newRowData, setNewRowData] = useState<IItemMaster[]>(initRowData);
    const [isLoading, setIsLoading] = useState(false);
    const useFormData = useForm<IItemMaster>({ defaultValues: initRowData });
    const { handleSubmit, reset, getValues, setError, clearErrors } = useFormData;
    const PropsTextDefaults: TextFieldProps = { disabled: isLoading || fortinet.loading, fullWidth: true, margin: 'dense', variant: 'outlined' as "outlined" }
    const handleRefreshData = () => {
        // if (newRowData._id) {
        //     handleFindOne(true);
        // } else {
        //     setUseData(initRowData)
        // }
    }
    const getValueWithoutRegister = (): any => {
        // return { ...newRowData, ...getValues() };
    }
    const isDataChanged = (dataChange: any): boolean => {
        const newData = { ...dataChange };
        return _.isEqual(originalRowData, newData);

    }
    const handleClose = (event: any) => {
        // if (isDataChanged(getValues())) { return onClose(); }
        onClose();
        // let conf = window.confirm(confirmMessage.editted);
        // if (conf) { onClose(); }
    };
    const onHandleSubmit = handleSubmit((data: any): any => {
        // if (isDataChanged(data)) {
        //     return enqueueSnackbar(actionMessage.notChange, { variant: "warning" })
        // }
    })
    const setUseData = (rowData: IItemMaster[]) => {
        reset(rowData);
        setNewRowData(rowData);
        setTimeout(() => { originalRowData = { ...rowData } }, 500);
    }
    const handleFindOne = (force?: boolean) => {

        // if ((open && rowData._id && !newRowData._id) || (force && rowData._id)) {
        // const params: IFindOneParams = { _id: rowData._id };
        // dispatch(getFortinet(params));
        // }
    }
    const handleOnSelect = (name: string, value: any) => {
        let _propsChange = {};

        setNewRowData({
            ...newRowData,
            ..._propsChange
        })
    }
    useEffect(() => {
        if (rowData && rowData.length) {
            const partNo = _.uniq(rowData.map((item) => item.partNumber));
            const params: ISearchParams = { searchFields: { custId: 'FORTINET', partNo } };
            dispatch(getListLabelTemplate(params));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData]);
    useEffect(() => {
        // handleFindOne();
        return (() => { originalRowData = Object.assign({}, initRowData) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="fortinet-print-dialog-title"
            aria-describedby="fortinet-print-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="fortinet-dialog-title">
                <div> PRINT FORTINET LABEL</div>
            </DialogTitle>
            <DialogContent dividers={true}>
                <Grid container spacing={2} className={classes.root} >
                    <Grid item xs={6} md={4}>

                    </Grid>
                    <Grid item xs={6} md={4}  >
                        column 2
                    </Grid>
                    <Grid item xs={6} md={4}>
                        column 3
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleRefreshData} disabled={isLoading || fortinet.loading} color="primary">RESET</Button>
                <Button onClick={onHandleSubmit} disabled={isLoading || fortinet.loading} color="primary">PRINT</Button>

            </DialogActions>
        </Dialog >
    );
}
export default FortinetPrintDialogForm;