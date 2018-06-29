import React from 'react';
import XLSX from 'xlsx';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/guarantee-make';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.printingGuaranteeMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class GuaranteeMake extends React.Component {
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
                    handler: (selectedRowKeys, selectedRows) => {
                        let data = [];
                        console.log(fields);
                        console.log(this.props.pageData);
                        let pageData = this.props.pageData;
                        fields.forEach(f => {
                            let arr = [f.title, pageData[f.field]];
                            data.push(arr);
                        });
                        console.log(data);
                        const ws = XLSX.utils.aoa_to_sheet(data);
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                        XLSX.writeFile(wb, 'sheetjs.xlsx');
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

export default GuaranteeMake;