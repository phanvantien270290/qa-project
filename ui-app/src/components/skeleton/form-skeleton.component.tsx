import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

function TypographyDemo(props: { numberRender: number, loading?: boolean }) {
    const { loading = false } = props;
    // let variants  ;
    const renderSkeleton = (): any[] => {
        let list = [];
        for (let i = 0; i < props.numberRender; i++) {
            list.push(
                <Grid item xs={12} md={6} key={i + props.numberRender} >
                    <Skeleton animation="wave" />
                </Grid>
            )

        }
        return list;
    }
    return (
        <>
            {renderSkeleton()}
        </>
    );
}

export default function SkeletonControl(props: { numberRender: number }) {
    return (
        <Grid container spacing={2} >
            <TypographyDemo  {...props} />
        </Grid>
    );
}
