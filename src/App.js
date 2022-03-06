import 'whatwg-fetch';
import React, {Component} from 'react';
import axios from "axios";
import {Table} from 'reactstrap';


const PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k';
const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
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
            <td>{this.jsonItem.start.dateTime}</td>
            <td>{this.jsonItem.start.timeZone}</td>
            <td>{this.jsonItem.end.dateTime}</td>
            <td>{this.jsonItem.end.timeZone}</td>
            <td>{this.jsonItem.eventType}</td>
            <td>{this.jsonItem.creator.email}</td>
            <td>{this.jsonItem.creator.displayName}</td>
            <td>{this.jsonItem.status}</td>
            <td>{this.jsonItem.created}</td>
            <td>{this.jsonItem.updated}</td>
            <td><a href={items[1].htmlLink}>link</a></td>
          </tr>
      )
    })
  }


  render() {
    return (
        <React.Fragment>
          <div>
            <div className={'container'}>
              <div className="text-center">
                <h1>G-Calendar</h1>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Events Table</h2>
                </div>
                <div className={'row'}>
                  <Table className={'table-border'}>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>start.dateTime</th>
                      <th>start.timeZone</th>
                      <th>end.dateTime</th>
                      <th>end.timeZone</th>
                      <th>eventType</th>
                      <th>creator.email</th>
                      <th>creator.displayName</th>
                      <th>status</th>
                      <th>created</th>
                      <th>updated</th>
                      <th>htmlLink</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.createRow(this.state.items)}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default App;
