/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { status_css } from '../../../../../utils';
import { ILabelTemplate } from '../../../../../interfaces/label-template.interface';
import { TabContainer, TabPanel, ITabProps } from '../../../../../components/tabs';
import { tabLabelSettingProps } from './tab-label-setting.component';
import { tabGeneralProps } from './tab-label-general.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css,
        root: {
            flexGrow: 1,
            textAlign: "left",
            marginBottom: theme.spacing(3),

        },
        table: {
            "& tr.MuiTableRow-root > td:first-child": {
                fontWeight: 500,
            }
        }
    }),
);
export interface TabViewLabelTemplateProps {
    rowData: ILabelTemplate;
    loading?: boolean;
}

const TabViewGeneral = ({ rowData = {}, loading }: TabViewLabelTemplateProps) => {
    const classes = useStyles();
    let customer = '';
    let partNumbers = '';
    if (rowData.customerSettings && rowData.customerSettings.length) {
        customer = rowData.customerSettings[0].custId;
        partNumbers = rowData.customerSettings[0].partNumber.join(", ");
    }
    return (
        <>
            <div style={{ display: 'flex' }} className={classes.table}>
                <TableContainer component={Paper} style={{ marginRight: 10, flex: 1 }}>
                    <Table aria-label="view detail">
                        <TableBody>
                            <TableRow>
                                <TableCell>  ID</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />} {rowData.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Name</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />}{rowData.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />} {customer}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Applied to PNs</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />}{partNumbers}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />} {rowData.size}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Version</TableCell>
                                <TableCell>{loading && <CircularProgress size={14} />} {rowData.version}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ flex: 1 }}>
                    {loading && <CircularProgress size={14} />}
                    {

                        rowData.thumbnail?.base64 &&
                        <img src={`${rowData.thumbnail?.base64}`}
                            alt={rowData.thumbnail?.name}
                            style={{ maxHeight: 350, maxWidth: "100%" }} />

                    }
                </div>
            </div>

        </>
    )
}
const TabViewSetting = ({ rowData }: TabViewLabelTemplateProps) => {
    const { printerSettings } = rowData
    const classes = useStyles();
    return (
        <div style={{ display: 'flex' }} className={classes.table}>
            <TableContainer component={Paper} style={{ marginRight: 10 }}>
                <Table aria-label="view setting 1">
                    <TableBody>
                        <TableRow>
                            <TableCell>Printer</TableCell>
                            <TableCell>{printerSettings?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Darkness</TableCell>
                            <TableCell>{printerSettings?.darkness}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Speed</TableCell>
                            <TableCell>{printerSettings?.speed}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Offset X - Y</TableCell>
                            <TableCell>{(printerSettings?.offset?.x || 0) + " - " + (printerSettings?.offset?.y || 0)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} >
                <Table aria-label="view setting 2">
                    <TableBody>
                        <TableRow>
                            <TableCell>Copies</TableCell>
                            <TableCell>{printerSettings?.copies}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Auto Caribrate</TableCell>
                            <TableCell>{printerSettings?.autoCalibrate ? 'YES' : 'NO'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tear down - off</TableCell>
                            <TableCell>{(printerSettings?.teardown || 0) + " - " + (printerSettings?.tearoff || 0)} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
const TabViewLabelTemplateComponent: React.FC<TabViewLabelTemplateProps> = ({
    rowData,
    loading,
    ...props }): any => {

    const [tabActive, setTabActive] = useState(0);

    const tabsConfig: ITabProps<tabGeneralProps | tabLabelSettingProps> = {
        tabActived: tabActive,
        tabs: [{
            label: 'General', index: 0,
            ChildComponent: TabViewGeneral,
            propsComponent: { rowData: rowData, loading } as any
        }, {
            label: 'Settings', index: 1,
            ChildComponent: TabViewSetting,
            propsComponent: { rowData: rowData } as any
        }]
    }
    return (
        <React.Fragment>
            <TabContainer tabs={tabsConfig.tabs} tabActived={tabsConfig.tabActived} onChangeTab={(newTab) => setTabActive(newTab)}>
                {tabsConfig.tabs.map(({ label, index, ChildComponent, propsComponent, ...propsTabs }) =>
                    <TabPanel key={label} value={tabsConfig.tabActived} index={index} style={{ height: 365 }}>
                        <ChildComponent  {...propsComponent} />
                    </TabPanel>
                )}
            </TabContainer>
        </React.Fragment >
    );
}
export default TabViewLabelTemplateComponent;