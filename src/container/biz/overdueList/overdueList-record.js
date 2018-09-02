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
} from '@redux/biz/overdueList/overdueList-record';
import {
    listWrapper
} from 'common/js/build-list';
import { getQueryString, showWarnMsg } from 'common/js/util';

@listWrapper(state => ({
    ...state.bizOverdueListRecord,
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
})
class OverdueListRecord extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '记录人',
            field: 'operatorName'
        }, {
            title: '记录时间',
            field: 'updateDatetime',
            type: 'date'
        }, {
            title: '催收情况说明',
            field: 'collectionProcessNote' || 'collectionResultNote'
        }, {
            title: '类型',
            field: 'collectionType',
            type: 'select',
            data: [{
                key: '0',
                value: '催收过程'
            }, {
                key: '1',
                value: '催收结果'
            }],
            keyName: 'key',
            valueName: 'value',
            serach: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630538,
            searchParams: {
                repayPlanCode: this.code
            },
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        if(selectedRows[0].collectionType === '0') {
                            this.props.history.push(`/biz/overdueList/record/processAddedit?v=1&code=${selectedRowKeys[0]}`);
                        } else if(selectedRows[0].collectionType === '0') {
                            this.props.history.push(`/biz/overdueList/record/resultAddedit?v=1&code=${selectedRowKeys[0]}`);
                        }
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

export default OverdueListRecord;