import React from 'react';
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ActionMenuLeftComponent from './action-menu-left.component';
import ActionMenuRightComponent from './action-menu-right.component';
import { TypeActionProps } from './action-menu-interface';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginBottom: theme.spacing(1)
    },
  }),
);

const ActionMenuComponent: React.FC<TypeActionProps<any>> = React.memo(({ leftAction, rightAction }): any => {
    const classes = useStyles();
    // const leftActions: LeftItemProps<any>[] = [
    //     {
    //         tooltip: 'save',
    //         onClick: (event: any, rowData: any): any => console.log(rowData)
    //     }
    // ]

    return (
        <Grid className={classes.root} container spacing={3} justify='space-between'>
            <ActionMenuLeftComponent actions={leftAction} />
            <ActionMenuRightComponent actions={rightAction} />
        </Grid>

    )
});
export default ActionMenuComponent;
export * from "./action-menu-interface";