/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { forwardRef } from 'react';
import MaterialTable, { Icons, MaterialTableProps, Action } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import EditOutlined from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from '@material-ui/icons';

// import { makeStyles, createStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(() => {
//     return createStyles({
//         root: {
//             color: '#546e7a'
//         }
//     })
// });

type ITableProps = MaterialTableProps<any>; // PropTypes.InferProps<typeof MaterialTableProps>

const TableListComponent: React.FC<ITableProps> = ({ actions, ...props }) => {
    // const classes = useStyles();
    const tableIcons: Icons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutlinedIcon {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <EditOutlined {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    if (actions) {
        for (let i = 0; i < actions?.length; i++) {
            const action: Action<any> = actions[i] as Action<any>;
            if (action.icon === 'delete') {
                action.icon = () => <DeleteOutlinedIcon />
            }
            if (action.icon === 'edit') {
                action.icon = () => <EditOutlined />
            }
            if (action.icon === 'view') {
                action.icon = () => <VisibilityOutlinedIcon />
            }
        }
    }
    return (
        <MaterialTable icons={tableIcons} actions={actions} {...props} />
    );
}
export default TableListComponent