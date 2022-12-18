import './App.css';
import React from 'https://esm.sh/react@18.2.0'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'

//This function will connect everything together
function Main() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

//The NavBar Menu
function Nav() {
  return (
    <div id="nav">
      Seasonal Wishlist Designer
      <NavLink to={'/contact'} className="links">Contact</NavLink>
      <NavLink to={'/'} className="links">Home</NavLink> 
    </div>
  );
}

//The Contacts Webpage of Application
class Contact extends React.Component {
  constructor(props){
    super(props)
    this.state = { firstName:'',lastName:'', email:'', comment:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit(event){
    const { firstName, lastName, email, comment } = this.state
    event.preventDefault()
    alert(`
      First Name : ${firstName}
      Last Name : ${lastName}
      Email : ${email}
      Comment: ${comment}
    `)
  }
  
 
  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  render(){
    var style = {
      border: '1px solid',
      margin: 'auto',
      width: '50%',
      padding: '10px'
    }
    return(
      <form style={style} onSubmit={this.handleSubmit}>
        <div>
          <label>First Name: </label>
          <input 
            name='firstName'
            placeholder='Enter your First Name' 
            value = {this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            name='lastName' 
            placeholder='Enter your Last Name'
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            name='email' 
            placeholder='Enter a Valid Email'
            type ='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Comment: </label>
          <input
            name='comment' 
            placeholder='Leave a comment....'
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    )
  }
}


//The Post button you will be able to interact with when a post is made.
function PostButton(props) {
  return (
    <button id="postButton" onClick={() => props.handleClick()}>
      {props.label}
    </button>
  );
}


//The text area that will display with each post
function PostText(props) {
  var style = {
    border: '1px solid black',
    borderRadius: '5px',
    width: '100%',
    background: 'red',
    color: 'white',
  }
  return <div style={style}>{props.text}</div>;
}

//The component that represents the posts that go in the list of posts
function Post(props) {
  var style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <div style={style}>
      <PostButton  label="X" handleClick={props.removeItem} />
      <PostText text={props.title} width="200" />
      <PostButton label="/\" handleClick={props.incrementRank} />
      <PostText text={props.rank} width="20" />
      <PostButton label="\/" handleClick={props.decrementRank} />
    </div>
  );
}

//Component that rep. the list of posts
function PostList(props) {
  return (
    <ol>
      {props.postList.map((item, index) => (
        <Post
          key={index}
          title={item.title}
          rank={item.rank}
          incrementRank={() => props.updateRank(index, 1)}
          decrementRank={() => props.updateRank(index, -1)}
          removeItem={() => props.removeItem(index)}
        />
      ))}
    </ol>
  );
}

//The Component that will include everything for the list.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', items: [] };
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }
  addItem() {
    var itemsCopy = this.state.items.slice();
    var truncatedString = this.state.value.substring(0, 20);
    itemsCopy.push({ title: truncatedString, rank: 0 });
    itemsCopy.sort((a, b) => {
      return b.rank - a.rank;
    });
    this.setState({ items: itemsCopy, value: '' });
  }
  removeItem(index) {
    var itemsCopy = this.state.items.slice();
    itemsCopy.splice(index, 1);
    itemsCopy.sort((a, b) => {
      return b.rank - a.rank;
    });

    this.setState({ items: itemsCopy });
  }
  updateRank(index, val) {
    var itemsCopy = this.state.items.slice();
    itemsCopy[index].rank += val;
    itemsCopy.sort((a, b) => {
      return b.rank - a.rank;
    });
    this.setState({ items: itemsCopy });
  }
  render() {
    var style = {
      margin: 'auto',
      width: '50%',
      padding: '10px',
      textalign: 'center',
    }
    return (
      <div style={style}>
        <input className= 'inputField'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <button id="submit" onClick={() => this.addItem()}>Submit</button>
        <PostList
          postList={this.state.items}
          updateRank={this.updateRank.bind(this)}
          removeItem={this.removeItem.bind(this)}
        />
      </div>
    );
  }
}

export default Main;
