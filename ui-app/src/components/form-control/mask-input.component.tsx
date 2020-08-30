/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import { formatPadStartWithMinMax } from '../../utils/helper';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(0),
            },
        },
    }),
);
//format number to string like '00 - 00'

const getValues = (values: string = ''): outPutProps => {
    let minMaxValues = values.replace(/\s/g, '').split(/\//);
    return { min: +minMaxValues[0], max: +minMaxValues[1] };
}

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, ' ', '/', ' ', /\d/, /\d/]}
            placeholderChar={'0'}
            showMask
        />
    );
}
interface outPutProps {
    min: number;
    max: number;
}
interface IFormattedInputsProps extends outPutProps {
    onChange?: (event: any, values?: outPutProps) => void;
    title: string;
    helperText?: string;
    size?: "medium" | "small"
}
const FormattedInputsComponent: React.FC<IFormattedInputsProps & OutlinedInputProps> = (props) => {
    const { onChange, name, min = 0, max = 0, error, disabled = false, helperText, title, size, ...other } = props;
    const classes = useStyles();
    const [textmask, setValues] = React.useState(formatPadStartWithMinMax(min, max, 2));

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
            onChange({ target: { name: name, value: getValues(event.target.value) } })
        }
    };
    useEffect(() => {
        setValues(formatPadStartWithMinMax(min, max, 2))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max])
    return (
        <div className={classes.root}>
            <FormControl fullWidth variant="outlined" size={size}>
                <InputLabel htmlFor={`formatted-${name}`}>{title}</InputLabel>
                <OutlinedInput
                    {...other}
                    error={error}
                    value={textmask}
                    onChange={handleOnChange}
                    name={name}
                    label={title}
                    disabled={disabled}
                    id={`formatted-${name}`}
                    inputComponent={TextMaskCustom as any}
                />
                {helperText ? <FormHelperText error={error} id={`formatted-helper-${name}`} >{helperText}</FormHelperText> : null}
            </FormControl>
        </div>
    );
}
export default FormattedInputsComponent;
