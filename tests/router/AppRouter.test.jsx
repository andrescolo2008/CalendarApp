import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";


jest.mock('../../src/hooks')
jest.mock('../../src/calendar', ()=>({

    CalendarPage:()=> <h1>CalendarPage</h1>
}))


describe('pruebas en < AppRputer>',()=>{

    const mockcheckAuthToken= jest.fn();

    beforeEach(()=> jest.clearAllMocks() );

test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => { 

       useAuthStore.mockReturnValue({
        checkAuthToken:mockcheckAuthToken,
        status:'checking',
    })

render(<AppRouter/>)


expect(mockcheckAuthToken).toHaveBeenCalled()
expect(screen.getByText('Cargando...')).toBeTruthy()


   })

   test('debe de mostrar el login en caso de no estar autenticado', () => { 

    useAuthStore.mockReturnValue({
        status:'not-authenticated',
     checkAuthToken:mockcheckAuthToken,
 });

           const {container}= render(
                <MemoryRouter initialEntries={['/auth/login...']}>
                            <AppRouter/>
                </MemoryRouter>
            );
            expect(screen.getByText('Ingreso')).toBeTruthy()
            expect(container).toMatchSnapshot()

        

      })

      test('debe de mostrar el calendario si estamos autenticados', () => { 

        useAuthStore.mockReturnValue({
            status:'authenticated',
         checkAuthToken:mockcheckAuthToken,
     });
    
               render(
                    <MemoryRouter >
                                <AppRouter/>
                    </MemoryRouter>
                );
                
                expect(screen.getByText('CalendarPage')).toBeTruthy()

            
    
          })

})

