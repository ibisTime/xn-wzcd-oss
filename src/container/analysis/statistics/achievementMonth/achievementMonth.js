import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/analysis/achievementMonth';
import {
    listWrapper
} from 'common/js/build-list';
import {
    moneyFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.analysisAchievementMonth,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class AchievementMonth extends React.Component {
    constructor(props) {
        super(props);
        this.useData = [];
        this.tmpl = [{
            'id': '1', 'year': '今年', 'title': '年贷款额', 'oneLoanAmount': '111', 'oneGrowthRate': '0.01', 'totalNumber': '333', 'totalNumberGrowthRate': '222'
        }, {
            'id': '2', 'year': '去年', 'title': '年贷款额', 'oneLoanAmount': '113', 'oneGrowthRate': '0.01', 'totalNumber': '331', 'totalNumberGrowthRate': '223'
        }];
        this.firstLoad = true;
    }
    render() {
        const fields = [{
            title: '',
            field: 'year',
            nowrap: true
        }, {
            title: '项目年份',
            field: 'title',
            nowrap: true
        }, {
            title: '1月',
            field: 'oneLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.oneGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.oneNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.oneNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '2月',
            field: 'twoLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.twoGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.twoNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.twoNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '3月',
            field: 'threeLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.threeGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.threeNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.threeNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '4月',
            field: 'fourLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.fourGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.fourNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.fourNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '5月',
            field: 'fiveLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.fiveGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.fiveNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.fiveNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '6月',
            field: 'sixLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.sixGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.sixNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.sixNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '7月',
            field: 'sevenLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.sevenGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.sevenNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.sevenNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '8月',
            field: 'eightLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.eightGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.eightNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.eightNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '9月',
            field: 'nineLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.nineGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.nineNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.nineNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '10月',
            field: 'tenLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.tenGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.tenNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.tenNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '11月',
            field: 'elevenLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.elevenGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.elevenNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.elevenNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '12月',
            field: 'twelveLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.twelveGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.twelveNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.twelveNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '一季度',
            field: 'firstQuarterLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.firstQuarterGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.firsQuartertNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.firstQuarterNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '二季度',
            field: 'secondQuarterLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.secondQuarterGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.secondQuarterNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.secondQuarterNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '三季度',
            field: 'thirdQuarterLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.thirdQuarterGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.thirdQuarterNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.thirdQuarterNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '四季度',
            field: 'fourthQuarterLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.fourthQuarterGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.fourthQuartersNum;
                } else if (data.type === 'tbzc2') {
                    amount = data.fourthQuarterNumGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }, {
            title: '全年合计',
            field: 'totalLoanAmount',
            nowrap: true,
            render: (v, data) => {
                var amount = 0;
                if (data.type === 'tbzc1') {
                    amount = moneyFormat(data.totalGrowthRate);
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    amount = data.totalNumber;
                } else if (data.type === 'tbzc2') {
                    amount = data.totalNumberGrowthRate;
                } else {
                    amount = moneyFormat(v);
                }
                return <span style={{whiteSpace: 'nowrap'}}>{amount}</span>;
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 630909,
            rowKey: 'id',
            useData: this.userData,
            noSelect: true,
            userDataAfter: d => {
                if (this.firstLoad && d.length >= 1) {
                    this.useData = [];
                    let tmpl = [];
                    let tbzc1 = {'id': '4', 'title': '同比增长', 'type': 'tbzc1', 'year': ''};// 贷款额增长率
                    let tbzc2 = {'id': '7', 'title': '同比增长', 'type': 'tbzc2', 'year': ''};// 笔数增长率
                    let jYear = {'id': '5', 'title': '年笔数', 'type': 'jYear'};
                    let qYear = {'id': '6', 'title': '年笔数', 'type': 'qYear'};
                    d.forEach((v, i) => {
                        tmpl[i] = {
                            ...v,
                            id: i,
                            title: '年贷款额'
                        };
                        if (v.year === '今年') {
                            tbzc1 = {
                                ...v,
                                ...tbzc1
                            };
                            tbzc2 = {
                                ...v,
                                ...tbzc2
                            };
                            jYear = {
                                ...v,
                                ...jYear
                            };
                        } else if (v.year === '去年') {
                            qYear = {
                                ...v,
                                ...qYear
                            };
                        }
                    });
                    this.useData.push(tmpl[3]);
                    this.useData.push(tmpl[2]);
                    this.useData.push(tmpl[1]);
                    this.useData.push(tmpl[0]);
                    this.useData.push(tbzc1);
                    this.useData.push(jYear);
                    this.useData.push(qYear);
                    this.useData.push(tbzc2);
                    this.firstLoad = false;
                }
                return this.useData;
            }
        });
    }
}

export default AchievementMonth;
