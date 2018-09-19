import React from 'react';
import { Select, Button } from 'antd';
import fetch from 'common/js/fetch';
import Barcode from 'react-barcode';
import './erweima.css';

const Option = Select.Option;

export default class SelectSizesDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            message: '',
            obj: '',
            data: [],
            curObj: null
        };
    }

    componentDidMount() {
        fetch(632155, {
            start: 0,
            limit: 100,
            statusList: [0, 4]
        }).then(data => {
            let len = data.list.length;
            let arr = [];
            for (let i = 0; i < len; i++) {
                arr.push(<Option
                    key={data.list[i].code}>{`${data.list[i].code}-${data.list[i].customerName || data.list[i].userName}`}</Option>);
            }
            this.setState({
                children: arr,
                data: data.list
            });
        });
    }

    handleChange = (value) => {
        let data = this.state.data;
        let curObj;
        for (let j = 0; j < data.length; j++) {
            if (value === data[j].code) {
                curObj = data[j];
                break;
            }
        }
        this.setState({
            obj: curObj.type + value,
            curObj: curObj
        });
    }
    download = () => {
        if (this.state.curObj) {
            let url = this.barCode.refs.renderElement.toDataURL('image/jpeg');
            var alink = document.createElement('a');
            alink.href = url;
            alink.download = this.state.curObj.customerName || this.state.curObj.userName;
            alink.click();
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Select
                        placeholder="请选择业务"
                        onChange={this.handleChange}
                        style={{width: '100%'}}
                    >
                        {this.state.children}
                    </Select>
                </div>
                <div className="jsbar" style={{overflow: 'hidden'}}>
                    <Barcode ref={barCode => this.barCode = barCode} renderer="canvas" value={this.state.obj}/>
                </div>
                <Button onClick={this.download}>点击下载</Button>
            </div>
        );
    }
}
