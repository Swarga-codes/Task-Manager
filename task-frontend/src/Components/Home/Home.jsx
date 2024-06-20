import React, { useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#ffffff', 
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2196f3', 
          },
          color: '#ffffff', 
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff', 
        },
      },
    },
  },
});

function Home() {
  const navigator = useNavigate();
  const [todosList, setTodosList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const textFieldStyle = { width: "100%", marginTop: "0.8rem"};

  const AddTodo = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/task/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        description: desc,
        status: false,
        deadline
      }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error,{theme:"colored"});
    } else {
      setTitle("");
      setDesc("");
      setDeadline("");
      toast.success(data.message,{theme:"colored"}); 
      getTodos();
    }
  };

  const getTodos = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/task/myTasks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const data = await res.json();
    setTodosList(data);
  };

  const logout = () => {
    if (window.confirm("Do you really wish to logout?")) {
      localStorage.clear();
      navigator("/login");
    }
  };

  const searchData = (item) => {
    let data = item.filter(
      (todo) =>
        todo.title.toLowerCase().includes(search) ||
        todo.description.toLowerCase().includes(search)
    );
    if (!data) {
      return <h1>Hello</h1>
    }
    return data;
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="Home">
        <div className="home_header">
          <div>
            <h1>Hello, {JSON.parse(localStorage.getItem("user"))?.userName}</h1>
            <p>{message}</p>
          </div>
          <div className="logout">
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>

        <div className="todos_input">
          <div className="Title">
            <p>Title</p>
            <TextField
              id="outlined-basic"
              size="small"
              label="Title"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter the title..."
              sx={textFieldStyle}
            />
          </div>
          <div className="Description">
            <p>Description</p>
            <TextField
              id="outlined-basic"
              size="small"
              label="Description"
              variant="outlined"
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Enter the description..."
              sx={textFieldStyle}
            />
          </div>
          <div className="Deadline">
            <p>Deadline</p>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "0.8rem",
                backgroundColor: "black",
                color: "white",
                border: "1px solid white",
                borderRadius: "4px"
              }}
            />
          </div>
          <button
            onClick={() => {
              AddTodo();
            }}
          >
            + Add Todo
          </button>
          <br />
          <TextField
            id="outlined-basic"
            label="Search"
            size="small"
            variant="outlined"
            className="search"
            type="text"
            placeholder="Search a todo"
            sx={textFieldStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
<p className="heading">Below you can find your tasks</p>
<hr />
        <div className="todo_lists">
          {todosList.length > 0 && searchData(todosList).length > 0 ? (
            searchData(todosList)
              ?.map((todo, idx) => (
                <TodoList todo={todo} key={idx} getTodos={getTodos}/>
              ))
          ) : (
            <p className="no_todos">No Todos Found!</p>
          )}
        </div>

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default Home;
