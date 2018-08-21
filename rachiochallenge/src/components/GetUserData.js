import React, { Component } from 'react'
import ChooseOnlineDevice from './ChooseOnlineDevice'

class GetUserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: [],
            onlineDevices: [],
            onlineDevicesLoaded: false
        }
    }


    componentDidMount() {
        this.getProfile()
    }

    getProfile = () => {
        fetch('https://api.rach.io/1/public/person/info', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134'
            }
        })
        .then(response => response.json())
        .then(this.getPersonByID)
    }

    getPersonByID = (idObject) => {
        const id = Object.values(idObject)
        fetch(`https://api.rach.io/1/public/person/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134'
        }
    })
        .then(response => response.json())
        .then(response => {
            this.setState({
                profile: response
            })
        })
        .then(this.pickOnlineDevice)
    }

    pickOnlineDevice = () => {
        const devices = this.state.profile.devices
        const onlineDevices = this.state.onlineDevices

        devices.forEach(device => {
            if (device.status === 'ONLINE') {
                onlineDevices.push(device)
                this.setState({
                    onlineDevicesLoaded: true
                })
            }
        })
    }

    
    render() {
        const onlineDevicesLoaded = this.state.onlineDevicesLoaded

        return (
            <header>
                {onlineDevicesLoaded ? <ChooseOnlineDevice onlineDevices={this.state.onlineDevices}/>:(null)}
            </header>
        )
    }
}

export default GetUserProfile