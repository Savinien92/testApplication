var React = require('react'),
    ReactDOM = require('react-dom');

var $ = require ('jquery');


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
    };
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  setValue: function (e) {
    const state = this.state.fields
    state[e.target.name] = e.target.value
    this.setState(state)
  },

  errorDisplay: function (name, msg) {
    // add border red
    $.find('#webmasterForm :input[name='+name+']')[0].classList.add('is-invalid')
    if(msg){
      $('<div class="invalid-feedback">'+msg+'</div>').insertAfter('#webmasterForm :input[name='+name+']')
    }
  },

  onSubmit: function (e) {
    // stop submit form
    e.preventDefault()
    let flag = true

    // remove all invalid and valid feedback
    $('.invalid-feedback').remove()
    $('.valid-feedback').remove()
    this.setState({
      successRes: null,
      errorRes: null
    })

    // reset input class
    Object.keys(this.state.fields).map(function (o, o_idx) {
      let name = o
      $.find('#webmasterForm :input[name='+name+']')[0].classList.remove('is-invalid')
    })

    if(this.state.fields.email === ''){
      flag = false
      this.errorDisplay('email', 'You need to enter your email')
    }
    if(this.state.fields.name === ''){
      flag = false
      this.errorDisplay('name', 'You need to enter your name')
    }
    if(this.state.fields.message === ''){
      flag = false
      this.errorDisplay('message', 'You need to enter your message')
    }

    if(flag){
      // send form
      this.saveContactInfo(this.state.fields)
    }

  },

  saveContactInfo: function (data) {
    let that = this

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
        console.log('result', result)
        if(result.error){
          let errors = result.invalidAttributes,
              errorMsg = ''

          Object.keys(errors).map(function(o1, o1_idx){
            let key = o1,
                errs = errors[o1]
            that.errorDisplay(key, false)
            Object.keys(errs).map(function(o2, o2_idx){
              let err = errs[o2]
              errorMsg += errorMsg + err.message
            })
          })
          that.setState({ errorRes: <div className="alert alert-danger" role="alert">{errorMsg}</div> })

        } else {
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
        console.log('err', err)

        if(err){
          that.setState({ errorRes: <div className="alert alert-danger" role="alert">{JSON.stringify(err)}</div> })
        }
      }
    });
  },

  render: function() {

    //YOUR CODE GOES HERE

    let { email, name, message } = this.state.fields
    let { successRes, errorRes } = this.state

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="jumbotron">
                <h1>Contact our technical support</h1>
                <form id="webmasterForm" onSubmit={this.onSubmit}>
                  {successRes}
                  {errorRes}
                  <div className="form-group">
                    <input type="email"
                           className="form-control"
                           placeholder="Enter your Email"
                           name="email"
                           value={email}
                           onChange={this.setValue}/>
                  </div>
                  <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder="Enter your Name"
                           name="name"
                           value={name}
                           onChange={this.setValue}/>
                  </div>
                  <div className="form-group">
                <textarea className="form-control"
                          rows="3"
                          placeholder="Your message"
                          name="message"
                          value={message}
                          onChange={this.setValue}>
                </textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

    );
  }

});


ReactDOM.render(
    <ContactForm/>,
    document.getElementById('containerHome')
);