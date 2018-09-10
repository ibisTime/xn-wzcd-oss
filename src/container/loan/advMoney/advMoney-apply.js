import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyUppercase,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';
import { Form } from 'antd';

@Form.create()
export default class AdvMoneyApply extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.setState({
            moneyFrom: false
        });
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'budgetCode',
            readonly: true
        }, {
            title: '业务公司',
            field: 'bizCompanyName',
            readonly: true
        }, {
            title: '汽车经销商',
            field: 'carDealerName',
            readonly: true
        }, {
            title: '用款小写',
            field: 'useAmount',
            amount: true,
            readonly: true
        }, {
            title: '用款大写',
            field: 'money',
            formatter: (v, d) => {
                return moneyUppercase(moneyFormat(d.useAmount));
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
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
            onChange: (v) => {
                this.setState({
                    moneyFrom: v === '1'
                });
            },
            required: true
        }, {
            title: '金额来源',
            field: 'fundSource',
            type: 'select',
            key: 'fund_source',
            required: true,
            hidden: !this.state.moneyFrom
        }, {
            title: '收款银行',
            field: 'collectBankName1',
            formatter: (v, d) => {
                return d.collectBankName + '-' + d.collectAccountName;
            },
            readonly: true
        }, {
            title: '收款银行账号',
            field: 'collectionAccountNo',
            readonly: true
        }, {
            title: '撤销理由',
            field: 'cancelReason',
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186,
            buttons: [{
              title: '发送',
              check: true,
              handler: (params) => {
                this.doFetching();
                params.operator = getUserId();
                fetch(632170, params).then(() => {
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
