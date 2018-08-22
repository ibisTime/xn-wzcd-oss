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
} from '@redux/basis/bonusesConfigure';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.basisBonusesConfigure,
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
class BonusesConfigure extends React.Component {
    render() {
        const fields = [{
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            required: true,
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '提成单价',
            field: 'unitPrice',
            amount: true,
            required: true
        }, {
            title: '本月比例',
            field: 'monthRate',
            number: true,
            required: true
        }, {
            title: '留存月数',
            field: 'retainMonths',
            'Z+': true,
            required: true
        }, {
            title: '起始金额',
            field: 'startAmount',
            amount: true,
            required: true
        }, {
            title: '结束金额',
            field: 'endAmount',
            amount: true,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: '最新修改人',
            field: 'updaterName'
        }, {
            title: '最新修改时间',
            field: 'updaterDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632405,
            rowKey: 'id',
            deleteCode: 632401
        });
    }
}

export default BonusesConfigure;