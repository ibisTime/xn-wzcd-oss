import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/mortgage-make';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.printingMortgageMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MortgageMake extends React.Component {
        constructor(props) {
            super(props);
            this.code = getQueryString('code', this.props.location.search);
            this.view = !!getQueryString('v', this.props.location.search);
        }

        render() {
            const fields = [{
                title: '业务编号',
                field: 'code',
                readonly: true
            }, {
                title: '业务公司',
                field: 'companyCode',
                readonly: true
            }, {
                title: '客户姓名',
                field: 'customerName',
                readonly: true
            }, {
                title: '手机号',
                field: 'mobile'
            }];
            return this.props.buildDetail({
                    fields,
                    code: this.code,
                    view: this.view,
                    detailCode: 632146,
                    buttons: [{
                            title: '打印',
                            check: true,
                            handler: () => {
                                console.log(1);
                                let arr = this.props.pageData;
                                console.log(arr);
                            }
                            },
                            {
                                title: '返回',
                                handler: (param) => {
                                    this.props.history.go(-1);
                                }
                            }]
                    });
            }
        }

        export default MortgageMake;