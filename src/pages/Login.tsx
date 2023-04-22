import React, { FC,useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled(Form)`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const LoginForm: FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isUser, setIsUser] = React.useState<boolean>(false);
    const [registerUser, setRegisterUser] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        confirmEmail: '',
    });
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home')
            }
        })
    },[])

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/home')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const handleRegister = () => {
        if( registerUser.email !== registerUser.confirmEmail || registerUser.password !== registerUser.confirmPassword) {
            alert("Please confirm that email and password are thesame")
            return
        }
        createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password).then((userCredential) => {
            const user = userCredential.user;
            navigate('/home') 
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    

    return (
        <Wrapper>
            {!isUser ? (
                <FormWrapper name="login-form" onFinish={handleSignIn}>
                    <Title>Login</Title>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => setIsUser(!isUser)}>
                            Create an account
                        </Button>
                    </Form.Item>
                </FormWrapper>
            ): (
                    <FormWrapper name="login-form" onFinish={handleRegister}>
                        <Title>Register</Title>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input value={registerUser.email} onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="confirmEmail"
                            rules={[{ required: true, message: 'Confirm your email!' }]}
                        >
                            <Input value={registerUser.confirmEmail} onChange={(e) => setRegisterUser({ ...registerUser, confirmEmail: e.target.value })} placeholder="Confirm your email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password value={registerUser.password} onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Confirm your password!' }]}
                        >
                            <Input.Password value={registerUser.confirmPassword} onChange={(e) => setRegisterUser({ ...registerUser, confirmPassword: e.target.value })} placeholder="Confirm your password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => setIsUser(!isUser)}>
                                Go back
                            </Button>
                        </Form.Item>

                    </FormWrapper>
            )} 
        </Wrapper>
    );
};

export default LoginForm;