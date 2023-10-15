import { dateFnsLocalizer } from 'react-big-calendar'

import {format,parse,startOfWeek,getDay } from 'date-fns'
import esES from 'date-fns/locale/es'
// import enUS from 'date-fns/locale/en-US' en inglés de USA

const locales = {
    'es': esES,
  }
  
   export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })