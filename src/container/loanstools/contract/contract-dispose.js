import {
    getQueryString,
    showSucMsg,
    getUserId,
    getRoleCode,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class ContractDispose extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.budgetOrderCode = getQueryString('budgetOrderCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
          ...this.state
        };
    }

    render() {
        const fields = [{
            title: '不匹配原因',
            field: 'applyUserName',
            value: '信息不匹配',
            readonly: true
        }, {
            title: '导入日期',
            field: 'importDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'bankName',
            readonly: true
        }, {
            title: '对应业务',
            field: 'budgetOrderCode',
            type: 'select',
            pageCode: 632148,
            params: {
                roleCode: getRoleCode(),
                is_end: '0',
                currentUserCompanyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: '{{code.DATA}}-{{customerName.DATA}}',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632256,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.operator = getUserId();
                    delete param.loanAmount;
                    this.doFetching();
                    fetch(632251, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}