import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/bankMoney-sendList';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanBankMoneySendList, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BankMoneySendList extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.codeList = this.code.split(',');
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '已放款名单',
            field: 'codeList',
            type: 'o2m',
            listCode: 632149,
            params: {
                codeList: this.codeList
            },
            options: {
                delete: true,
                fields: [{
                    title: '客户姓名',
                    field: 'customerName'
                }]
            }
        }, {
            title: '已放款名单图片',
            field: 'hasLoanListPic',
            type: 'img',
            single: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    let codeList = [];
                    let overdueList = this.props.o2mSKeys.overdueList;
                    for(let i = 0, len = overdueList.length; i < len; i++) {
                        codeList.push(overdueList[i]);
                    }
                    params.codeList = codeList;
                    delete params.overdueList;
                    this.props.doFetching();
                    params.operator = getUserId();
                    fetch(632144, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default BankMoneySendList;