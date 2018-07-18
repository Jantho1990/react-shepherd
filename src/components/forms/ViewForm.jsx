import React, { Component } from 'react'
import { format } from 'path';

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

    onInputChange() {
        console.log('on')
    }

    render () {
        const { onSubmit, children } = this.props
        return (
            <form onSubmit={onSubmit} className="view-form">
                {children}
            </form>
        )
    }
}

export default ViewForm