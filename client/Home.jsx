Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe('home-facts');
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
          Create an account and add facts for your favorite planets!
        </div>
      )

    return (
      <ul>

        <li className="home-header">
          <h1>Planet Facts</h1>
          <small>Using FlowRouter and ReactLayout</small>
        </li>

        {factItem}

      </ul>
    );
  }
});
