/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useState, useEffect } from 'react';
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getPrinter, updatePrinter, createPrinter } from '../store/services';

import FormattedInputsComponent from '../../../components/form-control/mask-input.component';
import { STATUS_DEVICE, YES_NO, status_css } from '../../../utils';
import { IPrinter, IPrinterNullable } from '../../../interfaces/printer.interface';
import { formatPadStartWithMinMax } from '../../../utils/helper';
import { confirmMessage, actionMessage } from '../../../services/message.services';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css,
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        button: {
            padding: theme.spacing(0),
        },
        edit: {
            // maxWidth: 400
        },
        indicate: {
            width: "100%",
            padding: theme.spacing(1),
            backgroundColor: '#cecece',
            borderRadius: 4,
            height: 56,

        }
    }),
);

interface IDialogProps {
    open?: boolean;
    rowData?: IPrinter;
    title?: string;
    type?: IActionTypes;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose: (newData?: IPrinterNullable) => void;
    onSubmit: (newData: IPrinterNullable) => void;
}
const initRowData: IPrinter = {
    // _id: '',
    id: '',
    name: '',
    driver: '',
    location: '',
    dpi: 0,
    connection: '',
    paperSize: '',
    cutter: '',
    status: STATUS_DEVICE.ACTIVE,
    darkness: {
        min: 0,
        max: 0
    },
    speed: {
        min: 0,
        max: 0
    },
    teardown: 0,
    // obsoleted: false,
}
interface ErrorMess {
    darkness?: {
        message: string;
    }
    speed?: {
        message: string;
    }
    [x: string]: any;
}
let originalRowData: IPrinterNullable = initRowData;
const viewMapLeft: { [index: string]: any } = {
    id: { name: 'ID' },
    driver: { name: 'Driver' },
    connection: { name: 'IP Connection' },
    paperSize: { name: 'Paper Size' },
    speed: { name: 'Min/Max Speed' },
    status: { name: 'Status' }
}
const viewMapRight: { [index: string]: any } = {
    name: { name: 'Name' },
    dpi: { name: 'DPI' },
    cutter: { name: 'Cutter' },
    darkness: { name: 'Min/Max Darkness' },
    location: { name: 'Location' },
}
const PrinterDialogForm: React.FC<IDialogProps> = (props): any => {
    const { enqueueSnackbar } = useSnackbar();
    const { handleSubmit, errors, control, reset, getValues } = useForm();
    let [errorForms, setErrorForms] = useState<ErrorMess>({});

    const classes = useStyles();
    const {
        rowData = initRowData,
        open = false,
        type = 'create',
        onClose, onSubmit,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,

    } = props;

    const [typeAction, setTypeAction] = useState<IActionTypes>(type);
    const [newRowData, setNewRowData] = useState<IPrinter>(initRowData);
    const [isLoading, setIsLoading] = useState(false);

    const handleRefreshData = () => {
        if (newRowData._id) {
            handleFindOne(true);
        } else {
            setNewRowData(initRowData);
            reset(initRowData);
            setErrorForms({});
        }
    }
    const handleOnChange = (event: React.ChangeEvent<{ name: string, value: any }>) => {
        validateForms(event);
        setNewRowData({
            ...newRowData,
            [event.target.name]: event.target.value
        })
    }
    const validateForms = (event: React.ChangeEvent<{ name: string, value: any }>) => {
        if (['darkness', 'speed'].includes(event.target.name)) {
            delete errorForms[event.target.name];
            if (event.target.value?.min > 0 && event.target.value?.min > event.target.value?.max) {
                errorForms[event.target.name] = { message: 'Min number must be less than max number.' }
            }
            setErrorForms(errorForms)
        }
    }
    const getValueWithoutRegister = (): IPrinter => {
        return { ...newRowData, ...getValues() };
    }
    const isDataChanged = (dataChanged: any): boolean => {
        const newData = { ...newRowData, ...dataChanged };
        return _.isEqual(originalRowData, newData);

    }
    const handleClose = (event: any) => {
        if (isDataChanged(getValues())) { return onClose(); }

        let conf = window.confirm(confirmMessage.editted);
        if (conf) { onClose(); }
    };
    const onHandleSubmit = handleSubmit((data: any): any => {
        if (Object.values(errorForms).length !== 0) { return };

        if (isDataChanged(data)) {
            return enqueueSnackbar(actionMessage.notChange, { variant: "warning" })
        }
        const _newRowData: IPrinter = getValueWithoutRegister();
        if (newRowData._id) {
            handleUpdatePrinter({ _id: _newRowData._id || '', data: _newRowData });
        } else {
            handleCreatePrinter({ data: _newRowData });
        }
    })
    const handleCreatePrinter = (params: ICRUDParameter<IPrinter>) => {
        setIsLoading(true);
        createPrinter(params).then((resp: any) => {
            if (resp.data) {
                enqueueSnackbar(resp.data.msg, { variant: resp.data.status ? 'success' : 'error' })
                if (resp.data.status) {
                    setTimeout(() => onSubmit(newRowData), 300);
                }
            }
            setIsLoading(false);
        })
    }
    const handleUpdatePrinter = (params: ICRUDParameter<IPrinter>) => {
        setIsLoading(true);
        updatePrinter(params).then((resp: any) => {
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
        setTypeAction(type);
    }
    const setUseData = (rowData: IPrinter) => {
        reset(rowData);
        setNewRowData(rowData);
        setErrorForms({});
        setTimeout(() => { originalRowData = { ...rowData, ...getValues() } }, 500);
    }
    const handleFindOne = (force?: boolean) => {
        if ((open && rowData._id && !newRowData._id) || (force && rowData._id)) {
            const params: ICRUDParameter = { _id: rowData._id };
            setIsLoading(true);
            getPrinter(params).then((res) => {
                if (res.data && res.data.status) {
                    setUseData(res.data.data);
                }
                setIsLoading(false);
            })
        }
    }
    useEffect(() => {
        handleFindOne();
        return (() => { originalRowData = Object.assign({}, initRowData) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLaylout = (viewMap: any, _key: string) => {
        let viewData: any = [];
        viewData = Object.keys(viewMap).map((keyRow) => {
            let values = newRowData[keyRow];
            if (keyRow === 'darkness' || keyRow === 'speed') {
                values = formatPadStartWithMinMax(newRowData[keyRow]?.min, newRowData[keyRow]?.max, 2);// newRowData[keyRow].min + " / " + newRowData[keyRow].max;
            }
            return (
                <TableRow key={viewMap[keyRow].name}>
                    <TableCell style={{ fontWeight: 500 }} >{viewMap[keyRow].name}</TableCell>
                    <TableCell className='color-status-active'>{!isLoading ? values : <CircularProgress size={14} />}</TableCell>
                </TableRow>
            )
        })
        return (
            <TableContainer key={_key} component={Paper} style={{ marginRight: 10 }}>
                <Table aria-label="view detail">
                    <TableBody>
                        {viewData}
                    </TableBody>
                </Table>
            </TableContainer>
        )

    }
    const viewActionLayout = () => {
        let viewLeft: any = handleLaylout(viewMapLeft, 'view-printer-left');
        let viewRight: any = handleLaylout(viewMapRight, 'view-printer-right');
        return (
            <div style={{ display: 'flex' }}>
                {viewLeft}
                {viewRight}
            </div>
        )
    }
    const PropsTextDefaults = { size: "small" as "small", disabled: isLoading, fullWidth: true, variant: 'outlined' as "outlined" }
    return (
        <Dialog
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="printer-dialog-title"
            aria-describedby="printer-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="printer-dialog-title">
                <div className={classes.header}>
                    <div> {(typeAction === 'edit' && 'Edit')}
                        {(typeAction === 'create' && <span style={{}}>Create a new </span>)} Printer</div>
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
                    < Grid container spacing={2} className={classes.root} >
                        <Grid item xs={12} md={6} >
                            <Controller as={<TextField name="id" error={!!errors.id} helperText={errors.id?.message} required {...PropsTextDefaults}
                                label={viewMapLeft.id.name} />}
                                name="id"
                                control={control}
                                rules={{ required: 'Printer ID  is required' }}
                                defaultValue={newRowData.id}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <Controller as={<TextField required name="name" error={!!errors.name} helperText={errors.name?.message} {...PropsTextDefaults} label={viewMapRight.name.name} />}
                                name="name"
                                control={control}
                                rules={{ required: 'Printer Name  is required' }}
                                defaultValue={newRowData.name}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Controller as={<TextField name="driver"{...PropsTextDefaults} label={viewMapLeft.driver.name} />}
                                name="driver"
                                control={control}
                                defaultValue={newRowData.driver}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <Controller as={<TextField name="connection" {...PropsTextDefaults} label={viewMapLeft.connection.name} />}
                                        name="connection"
                                        control={control}
                                        defaultValue={newRowData.connection}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl {...PropsTextDefaults}>
                                        <InputLabel id="location-label">{viewMapRight.location.name}</InputLabel>
                                        <Controller as={
                                            <Select labelId="location-label" name="location" >
                                                <MenuItem value={'2048'} >2048</MenuItem>
                                                <MenuItem value={'2060'} >2060</MenuItem>
                                            </Select>
                                        }
                                            name="location"
                                            label={viewMapRight.location.name}
                                            control={control}
                                            defaultValue={newRowData.location}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <Controller as={<TextField name="dpi" type="number" {...PropsTextDefaults} label={viewMapRight.dpi.name} />}
                                        name="dpi"
                                        control={control}
                                        defaultValue={newRowData.dpi}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller as={<TextField name="paperSize" {...PropsTextDefaults} label={viewMapLeft.paperSize.name} />}
                                        name="paperSize"
                                        control={control}
                                        defaultValue={newRowData.paperSize}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <FormControl {...PropsTextDefaults} error={!!errors.cutter}>
                                        <InputLabel id="cutter-label" required>{viewMapRight.cutter.name}</InputLabel>
                                        <Controller as={
                                            <Select labelId="cutter-label" name="cutter">
                                                <MenuItem value={YES_NO.YES} className={classes.active}>{YES_NO.YES}</MenuItem>
                                                <MenuItem value={YES_NO.NO} className={classes.inactive}>{YES_NO.NO}</MenuItem>
                                            </Select>
                                        }
                                            rules={{ required: 'Cutter field is required' }}
                                            name="cutter"
                                            label={viewMapRight.cutter.name}
                                            control={control}
                                            defaultValue={newRowData.cutter}
                                        />
                                    </FormControl>
                                    <FormHelperText error={!!errors.cutter}>{errors.cutter && errors.cutter.message}</FormHelperText>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl {...PropsTextDefaults}>
                                        <InputLabel id="status-label" >{viewMapLeft.status.name}</InputLabel>
                                        <Controller as={
                                            <Select labelId="status-label" name="status">
                                                <MenuItem value={STATUS_DEVICE.ACTIVE} className={classes.active}>{STATUS_DEVICE.ACTIVE}</MenuItem>
                                                <MenuItem value={STATUS_DEVICE.INACTIVE} className={classes.inactive}>{STATUS_DEVICE.INACTIVE}</MenuItem>
                                            </Select>
                                        }
                                            name="status"
                                            label={viewMapLeft.status.name}
                                            control={control}
                                            defaultValue={newRowData.status}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <FormattedInputsComponent required
                                size="small"
                                min={newRowData?.speed?.min || 0}
                                max={newRowData?.speed?.max || 0}
                                disabled={isLoading}
                                error={!!errorForms.speed}
                                helperText={errorForms.speed && errorForms.speed.message}
                                name="speed" onChange={handleOnChange} title={viewMapLeft.speed.name} />
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <FormattedInputsComponent required
                                size="small"
                                min={newRowData?.darkness?.min || 0}
                                max={newRowData?.darkness?.max || 0}
                                disabled={isLoading}

                                error={!!errorForms.darkness}
                                helperText={errorForms.darkness && errorForms.darkness.message}
                                name="darkness" onChange={handleOnChange} title={viewMapRight.darkness.name} />
                        </Grid>
                    </Grid>
                    :
                    viewActionLayout()}
                {/* <SkeletonControl numberRender={6} /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} id="btn_dialog_cancel" color="primary">Cancel</Button>
                {typeAction !== 'view' ?
                    <>
                        <Button id="btn_dialog_reset" onClick={handleRefreshData} color="primary">Reset</Button>
                        <Button id={typeAction === 'create' ? 'btn_dialog_create' : 'btn_dialog_update'} onClick={onHandleSubmit} color="primary"> {typeAction === 'create' ? 'CREATE' : 'UPDATE'}</Button>
                    </>

                    : null}

            </DialogActions>
        </Dialog >
    );
}
export default PrinterDialogForm;