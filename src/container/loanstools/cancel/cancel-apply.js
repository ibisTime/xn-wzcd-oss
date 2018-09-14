import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat,
    dateFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class CancelApply extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state
        };
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
            onChange: (v, data, c) => {
                fetch(632146, {code: v}).then(info => {
                    this.setState({
                        pageData: {
                            ...this.state.pageData,
                            loanAmount: moneyFormat(info.loanAmount),
                            idNo: info.idNo,
                            bcode: v,
                            dztime: info.advanceFund ? dateFormat(info.advanceFund.advanceFundDatetime) : ''
                        }
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
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.operator = getUserId();
                    this.doFetching();
                    fetch(632270, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.cancelFetching();
                    }).catch(this.cancelFetching);
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
