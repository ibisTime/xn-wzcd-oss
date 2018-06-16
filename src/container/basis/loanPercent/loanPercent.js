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
} from '@redux/basis/loanPercent';
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
        ...state.basisLoanPercent,
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
class loanPercent extends React.Component {
    render() {
        const fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            data: [{
                key: '1',
                value: '新车'
            }, {
                key: '2',
                value: '二手车'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '最低贷款成数',
            field: 'minCs'
        }, {
            title: '最高贷款成数',
            field: 'maxCs'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632085
        });
    }
}

export default loanPercent;