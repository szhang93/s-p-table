import React, { Component } from 'react';
import './Table.css';
import history from './data/history.json';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class Table extends Component {
  constructor(props) {
    super(props);

    // sort history data
    history.sort((a, b) => { return(a.year - b.year); });
    this.tableRows = this.tableRows.bind(this);
    this.updateSlider = this.updateSlider.bind(this);

    this.maxStartYear = 0;
    this.maxEndYear = 0;

    if (history.length > 0) {
      this.maxStartYear = history[0].year;
      this.maxEndYear = history[history.length-1].year;
    }
    this.state = {
      startYear : this.maxStartYear,
      endYear: this.maxEndYear
    }
  }

  componentDidMount() {
  }

  tableRows() {
    var cumuReturn = 0.0;
    var rowList = history.filter((entry) => {
      return (entry.year >= this.state.startYear && entry.year <= this.state.endYear);
    }).map((entry) => {
      const totalReturnFloat = parseFloat(entry.totalReturn)
      cumuReturn = Math.round((cumuReturn+totalReturnFloat)*100.0)/100.0;
      return(
        <tr key={entry.year}>
          <td>{entry.year}</td>
         {totalReturnFloat < 0 ?
           <td style={{color: 'red'}}>{entry.totalReturn}</td> :
           <td style={{color: 'black'}}>{entry.totalReturn}</td>
         }
         {cumuReturn < 0 ?
           <td style={{color: 'red'}}>{cumuReturn}</td> :
           <td style={{color: 'black'}}>{cumuReturn}</td>
         }
        </tr>
      );
    })
    return(
      rowList
    );
  }

  updateSlider(e) {
    this.setState({
      startYear : e[0],
      endYear : e[1]
    });
  }

  render() {
    return (
      <div className='TableContainer'>
        <div className='Range'>
          {this.state.startYear + ' to ' + this.state.endYear}
          <Range
            style={{padding: '15px'}}
            min={this.maxStartYear}
            max={this.maxEndYear}
            defaultValue={[this.state.startYear, this.state.endYear]}
            onChange={this.updateSlider}
            trackStyle={[{ backgroundColor: 'lightblue' }, { backgroundColor: 'lightblue' }]}
            handleStyle={[{ backgroundColor: 'lightblue' }, { backgroundColor: 'lightblue' }]}
            railStyle={{ backgroundColor: 'gray' }}
          />
        </div>
      <table className='Table'>
        <thead>
          <tr>
           <th>Year</th>
           <th>Total Return</th>
           <th>Cumulative Return</th>
          </tr>
        </thead>
        <tbody>
          {this.tableRows()}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
