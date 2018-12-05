import React, { Component } from 'react';
import * as configs from './Config';
import ReactEcharts from 'echarts-for-react';
import history from '../../history';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getUserData, getAllData, getLineData } from '../../actions/sessionActions';
import "echarts-liquidfill";


const className = "react_for_echarts";

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};

class VizLineChart extends Component {

    componentDidMount() {
        let data = {user_id:this.props.session.currentUser};
		this.props.getUserData(data);
        this.props.getAllData(data);
        this.props.getLineData(data);
    }


    render() {
        console.log(this.props);
        const user_data = this.props.session.chart_user;
        const all_data = this.props.session.chart_all;
        const line_data = this.props.session.chart_line;
        console.log(user_data, all_data, line_data);
        let onEvents = {
            'click': function (params) {
                const routeTo = (params.data.name);
                if(routeTo === "Group Notes"){
                    history.push("/groupnotes");
                } else if(routeTo === "Public Notes" || routeTo === "Private Notes"){
                    history.push("/dashboard");
                }else {
                    history.push("/cheatsheet")
                }
            }
        };

        return (<div style={{marginBottom: '50px'}}>

            <h1> Your Statistics </h1>

            <div style={divStyle} >
                <ReactEcharts
                    ref={'pie'}
                    option={configs.yourDetails(user_data)}
                    style={{height: "700px", width: "80%"}}
                    className={className}
                    onEvents={onEvents}
                />

            </div>


            <h1> Comparitive Analysis </h1>

            <div style={divStyle} >
            <ReactEcharts
                ref={'pie'}
                option={configs.PieChartUser(user_data)}
                style={{height: "475px", width: "50%"}}
                className={className}
            />

           <ReactEcharts
               ref={'pie1'}
               option={configs.PieChartAll(all_data)}
               style={{height: "475px", width: "50%"}}
               className={className}
           />
           </div>

                <h1> Tag Popularity </h1>

                <div style={divStyle}>

                <ReactEcharts
                    ref={'bubble'}
                    option={configs.TagOfUser(line_data)}
                    style={{height: "475px", width: "80%"}}
                    className={className}

                />

                {/* // <ReactEcharts
                //     ref={'bubble'}
                //     option={configs.bubble()}
                //     style={{height: "475px", width: "50%"}}
                //     className={className}
                // /> */}



                </div>

                <br/>

            </div>

        );
  }  
}


const mapStateToProps = (state) =>{
    return{
        session: {...state.session}
    }; 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
	getUserData, getAllData, getLineData 
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VizLineChart);