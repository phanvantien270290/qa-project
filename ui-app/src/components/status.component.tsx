/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 100,
            borderRadius: 5,
            textAlign: 'center'
        }
    }),
);

export interface StatusProps {
    type: "success" |"error"
    title: string;

}

const StatusComponent: React.FC<StatusProps> = ({ type, title }): any => {
    const classes = useStyles();
    const getType = (typeStatus: string) => {
        let bgColor = typeStatus;
        return  `bg-status-${bgColor}`;
    }
    return (
        <Typography component="div" className={`${getType(type)} ${classes.root}`}>{title}</Typography>

    )
}
export default StatusComponent;