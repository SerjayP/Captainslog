const React = require("react");
const DefaultLayout = require("./layout/Default");
const moment = require("moment")

class Show extends React.Component {
  render() {
    const { title, entry, isShipBroken } = this.props.log;
    return (
      <DefaultLayout title={`${title} Show Page`}>
        <div>
          <p>{entry}</p>
          {isShipBroken? "Ship is in working condition"
            : "Ship must be repaired before departure!"}
            <br />
            {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
      </DefaultLayout>
    );
  }
}
// We can write javascript code within the curly brackets

module.exports = Show;
