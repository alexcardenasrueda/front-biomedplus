import './login.css';
import { useEffect, useState } from "react";
import { getUserByEmailService, getUserByIdService } from '../../services/userService'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from "../../auth/AuthProvider";
import Menu from "../../components/menu/menu";


export var CURRENT_USER_TYPE


const initialForm = {
    email: '',
    pass: '',
};
function Login() {
    const [form, setForm] = useState(initialForm)
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth();

    useEffect(() => {
        isValidForm()
    }, [form]);

    if (auth.isAuthenticated) {
        console.log('----------is auth ir home')
        return <Navigate to="/home" />
    }

    // Se llama cada vez que cambia un valor en el form
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const loginUser = () => {
        (async () => {
            const user = await getUserByEmailService(form.email, form.pass);
            console.log('user log', user)
            if (user.id) {
                auth.saveUerInfo(user)
                console.log('login', auth.isAuthenticated)
                navigate('/')
            }
        })();
    };

    const signUp = () => {
        navigate('/sign-up')
    };

    const isValidForm = () => {
        //validacion form
        if (form.email != '' && form.pass != '') {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }


    return (
        <div>
            <Menu />
            <div className='container-center'>
                <div className='div-auth'>
                    <h1 className='title-center'>Iniciar sesión</h1>
                    <div className='form-floating mb-3'>
                        <input type='text' name='email' className='form-control' value={form.email} onChange={handleChange}></input>
                        <label for="brandLabel">Email</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='password' name='pass' className='form-control' value={form.pass} onChange={handleChange}></input>
                        <label for="brandLabel">Password</label>
                    </div>
                    <div className='form-floating'>
                        <button type="button" className="btn btn-success button-auth" disabled={!isValid} onClick={() => loginUser()}>Iniciar sesión</button>
                    </div>
                    <div className='form-floating'>
                        <button type="button" className="btn btn-outline-secondary button-auth" onClick={() => signUp()}>Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;