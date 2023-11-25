import { act, renderHook } from "@testing-library/react"
import { useUIStore } from "../../src/hooks"
import { Provider } from "react-redux"
import { onCloseDateModal, store, uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"


const getMockStore= (inittialState)=>{
    return configureStore({
        reducer:{
            ui:uiSlice.reducer
        },
        preloadedState:{
            uid:{...inittialState}
        }
    })
}


describe('pruebas en < pruebas en UIStore>',()=>{
test('debe de regresar los valorespor defecto', () => { 

const mockStore = getMockStore({isDateModalOpen:false})


    const {result} = renderHook(() => useUIStore(),{
            wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
       } )

       expect(result.current).toEqual({
        isDateModalOpen:false,
        closeDateModal:expect.any(Function),
        openDateModal:expect.any(Function),
        toggleDateModal:expect.any(Function),
       })
    })

    test('opendateModal debe de colocar true en el isDateModalOpen', () => { 

        const mockStore = getMockStore({isDateModalOpen:false})
        
        
            const {result} = renderHook(() => useUIStore(),{
                    wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
               } )
        const {openDateModal}= result.current;
        act (()=>{
            openDateModal();
        })
             expect(result.current.isDateModalOpen).toBeTruthy()
            })

 test('closeDateModal debe de colocar  en  false el isDateModalOpen', () => { 

                const mockStore = getMockStore({isDateModalOpen:true})
                
                
                    const {result} = renderHook(() => useUIStore(),{
                            wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
                       } )
                const {openDateModal}= result.current;
                act (()=>{
                    result.current.closeDateModal();
                })
                     expect(result.current.isDateModalOpen).toBeFalsy()
                    })

    test('toggleDAteModal debe de cambiar el estado', () => { 

               const mockStore = getMockStore({isDateModalOpen:true})
                        
                        
                const {result} = renderHook(() => useUIStore(),{
                  wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
                               } )
                    act (()=>{
                                 result.current.toggleDateModal();
                        })
                            //  expect(result.current.isDateModalOpen).toBeFalsy()
                             expect(result.current.isDateModalOpen).toBeTruthy()

                             act (()=>{
                                result.current.toggleDateModal();
                       })
                       expect(result.current.isDateModalOpen).toBeFalsy()
                       

                })

})



