import { useState } from "react";
import Modal from "react-modal"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

export const CalendarModal = () => {
const onCloseModal= ( ) =>{
    
    console.log('cerrando modal');
    setIsOpen(false)
}
    
const [isOpen, setIsOpen] = useState(true)
  return (
    <Modal
         isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={2000}
        >
<h1>Hola Amigos</h1>
<hr />
<p> bbfkksdmxczñxlcsdfkñsdkf </p>
    </Modal>
  )
}
