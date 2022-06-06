import styled from "styled-components";
import { mobile } from "../responsive";
import {useState} from "react";
import {register} from "../redux/apiCalls";
import {useDispatch} from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  text-transform: capitalize;
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

function Register(props) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match!');
            return;
        }
        register(dispatch, {firstName: firstName, lastName: lastName, email: email, username: username, password: password });
    };

    const handleInput = (e, type) => {
        if (type === 'username') {
            setUsername(e.target.value);
        }
        if (type === 'firstName') {
            setFirstName(e.target.value);
        }
        if (type === 'lastName') {
            setLastName(e.target.value);
        }
        if (type === 'email') {
            setEmail(e.target.value);
        }
        if (type === 'password') {
            setPassword(e.target.value);
        }
        if (type === 'confirmPassword') {
            setConfirmPassword(e.target.value);
        }

    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="first name"
                           onChange={(e) => {
                               handleInput(e, 'firstName')
                           }}
                    />
                    <Input placeholder="last name"
                           onChange={(e) => {
                               handleInput(e, 'lastName')
                           }}
                    />
                    <Input placeholder="username"
                           onChange={(e) => {
                               handleInput(e, 'username')
                           }}
                    />
                    <Input placeholder="email"
                           onChange={(e) => {
                               handleInput(e, 'email')
                           }}
                    />
                    <Input placeholder="password" type="password"
                           onChange={(e) => {
                               handleInput(e, 'password')
                           }}
                    />
                    <Input placeholder="confirm password" type="password"
                           onChange={(e) => {
                               handleInput(e, 'confirmPassword')
                           }}
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

export default Register;
