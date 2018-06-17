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
            title: '经销商全称',
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
            field: 'carDealerType',
            render: (v) => {
              let dict = {
                '0': '综合店',
                '1': '4S店'
              };
              return dict[v];
            }
        }, {
            title: '所属分公司',
            field: 'belongBranchCompany',
            type: 'select',
            listCode: 630106,
            params: {
              typeList: [1],
              status: 1
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632065,
            btnEvent: {
              edit: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].curNodeCode !== '006_02' && selectedRows[0].curNodeCode !== '006_03') {
                  showWarnMsg('当前节点不可修改');
                } else {
                  this.props.history.push(`/basis/dealer/addedit?code=${selectedRowKeys[0]}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].curNodeCode !== '006_01') {
                  showWarnMsg('当前不是审核节点');
                } else {
                  this.props.history.push(`/basis/dealer/addedit?v=1&check=1&code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default Dealer;
