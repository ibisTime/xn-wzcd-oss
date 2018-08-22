import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin} from 'antd';
import {initData} from '@redux/analysis/insuranceAmount';
import {moneyFormat} from 'common/js/util';

const {Meta} = Card;

@connect(
    state => state.analysisInsuranceAmount,
    {initData}
)
class InsuranceAmount extends React.Component {
    componentDidMount() {
        this.props.initData();
    }

    goFlow() {
        this.props.history.push(`/statistics/insuranceAmount/addedit`);
    }

    render() {
        return (
            <div>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={8} style={{marginBottom: '20px'}}>
                        <Card title="未结清贷款总额" extra={
                            moneyFormat(this.props.unsettledLoan)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow()} type="primary">详情</Button>
                        </div>}</Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InsuranceAmount;
