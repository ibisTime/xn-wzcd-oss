import React from 'react';
import { getWorkbook } from 'common/js/xlsx-util';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/relieve-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    dateFormat,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.printingRelieveMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RelieveMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'date'
        }, {
            title: '套打模版',
            field: 'releaseTemplateId',
            type: 'select',
            key: 'guarant_print_template_id'
        }, {
            title: '备注',
            field: 'releaseNote',
            type: 'textarea',
            normalArea: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
                    title: '打印',
                    check: true,
                    handler: (param) => {
                        param.operator = getUserId();
                        let pageData = this.props.pageData;
                        this.props.doFetching();
                        fetch(630576, param).then((data) => {
                            console.log(data);
                            let arr = [
                                ['主贷人姓名', data.realName],
                                ['车牌号', data.carNumber]
                            ];
                            const wb = getWorkbook();
                            wb.getSheet(arr, '内容');
                            wb.downloadXls('解除抵押-' + data.realName);
                            showSucMsg('操作成功');
                        }).catch(this.props.cancelFetching);
                    }
                },
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default RelieveMake;
