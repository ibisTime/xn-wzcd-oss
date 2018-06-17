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
    getUserId
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
                this.props.setPageData({bcode: data.code});
            }
        }, {
            title: '预算单',
            field: 'bcode',
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
