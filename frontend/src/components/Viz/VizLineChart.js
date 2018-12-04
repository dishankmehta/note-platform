import React, { Component } from 'react';
import * as configs from './Config';
import ReactEcharts from 'echarts-for-react';
import history from '../../history';
import "echarts-liquidfill";


const className = "react_for_echarts";

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};

class VizLineChart extends Component {


    render() {
        let onEvents = {
            'click': function (params) {
                const routeTo = (params.data.name);
                if(routeTo === "Group Notes"){
                    history.push("/groupnotes");
                } else if(routeTo === "Public Notes" || routeTo === "Private Notes"){
                    history.push("/dashboard");
                }else {
                    history.push("/recommendednotes")
                }
            }
        };

        return (<div style={{marginBottom: '50px'}}>

            <h1> Your Statistics </h1>

            <div style={divStyle} >
                <ReactEcharts
                    ref={'pie'}
                    option={configs.yourDetails()}
                    style={{height: "700px", width: "80%"}}
                    className={className}
                    onEvents={onEvents}
                />

            </div>


            <h1> Comparitive Analysis </h1>

            <div style={divStyle} >
            <ReactEcharts
                ref={'pie'}
                option={configs.PieChartUser()}
                style={{height: "475px", width: "50%"}}
                className={className}
            />

           <ReactEcharts
               ref={'pie1'}
               option={configs.PieChartAll()}
               style={{height: "475px", width: "50%"}}
               className={className}
           />
           </div>

                <h1> Tag Popularity </h1>

                <div style={divStyle}>

                <ReactEcharts
                    ref={'bubble'}
                    option={configs.TagOfUser()}
                    style={{height: "475px", width: "50%"}}
                    className={className}

                />

                <ReactEcharts
                    ref={'bubble'}
                    option={configs.bubble()}
                    style={{height: "475px", width: "50%"}}
                    className={className}
                />



                </div>

                <br/>

            </div>

        );
  }  
}

export default VizLineChart;