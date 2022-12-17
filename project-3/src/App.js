import logo from './logo.svg';
import './App.css';
import React from 'https://esm.sh/react@18.2.0'


//The Post button you will be able to interact with when a post is made.
function PostButton(props) {
  var style = {
    width: 24,
    height: 24,
  };
  return (
    <button style={style} onClick={() => props.handleClick()}>
      {props.label}
    </button>
  );
}


//The text area that will display with each post
function PostText(props) {
  var style = {
    border: '1px solid black',
    width: props.width,
  };
  return <div style={style}>{props.text}</div>;
}

//The component that represents the posts that go in the list of posts
function Post(props) {
  var style = {
    display: 'flex',
  };
  return (
    <div style={style}>
      <PostButton label="x" handleClick={props.removeItem} />
      <PostText text={props.title} width="200" />
      <PostButton label="+" handleClick={props.incrementRank} />
      <PostText text={props.rank} width="20" />
      <PostButton label="-" handleClick={props.decrementRank} />
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
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={() => this.addItem()}>Submit</button>
        <PostList
          postList={this.state.items}
          updateRank={this.updateRank.bind(this)}
          removeItem={this.removeItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;
