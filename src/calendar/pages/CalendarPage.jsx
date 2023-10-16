import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { CalendarEvent, NavBar } from '../'

import { getMessages, localizer } from '../../helpers'


const events =[{
title:'cumpleaños de l jefe ',
notes:' hay que comprar el pastel',
start: new Date(),
end:addHours(new Date(), 1 ),
bgColor:'#fafafa',
user:{
  _id:'123',
  name:'Andrés'
}
}]

export const CalendarPage = () => {

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

  return (
    <>
  < NavBar />

  <Calendar
  culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '90vh' }} 
      // 'calc(100vh -80px)' 
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{event:CalendarEvent}}
    />
    </>
  )
}
