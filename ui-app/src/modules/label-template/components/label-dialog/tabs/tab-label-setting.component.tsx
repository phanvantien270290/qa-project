/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect, useState } from 'react';
import { Controller, UseFormMethods } from "react-hook-form";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, TextField, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

import { ILabelTemplate } from '../../../../../interfaces/label-template.interface';

import { getListPrinterCombobox } from '../../../../printer/store/services';
import { IPrinter } from '../../../../../interfaces/printer.interface';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: "left",
            marginBottom: theme.spacing(3)
        }
    }),
);
export interface tabLabelSettingProps {
    propsText: any,
    rowData: ILabelTemplate,
    useForm: UseFormMethods,
    onChange: (nane: string, value: any) => void;
}
const TabLabelSettingComponent: React.FC<tabLabelSettingProps> = ({
    rowData,
    onChange,
    useForm, propsText, ...props }): any => {
    const classes = useStyles();
    const { control, register, setValue} = useForm;
    const [printerList, setPrinterList] = useState<IPrinter[]>([]);
    const handleOnchange = (name: string, value: any) => {

        setValue('printerSettings.id', value ? value.id : "");
        setValue('printerSettings.name', value ? value.name : "");
        onChange && onChange('printer', value);
    }
    const handleOnGetPrinter = () => {
        getListPrinterCombobox({}).then(({ data }) => {
            if (data && data.data.length) {
                setPrinterList(data.data);
            }

        })
    }
    useEffect(() => {
        handleOnGetPrinter();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getValuePrinter = (name: any, id: any): { name: string, id: string } | null => {
        if (!name || !id) {
            return null;
        }
        return { name, id }
    }
    return (
        <>
            < Grid container spacing={2} className={classes.root} >

                <Grid item xs={12} md={6}>
                    <input type="hidden" ref={useForm.register()} name="printerSettings.id" />
                    <input type="hidden" ref={register()} name="printerSettings.name" />
                    <Autocomplete
                        autoComplete
                        id="printer-label"
                        options={printerList.sort((a, b) => { if (b && b.location && a.location) { return -b.location?.localeCompare(a.location) } return -1 })}
                        getOptionLabel={(option) => { return option.name || '' }}
                        renderOption={(option) => <span>{option.name}</span>}
                        groupBy={(option) => option.location || ''}
                        value={getValuePrinter(rowData.printerSettings?.name, rowData.printerSettings?.id)}

                        getOptionSelected={(option, value) => (option.id === value.id)}
                        onChange={(e, options) => handleOnchange('printer', options)}
                        renderInput={(params) => <TextField {...params}
                            inputProps={{ ...params.inputProps }}
                            label="Priner"  {...propsText} />}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <TextField name="printerSettings.copies"
                                type="number"
                                defaultValue={rowData.printerSettings?.copies}
                                inputRef={register()} {...propsText} label='Copies' />

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl {...propsText as any}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="printerSettings.autoCalibrate"
                                            render={(props) => {
                                                props.value = ("" + props.value) === 'true';
                                                return <Checkbox {...props} checked={props.value} onChange={(event, value: boolean) => { props.onChange(value) }} />
                                            }}
                                        />
                                    }
                                    label="Auto Caribrate"
                                    name="printerSettings.autoCalibrate"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <TextField name="printerSettings.darkness"
                                defaultValue={rowData.printerSettings?.darkness}
                                inputRef={register()} {...propsText} label='Darkness' />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField  {...propsText} name="printerSettings.speed"
                                defaultValue={rowData.printerSettings?.speed}
                                inputRef={register()} inputProps={{ min: "1", max: "14", step: "1" }} type="number" placeholder="(1 to 14)" label='Speed' />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={6} >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <TextField  {...propsText} name="printerSettings.teardown"
                                defaultValue={rowData.printerSettings?.teardown} inputRef={register()}
                                inputProps={{ min: "-120", max: "120" }} type="number" placeholder="-120 to 120" label="Tear-down" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField  {...propsText} name="printerSettings.tearoff"
                                defaultValue={rowData.printerSettings?.teardown} inputRef={register()}
                                inputProps={{ min: "-120", max: "120" }} type="number" placeholder="-120 to 120" label="Tear-off" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} md={6} >
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <TextField defaultValue={rowData.printerSettings?.offset?.x} inputRef={register()} name="printerSettings.offset.x" type="number" inputProps={{ step: "2" }}  {...propsText}
                                label={'Offset X'} />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField defaultValue={rowData.printerSettings?.offset?.y} inputRef={register()} name="printerSettings.offset.y" type="number" inputProps={{ step: "2" }}  {...propsText}
                                label={'Offset Y'} />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid >
        </>
    );
}
export default TabLabelSettingComponent;