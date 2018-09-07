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
} from '@redux/basis/subbranch';
import {
    listWrapper
} from 'common/js/build-list';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';
import {
    Modal
} from 'antd';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.basisSubbranch,
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
class Subbranch extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '支行简称',
            field: 'abbrName',
            search: true
        }, {
            title: '开户行',
            field: 'openBank'
        }, {
            title: '支行全称',
            field: 'fullName'
        }, {
            title: '银行委托人',
            field: 'bankClient'
        }, {
            title: '委托有效期',
            field: 'clientValidDate'
        }, {
            title: '授权人姓名',
            field: 'autherName'
        }, {
            title: '授权人电话',
            field: 'phoneNumber'
        }, {
            title: '更新人',
            field: 'updater'
        }, {
            title: '最新修改时间',
            field: 'updateDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632055,
            searchParams: {
                bankCode: this.code
            },
            buttons: [{
                code: 'add',
                name: '新增',
                handler: () => {
                    this.props.history.push(`/basis/bank/subbranch/addedit?bankCode=${this.code}`);
                }
            }, {
                code: 'edit',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/basis/bank/subbranch/addedit?bankCode=${this.code}&code=${selectedRowKeys[0]}`);
                    }
                }
            }, {
                code: 'delete',
                name: '删除',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定删除？',
                            onOk: () => {
                                this.props.doFetching();
                                fetch(632051, {
                                    userId: selectedRows[0].userId,
                                    updater: getUserId()
                                }).then(() => {
                                    showSucMsg('操作成功');
                                    this.props.cancelFetching();
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 1000);
                                }).catch(this.props.cancelFetching);
                            }
                        });
                    }
                }
            }, {
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/basis/bank/subbranch/addedit?v=1&bankCode=${this.code}&code=${selectedRowKeys[0]}`);
                    }
                }
            }, {
                code: 'goBack',
                name: '返回',
                handler: (selectedRowKeys, selectedRows) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default Subbranch;