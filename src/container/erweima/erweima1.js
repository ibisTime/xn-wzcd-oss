import { Select, Radio } from 'antd';
var QRCode = require('qrcode.react');

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class SelectSizesDemo extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    return [
        <div>
            <Select
            mode="multiple"
            size={size}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
            style={{ width: '100%' }}
            >
            {children}
            </Select>
        </div>,
        <div>
            <QRCode size={150} value={'1234567890'}/>
        </div>
    ];
  }
}

ReactDOM.render(<SelectSizesDemo />, mountNode);