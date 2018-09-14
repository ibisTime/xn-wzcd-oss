import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/postloantools/installGps';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    getRoleCode
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.postloantoolsInstallGps,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class InstallGps extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '合同编号',
            field: 'bankContractCode'
        }, {
            title: '品牌型号',
            field: 'carBrand1',
            render: (v, d) => {
                return (typeof d.carBrand === 'undefined' ? '' : d.carBrand) + (typeof d.carModel === 'undefined' ? '' : d.carModel);
            }
        }, {
            title: '业务员',
            field: 'saleUserName'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                toVoid: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/installGps/toVoid?code=${selectedRowKeys[0]}`);
                    }
                },
                enter: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/installGps/enter?code=${selectedRowKeys[0]}&edit=1`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/installGps/addedit?code=${selectedRowKeys[0]}&edit=1&v=1`);
                    }
                }
            }
        });
    }
}

export default InstallGps;
