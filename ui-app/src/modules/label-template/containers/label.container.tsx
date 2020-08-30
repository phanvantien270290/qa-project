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
import LabelTemplateListComponent, { refLabelTemplateListProps } from '../components/label-list.component';
import LabelTemplateSearchFormComponent, { refLabelTemplateSearchProps } from '../components/label-search-form.component';
import LabelTemplateDialogForm from '../components/label-dialog/label-dialog.component';
import ActionMenuComponent, { MenuItemWithComboboxProps } from '../../../components/action-menu/action-menu.component';
import Grid from '@material-ui/core/Grid';
import { ILabelTemplate, ILabelTemplateNullable } from '../../../interfaces/label-template.interface';

import { getListPartners } from '../../../store/otherStore/actions';
interface initDialogProps {
    type?: IActionTypes;
    rowData?: ILabelTemplate;
    open: boolean;
}

const LabelTemplateContainer = () => {
    const dispatch = useDispatch();
    const isLoadingList = useSelector((state: IState) => state.labelTemplate.getList.loading);
    const refLabelTemplateList = useRef<refLabelTemplateListProps>(null);
    const refLabelTemplateSearchForm = useRef<refLabelTemplateSearchProps>(null);
    const [dialogProps, setDialogProps] = React.useState<initDialogProps>({ type: "create", rowData: {}, open: false });
    const onOpenModal = useCallback((typeAction: IActionTypes, rowData?: ILabelTemplate) => {

        setDialogProps({
            ...dialogProps,
            type: typeAction,
            rowData,
            open: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onCloseModal = (newLabelTemplate?: ILabelTemplateNullable) => {
        setDialogProps({
            ...dialogProps,
            open: false
        })
    }
    const onHandleRefreshList = () => {
        refLabelTemplateSearchForm.current?.handleRefreshList();
    }
    const onSubmitModal = useCallback((newData?: ILabelTemplateNullable, typeAction?: IActionTypes) => {

        refLabelTemplateList.current?.refreshData();
        onCloseModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleOnSearch = (): void => {
        handleRefreshPage();
    }
    const handleRefreshPage = (): void => {
        refLabelTemplateList.current?.refreshPage();
    }
    const leftAction: MenuItemWithComboboxProps<any>[] = [
        {
            title: 'new Template', icon: 'add_circle_outled',
            disabled: isLoadingList,
            onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                onOpenModal('create', {});
            }
        },
        {
            title: 'Search', icon: 'search',
            disabled: isLoadingList,
            onClick: handleOnSearch

        }
    ]
    //prevent re-render with  another props
    const LabelTemplateListComp = useMemo(() => <LabelTemplateListComponent ref={refLabelTemplateList} data={[]}
        handleRefreshList={onHandleRefreshList}
        handleClickModal={onOpenModal} />,
        [onOpenModal]);
    useEffect(() => {
        dispatch(getListPartners());
    }, [dispatch])
    return (
        <Grid container >

            <ActionMenuComponent leftAction={leftAction} />
            <LabelTemplateSearchFormComponent
                isLoading={isLoadingList}
                handleSearch={handleOnSearch} ref={refLabelTemplateSearchForm} />
            {LabelTemplateListComp}
            {dialogProps.open && <LabelTemplateDialogForm
                type={dialogProps.type}
                onSubmit={onSubmitModal}
                onClose={onCloseModal}
                open={dialogProps.open}
                rowData={dialogProps.rowData} />}
        </Grid>

    );
}

export default React.memo(LabelTemplateContainer);