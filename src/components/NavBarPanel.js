import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBarPanel() {
    const cartProducts = useSelector(state => state.cart);
    let cartItem = cartProducts.length > 0 ? cartProducts.length : 0;
    const cartLocal = localStorage.getItem('cart');
    if (cartLocal && cartItem === 0) {
        cartItem = JSON.parse(cartLocal).length;
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                {/* <Navbar.Brand href="/">Homepage</Navbar.Brand> */}

                <Nav>
                    <Nav.Link to="/" as={Link}>
                        Homepage
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>

                        <Nav.Link to="/cart" as={Link}>
                            My Cart {cartItem}
                        </Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarPanel;