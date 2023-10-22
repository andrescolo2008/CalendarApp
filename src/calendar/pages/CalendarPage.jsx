import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, NavBar  } from '../'

import { getMessages, localizer } from '../../helpers'
import { useUIStore ,useCalendarStore  } from '../../hooks'




export const CalendarPage = () => {

  const {openDateModal} = useUIStore()
  const {events} =useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView' || 'month'))

  const eventStyleGetter= (event,start,end,isSelected) => {

    const style ={
      backgroundColor:'#347CF7',
      boderRadious:'0px',
      opacity:0.8,
      color:'white'
    }  
    return{
      style
    }
  }


  const onDoubleClick =(event) =>{
    console.log({doubleClick: event});
    openDateModal();

  }

  
  const onSelect =(event) =>{
    console.log({click: events})
    
    

  }

  const onViewChanged =(event) =>{
    // console.log({viewChanged: event});
    localStorage.setItem('lastView',event)

  }

  return (
    <>
  < NavBar />


  <Calendar
  culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={ { height: '90vh' } } 
      // 'calc(100vh -80px)' 
      // { height: '90vh' }
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{event:CalendarEvent}}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}

    
    />
    
    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
        
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>
  < CalendarModal />
    </>
  )
}
