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
} from '@redux/loan/archives';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    getRoleCode,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    Modal
} from 'antd';
import {
    done
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loaNarchives,
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
class Archives extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '合同编号',
            field: 'bankContractCode'
        }, {
            title: '品牌型号',
            field: 'carBrand'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '状态',
            field: 'enterFileStatus',
            type: 'select',
            key: 'enter_file_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
              roleCode: getRoleCode(),
              enterFileStatusList: ['0', '1', '2'],
              currentUserCompanyCode: getCompanyCode()
            },
            btnEvent: {
                entering: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].enterFileStatus === '2') {
                        showWarnMsg('当前状态不可以补录');
                    } else {
                        this.props.history.push(`/loan/archives/enter?code=${selectedRowKeys[0]}`);
                    }
                },
                print: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确认套打？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(632201, {code: selectedRowKeys[0]}).then(() => {
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                },
                print1: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确认套打2？',
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(632202, {code: selectedRowKeys[0]}).then(() => {
                                    showWarnMsg('操作成功');
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 500);
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default Archives;
