import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        this.props.dispatch(actions.fetch())
    }
    render() {
        const {stats} =this.props
        const data = {
            datasets: [{
                data: stats ? stats : [0,0,0],
                backgroundColor: [
                    '#FF6384',
                    '#4BC0C0',
                    '#FFCE56',
                    '#E7E9ED',
                    '#36A2EB'
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                'Vehicles',
                'Drivers',
                'Travels',
            ]
        };
        return (
            
            <div>
                <h2>Stats</h2>
                <Polar data={data} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    const { stats } = store
    return {
        stats: stats ? stats.data : [],
        requesting: stats.requesting,
        error: stats.error,
        success: stats.success
    };
}

export default connect(mapStateToProps)(Home)

