const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <form action="/logs/" method="POST">
            Title:
            <input type="text" name="Title" /> <br />
            New Entry:
            <input type="textarea" name="Entry" /> <br />
            Ship is Broken:
            <input type="checkbox" name="shipIsBroken" /> <br />
            <input type="submit" />
        </form>
      </div>
    );
  }
}


module.exports = New