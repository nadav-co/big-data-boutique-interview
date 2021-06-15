import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <header className="flex align-center space-bt">
            <div className="logo"></div>
            <ul className="flex">
                <li><NavLink to="/room">Rooms</NavLink></li>
                <li><NavLink to="/manager">Managers</NavLink></li>
            </ul>
        </header>
    )
}