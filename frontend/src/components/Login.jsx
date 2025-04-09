import { useRef, useState } from "react";

function Login() {
  const userList = useRef();
  const [data, setData] = useState({});

  const handleClickTest = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then(function (data) {
        const html = data
          .map((user) => {
            return `
                        <div class="container">
                            <img src=${user.profilepic} width="100"> 
                            ${user.email}
                        </div>
                    `;
          })
          .join("");
        userList.innerHTML = html;
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
}

    const handleSubmit = () => {
      // Send form data to backend using fetch
      fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: data,
      })
        .then(function (response) {
          if (response.ok) {
            alert("Registration successful!");
          } else {
            alert("Registration failed!");
          }
        })
        .catch(function (error) {
          alert("Registration failed!");
          console.error("Error:", error);
        });
    };

  return (
    <>
      <h1>Login</h1>
      <div className="container">
        <h2>User Registration</h2>
        <form id="registrationForm" method="POST" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilepic">Profile Picture:</label>
            <input
              type="file"
              id="profilepic"
              name="profilepic"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>Register</button>
          </div>
        </form>
      </div>

      <div className="container" id="userlist" ref={userList}>
        <h2>Testing</h2>
        <button onClick={handleClickTest}>Get all users</button>
      </div>

      <div id="root"></div>
    </>
  );
}

export default Login;
