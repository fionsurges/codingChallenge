import React, {Component} from 'react'
import Zones from './Zones'

class ChooseOnlineDevice extends Component {
    constructor(props){
        super(props)
        this.state = {
            chosenDevice: [],
            deviceChosen: false
        }
    }

    componentDidMount() {
        this.loadDefaultDevice()
    }

    loadDefaultDevice = () => {
        this.setState({
            chosenDevice: [this.props.onlineDevices[0]],
            deviceChosen: true
        })
    }

    handleChange = (event) => {
        const changeDevice = this.props.onlineDevices.filter(device => device.name === event.currentTarget.value)
        this.setState({
            chosenDevice: changeDevice
        })
    }
    
    render(){
        const deviceIsChosen = this.state.deviceChosen
        return(
            <div>
                <div className='online-devices'>
                    <h2>Devices currently online</h2>
                    <select onChange={this.handleChange}>
                        {this.props.onlineDevices.map(device => <option key={device.id}>{device.name}</option>)}
                    </select>
                </div>
                {deviceIsChosen ? <Zones chosenDevice={this.state.chosenDevice} />:(null) }
            </div>
        )
    }
}

export default ChooseOnlineDevice

