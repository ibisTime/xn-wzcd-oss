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
} from '@redux/finance/invoice';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    dateTimeFormat,
    getRoleCode,
    formatDate,
    moneyUppercase,
    moneyReplaceComma,
    moneyFormat
} from 'common/js/util';
import {
    Modal
} from 'antd';
import {
    rebateList
} from 'api/biz';
import { getWorkbook, readXls } from 'common/js/xlsx-util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.financeInvoice,
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
class Invoice extends React.Component {
    handleExport = (data) => {
        const wb = getWorkbook();
        this.createLybzjkp(wb, data);

        // download
        wb.downloadXls('履约保证金');
        fetch(632902, {
            budgetCode: data.budgetCode
        }).then(() => {
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
        this.props.cancelFetching();
    }
    createLybzjkp = (wb, data) => {
        var ws = this.getSheet(wb, 12, 11, 'Sheet1');

        ws['!merges'] = [{
            e: {c: 6, r: 2},
            s: {c: 5, r: 2}
        }, {
            e: {c: 2, r: 3},
            s: {c: 1, r: 3}
        }, {
            e: {c: 6, r: 3},
            s: {c: 3, r: 3}
        }, {
            e: {c: 9, r: 3},
            s: {c: 7, r: 3}
        }, {
            e: {c: 9, r: 10},
            s: {c: 7, r: 10}
        }, {
            e: {c: 5, r: 11},
            s: {c: 4, r: 11}
        }, {
            e: {c: 1, r: 8},
            s: {c: 1, r: 4}
        }, {
            e: {c: 10, r: 10},
            s: {c: 10, r: 3}
        }, {
            e: {c: 2, r: 10},
            s: {c: 1, r: 9}
        }, {
            e: {c: 6, r: 8},
            s: {c: 2, r: 4}
        }, {
            e: {c: 6, r: 10},
            s: {c: 3, r: 9}
        }, {
            e: {c: 9, r: 8},
            s: {c: 7, r: 4}
        }];
        ws['!cols'] = [
            {wch: 4.9},
            {wch: 4.9},
            {wch: 10.2},
            {wch: 3},
            {wch: 2.9},
            {wch: 3.5},
            {wch: 23},
            {wch: 4.3},
            {wch: 14.3},
            {wch: 2},
            {wch: 3}
        ];
        ws['!rows'] = [{
            'hidden': true,
            'hpt': 12.75,
            'hpx': 12.75
        },
        {
            'hpt': 24.95,
            'hpx': 24.95
        },
        {
            'hpt': 20.45,
            'hpx': 20.45
        },
        {
            'hpt': 37.7,
            'hpx': 37.7
        },
        {
            'hpt': 9,
            'hpx': 9
        },
        {
            'hpt': 10.5,
            'hpx': 10.5
        },
        {
            'hpt': 12.95,
            'hpx': 12.949999999999998
        },
        {
            'hpt': 31.7,
            'hpx': 31.7
        },
        {
            'hpt': 9,
            'hpx': 9
        },
        {
            'hpt': 26.45,
            'hpx': 26.45
        },
        {
            'hpt': 4.9,
            'hpx': 4.9
        },
        {
            'hpt': 21.2,
            'hpx': 21.2
        },
        {
            'hpt': 19.7,
            'hpx': 19.7
        },
        {
            'hpt': 14.45,
            'hpx': 14.449999999999998
        },
        {
            'hpt': 14.45,
            'hpx': 14.449999999999998
        }];
        ws['B2'] = {v: '      ', t: 's', w: '      '};
        ws['G2'] = {v: '收 款 收 据', t: 's', w: '收 款 收 据'};
        ws['B3'] = {v: '客户编号 ', t: 's', w: '客户编号 '};
        ws['F3'] = {v: formatDate(data.bankFkDatetime, 'yyyy/MM/dd hh:mm:ss'), t: 's', w: formatDate(data.bankFkDatetime, 'yyyy/MM/dd hh:mm:ss')};
        ws['H3'] = {v: 'No.', t: 's', w: 'No.'};
        ws['I3'] = {v: data.printNumber, t: 's', w: data.printNumber};
        ws['B4'] = {v: '交款单位（个人）', t: 's', w: '交款单位（个人）'};
        ws['D4'] = {v: data.customerName, t: 's', w: data.customerName};
        ws['H4'] = {v: '备   注', t: 's', w: '备   注'};
        ws['K4'] = {v: '①\r\n存\r\n根\r\n②\r\n收\r\n据\r\n③\r\n记\r\n账', t: 's', w: '①\r\n存\r\n根\r\n②\r\n收\r\n据\r\n③\r\n记\r\n账'};
        ws['B5'] = {v: '交\n款\n项\n目', t: 's', w: '交\n款\n项\n目'};
        ws['C5'] = {v: '履约保证金', t: 's', w: '履约保证金'};
        ws['B10'] = {v: '金额（大写）', t: 's', w: '金额（大写）'};
        ws['D10'] = {v: moneyUppercase(moneyReplaceComma(moneyFormat(data.lyAmount))), t: 's', w: moneyUppercase(moneyReplaceComma(moneyFormat(data.lyAmount)))};
        ws['H10'] = {v: '¥', t: 's', w: '¥'};
        ws['I10'] = {v: moneyReplaceComma(moneyFormat(data.lyAmount)), t: 'n', w: moneyFormat(data.lyAmount)};
        ws['J10'] = {v: '元', t: 's', w: '元'};
        ws['B12'] = {v: '财务', t: 's', w: '财务'};
        ws['E12'] = {v: '出纳', t: 's', w: '出纳'};
        ws['F12'] = {v: '经办人', t: 's', w: '经办人'};
        ws['G12'] = {v: ' ', t: 's', w: ' '};
        ws['H12'] = {v: '单位', t: 's', w: '单位'};

        ws['G2'].s = {font: {sz: 18, name: '微软雅黑', bold: true}, alignment: {vertical: 'center'}};
        ws['B3'].s = {font: {sz: 8, name: '微软雅黑', color: {rgb: 'FFFFFFFF'}}, alignment: {vertical: 'center'}};
        ws['F3'].s = {font: {sz: 14, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'top'}};
        ws['H3'].s = {font: {sz: 14, name: '华文楷体', bold: true}, alignment: {horizontal: 'right', vertical: 'top'}};
        ws['I3'].s = {font: {sz: 14, name: '微软雅黑'}, alignment: {horizontal: 'left', vertical: 'top'}};
        ws['B4'].s = {font: {sz: 10, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['D4'].s = {font: {sz: 16, name: '微软雅黑', color: {rgb: 'FFFF0000'}}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['H4'].s = {font: {sz: 14, name: '宋体'}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['K4'].s = {font: {sz: 10, name: '微软雅黑', color: {rgb: 'FFFF0000'}}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
        ws['B5'].s = {font: {sz: 12, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
        ws['C5'].s = {font: {sz: 16, name: '隶书'}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['H5'].s = {font: {sz: 8, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['B10'].s = {font: {sz: 12, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['D10'].s = {font: {sz: 14, name: '微软雅黑'}, alignment: {horizontal: 'left', vertical: 'center'}};
        ws['H10'].s = {font: {sz: 14, name: '微软雅黑', bold: true}, alignment: {horizontal: 'right', vertical: 'bottom'}};
        ws['I10'].s = {font: {sz: 12, name: '微软雅黑', italic: true}, alignment: {horizontal: 'center', vertical: 'bottom'}};
        ws['J10'].s = {font: {sz: 12, name: '微软雅黑'}, alignment: {horizontal: 'center', vertical: 'bottom'}};
        ws['H11'].s = {font: {sz: 8, name: '微软雅黑', underline: true}, alignment: {horizontal: 'center', vertical: 'center'}};
        ws['B12'].s = ws['E12'].s = ws['H12'].s = {font: {sz: 12, name: '宋体'}, alignment: {horizontal: 'center'}};
        ws['G12'].s = {font: {sz: 8, name: '微软雅黑'}, alignment: {horizontal: 'left', vertical: 'center'}};

        // 边框
        ws['B3'].s = {...ws['B3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['C3'].s = {...ws['C3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['D3'].s = {...ws['D3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['E3'].s = {...ws['E3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['F3'].s = {...ws['F3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['G3'].s = {...ws['G3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['H3'].s = {...ws['H3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['I3'].s = {...ws['I3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['J3'].s = {...ws['J3'].s, border: {bottom: {style: 'medium', color: {rgb: 'FF000000'}}}};

        ws['A4'].s = {...ws['A4'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A5'].s = {...ws['A5'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A6'].s = {...ws['A6'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A7'].s = {...ws['A7'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A8'].s = {...ws['A8'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A9'].s = {...ws['A9'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A10'].s = {...ws['A10'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['A11'].s = {...ws['A11'].s, border: {right: {style: 'medium', color: {rgb: 'FF000000'}}}};

        ws['B12'].s = {...ws['B12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['C12'].s = {...ws['C12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['D12'].s = {...ws['D12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['E12'].s = {...ws['E12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['F12'].s = {...ws['F12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['G12'].s = {...ws['G12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['H12'].s = {...ws['H12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['I12'].s = {...ws['I12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['J12'].s = {...ws['J12'].s, border: {top: {style: 'medium', color: {rgb: 'FF000000'}}}};

        ws['K4'].s = {...ws['K4'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K5'].s = {...ws['K5'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K6'].s = {...ws['K6'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K7'].s = {...ws['K7'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K8'].s = {...ws['K8'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K9'].s = {...ws['K9'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K10'].s = {...ws['K10'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};
        ws['K11'].s = {...ws['K11'].s, border: {left: {style: 'medium', color: {rgb: 'FF000000'}}}};

        ws['B4'].s = {...ws['B4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C4'].s = {...ws['C4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['E4'].s = {...ws['E4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['F4'].s = {...ws['F4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['G4'].s = {...ws['G4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['I4'].s = {...ws['I4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['J4'].s = {...ws['J4'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['B9'].s = {...ws['B9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['D9'].s = {...ws['D9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['E9'].s = {...ws['E9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['F9'].s = {...ws['F9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['G9'].s = {...ws['G9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['I9'].s = {...ws['I9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['J9'].s = {...ws['J9'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['I10'].s = {...ws['I10'].s, border: {bottom: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['D4'].s = {...ws['D4'].s,
            border: {
                bottom: {style: 'thin', color: {rgb: 'FF000000'}},
                left: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['H4'].s = {...ws['H4'].s,
            border: {
                bottom: {style: 'thin', color: {rgb: 'FF000000'}},
                left: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['H5'].s = {...ws['H5'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['H6'].s = {...ws['H6'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['H7'].s = {...ws['H7'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['H8'].s = {...ws['H8'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['H9'].s = {...ws['H9'].s,
            border: {
                bottom: {style: 'thin', color: {rgb: 'FF000000'}},
                left: {style: 'thin', color: {rgb: 'FF000000'}}}};

        ws['H10'].s = {...ws['H10'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['H11'].s = {...ws['H11'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C5'].s = {...ws['C5'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C6'].s = {...ws['C6'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C7'].s = {...ws['C7'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C8'].s = {...ws['C8'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['C9'].s = {...ws['C9'].s,
            border: {
                bottom: {style: 'thin', color: {rgb: 'FF000000'}},
                left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['D10'].s = {...ws['D10'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
        ws['D11'].s = {...ws['D11'].s, border: {left: {style: 'thin', color: {rgb: 'FF000000'}}}};
    }

    // 获取margins
    getMargins() {
        return {
            'left': 0.39,
            'right': 0.39,
            'top': 0.59,
            'bottom': 0.98,
            'header': 0,
            'footer': 0
        };
    }
    // 获取sheet
    getSheet = (wb, row, col, name) => {
        var tmp = [];
        for (let i = col; i > 0; i--) {
            tmp.push('');
        }
        var data = [];
        for (let i = row; i > 0; i--) {
            data.push(tmp);
        }
        let ws = wb.getSheet(data, name);
        ws['!margins'] = this.getMargins();
        return ws;
    }

    render() {
        const fields = [{
            title: '业务编号',
            field: 'budgetCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{abbrName.DATA}}',
            search: true,
            render: (v, data) => {
                return data.loanBankName ? data.loanBankName : '-';
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            amount: true
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '收款打印单号',
            field: 'printNumber'
        }, {
            title: '收款打印日期',
            field: 'printDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 632905,
            btnEvent: {
                printing: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.doFetching();
                        this.handleExport(selectedRows[0]);
                    }
                }
            }
        });
    }
}

export default Invoice;