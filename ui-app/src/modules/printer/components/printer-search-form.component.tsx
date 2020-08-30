/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useContext, useState, forwardRef, useImperativeHandle } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { STATUS_DEVICE, status_css } from '../../../utils';
import { PrinterContext, IPrinterContextProps } from '../store/context';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css,
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
        }
    }),
);

export interface refPrinterSearchProps {
    handleRefreshList: () => void;

}
interface seachFormProps {
    name?: string,
    location?: string,
    status?: string
}
interface searchFormProps {
    ref?: any;
    handleSearch: () => void;
    isLoading: boolean;
}
const itnitSearchFields: seachFormProps = {
    name: '',
    location: '',
    status: ''
}

const PrinterSearchFormComponent: React.FC<searchFormProps> = forwardRef(({ handleSearch, isLoading }, ref) => {
    let printerContext: IPrinterContextProps = useContext(PrinterContext);
    const [searchFields, setSearchFields] = useState<seachFormProps>(itnitSearchFields);
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<{ name: string, value: unknown }>) => {
        const _searchFields = {
            ...searchFields,
            [event.target.name]: event.target.value
        }
        setSearchFields(_searchFields);
        printerContext.searchParams = {
            ...printerContext.searchParams,
            searchFields: _searchFields
        }
        if (['location', 'status'].includes(event.target.name)) {
            handleSearch();
        }
    };
    const handleKeyPress = (event: any) => {
        if (event.which === 13) {
            handleSearch();
        }
    }
    useImperativeHandle(ref, () => ({
        handleRefreshList() {
            setSearchFields(itnitSearchFields);
            printerContext.searchParams = {
                ...printerContext.searchParams,
                searchFields: { ...itnitSearchFields }
            }
        }
    }));
    return (
        <Grid container spacing={2} className={classes.root} >
            <Grid item xs={6} md={4}  >
                <TextField name="name" size="small" className={classes.input} type="text" fullWidth
                    value={searchFields.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    onKeyPress={handleKeyPress}
                    variant="outlined" label="Name" />
            </Grid>
            <Grid item xs={6} md={4}>
                <FormControl variant="outlined" fullWidth   size="small">
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                        className={classes.input}
                        name="location"

                        labelId="location-label"
                        value={searchFields.location}
                        disabled={isLoading}
                        onChange={(event: any) => handleChange(event)}
                        label="IP Connection"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'2048'}>2048</MenuItem>
                        <MenuItem value={'2060'}>2060</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
                <FormControl variant="outlined" fullWidth size="small">{/**className={classes.formControl} */}
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        className={classes.input}
                        labelId="status-label"
                        name="status"
                        disabled={isLoading}
                        value={searchFields.status}
                        onChange={(event: any) => handleChange(event)}
                        label="Status"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={STATUS_DEVICE.ACTIVE} className={classes.active}>{STATUS_DEVICE.ACTIVE}</MenuItem>
                        <MenuItem value={STATUS_DEVICE.INACTIVE} className={classes.inactive}>{STATUS_DEVICE.INACTIVE}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
});

export default PrinterSearchFormComponent;