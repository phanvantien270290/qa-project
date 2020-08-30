/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Controller, UseFormMethods, useFieldArray } from "react-hook-form";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, CircularProgress, FormHelperText } from '@material-ui/core';

import { STATUS_DEVICE, status_css } from '../../../../../utils';
import { ILabelTemplate } from '../../../../../interfaces/label-template.interface';
import { IPartner } from '../../../../../interfaces/partner.interface';
import FileSelector, { IFileSelectorProps } from '../../../../../components/upload-file.component';
import ITextField from '../../../../../components/form-control/text-field.component';
import { IItemMaster } from '../../../../../interfaces/item-master.interface';
import { getListItemsCombobox } from '../../../../../store/otherStore/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css,
        root: {
            flexGrow: 1,
            textAlign: "left",
            marginBottom: theme.spacing(3)
        }
    }),
);
export interface tabGeneralProps {
    propsText: any,
    rowData: ILabelTemplate,
    useForm: UseFormMethods,
    onChange: (nane: string, value: any) => void;
}

const TabLabelGeneralComponent: React.FC<tabGeneralProps> = ({
    rowData,
    propsText,
    useForm,
    ...props }): any => {
    const classes = useStyles();
    const { control, errors, setValue, getValues } = useForm;
    const { fields } = useFieldArray({
        control: control,
        name: "customerSettings"
    });
    const dispatch = useDispatch();
    const partners: IPartner[] = useSelector((state: IState) => state.partner.getCombobox.data, shallowEqual);
    const itemCombobox: { loading: boolean, data: IItemMaster[] } = useSelector((state: IState) => { return { data: state.itemMaster.getCombobox.data, loading: state.itemMaster.getCombobox.loading } }, shallowEqual);
    const handleOnChangeFile = (selectorFile: IFileSelectorProps) => {
        props.onChange('thumbnail', selectorFile);

    }
    const handleItemCombobox = (index: number) => {
        const custValue = getValues(`customerSettings[${index}].custId`);
        return custValue ? itemCombobox.data : [];
    }
    const handleOnSelectCust = (data: any, index: number = -1) => {
        if (index > -1) {
            setValue(`customerSettings[${index}].partNumber`, '');
        }
        if (data) {
            dispatch(getListItemsCombobox({ searchFields: { custId: data } }));
        }
    }

    useEffect(() => {
        if (rowData.customerSettings && rowData.customerSettings.length) {
            handleOnSelectCust(rowData.customerSettings[0].custId)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData]);
    return (
        <>
            < Grid container spacing={2} className={classes.root} >
                <Grid item xs={12} md={6} >
                    <Controller as={<ITextField name="id" error={!!errors.id} regexReplace={{ regex: /\s/g, replace: '' }} helperText={errors.id && errors.id.message} required {...propsText}
                        label={'ID'} />}
                        name="id"
                        control={control}
                        rules={{ required: 'ID is required' }}
                        defaultValue={rowData.id}
                    />
                </Grid>

                <Grid item xs={12} md={6} >
                    <Controller as={<TextField name="name" label={'Name'} error={!!errors.name} helperText={errors.name && errors.name.message} required {...propsText} />}
                        //  error={!!errors.name} helperText={errors.name?.message}
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        defaultValue={rowData.name}
                    />
                </Grid>
                {fields.map((item, index) => (

                    <React.Fragment key={item.id}>
                        <Grid item xs={6}>

                            <Controller
                                render={({ onChange, value, ...props }) =>
                                    (
                                        <Autocomplete
                                            {...props}
                                            value={value || null}
                                            autoComplete
                                            id="cust-label"
                                            options={partners.map((part) => part.custId)}
                                            getOptionLabel={(custId) => custId}
                                            getOptionSelected={(option, value) => (option === value)}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    label="Customer"  {...propsText} />
                                            }
                                            onChange={(e, data) => { handleOnSelectCust(data, index); onChange(data) }}

                                        />
                                    )
                                }
                                name={`customerSettings[${index}].custId`}
                                control={useForm.control}
                                defaultValue={item.custId}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ onChange, value, ...props }) => (

                                    <Autocomplete
                                        {...props}
                                        value={value || []}
                                        autoComplete
                                        multiple
                                        size="small"
                                        id="partNumber-label"
                                        loading={itemCombobox.loading}
                                        limitTags={2}
                                        filterSelectedOptions
                                        options={handleItemCombobox(index).map((item) => item.partNumber)}
                                        getOptionLabel={(option) => option}
                                        getOptionSelected={(option, value) => (option === value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Applied to PNs"  {...propsText}
                                                placeholder="PNs"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {itemCombobox.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                        onChange={(e, data) => onChange(data)}

                                    />
                                )}
                                name={`customerSettings[${index}].partNumber`}
                                control={useForm.control}
                                defaultValue={item.partNumber}
                            />
                        </Grid>

                    </React.Fragment>

                ))}

                <Grid item xs={12} md={6} >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Controller as={<TextField name="size" {...propsText}
                                label={"Label Size"} />}
                                name="size"
                                control={control}
                                defaultValue={rowData.size}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller as={<TextField name="version"  {...propsText}
                                label={'Version'} />}
                                name="version"
                                control={control}
                                defaultValue={rowData.version}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <FormControl {...propsText as any}>
                        <InputLabel id="obsoleted-label" >Status</InputLabel>
                        <Controller as={
                            <Select labelId="obsoleted-label" name="obsoleted">
                                <MenuItem value={"false"} className={classes.active}>{STATUS_DEVICE.ACTIVE}</MenuItem>
                                <MenuItem value={"true"} className={classes.inactive}>{STATUS_DEVICE.INACTIVE}</MenuItem>
                            </Select>
                        }
                            name="obsoleted"
                            label="Status"
                            control={control}
                            defaultValue={rowData.obsoleted}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}  >
                    <FormControl {...propsText as any}>
                        <FileSelector propsTextField={{ ...propsText, error:!!errors.thumbnail, required: true, label: 'Thumbnail', value: (rowData.thumbnail && rowData.thumbnail.name) || '', name: 'thumbnail.name' }}
                            helperText="Acceptable format are .jpg, .gif and .png, size < 100KB"
                            extensions={['jpg', 'gif', 'png']}
                            accpet={'image/x-png,image/gif,image/jpeg'}
                            titleButton="Upload"
                            capilityUnit="KB"
                            maxSize={100}
                            onChange={handleOnChangeFile} />
                        <FormHelperText error={!!errors.thumbnail}> {errors.thumbnail?.message}</FormHelperText>
                    </FormControl>

                </Grid>
            </Grid>
        </>

    );
}
export default TabLabelGeneralComponent;