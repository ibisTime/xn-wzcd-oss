import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Table, DatePicker } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import {
    getQueryString
} from 'common/js/util';
import './dealer-addedit.css';

const FormItem = Form.Item;

class DealerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            data1: []
        };
    }
    componentDidMount() {
        // ajax    getListProduct().then((data) => {this.setState({data1: data});})
    }
    render() {
        const RangePicker = DatePicker.RangePicker;
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '开户行',
            dataIndex: 'name'
        }, {
            title: '户名',
            dataIndex: 'money'
        }, {
            title: '账号',
            dataIndex: 'address'
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park'
        }, {
            key: '2',
            name: 'Jim Green',
            money: '￥1,256,000.00',
            address: 'London No. 1 Lake Park'
        }, {
            key: '3',
            name: 'Joe Black',
            money: '￥120,000.00',
            address: 'Sidney No. 1 Lake Park'
        }];
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }]
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="全称"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="简称"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否自主开发"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Select>
                            <Option value="0" >否</Option>
                            <Option value="1" >是</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="地址"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="车行经营性质"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Select>
                            <Option value="0" >综合店</Option>
                            <Option value="1" >4S店</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主要联系人"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系人电话"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            message: 'Please input your E-mail!'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主营品牌"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属集团"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="合作协议有效期"
                    >
                    {getFieldDecorator('range-picker')(
                        <RangePicker />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="车商合作协议"
                    >
                    {getFieldDecorator('range-picker')(
                        <RangePicker />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结算方式"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Select>
                            <Option value="0" >现结</Option>
                            <Option value="1" >月结</Option>
                            <Option value="1" >季节</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="业务区域"
                >
                    {getFieldDecorator('email')(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="归属分公司"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => '经销商收款账号'}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => '工行返点账号'}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => '中行返点账号'}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={() => '建行返点账号'}
                />
                <table border="1" cellpadding="0" cellspacing="0" margin="0">
                    <tr>
                        <td>项目</td>
                        <td>
                            <div className="b1">我司基准利率</div>
                            <div className="of">
                                <div className="fl w33 br1">12期</div>
                                <div className="fl w33 br1">24期</div>
                                <div className="fl w33">36期</div>
                            </div>
                        </td>
                        <td>担保费</td>
                        <td>垫资费</td>
                        <td>履约保证金</td>
                        <td>GPS</td>
                        <td>杂费</td>
                        <td>介绍费</td>
                        <td>返点税点</td>
                        <td>是否垫资</td>
                        <td>
                            <div className="b1">保险代理费</div>
                            <div className="of">
                                <div className="fl w33 br1">1年</div>
                                <div className="fl w33 br1">2年</div>
                                <div className="fl w33">3年</div>
                            </div>
                        </td>
                        </tr>
                    <tr>
                        <td>申请政策</td>
                        <td>
                            <tr>
                                <td>工行</td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                            </tr>
                            <tr>
                                <td>工行</td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                            </tr>
                            <tr>
                                <td>工行</td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                                <td>
                                    <tr>传统</tr>
                                    <tr>0.9</tr>
                                </td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </Form>
        );
    }
}

export default Form.create()(DealerAddedit);