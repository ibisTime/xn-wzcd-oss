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
import fetch from 'common/js/fetch';

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
                if (data.type === 'tbzc1') {
                    return data.oneGrowthRate;
                } else if (data.type === 'jYear' || data.type === 'qYear') {
                    return data.totalNumber;
                } else if (data.type === 'tbzc2') {
                    return data.totalNumberGrowthRate;
                } else {
                    return v;
                }
            }
        }, {
            title: '2月',
            field: 'twoLoanAmount',
            nowrap: true
        }, {
            title: '3月',
            field: 'threeLoanAmount',
            nowrap: true
        }, {
            title: '4月',
            field: 'fourLoanAmount',
            nowrap: true
        }, {
            title: '5月',
            field: 'fiveLoanAmount',
            nowrap: true
        }, {
            title: '6月',
            field: 'sixLoanAmount',
            nowrap: true
        }, {
            title: '7月',
            field: 'sevenLoanAmount',
            nowrap: true
        }, {
            title: '8月',
            field: 'eightLoanAmount',
            nowrap: true
        }, {
            title: '9月',
            field: 'nineLoanAmount',
            nowrap: true
        }, {
            title: '10月',
            field: 'tenLoanAmount',
            nowrap: true
        }, {
            title: '11月',
            field: 'elevenLoanAmount',
            nowrap: true
        }, {
            title: '12月',
            field: 'twelveLoanAmount',
            nowrap: true
        }, {
            title: '一季度',
            field: 'firstQuarterLoanAmount',
            nowrap: true
        }, {
            title: '二季度',
            field: 'secondQuarterLoanAmount',
            nowrap: true
        }, {
            title: '三季度',
            field: 'thirdQuarterLoanAmount',
            nowrap: true
        }, {
            title: '四季度',
            field: 'fourthQuarterLoanAmount',
            nowrap: true
        }, {
            title: '全年合计',
            field: 'totalLoanAmount',
            nowrap: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630909,
            rowKey: 'id',
            useData: this.userData,
            noSelect: true,
            userDataAfter: d => {
                if (this.firstLoad) {
                    this.useData = this.tmpl;
                    let tbzc1 = {'id': '5', 'title': '同比增长', 'type': 'tbzc1', 'year': ''};// 贷款额增长率
                    let tbzc2 = {'id': '8', 'title': '同比增长', 'type': 'tbzc2', 'year': ''};// 笔数增长率
                    let jYear = {'id': '6', 'title': '今年', 'type': 'jYear'};
                    let qYear = {'id': '7', 'title': '去年', 'type': 'qYear'};
                    this.tmpl.forEach(v => {
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
