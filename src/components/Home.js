import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Container, Navbar, DropdownButton, Dropdown, Form, ButtonGroup, Button } from "react-bootstrap";

export default function Home() {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [source, setSource] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [id, setId] = React.useState('');

    const GET_LEADS = gql`
        query{
            leads{
                data{id
                    attributes{
                        Name,
                        email,
                        date,
                        Source,
                        updatedAt,
                        Status,
                        createdAt,
                    }
                }
            }
        } 
    `;

    const DELETE_LEADS = gql`
        mutation deleteLead($id: ID!){
            deleteLead(id: $id){
                data{
                    id
                }
            }
        }
    `;

    const CREATE_LEAD = gql`
    mutation createLead(
        $Name: String!
        $email: String!
        $Source: ENUM_LEAD_SOURCE!
        $Status: ENUM_LEAD_STATUS!
        $Notes: String!
      ) {
        createLead(
          data: {
            Name: $Name
            email: $email
            Source: $Source
            Status: $Status
            Notes: $Notes
          }
        ) {
          data {
            attributes {
              Name
            }
          }
        }
      }
      
    `;

    const UPDATE_LEAD = gql`
    mutation updateLead(
        $id: ID!
        $Name: String!
        $email: String!
        $Source: ENUM_LEAD_SOURCE!
        $Status: ENUM_LEAD_STATUS!
        $Notes: String!
      ) {
        updateLead(
          id: $id,
          data: {
            Name: $Name
            email: $email
            Source: $Source
            Status: $Status
            Notes: $Notes
          }
        ) {
          data {
            attributes {
              Name
            }
          }
        }
      }
      
    `;

    const { data } = useQuery(GET_LEADS);

    const [deleteLead] = useMutation(DELETE_LEADS);

    const [createLead] = useMutation(CREATE_LEAD);

    const [updateLead] = useMutation(UPDATE_LEAD);

    const listRender = () => {
        if (data) {
            return (
                data.leads.data.map((value) => {
                    return (
                        <tr key={value.id}>
                            <td>{value.attributes.createdAt}</td>
                            <td>{value.attributes.Name}</td>
                            <td>0000</td>
                            <td>{value.attributes.email}</td>
                            <td>{value.attributes.Source}</td>
                            <td>{value.attributes.updatedAt}</td>
                            <td>{value.attributes.Status}</td>
                            <td>
                                <DropdownButton id="dropdown-basic-button" title="More Options">
                                    <Dropdown.Item><span data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { setId(value.id) }}>Edit</span></Dropdown.Item>
                                    <Dropdown.Item>
                                        <span data-toggle="modal" data-target="#exampleModalCenter3"  onClick={
                                                () => {
                                                    setName(value.attributes.Name);
                                                    setEmail(value.attributes.email);
                                                    setStatus(value.attributes.Status);
                                                    setSource(value.attributes.Source);
                                                    setNotes(value.attributes.Notes);
                                                }
                                            }
                                        >
                                            View
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item><span onClick={() => { deleteLead({ variables: { id: value.id } }); window.location.reload() }}>Delete</span></Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    )
                })
            )

        }

    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="./logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top ml-2 span-1"
                        />
                        Sapien Systems
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <table className="table table-hover w-75 mx-auto my-3">
                <thead>
                    <tr>
                        <th>Lead Date</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Source</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listRender()}
                </tbody>
                <ButtonGroup className="my-3">
                    <Button color="primary" data-toggle="modal" data-target="#exampleModalCenter2">ADD LEADS</Button>
                </ButtonGroup>
            </table>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Content</h5>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" onChange={
                                    (e) => {
                                        if (e.target.value === "1") {
                                            setSource("website")
                                        }
                                        else if (e.target.value === "2") {
                                            setSource("google")
                                        }
                                        else if (e.target.value === "3") {
                                            setSource("my_app")
                                        }
                                        else if (e.target.value === "4") {
                                            setSource("word_of_mouth")
                                        }
                                    }
                                }
                                >
                                    <option>Source</option>
                                    <option value="1">website</option>
                                    <option value="2">google</option>
                                    <option value="3">my_app</option>
                                    <option value="4">word_of_mouth</option>
                                </Form.Select>
                                <Form.Group className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" placeholder="Notes" />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" onChange={
                                    (e) => {
                                        if (e.target.value === "1") {
                                            setStatus("New")
                                        }
                                        else if (e.target.value === "2") {
                                            setStatus("Interested")
                                        }
                                        else if (e.target.value === "3") {
                                            setStatus("Follow_up")
                                        }
                                        else if (e.target.value === "4") {
                                            setStatus("Negetive")
                                        }
                                        else if (e.target.value === "5") {
                                            setStatus("Enrolled")
                                        }
                                    }
                                } >
                                    <option>Status</option>
                                    <option value="1">New</option>
                                    <option value="2">Interested</option>
                                    <option value="3">Follow_Up</option>
                                    <option value="4">Negetive</option>
                                    <option value="5">Enrolled</option>
                                </Form.Select>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                updateLead({ variables: { Name: name, email: email, Status: status, Notes: notes, Source: source, id: id } });
                                window.location.reload();
                            }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalCenter2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add Lead</h5>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" onChange={
                                    (e) => {
                                        if (e.target.value === "1") {
                                            setSource("website")
                                        }
                                        else if (e.target.value === "2") {
                                            setSource("google")
                                        }
                                        else if (e.target.value === "3") {
                                            setSource("my_app")
                                        }
                                        else if (e.target.value === "4") {
                                            setSource("word_of_mouth")
                                        }
                                    }
                                }
                                >
                                    <option>Source</option>
                                    <option value="1">website</option>
                                    <option value="2">google</option>
                                    <option value="3">my_app</option>
                                    <option value="4">word_of_mouth</option>
                                </Form.Select>
                                <Form.Group className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" placeholder="Notes" onChange={(e) => { setNotes(e.target.value) }} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" onChange={
                                    (e) => {
                                        if (e.target.value === "1") {
                                            setStatus("New")
                                        }
                                        else if (e.target.value === "2") {
                                            setStatus("Interested")
                                        }
                                        else if (e.target.value === "3") {
                                            setStatus("Follow_up")
                                        }
                                        else if (e.target.value === "4") {
                                            setStatus("Negetive")
                                        }
                                        else if (e.target.value === "5") {
                                            setStatus("Enrolled")
                                        }
                                    }
                                } >
                                    <option>Status</option>
                                    <option value="1">New</option>
                                    <option value="2">Interested</option>
                                    <option value="3">Follow_Up</option>
                                    <option value="4">Negetive</option>
                                    <option value="5">Enrolled</option>
                                </Form.Select>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                createLead({ variables: { Name: name, email: email, Status: status, Notes: notes, Source: source } });
                                window.location.reload();
                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalCenter3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">View Lead</h5>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder={name} disabled/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder={email} disabled/>
                                </Form.Group>
                                <Form.Select aria-label="Default select example" disabled>
                                    <option>{source}</option>
                                    <option value="1">website</option>
                                    <option value="2">google</option>
                                    <option value="3">my_app</option>
                                    <option value="4">word_of_mouth</option>
                                </Form.Select>
                                <Form.Group className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" placeholder={notes} disabled />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" disabled>
                                    <option>{status}</option>
                                    <option value="1">New</option>
                                    <option value="2">Interested</option>
                                    <option value="3">Follow_Up</option>
                                    <option value="4">Negetive</option>
                                    <option value="5">Enrolled</option>
                                </Form.Select>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}