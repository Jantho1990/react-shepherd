import { Component } from 'react'

class ViewForm extends Component {
    reduxAction () {
        // This function should be replaced by any classes
        // extending the ViewForm.
        return {}
    }
    submitData (e, callback) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault()
                let {dispatch} = this.props
                let nextState = dispatch(this.reduxAction())
                callback(nextState)
                break
            default:
                break
        }
    }
}

export default ViewForm