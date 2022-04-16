import { Back, gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import cartt from "../res/bag.svg";
import hamburger from "../res/bars-solid.svg";
import person from "../res/person-fill.svg";
import signin from "../res/sign-in.svg";
import times from "../res/times-solid.svg";

interface Props {
  nav_abs?: "nav-abs";
}

const Navbar = (props: Props) => {
  const history = useHistory();

  const tl = useRef<GSAPTimeline>();
  const el = useRef<HTMLElement>(null);
  const q = gsap.utils.selector(el);

  useEffect(() => {
    tl.current = gsap
      .timeline({
        defaults: {
          ease: Back.easeOut.config(2),
          duration: 1,
        },
      })
      .paused(true)
      .to(q(".overlay"), {
        clipPath: "circle(100%)",
      })
      .to(
        q(".menu-container"),
        {
          opacity: 1,
          y: "30px",
          stagger: 0.1,
        },
        "-=1"
      );
  }, []);

  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    history.go(0);
  };

  return (
    <nav className={props.nav_abs + " navbar"} ref={el}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="brand">
            404brand.
          </NavLink>
        </div>

        <ul className="navbar-nav-left">
          <li className="nav-item">
            <NavLink to="/shop" activeClassName="selected-nav">
              Shop
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" activeClassName="selected-nav">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" activeClassName="selected-nav">
              Contact
            </NavLink>
          </li>
          <img
            src={hamburger}
            alt="nav button"
            className="hamburger icon"
            onClick={() => tl?.current?.play()}
          />
        </ul>

        <ul className="navbar-nav-right">
          <li className="toast-trigger">
            {data?.me ? (
              <button className="btn-default toast-trigger" onClick={toggle}>
                <img src={person} alt="cart" className="icon" />
              </button>
            ) : (
              <button className="btn-default">
                <NavLink to="/login">
                  <img src={signin} alt="cart" className="icon" />
                </NavLink>
              </button>
            )}
            {isOpen ? (
              <div className="toast">
                {data ? (
                  <span>
                    Hello, <strong>{data?.me?.firstname}</strong>{" "}
                  </span>
                ) : null}
                <ul>
                  {data?.me?.isAdmin ? (
                    <li>
                      <NavLink to="/admin">Admin</NavLink>
                    </li>
                  ) : null}
                  <li>
                    <NavLink to="/changepassword">Change Password</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"} onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : null}
          </li>
          <li>
            <NavLink to="/cart">
              <img src={cartt} alt="cart" className="icon" />
              {/* <span className="cart-badge">{getCartCount()}</span> */}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="overlay">
        <a href="#" className="exit" onClick={() => tl?.current?.reverse(0.7)}>
          <img src={times} alt="close" className="icon" />
        </a>

        <div className="mobile-menu">
          <div className="menu-container">
            <ul>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
