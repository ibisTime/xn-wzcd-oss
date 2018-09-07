import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/bonusesConfigure-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisBonusesConfigureAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BonusesConfigureAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            required: true,
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '提成单价',
            field: 'unitPrice',
            amount: true,
            required: true
        }, {
            title: '本月比例',
            field: 'monthRate',
            number: true,
            required: true
        }, {
            title: '留存月数',
            field: 'retainMonths',
            'Z+': true,
            required: true
        }, {
            title: '起始金额',
            field: 'startAmount',
            amount: true,
            required: true
        }, {
            title: '结束金额',
            field: 'endAmount',
            amount: true,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 632400,
            editCode: 632402,
            detailCode: 632406
        });
    }
}

export default BonusesConfigureAddedit;