import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import React, { FormEvent, useRef, useState } from "react"
import SchemParser from "./converter/SchemParser";
import axios from "axios";
import fileDownload from "js-file-download";

function App() {

  const [errorMsg, setErrorMsg] = useState<string>("");
  
  const file = useRef<HTMLInputElement>(null);

  const [buttonState, setButtonState] = useState<boolean>(false);

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMsg("");

    setOutputBlob(null);
    if(fileURL != null) {
      URL.revokeObjectURL(fileURL);
      setFileURL(null);
    }
    
    if (file.current == null || file.current.files == null || file.current.files.length == 0) {
      setErrorMsg("Please input files");
      setButtonState(false);
      return;
    }

    const parser : SchemParser = new SchemParser(file.current.files);

    parser.tryParsingFiles();
    if (parser.hasError()) {
      setErrorMsg(parser.getError())
      setButtonState(false);
      return;
    }

    parser.tryCompressingFiles();
    if (parser.hasError()) {
      setErrorMsg(parser.getError())
      setButtonState(false);
      return;
    }

    setOutputBlob(parser.getCompressedBlob());
    if(outputBlob != null)
      setFileURL(URL.createObjectURL(outputBlob));

  }

  function buttonClick(event: React.MouseEvent<HTMLButtonElement>) {
    if(fileURL == null) {
      return;
    }

    axios.get(fileURL, {
      responseType: 'blob'
    }).then((res) => {
      fileDownload(res.data, "output.schematic");
    })
  }

  return (
      <Container>
        <Form className='border border-primary rounded p-3 text-start w-100' onSubmit={onSubmit}>
          <Form.Text className="text-danger">{errorMsg}</Form.Text>
          <Row className="mb-3 mt-2">
            <Form.Group as={Col} controlId='fileInput'>
              <Form.Label>Import a file</Form.Label>
              
              {/** @ts-ignore */}
              <Form.Control type="file" ref={file}></Form.Control>
            </Form.Group>


            <Form.Group as={Col} controlId='test'>
              <Form.Label>Output file:</Form.Label> 
            {/* <Form.Control type='text'></Form.Control> */}
              <Button type="button" variant={!buttonState ? "outline-danger" : "success"} className="form-control" disabled={!buttonState} onClick={buttonClick}>Download</Button>
            </Form.Group>
          </Row>
          <Row className="m-3">

          </Row>
          <Row className="mt-3 ps-3 pe-3">
              <Button type="submit" variant="primary">Convert</Button>
          </Row>
        </Form>
      </Container>
  )
}

export default App
