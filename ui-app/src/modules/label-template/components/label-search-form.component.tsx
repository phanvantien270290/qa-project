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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { STATUS_DEVICE, status_css } from '../../../utils';
import { LabelTemplateContext, ILabelTemplateContextProps } from '../store/context';
import { IPartner } from '../../../interfaces/partner.interface';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

export interface refLabelTemplateSearchProps {
    handleRefreshList: () => void;

}
interface seachFormProps {
    name?: string,
    custId?: string,
    obsoleted?: boolean | string
}
interface searchFormProps {
    ref?: any;
    handleSearch: () => void;
    isLoading: boolean;
}
const itnitSearchFields: seachFormProps = {
    name: '',
    custId: '',
    obsoleted: ''
}

const LabelTemplateSearchFormComponent: React.FC<searchFormProps> = forwardRef(({ handleSearch, isLoading, }, ref) => {
    let labelTemplateContext: ILabelTemplateContextProps = useContext(LabelTemplateContext);
    const [searchFields, setSearchFields] = useState<seachFormProps>(itnitSearchFields);
    const classes = useStyles();
    const partnersData: IPartner[] = useSelector((state: IState) => {
        return state.partner.getCombobox.data;
    });
    const handleChange = (event: any) => {
        let _searchFields = {
            ...searchFields,
            [event.target.name]: event.target.value
        }
        if (event.target.name === 'obsoleted' && event.target.value) {
            _searchFields = {
                ...searchFields,
                [event.target.name]: !(event.target.value === STATUS_DEVICE.ACTIVE)
            }
        }
        setSearchFields(_searchFields);
        labelTemplateContext.searchParams = {
            ...labelTemplateContext.searchParams,
            searchFields: _searchFields
        }
        if (['custId', 'obsoleted'].includes(event.target.name)) {
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
            labelTemplateContext.searchParams = {
                ...labelTemplateContext.searchParams,
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
                <Autocomplete
                    autoComplete
                    className={classes.input}
                    id="custId-label"
                    size="small"
                    options={partnersData.map(({ custId }) => custId)}
                    getOptionLabel={(custId) => custId}
                    loading={isLoading}
                    disabled={isLoading}
                    value={searchFields.custId || null}
                    getOptionSelected={(option, value) => (option === value)}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Customer" variant="outlined" />
                    }
                    onChange={(event: any, value) => handleChange({ target: { name: 'custId', value: value } })}

                />
            </Grid>
            <Grid item xs={6} md={4}>
                <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel id="obsoleted-label">Status</InputLabel>
                    <Select
                        className={classes.input}
                        labelId="obsoleted-label"
                        name="obsoleted"
                        disabled={isLoading}
                        value={searchFields.obsoleted === '' ? '' : searchFields.obsoleted ? STATUS_DEVICE.INACTIVE : STATUS_DEVICE.ACTIVE}
                        onChange={(event: any) => handleChange(event)}
                        label="Status"
                    >
                        <MenuItem value={''}>
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

export default LabelTemplateSearchFormComponent;