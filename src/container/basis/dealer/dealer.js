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
} from '@redux/basis/dealer';
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
        ...state.basisDealer,
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
class Dealer extends React.Component {
    render() {
        const fields = [{
            title: '经销商编号',
            field: 'code'
        }, {
            title: '经销商简称',
            field: 'abbrName',
            search: true
        }, {
            title: '经销商全程',
            field: 'fullName'
        }, {
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            required: true,
            search: true,
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
            title: '车行经营性质',
            field: 'carDealerType'
        }, {
            title: '所属分公司',
            field: 'belongBranchCompany'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632065,
            btnEvent: {
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/basis/dealer/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default Dealer;