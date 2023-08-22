import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Header = () => {


    const { logOut, user } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">NAVBAR</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="../../../public/profile.png" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="/orders" className="justify-between">
                                Order
                                <span className="badge">New</span>
                            </Link>
                        </li>

                        {
                            user?.email ? <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li> : <li><Link to="/login">Login</Link></li>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;