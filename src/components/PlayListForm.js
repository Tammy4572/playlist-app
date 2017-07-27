import React, { Component } from 'react';

export default class PlayListForm extends Component {
     constructor(props) {
          super(props);
          this.handleInputChange = this.handleInputChange.bind(this);
          this.submitSong = this.submitSong.bind(this);
          this.state = {
               userName: '',
               songArtist: '',
               songTitle: '',
               songNotes: ''
          }
     }
     handleInputChange(key) {
          return function (e) {
               var state = {};
               state[key] = e.target.value;
               this.setState(state);
          }.bind(this);
     }

     submitSong = (e) => {
          e.preventDefault();
          let listItem = JSON.stringify(this.state);

          fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting', {
               method: "POST",
               body: listItem,
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               }
          }
     ).then(response => {
          console.log(response, "yay");
     }).catch(err => {
          console.log(err, "boo!");
     });
          this.setState({ userName: '', songNotes: '', songArtist: '', songTitle: '' });
     }
     render() {
          return (
               <form className="margin-top card" onSubmit={this.submitSong}>
                    <div className="card-block list-group">
                         <div className="input-group input-group-lg">
                              <span className="input-group-addon" id="sizing-addon1">User Name: </span>
                              <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon1" value={this.state.userName}/>
                         </div>
                         <div className="input-group input-group-lg user-div">
                              <span className="input-group-addon" id="sizing-addon1">Artist or Band Name: </span>
                              <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Artist or Band Name" aria-describedby="sizing-addon1" value={this.state.artist}/>
                         </div>
                         <div className="input-group input-group-lg user-div">
                              <span className="input-group-addon" id="sizing-addon1">Song Title: </span>
                              <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Song Title" aria-describedby="sizing-addon1" value={this.state.songTitle}/>
                         </div>
                         <div className="input-group input-group-lg user-div">
                              <span className="input-group-addon" id="sizing-addon1">Song Notes: </span>
                              <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Song Notes" aria-describedby="sizing-addon1" value={this.state.songNotes}/>
                         </div>
                    </div>
                    <div className="button-div">
                              <button type="submit" className="btn submit-btn btn-primary margin-top">Submit</button>
                    </div>
               </form>
          )
     }
}
