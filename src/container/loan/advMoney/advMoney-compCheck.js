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
export default class AdvMoneyAreaCheck extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.setState({
            moneyFrom: false,
            isRemark: false
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
            readonly: true
        }, {
            title: '金额来源',
            field: 'fundSource',
            type: 'select',
            key: 'fund_source',
            readonly: true,
            hidden: !this.state.moneyFrom
        }, {
            title: '收款银行',
            field: 'collectBankName',
            formatter: (v, d) => {
                return d.collectBankName + '-' + d.collectAccountName;
            },
            readonly: true
        }, {
            title: '收款银行账号',
            field: 'collectionAccountNo',
            readonly: true
        }, {
            title: '流程日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: {
              refOrder: this.code
            },
            options: {
              rowKey: 'id',
              noSelect: true,
              fields: [{
                title: '操作人',
                field: 'operatorName'
              }, {
                title: '开始时间',
                field: 'startDatetime',
                type: 'datetime'
              }, {
                title: '结束时间',
                field: 'endDatetime',
                type: 'datetime'
              }, {
                title: '花费时长',
                field: 'speedTime'
              }, {
                title: '审核意见',
                field: 'dealNote'
            }, {
                title: '当前节点',
                field: 'dealNode',
                type: 'select',
                listCode: 630147,
                keyName: 'code',
                valueName: 'name'
              }]
            }
        }, {
            title: '审核意见',
            field: 'approveNote',
            required: true,
            type: 'select',
            key: 'approve_note',
            onChange: (v) => {
                this.setState({
                    isRemark: v === '99'
                });
            }
        }, {
            title: '备注',
            field: 'remark',
            required: true,
            hidden: !this.state.isRemark
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.doFetching();
                fetch(632172, param).then(() => {
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
              title: '不通过',
              handler: (param) => {
                param.approveResult = '0';
                param.operator = getUserId();
                this.doFetching();
                fetch(632172, param).then(() => {
                  showSucMsg('操作成功');
                  this.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.cancelFetching);
              },
              check: true
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}
