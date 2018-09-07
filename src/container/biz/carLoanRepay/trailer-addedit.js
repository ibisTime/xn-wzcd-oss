import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-addedit';
import {
    getQueryString
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class trailerAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
          ...this.state,
          dealResult: ''
        };
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName'
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            }
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '车辆型号',
            field: 'carModel',
            formatter: (v, d) => {
                return d.budgetOrder.carModel;
            }
        }, {
            title: '车牌号',
            field: 'carNo',
            formatter: (v, d) => {
                return d.budgetOrder.carNumber;
            }
        }, {
            title: '代偿欠款',
            field: 'dcAmount'
        }, {
            title: '处理结果',
            field: 'dealResult',
            type: 'select',
            key: 'tc_deal_result',
            onChange: (v, data) => {
                this.setState({
                    dealResult: v
                });
            }
        }, {
            title: '出售价格',
            field: 'sellPrice',
            amount: true,
            hidden: this.state.dealResult !== '2'
        }, {
            title: '保证金',
            field: 'deposit',
            amount: true,
            hidden: this.state.dealResult !== '1'
        }, {
            title: '代偿预算单',
            field: 'ReplaceRepayCode',
            type: 'select',
            listCode: 632327,
            params: {
                status: 4,
                bizCode: this.code
            },
            keyName: 'code',
            valueName: '{{receiptRealName.DATA}}-{{code.DATA}}',
            hidden: this.state.dealResult !== '5'
        }, {
            title: '处理结果说明',
            field: 'remark',
            type: 'textarea',
            normalArea: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
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
        }];
        return this.buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521
            });
    }
}