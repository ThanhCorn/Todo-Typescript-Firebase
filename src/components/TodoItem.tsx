import { Button, List } from 'antd';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type TodoItemProps = {
    todos: Todo[];
    toggleComplete: (todo: Todo) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
};

const TodoItem: React.FC<TodoItemProps> = ({ todos, toggleComplete, deleteTodo }) => {
    return (
        <List
            bordered
            dataSource={todos}
            renderItem={(todo) => (
                <List.Item key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="link" onClick={() => toggleComplete(todo)}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </Button>
                        <Button type="link" danger onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </Button>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default TodoItem;
