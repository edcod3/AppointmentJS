import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddAppt() {
    const [appt_opts, setApptOpts] = useState({description: '', deadline: '', urgency: ''})
    const urgs = ["Low", "Medium", "High"];
    const urgcolor= {"Low": "#e9ef02", "Medium": "orange", "High": "red"};
    const [disVal, setDisval] = useState({success: false, added: false, invalidform: false})

    const setVal = (name) => {
        return({ target: {value} }) => {
            setApptOpts(oldval => ({...oldval, [name]: value }));
        }
    }

    function handleSubmit() {
        if (appt_opts.description !== '' && appt_opts.deadline !== '' && appt_opts.urgency !== '') {
        const req_opts = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appt_opts)
        }
        fetch(`http://${process.env.REACT_APP_API}:1369/appts`, req_opts)
        .then(response => response.json())
        .then(data => {
            setDisval({success: data.success, added: true})
        })
        .catch(err => {
            console.log(err)
        })
        } else {
            setDisval({success: false, added: false, invalidform: true})
        } 
    }

    return (
    <div className="inputForm">
    <br />
    {disVal.success
        ? <><br /><Alert variant="success" onClose={() => setDisval({success: !disVal.success, added: true})} dismissible><Alert.Heading>Successfully added Appointment!</Alert.Heading></Alert></> 
        : <div></div>
    }
    {disVal.invalidform
        ? <><br /><Alert variant="danger" onClose={() => setDisval({success: false, added: false, invalidform: false})} dismissible><Alert.Heading as="h5">All fields are required. Make sure you fill them out correctly!</Alert.Heading></Alert></> 
        : <div></div>
    }
    <Form>
      <h2>Add Appointment</h2>
      <Form.Group>
      <Form.Label>Description*: </Form.Label>
      <Form.Control value={disVal.success || disVal.added ? "" : appt_opts.description} placeholder="Description" onChange={setVal('description')}/>
      <Form.Label>Deadline*: </Form.Label>
      <Form.Control type="date" value={disVal.success || disVal.added ? "" : appt_opts.deadline} onChange={setVal('deadline')}/>
      <Form.Label>Urgency*: </Form.Label>
      <Form.Control as="select" value={disVal.success || disVal.added ? "" : appt_opts.urgency} onChange={setVal('urgency')}>
        <option value="">Select urgency</option>
        {urgs.map(urg => <option style={{color: urgcolor[urg]}} key={urg.toLowerCase()}>{urg}</option>)}
      </Form.Control>
      </Form.Group>
      <Button variant="success" type="button" onClick={handleSubmit}>Submit</Button>
    </Form>
    <br />
    </div>
    )
}
