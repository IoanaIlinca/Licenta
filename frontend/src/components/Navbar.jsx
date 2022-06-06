import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Search, ShoppingCartOutlined} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import { mobile } from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logoutCall} from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  color: white;
  background-color: black;
  position: relative;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  background-color: black;
  outline: none;
  caret-color: white;
  color: white;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: white;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const BadgeWrapper = styled.div`
  color: white;
`;

function Navbar() {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const products = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({
            type: 'USER_LOGOUT'
        });
        logoutCall(dispatch, user, products);
    }

        return (
            <Container>
                <Wrapper>
                    <Left>
                       {/* <Language>
                            EN
                        </Language>
                        <SearchContainer>
                            <Input placeholder="Search" />
                            <Search style={{ color: "gray", fontSize: 16 }} />
                        </SearchContainer>*/}
                        {!user &&
                        <Link to={`/register`}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link>

                        }
                        {!user &&
                        <Link to={`/login`}>
                            <MenuItem>SIGN IN</MenuItem>
                        </Link>
                        }
                        {user &&
                        <MenuItem onClick={handleLogout}>SIGN OUT</MenuItem>
                        }
                    </Left>
                    <Center>
                        <Link to={`/`}>
                            <Logo>
                                WEBSHOP
                            </Logo>
                        </Link>


                    </Center>
                    <Right>


                        <MenuItem>
                            <Link to={`/cart`} >
                                <BadgeWrapper>
                                    <Badge badgeContent={quantity} color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </BadgeWrapper>
                            </Link>
                        </MenuItem>

                    </Right>
                </Wrapper>
            </Container>
        );
}

export default Navbar;