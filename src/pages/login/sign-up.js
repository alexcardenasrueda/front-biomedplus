import './login.css';
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate, useNavigate } from 'react-router-dom'
import { createUserService } from "../../services/userService";
import Menu from '../../components/menu/menu';
import { getRolesService } from '../../services/rolService';


const initialForm = {
    name: '',
    email: '',
    pass: '',
    rolId: 0,
    rol: {
        id: 0
    }
};
function SignUp() {
    const [form, setForm] = useState(initialForm)
    const [roles, setRoles] = useState()
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth();

    useEffect(() => {
        getRoles()
    }, []);


    useEffect(() => {
        isValidForm()
    }, [form]);

    const getRoles = () => {
        (async () => {
            setRoles(await getRolesService());
        })();
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/home" />
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const isValidForm = () => {
        //validacion form
        if (form.name != '' && form.email != '' && form.pass != '' && form.rolId != 0) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    const createUser = () => {
        (async () => {
            form.rol.id = form.rolId
            console.log('form create', form)
            const data = await createUserService(form);
            if (data) { loginUser() }
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
                        <select name='rolId' className='form-select' value={form.rolId}
                            onChange={handleChange}>
                            <option value={0} selected>Seleccione un rol</option>
                            {roles && roles.map(rol => (
                                <option key={rol.id} value={rol.id}>{rol.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="button" className="btn btn-success button-auth" disabled={!isValid} onClick={() => createUser()}>Registrarse</button>
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