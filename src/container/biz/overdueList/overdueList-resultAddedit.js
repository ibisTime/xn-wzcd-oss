import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class OverdueListResultAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
          ...this.state,
          isOverdueDeposit: true,
          isRealRepayAmount: true
        };
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.repayPlan.repayBiz.budgetOrder.customerName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.repayPlan.repayBiz.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.repayPlan.user.idNo;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayPlan.repayBiz.loanAmount);
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                return d.repayPlan.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayPlan.repayBiz.restOverdueAmount);
            },
            readonly: true
        }, {
            title: '处理历史',
            field: 'remindLogList',
            type: 'o2m',
            _keys: ['repayPlan', 'remindLogList'],
            options: {
                noSelect: true,
                fields: [{
                    title: '催收方式',
                    field: 'way',
                    type: 'select',
                    key: 'way'
                }, {
                    title: '催收对象',
                    field: 'toUser'
                }, {
                    title: '催收文本',
                    field: 'content'
                }, {
                    title: '催收时间',
                    field: 'createDatetime',
                    type: 'date'
                }]
            }
        }, {
            title: '催收结果',
            field: 'collectionResult',
            type: 'select',
            key: 'collection_result',
            onChange: (v) => {
                this.setState({
                    isOverdueDeposit: v === 'part_repay'
                });
            },
            readonly: true
        }, {
            title: '是否提供保证金',
            field: 'depositIsProvide',
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
                    isRealRepayAmount: v === '1'
                });
            },
            readonly: true
        }, {
            title: '违约保证金',
            field: 'overdueDeposit',
            amount: true,
            hidden: !this.state.isRealRepayAmount,
            readonly: true
        }, {
            title: '实际还款金额',
            field: 'realRepayAmount',
            amount: true,
            hidden: !this.state.isOverdueDeposit,
            readonly: true
        }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            _keys: ['repayPlan', 'costList'],
            options: {
                noSelect: true,
                fields: [{
                    title: '费用项',
                    field: 'item'
                }, {
                    title: '金额（元）',
                    field: 'amount',
                    amount: true
                }, {
                    title: '发生时间',
                    field: 'payDatetime',
                    type: 'date'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }, {
            title: '催收情况说明',
            field: 'collectionResultNote',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }];
        return this
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630539
            });
    }
}
