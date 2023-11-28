import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../../src/hooks"

jest.mock('../../../../src/hooks')

describe('pruebas en < fabDelete>',()=>{

    const mockstartDeletingEvent= jest.fn()

    beforeEach(()=> jest.clearAllMocks() );

test('debe de mostrar el componente correctamente', () => { 

    useCalendarStore.mockReturnValue({
        hasEventSelected:false
    })

render(<FabDelete/>)

const btn=screen.getByLabelText('btn-delete');
expect(btn.classList.toString()).toContain('btn-danger')
expect(btn.classList.toString()).toContain('btn')
expect(btn.classList.toString()).toContain('fab-danger')
expect(btn.style.display).toBe('none')

   })
 
   test('debe de mostrar el botón si hay un evento activo', () => { 

    useCalendarStore.mockReturnValue({
        hasEventSelected:true
    })

render(<FabDelete/>)

const btn=screen.getByLabelText('btn-delete');
// expect(btn.classList.toString()).toContain('btn-danger')

expect(btn.style.display).toBe('')

   })

   test('debe de llamar startDeletingEvent si hay un evento activo', () => { 

    useCalendarStore.mockReturnValue({
        hasEventSelected:true,
        startDeletingEvent:mockstartDeletingEvent,
    })

render(<FabDelete/>)

const btn=screen.getByLabelText('btn-delete');
fireEvent.click(btn)

expect(mockstartDeletingEvent).toHaveBeenCalled();

   })

})


