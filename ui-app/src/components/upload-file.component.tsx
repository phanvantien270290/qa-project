import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { PropTypes, TextField, FormHelperText, TextFieldProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center'
        },
        hideInput: {
            display: 'none',
        },
        inputTexField: {
            marginRight: theme.spacing(1),
            width: "100%",
            position: "relative"
        },
        label: {
            marginTop: 3,
        },
        button: {
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
        },
        closeButton: {
            userSelect: "none",
            fontSize: 18,
            cursor: "pointer",
            color: 'grey',
            position: 'absolute',
            top: "52%",
            right: "5%",
            transform: "translate(50%, -50%)"
        }
    }),
);

interface IUploadFileProps {
    titleButton?: string,
    disabled?: boolean,
    accpet?: string,
    color?: PropTypes.Color,
    id?: string,
    hiddenInput?: boolean,
    maxSize?: number, // unit by KB
    helperText?: string,
    multiple?: boolean,
    value?: any,
    register?: any,
    extensions?: string | string[],
    capilityUnit?: 'B' | 'KB' | 'MB' | 'GB',
    onChange?: (event?: any) => void,
    onClick?: (event: any) => void,
    propsTextField: TextFieldProps
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
export interface IFileSelectorProps {
    mimeType: string,
    name: string,
    base64: string,
    size?: number
}
// const imgFileRegex = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
// const nlblFileRegex = (/\.(nlbl)$/i);
const FileSelector: React.FC<IUploadFileProps> = (props) => {
    const classes = useStyles();
    const inputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const {
        accpet = "images/*",
        color = "primary",
        id = "contained-button-file",
        titleButton = 'Upload',
        multiple = false,
        helperText,
        extensions,
        maxSize = 0,
        capilityUnit = 'KB',
        hiddenInput = false,
        propsTextField,
        onChange,
        onClick,
        // isReset,
    } = props;
    // const bytesToSize = (bytes: number, unit: string): string | number => {
    //     const i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    //     if (i === 0) return bytes;
    //     return (bytes / (1024 ** i)).toFixed(1);
    // }

    const getExtensionFile = (filename: string = ''): string => {
        return (filename.split('.').pop() || '').toLowerCase();
    }
    const bytesToSize = (bytes: number = 0, unit: string): number => {
        let units = ['B', 'KB', 'MB', 'GB'];
        const i = units.findIndex((un) => un === unit) || 0;
        return Math.floor(bytes / (1024 ** i));
    }
    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let fileSelected: IFileSelectorProps = {
            size: 0,
            mimeType: '',
            name: '',
            base64: ''
        }
        const errorMsg = validateErrorFile(event.target.files);
        if (!errorMsg && event.target.files) {
            fileSelected = await toBase64(event.target.files[0]);
        }
        if (fileSelected.name && onChange) {
            onChange(fileSelected);
        }
        setError(errorMsg);
    }

    const handleOnRemove = () => {
        onChange && onChange({ type: '', name: '', base64: '' });
    }
    const validateErrorFile = (files: FileList | null): string => {
        if (!files || !files.length) {
            return 'Please select file';
        }
        const extension = getExtensionFile(files[0].name);
        if (!extensions?.includes(extension)) {
            return 'Please select allowed files';
        }

        const size = bytesToSize(files[0].size, 'KB');
        if (maxSize && size > maxSize) {
            return `Please select  file less than ${maxSize} ${capilityUnit}`;
        }
        return '';
    }
    const handleOnClick = (event: React.FormEvent<HTMLInputElement>) => {
        onClick && onClick(event);
    }
    const toBase64 = (file: File) => new Promise<IFileSelectorProps>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve({
                mimeType: file.type,
                name: file.name,
                base64: reader.result as string
            });
        }
        // reader.onerror = error => resolve({ size: 0, mimeType: '', name: '', base64: '' });
    });

    useEffect(() => {
        setError('');

    }, [propsTextField]);

    return (
        <div >
            <div className={classes.root}>
                <input
                    accept={accpet}
                    className={classes.hideInput}
                    id={id}
                    ref={inputRef}
                    onChange={handleOnChange}
                    multiple={multiple}
                    type="file"
                    disabled={propsTextField.disabled}
                    value=""
                />
                {!hiddenInput &&
                    (
                        <div className={classes.inputTexField}>
                            <TextField {...propsTextField} InputProps={{
                                readOnly: true,
                            }} />
                            {(propsTextField.value && !propsTextField.disabled) && <span onClick={handleOnRemove} className={classes.closeButton}>x</span>}
                        </div>
                    )}
                <label htmlFor={id} className={classes.label}>
                    <Button
                        disabled={propsTextField.disabled}
                        onClick={(event: any) => { handleOnClick(event) }}
                        variant="contained" className={classes.button}
                        color={color} component="span">
                        {titleButton}
                    </Button>
                </label>
            </div>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
        </div>
    );
}
export default FileSelector