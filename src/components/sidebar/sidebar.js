import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./sidebar.css";
import "./styles.css";

import { logout, auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { CSSTransition } from "react-transition-group";

import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as UserIcon } from "./icons/account-box.svg";
import { AuthContext } from "../context/context";

export default function ToggleSidebar() {
  const [isOpen, setIsopen] = useState(false);
  const style = {
    backgroundColor: "#100901"
  };
  const { currentUser } = useContext(AuthContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // Menu items to be displayed to Users
  const menuItems = currentUser
    ? [
        {
          id: 0,
          title: "Home",
          url: "/dashboard"
        },
        {
          id: 1,
          title: "Study Room",
          url: "/study"
        },
        {
          id:3,
          title: "Chat",
          url: "/home"
        },
        {
          id:4,
          title: "Services",
          url: "/services"
        },
        {
          id:5,
          title: "About",
          url: "/about"
        }
      ]
    : [
        {
          id: 0,
          title: "Home",
          url: "/dashboard"
        },
        {
          id:2,
          title: "Login",
          url: "/login"
        },
        {
          id:3,
          title: "Register",
          url: "/register"
        },
        {
          id:4,
          title: "About",
          url: "/about"
        }
      ];

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  useEffect(() => {
    if (loading) return;
    //if (!currentUser) return navigate("/login");
  }, [currentUser, loading]);

  return (
    <div className={styles}>
      <div className="navbars">
        <nav
          className="navbar navbar-expand-lg navbar-dark shadow-md"
          style={style}
          id="navbar">
          <div className="container-fluid p-2">
            <div className="form-inline">
              <button
                type="button"
                className="btn btn-dark"
                onClick={ToggleSidebar}>
                <i className="fa fa-bars"></i>
              </button>
              <a className="navbar-brand" href="#">
                The<strong id="page-title"> Locker Room </strong>
              </a>
            </div>
            {/* Enter fb nav here*/}

            <NavItem icon={<PlusIcon />}></NavItem>
            <NavItem icon={<BellIcon />} /> 
            <NavItem icon={<MessengerIcon />}/>
            <NavItem icon={<CaretIcon />}>
              {currentUser
                ? [<DropdownMenu></DropdownMenu>]
                : [<GuestDropdownMenu></GuestDropdownMenu>]}
            </NavItem>
          </div>
        </nav>

        <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0">
              Welcome to the <br />
              <strong>Locker Room</strong>
            </h4>
            <div className="btn btn-dark" onClick={ToggleSidebar}>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sd-body">
            <ul>
              <ul>
                {menuItems.map((menu, index) => {
                  return (
                    <li className="menu-items" key={index}>
                      <Link to={menu.url}>
                      <i className="sd-link">
                        {menu.title}
                      </i>
                      </Link> 
                    </li>
                  );
                })}
              </ul>
            </ul>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
          onClick={ToggleSidebar}></div>
      </div>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <span  className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </span>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(e) {
    const height = e.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div
      className="dropdown"
      style={{ height: calcHeight, zIndex: 4 }}
      ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <Link to="/home"> <DropdownItem>Chat</DropdownItem> </Link>
          <Link to="/dashboard"> <DropdownItem>Dashboard</DropdownItem> </Link>
          <DropdownItem
            leftIcon={<UserIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem>
          <div className="log-out" onClick={logout}>
            <DropdownItem>Log Out</DropdownItem>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function GuestDropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(e) {
    const height = e.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div
      className="dropdown"
      style={{ height: calcHeight, zIndex: 4 }}
      ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <Link to="/login">
            <DropdownItem>Login</DropdownItem>{" "}
          </Link>
          <Link to="/register">
            <DropdownItem>Create Account</DropdownItem>
          </Link>
          <Link to="/home">
            <DropdownItem>Home</DropdownItem>
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
}