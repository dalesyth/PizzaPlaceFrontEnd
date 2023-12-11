import { getAllUsers, deleteUser } from "../api/users";
import { useFetchData } from "../hooks/useFetchData";
import useAuth from "../hooks/useAuth";

const Users = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = useFetchData(getAllUsers);

  const { auth } = useAuth();

  const handleDeleteUser = async (userId) => {
    const token = auth.token;

    try {
      await deleteUser({ userId, token });

      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  

  return (
    <div className="flex-col rounded-lg h-100 w-max bg-gray-200">
      <div id="body" className="flex justify-center font-bold mb-6">
        MANAGE USERS
      </div>

      {isLoadingUsers ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading users: {error.message}</p>
      ) : (
        <table className="table-auto table-with-spacing">
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.length ? (
              users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="h-10 bg-blue-400 text-white font-bold px-1 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold shadow-lg"
                      onClick={() => handleDeleteUser(user.user_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users to display</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
