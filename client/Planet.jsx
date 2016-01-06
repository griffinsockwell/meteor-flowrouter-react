Planet = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let params = FlowRouter.getParam("planet");
    let handle = Meteor.subscribe('planet-facts', params);
    let sort = {
      submitted: -1
    };
    let limit = this.state.factsLimit;
    return {
      factsLoading: !handle.ready(),
      facts: Facts.find({}, {sort, limit}).fetch(),
      hasFacts: Boolean(Facts.find().count())
    }
  },
  getInitialState() {
    return {factsLimit: 10}
  },
  planetPage() {
    return FlowRouter.getParam('planet');
  },
  renderFacts() {
    return this.data.facts.map((fact) => {
      return <FactCard fact={fact} key={fact._id}/>;
    });
  },
  loadMore() {
    let limit = this.state.factsLimit;
    let count = Facts.find().count();
    return Boolean(limit < count);
  },
  moreFacts() {
    this.setState({
      factsLimit: this.state.factsLimit + 10
    });
  },
  render() {
    let factItem;
    let loadFactsButton;

    if (this.loadMore())
      loadFactsButton = (
        <li className="load-more" onClick={this.moreFacts}>
          <button>Load more Facts</button>
        </li>
      )

    if (this.data.factsLoading)
      factItem = (
        <div className="loading">Loading...</div>
      )
    else if (this.data.hasFacts)
      factItem = (
        <div>
          {this.renderFacts()}
          {loadFactsButton}
        </div>
      )
    else
      factItem = (
        <div className="no-facts">
          No users have submitted facts for this planet.
        </div>
      )

    return (
      <ul>

        <li className="planet-header">
          <h1>Facts for {this.planetPage()}</h1>
        </li>

        {factItem}

      </ul>
    );
  }
});
