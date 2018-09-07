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
} from '@redux/analysis/achievement';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.analysisAchievement,
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
class Achievement extends React.Component {
    render() {
        const fields = [{
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true,
            noVisible: true
        }, {
            title: '第一季度',
            children: [{
                title: '10万以下',
                field: 'firstQuarterTenUnder'
            }, {
                title: '10-30万',
                field: 'firstQuarterTenToThirty'
            }, {
                title: '30万以上',
                field: 'firstQuarterThirtyAbove'
            }, {
                title: '笔数',
                field: 'firstQuarterNumber'
            }, {
                title: '贷款额(万)',
                field: 'firstQuarterLoanAmount',
                amount: true
            }]
        }, {
            title: '第二季度',
            children: [{
                title: '10万以下',
                field: 'secondQuarterTenUnder'
            }, {
                title: '10-30万',
                field: 'secondQuarterTenToThirty'
            }, {
                title: '30万以上',
                field: 'secondQuarterThirtyAbove'
            }, {
                title: '笔数',
                field: 'secondQuarterNumber'
            }, {
                title: '贷款额(万)',
                field: 'secondQuarterLoanAmount',
                amount: true
            }]
        }, {
            title: '第三季度',
            children: [{
                title: '10万以下',
                field: 'thirdQuarterTenUnder'
            }, {
                title: '10-30万',
                field: 'thirdQuarterTenToThirty'
            }, {
                title: '30万以上',
                field: 'thirdQuarterThirtyAbove'
            }, {
                title: '笔数',
                field: 'thirdQuarterNumber'
            }, {
                title: '贷款额(万)',
                field: 'thirdQuarterLoanAmount',
                amount: true
            }]
        }, {
            title: '第三季度',
            children: [{
                title: '10万以下',
                field: 'fourthQuarterTenUnder'
            }, {
                title: '10-30万',
                field: 'fourthQuarterTenToThirty'
            }, {
                title: '30万以上',
                field: 'fourthQuarterThirtyAbove'
            }, {
                title: '笔数',
                field: 'fourthQuarterNumber'
            }, {
                title: '贷款额(万)',
                field: 'fourthQuarterLoanAmount',
                amount: true
            }]
        }];
        return this.props.buildList({
            fields,
            pageCode: 630908
        });
    }
}

export default Achievement;
