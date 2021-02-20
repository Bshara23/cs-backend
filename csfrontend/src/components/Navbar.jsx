import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Icon, InlineIcon} from '@iconify/react';
import {connect, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {currentUser, setCurrentUser} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function Navbar2(props) {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const history = useHistory ();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const onLogOut = () => {
    dispatch(setCurrentUser(null));
    removeCookie("user");
  };
  const onProfileClick = () => {
    history.push ('/profile');

  }
  const onMainPageClick = () => {
    history.push ('/dashboard');

  }
  return (
    <>
    {user && <Navbar
        collapseOnSelect
        sticky="top"
        expand="lg"
        className="navbarc myNavBar shadow"
      >        
      
      <Navbar.Brand onClick={onMainPageClick} className="pointer" id="gradingSystem">Hasob </Navbar.Brand>

        <Navbar.Brand className="pointer navbar-username" id="gradingSystemd"> <a href="/profile">{user && `${user.name} ${user.family_name}`}</a></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/phones">Cellphones</Nav.Link>
            <Nav.Link href="/pcs">PCs</Nav.Link>
            {/* <Nav.Link href="/tvs">TVs</Nav.Link> */}
          </Nav>
          <Nav>
          <Nav.Link href="/about">Info</Nav.Link>
            <Nav.Link
              eventKey={2}
              onClick={onLogOut}
              href="/sign-in">
                Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>}
      
    </>
  );
}
