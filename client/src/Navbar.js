import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
    return (
        <Navbar bg="white">
            <Navbar.Brand href="/">CalJS</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/calendar">Calendar</Nav.Link>
                <Nav.Link href="/events">Your Appointments</Nav.Link>
                <Nav.Link href="/add">Add Appointment</Nav.Link>
            </Nav>
        </Navbar>
    )
}
