import React, { FC, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import TodoItem from '../components/TodoItem';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

const Home: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/');
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                alert('can not');
            });
    };

    useEffect(() => {
        const q = query(collection(db, 'todos'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr: Todo[] = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id, text: doc.data().text, completed: doc.data().completed });
            });
            setTodos(todosArr);
            console.log(todosArr);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        if (inputValue === '') {
            alert('Please enter a valid todo');
            return;
        }
        await addDoc(collection(db, 'todos'), {
            text: inputValue,
            completed: false
        });
        setInputValue('');
    };

    const deleteTodo = async (id: string) => {
        await deleteDoc(doc(db, 'todos', id));
    };

    const toggleComplete = async (todo: Todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        });
    };
    return (
        <Container>
            <Button danger onClick={handleSignOut}>
                Sign out
            </Button>
            <FormContainer>
                <Form layout="inline" onFinish={createTodo}>
                    <Form.Item>
                        <Input placeholder="Add a todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </FormContainer>
            <TodoItem todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
            {todos.length < 1 ? null : <p>{`You have ${todos.length} todos`}</p>}
        </Container>
    );
};

export default Home;

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 50px 20px;
`;

const FormContainer = styled.div`
    margin-bottom: 20px;
`;
