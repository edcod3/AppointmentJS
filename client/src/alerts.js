import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'

export function UpdateAlert() {
    return(
            <Alert variant="success" onClose={() => window.location.reload()} dismissible={true}>
                <Alert.Heading>Updated Appointment</Alert.Heading>
                <p>Your Appointment has been successfully updated! Close this pop-up to reload.</p>
            </Alert>
        )
}

export default function RemoveAlert() {

    const [showremAlert, setShowRemAlert] = useState(true);

    if (showremAlert) {
        return(
        <Alert variant="info" onClose={() => setShowRemAlert(false)} dismissible>
            <Alert.Heading>Deleted Appointment</Alert.Heading>
                <p>Your Appointment has been successfully deleted!</p>
        </Alert>)
    } else {
        return(<></>)
    }
}

