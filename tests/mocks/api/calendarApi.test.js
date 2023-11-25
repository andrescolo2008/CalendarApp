import calendarApi from "../../../src/api/calendarApi"

describe('pruebas en < calendarAPI.js>',()=>{
test('debe de tener la configuración por defecto', () => { 
        // console.log(calendarApi.defaults.baseURL);
        
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('debe de tener x-token en el header de todas las peticiones',async () => { 
        
        const token ='ABC-123_XYZ';
        localStorage.setItem('token',token);
        const res= await calendarApi.get('/auth');

        expect(res.config.headers['x-token'] ).toBe(token);
    })

})

