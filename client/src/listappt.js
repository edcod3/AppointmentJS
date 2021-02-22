import React, {useState, useEffect} from "react";
import UpdateApps from "./updateapps";
import RemoveAlert from './alerts';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListAppt() {

    const [loadEffect, setLoadEffect] = useState({reload: true})
    const [apiVal, setAPIVal] = useState({description: "No Appointments found!"});
    const [disApts, setDisApts] = useState({found: false, edit: ''});
    const [removeAlert, setRemoveAlert] = useState({removed: false});
    const urgs = ["low", "medium", "high"];
    const urgcolor= ["#e9ef02", "orange", "red"];
    const EffectOnload = loadEffect.reload;

    function updateAppt(id) {
        const disAptCopy = disApts;
        disAptCopy.edit = id;
        setDisApts(disAptCopy);
        const newloadEff = {update: true};
        setLoadEffect(newloadEff);
    }

    function removeAppt(id) {
        const req_opts = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({_id: id})
        }
        fetch(`http://${process.env.REACT_APP_API}:1369/deleteappt`, req_opts)
        .then(response => response.json())
        .then(data => {
            const newloadEff = {
                removed: data.deleted,
                remid: data.id
            }
            setRemoveAlert(newloadEff)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getUrgencyColor(urg) {
        for (let i=0; i < urgs.length; i++) {
            if (urg === urgs[i]) {
                const urgcolval = urgcolor[i]
                const colstyle = {
                    color: urgcolval,
                    display: "inline"
                }
                return colstyle
            }
        }
    }

    function formatDate (rawdate) {
        const dateonly = rawdate.split("T")[0]
        const datearr = dateonly.split("-")
        const newdate = `${datearr[2]}.${datearr[1]}.${datearr[0]}` 
        return newdate
    }

    useEffect(() => {
        //console.log("Only Execute useEffect on page load")
        fetch(`http://${process.env.REACT_APP_API}:1369/allapts`)
        .then(response => response.json())
        .then((data) => {
            setAPIVal(data);
            const disCopy = disApts;
            disCopy.found = true;
            setDisApts(disCopy);
            const effectCopy = {apifetch: true};
            setLoadEffect(effectCopy);
        })
        .catch(err => {
        console.log(err);
        })
    }, [EffectOnload, disApts])

    return (
        <div className="App">
            <h2>Your Appointments</h2>
            {disApts.found
                ?   apiVal.map(appt => {
                        if (appt._id === disApts.edit) {
                            return(<UpdateApps apptvals={appt}/>)
                        } else if (removeAlert.remid === appt._id) {
                            return (<RemoveAlert />)
                        } else {
                            return(<Card key={appt._id}>
                                    <Card.Header as="h5">{appt.description}</Card.Header>
                                    <Card.Body>
                                        <p>Deadline: {formatDate(appt.deadline)}</p>
                                        <p>Urgency:<b style={getUrgencyColor(appt.urgency)}> {appt.urgency}</b></p>
                                        <Button variant="outline-info" onClick={() => {updateAppt(appt._id)}}>Edit Appointment</Button> <Button variant="outline-danger" onClick={() => {removeAppt(appt._id)}}>Remove Appointment</Button>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    })
                : <div className="loading-div"><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}
        </div>
    )
}
