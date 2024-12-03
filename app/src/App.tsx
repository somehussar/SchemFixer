import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import { FormEvent, useRef, useState } from "react"


function App() {

  const [errorMsg, setErrorMsg] = useState("");
  
  const file = useRef<File | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMsg("");

    // @ts-ignore
    if (file.current.files.length == 0) {
      setErrorMsg("Please input files");
      return;
    }
  }

  return (
      <Container>
        <Form className='border border-primary rounded p-3 text-start w-100' onSubmit={onSubmit}>
          <Form.Text className="text-danger">{errorMsg}</Form.Text>
          <Row className="mb-3">
            <Form.Group as={Col} controlId='fileInput'>
              <Form.Label>Import a .schem or .schematica file</Form.Label>
              
              {/** @ts-ignore */}
              <Form.Control type="file" ref={file}></Form.Control>
            </Form.Group>


            <Form.Group as={Col} controlId='test'>
            <Form.Label>Output file:</Form.Label>
            <Form.Control type='text'></Form.Control>
            </Form.Group>
          </Row>
          <Row className="m-3">

          </Row>
          <Row className="mt-3">
            <Col>
              <Button type="submit">Test</Button>
            </Col>
          </Row>
        </Form>
      </Container>
  )
}

export default App
