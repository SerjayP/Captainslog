const React = require("react");
// const DefaultLayout = require("../layout/Default");

class Index extends React.Component {
  render() {
    const { logs } = this.props;
    return (
      <>
        <nav>
          <a href="/logs/new">Create New Log</a>
        </nav>
        <ul>
          {logs.map((log, i) => {
            return (
              <li>
                <a href={`/logs/${log._id}`}>{log.title}</a> is {log.entry}{" "}
                <br />
                {log.shipIsBroken
                  ? "Ship is in working condition"
                  : "Ship must be repaired before departure!"}
                <br />
                <a href={`/logs/${log._id}/edit`}>Edit This Log</a>
                <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

module.exports = Index;
