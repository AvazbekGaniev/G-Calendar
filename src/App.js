import 'whatwg-fetch';
import React, {Component} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


const PUBLIC_KEY = 'AIzaSyAiVM8SUdzANblCt9J8WQex43ot70kUnvg';
const CALENDAR_ID = 'avazbek.dev@gmail.com';
const dataUrl = 'https://www.googleapis.com/calendar/v3/calendars/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: '',
    };
  }

  jsonItem = {
    kind: '', etag: '', id: '', status: '', htmlLink: '', created: '', updated: '', summary: '', creator: {
      email: '',
      displayName: ''
    }, organizer: {
      email: '',
      displayName: '',
      self: ''
    }, start: {
      dateTime: '',
      timeZone: ''
    }, end: {
      dateTime: '',
      timeZone: '',
    }, iCalUID: '', sequence: '', eventType: '',
  }
  itemsArray = []

  componentDidMount() {
    axios.get(dataUrl + CALENDAR_ID + '/events?key=' + PUBLIC_KEY).then(res => {
      for (let item of res.data.items) {
        this.jsonItem = item;
        this.itemsArray.push(this.jsonItem)
      }
      this.setState({
        items: this.itemsArray
      })
    }).catch(error => {
    })
  };

  createRow(items) {

    return this.state.items.map((item, i) => {
      this.jsonItem = item;
      return (
          <tr key={this.jsonItem.id}>
            <th scope="row">{i + 1}</th>
            <td>{this.jsonItem.start.dateTime.substring(0,10)}</td>
            <td>{this.jsonItem.start.dateTime.substring(11,16)}</td>
            <td>{this.jsonItem.end.dateTime.substring(11,16)}</td>
            <td>{this.jsonItem.end.timeZone}</td>
            <td>{this.jsonItem.eventType}</td>
            <td>{this.jsonItem.creator.email}</td>
            <td>{this.jsonItem.status}</td>
            <td>{this.jsonItem.created.substring(0,10)}</td>
            <td>{this.jsonItem.updated.substring(0,10)}</td>
            <td><a href={this.jsonItem.htmlLink}>link</a></td>
          </tr>
      )
    })
  }


  render() {
    return (
        <React.Fragment>
          <div>
            <div className={'container-md '}>
              <div className="text-center">
                <h1>G-Calendar</h1>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Events Table</h2>
                </div>
                <div className={'row  table-container border'}>
                  <table className={'table table-striped '}>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th scope="col"  >Event-Day</th>
                      <th scope="col" >Start Time</th>
                      <th scope="col" >End Time</th>
                      <th scope="col" >Time Zone</th>
                      <th scope="col" >Event Type</th>
                      <th scope="col" >Creator's email</th>
                      <th scope="col" >Status</th>
                      <th scope="col" >Created At</th>
                      <th scope="col" >Updated At</th>
                      <th scope="col" >Link </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.createRow(this.state.items)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default App;
