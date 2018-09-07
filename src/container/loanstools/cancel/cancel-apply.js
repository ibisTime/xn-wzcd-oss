import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/cancel-apply';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat,
    dateFormat
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsCancelApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CancelApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '客户姓名',
            field: 'code',
            type: 'select',
            pageCode: 632145,
            keyName: 'code',
            valueName: '{{customerName.DATA}}-{{code.DATA}}',
            searchName: 'customerName',
            required: true,
            onChange: (v, data) => {
                fetch(632146, {code: data.code}).then(info => {
                    this.props.setPageData({
                        ...this.props.pageData,
                        loanAmount: moneyFormat(info.loanAmount),
                        idNo: info.idNo,
                        bcode: data.code,
                        dztime: data.advanceFund ? dateFormat(data.advanceFund.advanceFundDatetime) : ''
                    });
                });
            }
        }, {
            title: '预算单',
            field: 'bcode',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true
        }, {
            title: '身份证号',
            field: 'idNo',
            readonly: true
        }, {
            title: '垫资日期',
            field: 'dztime',
            readonly: true
        }, {
            title: '作废原因',
            field: 'zfReason',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632270, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default CancelApply;
