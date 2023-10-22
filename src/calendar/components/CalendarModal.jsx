import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal"


import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es, ms } from "date-fns/locale";
import { useUIStore } from "../../hooks";

registerLocale('es',es)



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
    closeDateModal();
    
}
    
// const [isOpen, setIsOpen] = useState(true) ya no se requiere, useUIstore lo reemplazó
const [formSubmited, setformSubmited] = useState(false)
const{isDateModalOpen,closeDateModal}=useUIStore()


const [formValues, setFormValues] = useState({
    title:'xxxx',
    notes:'zzzzz',
    start: new Date(),
    end: addHours( new Date(),1),
})

 const titleClass= useMemo (  ()=> {
if(!formSubmited) return '';
return (formValues.title.length) > 0

? 'is-valid'
:'is-invalid'

 },[formValues.title,formSubmited] )


const onInPutChange = ({target}) =>{
setFormValues({
            ...formValues,
            [target.name]: target.value
   })
}

const onDateChanged = (event,changing)=>{
    setFormValues({
        ...formValues,
        [changing]:event
    })
}

const onSubmit= (event ) =>{
        event.PreventDefault()
        
        setformSubmited(true)

        const diference = differenceInSeconds(formValues.end ,formValues.start)
       if (isNaN (diference) || diference <=0){
        Swal.fire('Fechas incorrectas','Revisar las fecahs ingresadas', 'error')
        return;
       }

       if (formValues.title.length <=0 ) return; 
        console.log(formValues);

        //TODO:
        //Remover errores en pantalla
        // cerrar modal 
        
}

  return (
    <Modal
         isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={2000}
        >

<h1> Nuevo evento </h1>
<hr />
<form className="container">

    <div className="form-group mb-2" onSubmit={onSubmit}>
        <label>Fecha y hora inicio</label>
        < DatePicker 
        selected={formValues.start}
        className="form-control"
        onChange={(event) => onDateChanged(event,'start')}
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption="hora"
        />
        {/* <input className="form-control" placeholder="Fecha inicio" /> */}
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        < DatePicker 
        minDate={formValues.start}
        selected={formValues.end}
        className="form-control"
        onChange={(event) => onDateChanged(event,'end')}
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption="hora"
        />

        {/* <input className="form-control" placeholder="Fecha inicio" /> */}
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInPutChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInPutChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
        
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
    </Modal>

    
  )
}
