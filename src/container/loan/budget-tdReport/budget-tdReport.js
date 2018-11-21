import React from 'react';
import { Spin, Card } from 'antd';
import fetch from 'common/js/fetch';
import { getQueryString } from 'common/js/util';
import MobileReport from './mobileReport';
import BankcardReport from './bankcardReport';
import PoliceReport from './policeReport';
import OnlineReport from './onlineReport';
import HomeAddrReport from './homeAddrReport';
import WzhyReport from './wzhyReport';

export default class TdReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      // 预算单
      budget: {},
      // 银行卡四要素认证
      card: {},
      // 家庭地址核验
      homeAddress: {},
      // 三要素认证
      mobile: {},
      // 在网时长
      online: {},
      // 自然人识别
      police: {}
    };
  }
  componentDidMount() {
    let code = getQueryString('code', this.props.location.search);
    Promise.all([
      fetch(632126, { code }),
      fetch(632146, { code })
    ]).then(([report, budget]) => {
      let WzhyWeb = report.WzhyWeb.replace(/\["{/g, '[{').replace(/}"\]/g, '}]').replace(/\\"/g, '"');
      this.setState({
        budget,
        WzhyWeb: JSON.parse(WzhyWeb),
        card: JSON.parse(report.card),
        homeAddress: JSON.parse(report.home_address),
        mobile: JSON.parse(report.mobile),
        online: JSON.parse(report.online),
        police: JSON.parse(report.police),
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  render() {
    const { fetching, budget, mobile, card, police, online, homeAddress, WzhyWeb } = this.state;
    return (
      <Spin spinning={fetching}>
        <Card title="贷前反欺诈报告" style={{marginTop: 20}}>
          <WzhyReport report={WzhyWeb} />
        </Card>
        <Card title="三要素认证"><MobileReport report={mobile} budget={budget} /></Card>
        <Card title="四要素认证" style={{marginTop: 20}}>
          <BankcardReport report={card} budget={budget} />
        </Card>
        <Card title="自然人识别" style={{marginTop: 20}}>
          <PoliceReport report={police} />
        </Card>
        <Card title="手机号在网时长" style={{marginTop: 20}}>
          <OnlineReport report={online} />
        </Card>
        <Card title="家庭地址核验" style={{marginTop: 20}}>
          <HomeAddrReport report={homeAddress} budget={budget} />
        </Card>
      </Spin>
    );
  }
}
