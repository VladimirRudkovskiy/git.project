import React from 'react';
import moment from 'moment';
import'./calendar.css';
export default class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false
  }

  constructor(props) {
    super(props); //constructor React.Component
    //default values
    this.width = props.width || '350px';
    this.style = props.style || {}; //empty object instead
  }


  weekdays = moment.weekdays(); //[Sunday, Monday, Tuesday...]
  weekdaysShort = moment.weekdaysShort(); //[Sun, Mon, Tue...]
  months = moment.months();

  year = () => {
    return this.state.dateContext.format('Y'); //will return the current year from the state
  }
  month = () => {
    return this.state.dateContext.format('MMMM'); // will return the current month
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth(); //all days from the moment library
  }
  currentDate = () => {
    console.log('currentDate: ', this.state.dateContext.get('date'));
    return this.state.dateContext.get('date');
  }
  currentDay = () => {
    return this.state.dateContext.format('D');
  }
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d'); //day of the week 0...1...6
    return firstDay;
  }

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month); //will get the month nomber from the months array 
    let dateContext = Object.assign({}, this.state.dateContext); //this will copy all the values in one object
    dateContext = moment(dateContext).set('month', monthNo);
    this.setState({
      dateContext: dateContext
    });
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext); //clone the element
    dateContext = moment(dateContext).add(1, 'month'); // add 1 month to current month (moment library)
    this.setState({ //change the state
      dateContext: dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth(); //props will be passed from the parent 
  }

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, 'month');
    this.setState({
      dateContext: dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  }

  


  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onMonthCange && this.props.onMonthCange(); //'the parent can take any action when monthCange happen
  }


  Selectlist = (props) => {
    let popup = props.data.map((data) => { //create a popup and look through the data
      return (
        <div key = {data}>
          <a href ='#' onClick={(e)=>{this.onSelectChange(e, data)}}>
            {data}
          </a>
        </div>
      );
    });

    return ( //this will render the popup list
      <div className = 'month-popup'>
        {popup}
      </div>
    )
  }
  onChangeMonth = (e, month) => { //we can toggle between the months
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    });
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true
    });
  }

  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext); //create a copy of a current
    dateContext = moment(dateContext).set('year', year); //set the year to the year that is being past
    this.setState ({
      dateContext: dateContext // reset the state back
    })
  }
  onYearChange = (e) => { //whenever the year is changed we need to render calendar
    this.setYear(e.target.value); //current value of the year
    this.props.onYearChange && this.props.onYearChange(e, e.target.value); //invoke the change method
  }

  onKeyUpYear = (e) => {
    if( e.which === 13 || e.which === 27) { //enter key and esc key to interact year changes
      this.setYear(e.target.value); // set the year back
      this.setState({ //set the state
        showYearNav: false
      });
    }
  }

  YearNav = () => { //year navigation
    return (
      this.state.showYearNav ?
      <input
        defaultValue = {this.year()} // default year
        className = 'editor-year'
        ref={(yearInput) => { this.yearInput = yearInput}} // to get acces to year input
        onKeyUp ={(e) => this.onKeyUpYear(e)}
        onChange = {(e) => this.onYearChange(e)}
        type = 'number'
        placeholder='year'/>
      :
      <span 
        className = 'label-year' //change year by doubleclick
        onDoubleClick = {(e) => {this.showYearEditor()}}> 
        {this.year()} 
      </span>
    )
  }


  MonthNav = () => {
    return( //this will return the popup list of  months
      <span className = 'label-month'
      onClick = {(e) => {this.onChangeMonth(e, this.month())}}>
        {this.month()} 
        {this.state.showMonthPopup && //showMonthPopup is true now
          <this.Selectlist data = {this.months} /> //create a select list
        }
      </span>
    );
  }


  onDayClick = (e, day) => {
    this.props.onDayClick && this.props.onDayClick(e, day); //if parent is passing the call we will invok method
  }

  
  render() {
    //Map the weekdays 'Sun, Mon, Tue....'
    let weekdays = this.weekdaysShort.map((day) => { //for every day we create a table with a class name 'day'
      return(
        <td key = {day} className = 'week-day'>{day}</td>
      )
    });
  
    let blanks = []; //empty slots of days of the months, td key for calendar not to transform
    for(let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key ={i*80} className='emptySlot'> 
      {''}
        </td>
        );
    }
  
  
  

    console.log('blanks ', blanks); //show our empty slots in the month: October - 1



    let daysInMonth= [];
    for( let d = 1; d <= this.daysInMonth(); d++) { // day start from 1 to 7
      let className = (d === this.currentDate() ? 'day current-day': 'day');
      daysInMonth.push( //fill the rest of the days in calendar
        <td key = {d} className = {className}>
          <span onClick={(e) =>{this.onDayClick(e, d)}}>{d}</span>
        </td>
      )
    }

    console.log('days: ', daysInMonth); //log it into console to hide from user


    var totalSlots = [ ...blanks, ...daysInMonth]; //we need 7 days in the row
    let rows = []; //row array
    let cells = []; // cells array

    totalSlots.forEach((row, i) => { //look through all the rows
      if((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice(); //if i%7=0 create a new array of rows 
        rows.push(insertRow);
        cells = []; //reset the cells to ampty array
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((d, i)=> { //look through all the rows
      return ( //return a new tr
        <tr key = {i*100}>
          {d}
        </tr>
      );
    })


    return(
      <div className='calendar-container' style = {this.style}>
        <table className ='calendar'>
          <thead>
            <tr className ='calendar-header'>
             <td colSpan='5'>
               <this.MonthNav />
               {' '}
               <this.YearNav />
             </td>
             <td colSpan='2' className = 'label-month'>
                <i className = 'prev fa fa-fw fa-chevron-left'
                  onClick = {(e) => {this.prevMonth()}}>
                </i>
                <i className = 'next fa fa-fw fa-chevron-right'
                  onClick = {(e) => {this.nextMonth()}}>
                </i>
            </td>
            </tr>
          </thead>
          <tbody>
              <tr>
                 {weekdays}
              </tr>
              {trElems}
          </tbody>
        </table>
        </div>
    );
  }
}
