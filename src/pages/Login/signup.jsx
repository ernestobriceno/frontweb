import React, { useContext, useState } from "react";
import logo from '../Login/logo.png'
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Registration() {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const { dui, name, phone, email, password, confirmPassword, formState, onInputChange, onResetForm } = useForm({
        dui: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    })


    const onSearchSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            const resp = await fetch('hhttps://apiweb-production.up.railway.app/auth/sign_up', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formState)
            });

            const data = await resp.json();
            console.log(data);

            if (data?.error) {
                setUser(null);

                toast.error(data?.error)



            } else {
                setUser(data?.user);
                Cookies.set('token', data?.token)
                toast.success(data?.message)

                onResetForm()
            }
        } catch (error) {
            // Handle error if needed
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">

                <div >
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            <img className="h-40" src={logo} alt="logo" />
                        </h3>
                    </a>
                </div>
                <h3>Registrate</h3>

                <div className="border-green-300 w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    {
                        loading
                            ? <p>...Loading</p>
                            : <form onSubmit={onSearchSubmit}>
                                <div>
                                    <div className=" flex flex-col items-start">
                                        <input
                                            type="text"
                                            name="dui"
                                            value={dui}
                                            onInput={onInputChange}
                                            placeholder="Dui (sin guiones)"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 ">

                                    <div className=" flex flex-col items-start">
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            required
                                            onInput={onInputChange}
                                            placeholder="Nombre completo"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex flex-col items-start">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={phone}
                                            onInput={onInputChange}
                                            placeholder="Numero de telefono (Ej 77777777)"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">

                                    <div className="flex flex-col items-start">
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={email}
                                            onInput={onInputChange}
                                            placeholder="Correo electronico"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">

                                    <div className="flex flex-col items-start">
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            value={password}
                                            onInput={onInputChange}
                                            placeholder="Contraseña"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">

                                    <div className="flex flex-col items-start">
                                        <input
                                            type="password"
                                            required
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onInput={onInputChange}
                                            placeholder="Confirmar contraseña"
                                            className="bg-gray-300 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link to="/">
                                        <a
                                            className="text-sm text-gray-600 underline hover:text-gray-900"
                                            href="#"
                                        >
                                            Iniciar sesion?
                                        </a>
                                    </Link>
                                    {/* <Link to="/"> */}
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-yellow-400 border border-transparent rounded-md active:bg-gray-900 false"
                                    >
                                        Unete
                                    </button>
                                    {/* </Link> */}
                                </div>
                            </form>
                    }
                </div>
            </div>
        </div>
    );
}