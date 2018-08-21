import React, {Component} from 'react'

class Zones extends Component {
    constructor(props){
        super(props)
        this.state = {
            allZones: [],
            selectedZones: [],
            selectedZone: [],
            ids: [],
            duration: 0,
            cardClicked: false,
            response: false,
            cardBorderWhenClicked: ''
        }
    }

    componentDidMount() {
        this.getZones()
    }

    getZones = () => {
        const zones = this.props.chosenDevice[0].zones
        this.setState({
            allZones: zones
        })
    }

    individualZoneClick = (event) => {
        const allZones = this.state.allZones
        allZones.map(zone => {
            if (zone.id === event.currentTarget.id) {
                zone.selected = true
                this.state.selectedZones.push(zone)
                this.setState({
                    cardClicked: true
                })
            }})        
        
    }
    
    selectAllClick = (event) => {
        const allZones = this.state.allZones
        const selectedZones = this.state.selectedZones
        allZones.filter(zone => {
            zone.id === event.currentTarget.id
            selectedZones.push(zone)
        })
        this.setState({
            cardClicked: !this.state.cardClicked,
            cardBorderWhenClicked: '3px solid gray'
        })
    }
    
    handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key]: value
        })
    }

    extractIds = () => {
        const selectedZones = this.state.selectedZones
        selectedZones.forEach(zone => {
            if (zone.enabled == true) {
                this.state.ids.push(zone.id)
            }
        })  
    } 


    scheduleSprinklerSystem = (event) => {
        this.extractIds()
        const ids = this.state.ids
        const putObject = []
        ids.forEach(id => putObject.push({id: id, duration: this.state.duration * 60}))        
        
        fetch('https://api.rach.io/1/public/zone/start_multiple', {
            method: 'PUT',
            body: JSON.stringify({
                zones: putObject}),
            headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134'
            }
        })

        
        .then(response => {            
            if (response.ok) {
                this.setState ({
                    response: true
                })
                alert('System started!')
            }
            else {
                return response.json()
                .then(error => {
                    throw error
                })
            }
        })
    }


    

    render() {
        const chosenZones = this.props.chosenDevice[0].zones
        return(
            <React.Fragment>
            <div className='zone-schedule'>
                <div>
                    <h1>Zones</h1> 
                    <p><i>Select zones to run</i></p>
                </div>
                <div className='sprinkler-runtime'>
                    <form>
                        Sprinkler runtime (in minutes):  
                        <input name='duration' value={this.state.duration} type='text' onChange={this.handleChange}/>
                    </form>
                    <div className='schedule-buttons'>
                        <button onClick={this.selectAllClick} id='select-all-button'>Select all zones</button>
                        <button onClick={this.scheduleSprinklerSystem} id='start-button'>Start System</button>
                    </div>
                </div>
            </div>
            <div className='zone-cards'>
                {chosenZones.map(zone => {
                    let zoneCardClass = zone.selected ? 'zone-card selected' : 'zone-card'
                    let selectAll = this.state.cardClicked
                    return(
                        <div className={zoneCardClass} onClick={this.individualZoneClick} style={selectAll ? {border: this.state.cardBorderWhenClicked}:(null)} id={zone.id}>
                            <img src={zone.imageUrl}/>
                            <p>{zone.name}</p>
                        </div>
                    )
                })}
            </div>
            </React.Fragment>
        )
    }
}

export default Zones