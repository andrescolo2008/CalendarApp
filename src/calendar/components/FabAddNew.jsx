import { addHours } from "date-fns"
import { useCalendarStore, useUIStore } from "../../hooks"

export const FabAddNew = () => {
  
  const {openDateModal} =useUIStore()
   const {setActiveEvent}=useCalendarStore()

  const handleClickNew= ( ) =>{

   setActiveEvent({
    title:'hola ',
        notes:' mundo',
        start: new Date(),
        end:addHours(new Date(), 1 ),
        bgColor:'#fafafa',
        user:{
          _id:'123',
          name:'Andrés',
            }
        }) 
  openDateModal()
        }
    return (

    <button
    className='btn btn-primary fab'
    onClick={handleClickNew}>
        <i className="fas fa-plus"> </i>
    
    </button   >
  )
}
