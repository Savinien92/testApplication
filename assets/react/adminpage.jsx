var React = require('react'),
    ReactDOM = require('react-dom'),
    $ = require ('jquery'),
    NotificationSystem = require('react-notification-system')


/*************************************************************
 *************************************************************/

var AdminPage = React.createClass({

    _notificationSystem: null,

    getInitialState: function () {
        return {
            contactInfos: false
        }
    },

    _addNotification: function(message, level) {
        this.refs.notificationSystem.addNotification({
            message: message,
            level: level
        })
    },

    _getContact: function () {
        let that = this

        $.ajax({
            url: "/getContactInfo",
            dataType: 'json',
            type: 'GET',
            success: function(result) {
                //YOUR CODE GOES HERE

                // Set data
                that.setState({
                    contactInfos: result
                })
            },
            error: function(xhr, status, err) {
                //YOUR CODE GOES HERE
            }
        })

    },

    _deleteContact: function (id) {
        let that = this,
            data = { id: id }

        $.ajax({
            url: "/deleteContactInfo",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(result) {
                //YOUR CODE GOES HERE

                // Get new data
                that._getContact()

                // Set notification
                that._addNotification('Contact deleted', 'success')

            },
            error: function(xhr, status, err) {
                //YOUR CODE GOES HERE
            }
        })
    },

    componentWillMount: function () {

        // Get data
        this._getContact()

    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    render: function() {

        //YOUR CODE GOES HERE
        let that = this,
            { contactInfos } = this.state,
            dataTable

        if(contactInfos){

            let dataTableItems = Object.keys(contactInfos).map(function(o, o_idx){
                let dataTableItem = contactInfos[o]
                return (<tr key={'contact_'+o_idx}>
                            <td>{dataTableItem.name}</td>
                            <td>{dataTableItem.email}</td>
                            <td>{dataTableItem.message}</td>
                            <td>{dataTableItem.createdAt}</td>
                            <td><button className="btn btn-danger" onClick={()=>{that._deleteContact(dataTableItem.id)}}>Delete</button></td>
                        </tr>)
            })

            dataTable = <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataTableItems}
                                </tbody>
                            </table>
        } else {
            dataTable = <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }

        return (
            <div className="container">
                <NotificationSystem ref="notificationSystem" />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 flex">
                        <div className="jumbotron">
                            <h1>AdminPage</h1>
                            <div className="data">
                                {dataTable}
                            </div>
                        </div>
                        <a href="/" className="btn btn-link">Back</a>
                    </div>
                </div>
            </div>

        )
    }

})

ReactDOM.render(
    <AdminPage/>,
    document.getElementById('containerAdmin')
)