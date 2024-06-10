import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modalpeople({
    modalContent
}) {

    function separateString(modalContent){
        var modalContentArray=modalContent.split(" ");
        return modalContentArray;
    }
    

    var modalContent=modalContent;

    // var stringPrepared=separateString(modalContent);

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{backgroundColor:"rgba(0, 71, 171, 1)"}} onClick={handleShow}>
Ver      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor:"#00857d"}}>
          <Modal.Title style={{color:"white"}}>Usuarios interesados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            {/* { modalContent } */}


        {/* {stringPrepared.map((item) =>{
            <p>item</p>})
        } */}
{modalContent.map(item => (
    <p>{item}</p>
))}
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose} style={{backgroundColor:"rgba(0, 71, 171, 1)"}}>
            Cerrar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Modalpeople;