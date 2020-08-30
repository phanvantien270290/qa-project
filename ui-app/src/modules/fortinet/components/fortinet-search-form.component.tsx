/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useContext, useState, forwardRef, useImperativeHandle } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FortinetContext, IFortinetContextProps } from '../store/context';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IItemMaster } from '../../../interfaces/item-master.interface';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

            marginRight: theme.spacing(1),
        },
        input: {
            maxWidth: 400
        },
        closeButton: {
            userSelect: "none",
            fontSize: 18,
            cursor: "pointer",
            color: 'grey',
            position: 'absolute',
            top: "50%",
            right: "13%",
            transform: "translate(50%, -50%)"
        }
    }),
);

export interface refFortinetSearchProps {
    handleRefreshList: () => void;

}
interface seachFormProps {
    partNumber?: string,
    oemPartNumber?: string,
    datePrinted?: Date | null
}
interface searchFormProps {
    ref?: any;
    handleSearch: () => void;
    isLoading: boolean;
}
const itnitSearchFields: seachFormProps = {
    partNumber: '',
    oemPartNumber: '',
    datePrinted: null,
}

const refFortinetSearchProps: React.FC<searchFormProps> = forwardRef(({ handleSearch, isLoading, }, ref) => {
    let fortinetContext: IFortinetContextProps = useContext(FortinetContext);
    const [searchFields, setSearchFields] = useState<seachFormProps>(itnitSearchFields);
    const classes = useStyles();
    const partNumberData: IItemMaster[] = useSelector((state: IState) => {
        return state.itemMaster.getCombobox.data;
    });
    const handleChange = (event: any) => {
        let _searchFields = {
            ...searchFields,
            [event.target.name]: event.target.value
        }
        setSearchFields(_searchFields);
        fortinetContext.searchParams = {
            ...fortinetContext.searchParams,
            searchFields: _searchFields
        }
        if (['oemPartNumber'].includes(event.target.name)) {
            handleSearch();
        }
    };
    const handleChangeDate = (date: Date | null) => {
        handleChange({ target: { name: 'datePrinted', value: date } });
    }
    const handleKeyPress = (event: any) => {
        if (event.which === 13) {
            handleSearch();
        }
    }
    useImperativeHandle(ref, () => ({
        handleRefreshList() {
            setSearchFields(itnitSearchFields);
            fortinetContext.searchParams = {
                ...fortinetContext.searchParams,
                searchFields: { ...itnitSearchFields }
            }
        }
    }));
    return (
        <Grid container spacing={2} className={classes.root} >
            <Grid item xs={6} md={4}>
                <Autocomplete
                    autoComplete
                    className={classes.input}
                    id="custId-label"
                    size="small"
                    options={partNumberData.map(({ partNumber }) => partNumber)}
                    getOptionLabel={(partNumber = '') => partNumber}
                    loading={isLoading}
                    disabled={isLoading}
                    value={searchFields.oemPartNumber || null}
                    getOptionSelected={(option, value) => (option === value)}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Model" variant="outlined" />
                    }
                    onChange={(event: any, value) => handleChange({ target: { name: 'oemPartNumber', value: value } })}

                />
            </Grid>
            <Grid item xs={6} md={4}  >
                <TextField name="partNumber" size="small" className={classes.input} type="text" fullWidth
                    value={searchFields.partNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    onKeyPress={handleKeyPress}
                    variant="outlined" label="OEM S/N" />
            </Grid>
            <Grid item xs={6} md={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        className={classes.input}
                        fullWidth
                        name="datePrinted"
                        maxDate={new Date()}
                        format="MM/dd/yyyy"
                        label="Date "
                        value={searchFields.datePrinted}
                        inputVariant="outlined"
                        size="small"
                        onKeyPress={handleKeyPress}
                        onChange={handleChangeDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    );
});

export default refFortinetSearchProps;