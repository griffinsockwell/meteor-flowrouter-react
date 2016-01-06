Author = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let params = FlowRouter.getParam("author");
    let handle = Meteor.subscribe('author-facts', params);
    let sort = {
      submitted: -1
    };
    let limit = this.state.factsLimit;
    return {
      currentUser: Meteor.user(),
      factsLoading: !handle.ready(),
      facts: Facts.find({}, {sort, limit}).fetch(),
      hasFacts: Boolean(Facts.find().count())
    }
  },
  getInitialState() {
    return {factsLimit: 10}
  },
  authorPage() {
    return FlowRouter.getParam('author');
  },
  renderFacts() {
    return this.data.facts.map((fact) => {
      return <FactCard fact={fact} key={fact._id}/>;
    });
  },
  canAddFact() {
    if (this.data.currentUser) {
      let username = this.data.currentUser.username;
      let author = FlowRouter.getParam('author');
      return Boolean(username === author);
    }
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
    let factButton;
    let loadFactsButton;

    if (this.canAddFact())
      factButton = (
        <FactForm/>
      )

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
          This user has not submitted any facts yet.
        </div>
      )

    return (
      <ul>

        <li className="author-header">
          <h1>Facts from {this.authorPage()}</h1>
        </li>

        {factButton}

        {factItem}

      </ul>
    );
  }
});
