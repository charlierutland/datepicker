import React from 'react';
import moment from 'moment';
import './index.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default class Calendar extends React.Component {
  weekdaysShort = moment.weekdaysShort();

  state = {
    dateContext: moment()
  };

  year = () => {
    return this.state.dateContext.format('YYYY');
  };
  month = () => {
    return this.state.dateContext.format('MMMM');
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };

  firstDayOfMonth = () => {
    const dateContext = this.state.dateContext;
    const firstDay = moment(dateContext)
      .startOf('month')
      .format('D');
    return firstDay;
  };

  nextMonth = () => {
    let dateContext = { ...this.state.dateContext };
    dateContext = moment(dateContext).add(1, 'month');
    this.setState({
      dateContext
    });
  };

  prevMonth = () => {
    let dateContext = { ...this.state.dateContext };
    dateContext = moment(dateContext).subtract(1, 'month');
    this.setState({
      dateContext: dateContext
    });
  };

  handleDateClick = date => {
    this.props.onClickDate(date);
  };

  render() {
    const weekdays = this.weekdaysShort.map(day => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    let emptyCells = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      emptyCells.push(
        <td key={i * 80} className="empty-cells">
          {''}
        </td>
      );
    }

    const selectedDate = this.props.selectedDate;

    let daysInMonth = [];
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let dateString = `${day} ${this.month()} ${this.year()}`;
      let date = moment(dateString, 'D MMMM YYYY');
      let isSelectedDate = date.isSame(selectedDate, 'day');
      daysInMonth.push(
        <td
          className={`${isSelectedDate ? 'active' : ''} day`}
          key={day}
          onClick={e => {
            this.handleDateClick(date);
          }}
        >
          {day}
        </td>
      );
    }

    const allCells = [...emptyCells, ...daysInMonth];
    let rows = [];
    let cells = [];

    allCells.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === allCells.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    const daysOfMonths = rows.map((data, i) => {
      return <tr key={i}>{data}</tr>;
    });

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td className="nav-month">
                <FaChevronLeft
                  className="fa-chevron-left"
                  onClick={e => {
                    this.prevMonth();
                  }}
                />
                <div className="month-header">
                  {this.month()}
                  {'  '}
                  {this.year()}
                </div>
                <FaChevronRight
                  className="fa-chevron-right"
                  onClick={e => {
                    this.nextMonth();
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="weekdays">{weekdays}</tr>

            {daysOfMonths}
          </tbody>
        </table>
      </div>
    );
  }
}
