import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    tempString,
    moneyFormat,
    getUserId
} from 'common/js/util';
import { readXls } from 'common/js/xlsx-util';
import { Form, Select, Upload, Button, Icon, Table } from 'antd';
import fetch from 'common/js/fetch';
import { tailFormItemLayout } from 'common/js/config';

const {Item: FormItem} = Form;
const {Option} = Select;

@Form.create()
class ContractImport extends React.Component {
    constructor(props) {
        super(props);
        let ICBCcols = [{
            title: '序号',
            dataIndex: 'id'
        }, {
            title: '客户姓名',
            dataIndex: 'customerName'
        }, {
            title: '贷款额',
            dataIndex: 'loanAmount',
            render: moneyFormat
        }, {
            title: '卡号',
            dataIndex: 'bankCardNumber'
        }, {
            title: '账单日',
            dataIndex: 'billDatetime'
        }, {
            title: '放款时间',
            dataIndex: 'bankfktime'
        }, {
            title: '利率',
            dataIndex: 'bankRate'
        }, {
            title: '合同编号',
            dataIndex: 'contractCode'
        }, {
            title: '合同时间',
            dataIndex: 'contractSignDate'
        }, {
            title: '生成日期',
            dataIndex: 'sctime',
            type: 'date'
        }, {
            title: '客户编号',
            dataIndex: 'userCode'
        }, {
            title: '身份证号',
            dataIndex: 'idNo'
        }];
        let CCBcols = [{
            title: '放款时间',
            dataIndex: 'repayBankDate'
        }, {
            title: '客户姓名',
            dataIndex: 'customerName'
        }, {
            title: '贷款额',
            dataIndex: 'loanAmount',
            render: moneyFormat
        }, {
            title: '卡号',
            dataIndex: 'bankCardNumber'
        }, {
            title: '身份证号',
            dataIndex: 'idNo'
        }, {
            title: '合同编号',
            dataIndex: 'contractCode'
        }, {
            title: '合同时间',
            dataIndex: 'contractSignDate'
        }];
        let BOCcols = [{
            title: '经销商',
            dataIndex: 'carDealerName'
        }, {
            title: '信用卡',
            dataIndex: 'bankCardTime'
        }, {
            title: '受理时间',
            dataIndex: 'receiveTime'
        }, {
            title: '合同编号',
            dataIndex: 'contractCode'
        }, {
            title: '销售员',
            dataIndex: 'sealName'
        }, {
            title: '客户姓名',
            dataIndex: 'customerName'
        }, {
            title: '身份证号',
            dataIndex: 'idNo'
        }, {
            title: '卡号',
            dataIndex: 'bankCardNumber'
        }, {
            title: '账单日',
            dataIndex: 'billDatetime'
        }, {
            title: '发票价格',
            dataIndex: 'invoicePrice',
            render: moneyFormat
        }, {
            title: '贷款额',
            dataIndex: 'loanAmount',
            render: moneyFormat
        }, {
            title: '刷卡日期',
            dataIndex: 'useTime'
        }, {
            title: '手续费',
            dataIndex: 'fee',
            render: moneyFormat
        }, {
            title: '担保手续费',
            dataIndex: 'dbFee',
            render: moneyFormat
        }, {
            title: '入账金额',
            dataIndex: 'receiveMoney',
            render: moneyFormat
        }, {
            title: '手续费率',
            dataIndex: 'feeRate'
        }, {
            title: '刷卡期数',
            dataIndex: 'cardPeriods'
        }, {
            title: '合同签订日',
            dataIndex: 'contractSignDate'
        }, {
            title: '抵押状态',
            dataIndex: 'status'
        }, {
            title: '备注',
            dataIndex: 'remark'
        }, {
            title: '结清时间',
            dataIndex: 'closeDatetime'
        }, {
            title: '收款人',
            dataIndex: 'receivePeople'
        }, {
            title: '备注',
            dataIndex: 'remark1'
        }, {
            title: '征信未移入',
            dataIndex: 'noRemove'
        }];
        this.state = {
            data: [],
            ICBCcols: ICBCcols,
            CCBcols: CCBcols,
            BOCcols: BOCcols,
            fileList: [],
            loanBank: {
                title: '贷款银行编号',
                field: 'loanBankCode',
                keyName: 'code',
                valueName: '{{bankName.DATA}}-{{abbrName.DATA}}'
            },
            loanBankData: [],
            bankType: ''
        };
    }

    componentDidMount() {
        fetch(632057, {}).then((data) => {
            this.setState({
                loanBankData: data
            });
        });
    }

    handleChange = (file) => {
        readXls(file).then(XLSXData => {
            for (let i = XLSXData.length; i > 0;) {
                if (XLSXData[--i].length) {
                    break;
                } else {
                    XLSXData.splice(i, 1);
                }
            }
            let data = [];
            delete XLSXData[0];
            if (this.state.bankType === 'ICBC') {
                XLSXData.forEach((item, i) => {
                    data.push({
                        id: item[0],
                        customerName: item[0 + 1],
                        loanAmount: item[1 + 1] * 1000,
                        bankCardNumber: item[2 + 1],
                        billDatetime: item[3 + 1],
                        bankfktime: item[4 + 1],
                        bankRate: item[5 + 1],
                        contractCode: item[6 + 1],
                        contractSignDate: item[7 + 1],
                        sctime: item[8 + 1],
                        userCode: item[9 + 1],
                        idNo: item[10 + 1]
                    });
                });
            } else if (this.state.bankType === 'CCB') {
                XLSXData.forEach((item, i) => {
                    data.push({
                        code: i,
                        bankfktime: item[0],
                        customerName: item[1],
                        loanAmount: item[2] * 1000,
                        bankCardNumber: item[3],
                        idNo: item[4],
                        contractCode: item[5] * 1000,
                        contractSignDate: item[6]
                    });
                });
            } else if (this.state.bankType === 'BOC') {
                XLSXData.forEach((item, i) => {
                    data.push({
                        id: i,
                        carDealerName: item[0],
                        bankCardTime: item[1],
                        receiveTime: item[2],
                        contractCode: item[3],
                        sealName: item[4],
                        customerName: item[5],
                        idNo: item[6],
                        bankCardNumber: item[7],
                        billDatetime: item[8],
                        invoicePrice: item[9] * 1000 * 10000,
                        loanAmount: item[10] * 1000,
                        useTime: item[11],
                        fee: item[12] * 1000,
                        dbFee: item[13] * 1000,
                        receiveMoney: item[14] * 1000,
                        feeRate: item[15],
                        cardPeriods: item[16],
                        contractSignDate: item[17],
                        status: item[18],
                        remark: item[19],
                        closeDatetime: item[20],
                        receivePeople: item[21],
                        remark1: item[22],
                        noRemove: item[23]
                    });
                });
            }
            this.setState({
                data: data
            });
        }).catch(msg => showWarnMsg(msg));
    }

    // 确认导入
    handleImprot = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let param = {};
            param.loanBankCode = values.loanBankCode;
            param.contractList = this.state.data;
            param.operator = getUserId();
            fetch(632250, param).then(() => {
                showSucMsg('导入成功');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }).catch(this.props.cancelFetching);
        });
    }

    getSelectProps = (item) => {
        const props = {
            showSearch: true,
            allowClear: true,
            optionFilterProp: 'children',
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            style: {width: '100%'},
            placeholder: '请选择',
            onChange: (v) => {
                if (v) {
                    this.state.loanBankData.forEach(l => {
                        if (l.code === v) {
                            this.setState({ bankType: l.bankType });
                        }
                    });
                } else {
                    this.setState({ bankType: '' });
                }
            }
        };
        return props;
    }

    render() {
        const _this = this;
        const {getFieldDecorator} = this.props.form;
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({ fileList: [info.file] });
                }
                if (info.file.status === 'done') {
                } else if (info.file.status === 'error') {
                }
            },
            beforeUpload(file) {
                if (!file) {
                    return false;
                }
                _this.handleChange(file);
                return false;
            },
            fileList: _this.state.fileList
        };

        return (
            <Form>
                <FormItem key={this.state.loanBank.field}
                          label={this.state.loanBank.title}>
                    { getFieldDecorator(this.state.loanBank.field, {
                        rules: [{
                            required: true,
                            message: '必填字段'
                        }],
                        initialValue: ''
                    })(
                        <Select {...this.getSelectProps(this.state.loanBank)}>
                            {this.state.loanBankData.map(d => (
                            <Option key={d[this.state.loanBank.keyName]}
                                    value={d[this.state.loanBank.keyName]}>{tempString(this.state.loanBank.valueName, d)}</Option>))}
                        </Select>)}
                </FormItem>
                <FormItem label='合同名单' >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/>选择文件
                        </Button>
                    </Upload>
                </FormItem>
                <div className="table-wrapper">
                {
                    this.state.bankType === 'ICBC' ? <Table bordered rowKey={record => record['id']} dataSource={this.state.data} columns={this.state.ICBCcols} />
                    : this.state.bankType === 'CCB' ? <Table bordered rowKey={record => record['code']} dataSource={this.state.data} columns={this.state.CCBcols} />
                    : this.state.bankType === 'BOC' ? <Table bordered rowKey={record => record['id']} dataSource={this.state.data} columns={this.state.BOCcols} />
                    : <Table bordered rowKey={record => record['id']} dataSource={this.state.data} columns={this.state.BOCcols} />
                }
                </div>
                <FormItem style={{marginTop: 30}} {...tailFormItemLayout}>
                    <Button type="primary" key="importBtn" onClick={() => {
                        this.handleImprot();
                    }}>确认导入</Button>
                    <Button type="primary" key="backBtn" style={{marginLeft: 30}} onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </FormItem>
            </Form>
        );
    }
}

export default ContractImport;
