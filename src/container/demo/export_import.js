import React from 'react';
import { Button } from 'antd';
import { getWorkbook, readXls } from 'common/js/xlsx-util';

class ExportImport extends React.Component {
  constructor(props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: []
    };
  }
  handleExport() {
    const wb = getWorkbook();
    var ws = wb.getSheet(this.state.data, '数据');
    var wscols = [{
      wch: 20
    }, {
      wch: 20
    }, {
      wch: 20
    }, {
      wch: 20
    }];
    var wsrows = [{
      hpx: 1
    }, {
      hpt: 100
    }];
    ws['!cols'] = wscols;
    ws['!rows'] = wsrows;
    ws['!merges'] = [{
      s: {
        c: 1,
        r: 1
      },
      e: {
        c: 2,
        r: 1
      }
    }];
    ws['B2'].s = {
      fill: {
        fgColor: {
          rgb: 'FFFF00'
        }
      },
      alignment: {
        horizontal: 'center'
      }
    };
    ws['B21'].f = '=B15*B12/100';
    wb.downloadXls('担保合同');
  }
  handleChange(files) {
    files = files.target.files;
    if (!files || !files.length) {
      return;
    }
    readXls(files[0]).then(data => {
      this.setState({ data });
    }).catch((msg) => {
      alert(msg);
    });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <Button onClick={this.handleExport}>导出</Button>
        <table className="table table-striped">
          <tbody>
            {this.state.data.map((r, i) => <tr key={i}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
      );
  }
}

export default ExportImport;
