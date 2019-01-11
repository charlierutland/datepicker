import React, { Component, Fragment } from 'react';
import './App.css';
import moment from 'moment';

import Calendar from './calendar/calendar';

class App extends Component {
  state = {
    activeCalendar: null,
    dateContext: moment(),
    selectedStartDate: null,
    selectedStopDate: null
  };

  handleStartClick = () => {
    if (!this.state.selectedStartDate) {
      this.setState({ selectedStartDate: moment() });
    }
    this.setState({ activeCalendar: 'start' });
  };

  handleStopClick = () => {
    if (!this.state.selectedStopDate) {
      this.setState({ selectedStopDate: moment() });
    }
    this.setState({ activeCalendar: 'stop' });
  };

  renderCalendar = () =>
    this.state.activeCalendar ? (
      <Calendar
        onClickDate={this.setDate}
        selectedDate={
          this.state.activeCalendar === 'stop'
            ? this.state.selectedStopDate
            : this.state.selectedStartDate
        }
      />
    ) : null;

  setDate = date => {
    if (this.state.activeCalendar === 'start') {
      this.setState({
        selectedStartDate: date,
        activeCalendar: 'stop',
        selectedStopDate: date
      });
    } else {
      this.setState({ selectedStopDate: date });
    }
  };

  render() {
    return (
      <div className="homescreen">
        <div className="button-nav">
          <div
            className={`start-button button ${
              this.state.activeCalendar === 'stop' ? 'disabled' : ''
            }`}
            onClick={this.handleStartClick}
          >
            {this.state.activeCalendar && this.state.selectedStartDate ? (
              <Fragment>
                <span className="startstop-text">Start</span>
                {this.state.selectedStartDate.format('DD MMMM YYYY')}
              </Fragment>
            ) : (
              <div className="text">
                <span className="startstop-text">Start</span>
                <br />
                <span className="button-text">Choose Day</span>
              </div>
            )}
          </div>
          <div
            className={`stop-button button ${
              this.state.activeCalendar === 'start' ||
              !this.state.activeCalendar
                ? 'disabled'
                : ''
            }`}
            onClick={this.handleStopClick}
          >
            {this.state.activeCalendar && this.state.selectedStopDate ? (
              <Fragment>
                <span className="startstop-text">Stop</span>

                {this.state.selectedStopDate.format('DD MMMM YYYY')}
              </Fragment>
            ) : (
              <div className="text">
                <span className="startstop-text">Stop</span>
                <br />
                <span className="button-text">Choose Day</span>
              </div>
            )}
          </div>
        </div>
        <div>{this.renderCalendar()}</div>
      </div>
    );
  }
}

export default App;
