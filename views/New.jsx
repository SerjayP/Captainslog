const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <form action="/logs/" method="POST">
            Title:
            <input type="text" name="title" /> <br />
            New Entry:
            <input type="textarea" name="entry" /> <br />
            Ship is Broken:
            <input type="checkbox" name="shipIsBroken" /> <br />
            <input type="submit" />
        </form>
      </div>
    );
  }
}


module.exports = New