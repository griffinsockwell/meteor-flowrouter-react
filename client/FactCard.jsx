FactCard = React.createClass({
  propTypes: {
    fact: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {editing: false, text: ''}
  },
  factOwner() {
    return Boolean(this.props.fact.userId === Meteor.userId());
  },
  updateDisabled() {
    let factChars = this.state.text.length;
    return (factChars > 0 && factChars <= 160 ? false : true);
  },
  charCount() {
    return parseInt(160 - this.state.text.length);
  },
  cancelUpdate() {
    this.setState({editing: false});
  },
  updatingFact() {
    this.setState({editing: true});
  },
  handleChange(event) {
    this.setState({text: event.target.value});
  },
  deleteFact() {
    if (confirm("Are you sure you want to delete this fact?")) {
      Meteor.call('removeFact', this.props.fact._id);
    }
  },
  handleSubmit(event) {
    event.preventDefault();

    var fact = ReactDOM.findDOMNode(this.refs.fact).value.trim();

    Meteor.call('updateFact', this.props.fact._id, fact);

    this.setState({editing: false});
  },
  render() {
    let factInfo;
    let factControls;
    let factTime = moment(this.props.fact.submitted).fromNow();
    let authorUrl = '/author/' + this.props.fact.author;
    let planetUrl = '/planet/' + this.props.fact.planet;

    if (this.state.editing)
      factInfo = (
        <form className="update-fact" onSubmit={this.handleSubmit}>
          <textarea ref="fact" maxLength="160" placeholder="Write your fact here..." onChange={this.handleChange} defaultValue={this.props.fact.fact}></textarea>
          <div>
            <span>{this.charCount()}</span>
            <input type="submit" value="Save" disabled={this.updateDisabled()}/>
          </div>
        </form>
      )
    else
      factInfo = (
        <p className="fact-text">{this.props.fact.fact}</p>
      )

    if (this.factOwner()) {
      if (this.state.editing) {
        factControls = (
          <span>
            - <button className="cancel" onClick={this.cancelUpdate}>Cancel</button>
          </span>
        )
      } else {
        factControls = (
          <span>
            - <button className="update" onClick={this.updatingFact}>Edit</button>{" "}
            | <button className="delete" onClick={this.deleteFact}>Delete</button>
          </span>
        )
      }
    }

    return (
      <li className="fact-card">
        <div>
          <p>
            <a className="fact-author" href={authorUrl}>{this.props.fact.author}</a>{" "}
            | <a className="fact-planet" href={planetUrl}>{this.props.fact.planet}</a>{" "}
            | <span className="fact-time">{factTime}</span>{" "}

            {factControls}

          </p>
        </div>

        {factInfo}

      </li>
    )
  }
});
