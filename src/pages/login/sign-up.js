import './login.css';
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate, useNavigate } from 'react-router-dom'
import { createUserService } from "../../services/userService";
import Menu from '../../components/menu/menu';


const initialForm = {
    name: '',
    email: '',
    pass: '',
    rol: {
        id: 1
    }
};
function SignUp() {
    const [form, setForm] = useState(initialForm)
    const navigate = useNavigate()
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/home" />
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const createUser = () => {
        (async () => {
            const data = await createUserService(form);
            navigate('/login')
        })();
    };

    const loginUser = () => {
        navigate('/login')
    };

    return (
        <div>
            <Menu />
            <div className='container-center'>
                <div className='div-auth'>
                    <h1 className='title-center'>Registrarse</h1>
                    <div className='form-floating mb-3'>
                        <input type='text' name='name' className='form-control' value={form.name} onChange={handleChange}></input>
                        <label for="brandLabel">Name</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='text' name='email' className='form-control' value={form.email} onChange={handleChange}></input>
                        <label for="brandLabel">Email</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type='password' name='pass' className='form-control' value={form.pass} onChange={handleChange}></input>
                        <label for="brandLabel">Password</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <select name='providersSelect' className='form-select'>
                            <option selected>Seleccione un rol</option>
                            <option key='0' value='0'>admin</option>
                        </select>
                    </div>
                    <div>
                        <button type="button" className="btn btn-success button-auth" onClick={() => createUser()}>Registrarse</button>
                    </div>
                    <div className='form-floating'>
                        <button type="button" className="btn btn-outline-secondary button-auth" onClick={() => loginUser()}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;