const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
};
if(user.role !== "admin") return <h2>No Access</h2>;
