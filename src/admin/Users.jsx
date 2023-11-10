import { getAllUsers } from "../api/users";
import { useFetchData } from "../hooks/useFetchData";

const Users = () => {
  const { data: users, isLoading: isLoadingUsers } = useFetchData(getAllUsers);

  console.log("users from Users component:", users);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user?.user_id} {user?.first_name} {user?.last_name} {user?.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
