import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-apply';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('staffCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: '业务编号',
            value: this.code
        }, {
            title: '客户姓名',
            field: 'name',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true,
            formatter: (v, d) => {
                return d.user.idNo;
            }
        }, {
            title: '选择预算单',
            field: '111',
            type: 'select',
            key: '',
            required: true
        }, {
            title: '代偿类型',
            field: '99',
            type: 'select',
            key: '99',
            readonly: true
        }, {
            title: '预算金额',
            field: '88',
            amount: true,
            readonly: true
        }, {
            title: '预算金额大写',
            field: '77',
            readonly: true
        }, {
            title: '收款人姓名',
            field: '66',
            readonly: true
        }, {
            title: '收款人开户行',
            field: '55',
            readonly: true
        }, {
            title: '收款人账号',
            field: '44',
            readonly: true
        }, {
            title: '典当行',
            field: '33',
            readonly: true
        }, {
            title: '是否加急',
            field: '22',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            readonly: true
        }, {
            title: '代偿说明',
            field: '11',
            readonly: true
        }, {
            title: '与我司过往是否有纠纷',
            field: 'isPlatIssue',
            type: 'select',
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
            title: '代偿后采取的方式',
            field: 'takeWay',
            type: 'select',
            key: 'take_way'
        }, {
            title: '申请代偿理由',
            field: 'applyReason'
        }, {
            title: '暂缓起诉(天)',
            field: 'deferDays',
            number: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541
            });
    }
}

export default OverdueListApply;
