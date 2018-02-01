var React = require('react'),
    ReactDOM = require('react-dom'),
    $ = require ('jquery')

/*************************************************************
 *************************************************************/

var ContactForm = React.createClass({

  getInitialState: function () {
    return {
      fields: {
        email: '',
        name: '',
        message: '',
      },
      successRes: null,
      errorRes: null
    }
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  _setValue: function (e) {
    const state = this.state.fields
    state[e.target.name] = e.target.value
    this.setState(state)
  },

  _errorDisplay: function (name, msg) {
    // add border red
    $.find('#webmasterForm :input[name='+name+']')[0].classList.add('is-invalid')
    if(msg){
      $('<div class="invalid-feedback">'+msg+'</div>').insertAfter('#webmasterForm :input[name='+name+']')
    }
  },

  _onSubmit: function (e) {
    // Stop submit form
    e.preventDefault()
    let flag = true

    // Remove all invalid and valid feedbacks
    $('.invalid-feedback').remove()
    $('.valid-feedback').remove()

    // Reset alerts
    this.setState({
      successRes: null,
      errorRes: null
    })

    // Reset input class
    Object.keys(this.state.fields).map(function (o, o_idx) {
      $.find('#webmasterForm :input[name='+o+']')[0].classList.remove('is-invalid')
    })

    if(this.state.fields.email === ''){
      flag = false
      this._errorDisplay('email', 'You need to enter your email')
    }
    if(this.state.fields.name === ''){
      flag = false
      this._errorDisplay('name', 'You need to enter your name')
    }
    if(this.state.fields.message === ''){
      flag = false
      this._errorDisplay('message', 'You need to enter your message')
    }

    if(flag){
      // Send form
      this._saveContactInfo(this.state.fields)
    }

  },

  _saveContactInfo: function (data) {
    let that = this

    // Reset alerts
    that.setState({
      successRes: null,
      errorRes: null
    })

    $.ajax({
      url: "/saveContactInfo",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(result) {
        //YOUR CODE GOES HERE
        if(result.error){
          let errors = result.invalidAttributes,
              errorMsg = ''

          // Create error message
          Object.keys(errors).map(function(o1, o1_idx){
            let key = o1,
                errs = errors[o1]
            that._errorDisplay(key, false)
            Object.keys(errs).map(function(o2, o2_idx){
              let err = errs[o2]
              errorMsg += errorMsg + err.message
            })
          })

          // Set alert
          that.setState({ errorRes: <div className="alert alert-danger" role="alert">{errorMsg}</div> })

        } else {

          // Reset fields and set alert
          that.setState({
            fields: {
              email: '',
              name: '',
              message: '',
            },
            successRes: <div className="alert alert-success" role="alert">Your message has been sent, you will receive an answer on your mailbox.</div> })
        }
      },
      error: function(xhr, status, err) {
        //YOUR CODE GOES HERE
        if(err){

          // Set alert
          that.setState({ errorRes: <div className="alert alert-danger" role="alert">{JSON.stringify(err)}</div> })
        }
      }
    })
  },

  render: function() {

    //YOUR CODE GOES HERE

    let { email, name, message } = this.state.fields
    let { successRes, errorRes } = this.state

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 flex">
              <div className="jumbotron">
                <h1>Contact our technical support</h1>
                <form id="webmasterForm" onSubmit={this._onSubmit}>
                  {successRes}
                  {errorRes}
                  <div className="form-group">
                    <input type="email"
                           className="form-control"
                           placeholder="Enter your Email"
                           name="email"
                           value={email}
                           onChange={this._setValue}/>
                  </div>
                  <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder="Enter your Name"
                           name="name"
                           value={name}
                           onChange={this._setValue}/>
                  </div>
                  <div className="form-group">
                <textarea className="form-control"
                          rows="3"
                          placeholder="Your message"
                          name="message"
                          value={message}
                          onChange={this._setValue}>
                </textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
              <a href="/admin" className="btn btn-link">Admin</a>
            </div>
          </div>
        </div>

    )
  }

})

ReactDOM.render(
    <ContactForm/>,
    document.getElementById('containerHome')
)