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
} from '@redux/finance/prepayment';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    dateTimeFormat,
    getRoleCode
} from 'common/js/util';
import {
    Modal
} from 'antd';
import {
    rebateList
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.financePrepayment,
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
class Prepayment extends React.Component {
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true,
            render: (v, data) => {
                return data.companyName ? data.companyName : '-';
            }
        }, {
            field: 'totalAdvanceFund',
            title: '垫资总额',
            amount: true
        }, {
            field: 'hasAdvanceFund',
            title: '已垫资金额',
            amount: true
        }, {
            field: 'unAdvanceFund',
            title: '未垫资金额',
            amount: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'companyCode',
            pageCode: 632178
        });
    }
}

export default Prepayment;