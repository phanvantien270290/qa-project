/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FortinetListComponent, { refFortinetListProps } from '../components/fortinet-list.component';
import FortinetSearchFormComponent, { refFortinetSearchProps } from '../components/fortinet-search-form.component';
import FortinetDialogForm from '../components/fortinet-dialog/fortinet-print-dialog.component';
import ActionMenuComponent, { MenuItemWithComboboxProps } from '../../../components/action-menu/action-menu.component';
import Grid from '@material-ui/core/Grid';
import { IItemMaster, IItemMasterNullable } from '../../../interfaces/item-master.interface';

import { getListItemsCombobox } from '../../../store/otherStore/actions';

interface initDialogProps {
    rowData?: IItemMaster[];
    open: boolean;
}

const FortinetContainer = () => {
    const dispatch = useDispatch();
    const isLoadingList = useSelector((state: IState) => state.fortinet.getList.loading);
    const refFortinetList = useRef<refFortinetListProps>(null);
    const refFortinetSearchForm = useRef<refFortinetSearchProps>(null);
    const [dialogProps, setDialogProps] = React.useState<initDialogProps>({ rowData: [], open: false });
    const onOpenModal = useCallback((rowData?: IItemMaster[]) => {

        setDialogProps({
            ...dialogProps,
            rowData,
            open: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onCloseModal = (newFortinet?: IItemMasterNullable) => {
        setDialogProps({
            ...dialogProps,
            open: false
        })
    }
    const onHandleRefreshList = () => {
        refFortinetSearchForm.current?.handleRefreshList();
    }
    const onSubmitModal = useCallback((newData?: IItemMasterNullable) => {

        refFortinetList.current?.refreshData();
        onCloseModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleOnSearch = (): void => {
        handleRefreshPage();
    }
    const handleRefreshPage = (): void => {
        refFortinetList.current?.refreshPage();
    }
    const leftAction: MenuItemWithComboboxProps<any>[] = [

        {
            title: 'UPLOAD DATA', icon: 'get_app',
            disabled: isLoadingList,
            onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                onOpenModal([]);
            }
        },
        {
            title: 'Search', icon: 'search',
            disabled: isLoadingList,
            onClick: handleOnSearch
        }
    ]
    //prevent re-render with  another props
    const FortinetListComp = useMemo(() => <FortinetListComponent ref={refFortinetList} data={[]}
        handleRefreshList={onHandleRefreshList}
        handleClickModal={onOpenModal} />,
        [onOpenModal]);
    useEffect(() => {
        const searchParams: ISearchParams = { searchFields: { custId: 'FORTINET' } }
        dispatch(getListItemsCombobox(searchParams));
    }, [dispatch])
    return (
        <Grid container >

            <ActionMenuComponent leftAction={leftAction} />
            <FortinetSearchFormComponent
                isLoading={isLoadingList}
                handleSearch={handleOnSearch} ref={refFortinetSearchForm} />
            {FortinetListComp}
            {dialogProps.open && <FortinetDialogForm
                onSubmit={onSubmitModal}
                onClose={onCloseModal}
                open={dialogProps.open}
                rowData={dialogProps.rowData} />}
        </Grid>

    );
}

export default React.memo(FortinetContainer);