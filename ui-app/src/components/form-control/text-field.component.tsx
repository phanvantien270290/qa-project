/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
// import makeStyles from '@material-ui/core/styles/makeStyles';
// import createStyles from '@material-ui/core/styles/createStyles';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         indicator: {
//             width: "100%",
//             padding: theme.spacing(1),
//             backgroundColor: '#cecece',
//             borderRadius: 4,
//             height: 56
//         },
//     }),
// );

interface ITextFieldProps {
    loading?: boolean,
    regexReplace?: {
        regex: RegExp | string,
        replace: string
    },
}
const ITextField: React.FC<TextFieldProps & ITextFieldProps> = (props) => {
    const { onChange, value, regexReplace, ...other } = props;
    const [text, setText] = React.useState(value);

    const handleOnChange = (event: any) => {
        let _value = event.target.value;
        if (regexReplace && _value) {
            _value = _value.replace(regexReplace.regex, regexReplace.replace);
        }
        setText(_value);

        onChange && onChange(_value);
    };
    useEffect(() => {
        setText(value);
    }, [value]);
    return (
        <>
            {/* {loading ?
                <div className={classes.indicator}></div>
                : */}
            <TextField
                onChange={handleOnChange}
                {...other}
                value={text} />

            {/* } */}

        </>

        /* <div className={classes.indicate}></div> */
    );
}
export default ITextField;
