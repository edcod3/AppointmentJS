import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { UpdateAlert } from './alerts';
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdateApps(apptvals) {
    const [appt_opts, setApptOpts] = useState(apptvals.apptvals)
    const urgs = ["Low", "Medium", "High"];
    const [updVal, setupdVal] = useState({update: false})

    const setVal = (name) => {
        return({ target: {value} }) => {
            setApptOpts(oldval => ({...oldval, [name]: value }));
        }
    }

    function capitalize(string) {
        const capString = string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        return capString
    }

    function handleSubmit() {
        const req_opts = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appt_opts)
        }
        fetch(`http://${process.env.REACT_APP_API}:1369/updateappt`, req_opts)
        .then(response => response.json())
        .then(data => {
            setupdVal(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

      if (updVal.updated) {
        return(<UpdateAlert/>)
      } else {
        return(<Card key={appt_opts._id}>
          <Card.Header as="h5">Update Appointment</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Row}>
              <Form.Label column sm="2">Description*: </Form.Label>
              <Col sm="5">
              <Form.Control value={appt_opts.description} onChange={setVal('description')}/>
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column sm="2">Deadline*: </Form.Label>
              <Col sm="5">
              <Form.Control type="date" value={appt_opts.deadline.split("T")[0]} onChange={setVal('deadline')} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column sm="2">Urgency*: </Form.Label>
              <Col sm="5">
              <Form.Control as="select" value={appt_opts.urgency} onChange={setVal('urgency')}>
                <option value="">{capitalize(appt_opts.urgency)}</option>
                {urgs.map(urg => <option key={urg.toLowerCase()}>{urg}</option>)}
              </Form.Control>
              </Col>
              </Form.Group>
              <Button variant="success" onClick={handleSubmit}>Update</Button>
            </Form>
          </Card.Body>
        </Card>)
      }
}

/* 
        <form>
        <h2>Update Appointment</h2>
  
        <label>Description*: </label>
        
          <br />
        <label>Deadline*: </label>
          <br />
          <br />
      </form>
      <div>
          {updVal.updated ? <p>Successfully updated Appointment</p> : <p>Didn't update Appointment</p>}
      </div>
*/