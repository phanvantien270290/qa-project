/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useMemo, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import PrintListComponent, { refPrinterListProps } from '../components/printer-list.component';
import PrinterSearchFormComponent, { refPrinterSearchProps } from '../components/printer-search-form.component';
import PrinterDialogForm from '../components/printer-dialog.component';
import ActionMenuComponent, { MenuItemWithComboboxProps } from '../../../components/action-menu/action-menu.component';
import Grid from '@material-ui/core/Grid';
import { IPrinter, IPrinterNullable } from '../../../interfaces/printer.interface';
interface initDialogProps {
    type?: IActionTypes;
    rowData?: IPrinter;
    open: boolean;
}

const PrinterContainer = () => {
    const isLoadingList: boolean = useSelector((state: IState) => state.printer.loading);
    const refPrinterList = useRef<refPrinterListProps>(null);
    const refPrinterSearchForm = useRef<refPrinterSearchProps>(null);
    const [dialogProps, setDialogProps] = React.useState<initDialogProps>({ type: "create", rowData: undefined, open: false });
    const onOpenModal = useCallback((typeAction: IActionTypes, rowData?: IPrinter) => {

        setDialogProps({
            ...dialogProps,
            type: typeAction,
            rowData,
            open: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onCloseModal = (newPrinter?: IPrinterNullable) => {
        setDialogProps({
            ...dialogProps,
            open: false
        })
    }
    const onHandleRefreshList = () => {
        refPrinterSearchForm.current?.handleRefreshList();
    }
    const onSubmitModal = useCallback((newData?: IPrinterNullable, typeAction?: IActionTypes) => {

        refPrinterList.current?.refreshData();
        onCloseModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleOnSearch = (): void => {
        handleRefreshPage();
    }
    const handleRefreshPage = (): void => {
        refPrinterList.current?.refreshPage();
    }
    const leftAction: MenuItemWithComboboxProps<any>[] = [
        {
            title: 'new printer',
            icon: 'add_circle_outled',
            id:"btn_create",
            disabled: isLoadingList,
            onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                onOpenModal('create');
            }
        },
        {
            title: 'Search',
            icon: 'search',
            id:"btn_search",
            disabled: isLoadingList,
            onClick: handleOnSearch

        }
        // , {
        //     title: 'Report',
        //     combobox: [
        //         {
        //             title: 'Report 1', icon: 'list',
        //             onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => { console.log('Report 1') }
        //         }, {
        //             title: 'Report 2', icon: 'list', disabled: true,
        //             onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => { console.log('Report 2') }
        //         }

        //     ],

        // }
    ]
    // const rightAction: MenuItemProps<any>[] = [
    //     {
    //         title: 'Export',
    //         icon: 'export',
    //         onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => { console.log("!exported") },
    //     }
    // ]
    //prevent re-render with  another props
    const PrintListComp = useMemo(() => <PrintListComponent ref={refPrinterList} data={[]}
        handleRefreshList={onHandleRefreshList}
        handleClickModal={onOpenModal} />,
        [onOpenModal]);

    return (
        <Grid container >

            <ActionMenuComponent leftAction={leftAction} rightAction={/*rightAction*/[]} />
            <PrinterSearchFormComponent isLoading={isLoadingList} handleSearch={handleOnSearch} ref={refPrinterSearchForm} />
            {PrintListComp}
            {dialogProps.open && <PrinterDialogForm
                type={dialogProps.type}
                onSubmit={onSubmitModal}
                onClose={onCloseModal}
                open={dialogProps.open}
                rowData={dialogProps.rowData} />}
        </Grid>

    );
}

export default React.memo(PrinterContainer);