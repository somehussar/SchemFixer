import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import React, { FormEvent, MutableRefObject, RefObject, useRef, useState } from "react"
import SchemParser from "./converter/SchemParser";
import axios from "axios";
import fileDownload from "js-file-download";

function App() {

  const [errorMsg, setErrorMsg] = useState<string | null>("");
  
  const file: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [buttonState, setButtonState] = useState<boolean>(false);

  const outputArray: MutableRefObject<Uint8Array | null> = useRef<Uint8Array | null>(null);
  const fileURL: MutableRefObject<string | null> = useRef<string | null>(null);

  let name: React.MutableRefObject<string> = useRef("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMsg("");

    outputArray.current = null;
    if(fileURL.current != null) {
      URL.revokeObjectURL(fileURL.current);
      fileURL.current = null;
    }
    
    if (file.current == null || file.current.files == null || file.current.files.length == 0) {
      setErrorMsg("Please input files");
      setButtonState(false);
      return;
    }

    const parser : SchemParser = new SchemParser(file.current.files);

      await parser.tryConvertingSchemToSchematica();
      if (parser.hasError()) {
        setErrorMsg(parser.getError())
        setButtonState(false);
        return;
      }



    console.log("A");
    const output: Uint8Array = parser.getCompressedBlob();
    console.log(output);
    outputArray.current = null;
    if(output != null){
      fileURL.current = URL.createObjectURL(new Blob([output]));
      setButtonState(true);
      name.current = parser.getName();
    }


  }

  function buttonClick(_event: React.MouseEvent<HTMLButtonElement>) {
    if(fileURL.current == null) {
      return;
    }
    axios.get(fileURL.current, {
      responseType: 'blob'
    }).then((res) => {
      console.log(name);
      fileDownload(res.data, name.current);
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
