import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

import { GrInProgress, GrSearch } from "react-icons/gr";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const router = useRouter();
  const { userInfo } = useUserContext();

  const { searchQuery = "" } = router.query;
  const [queryInfo, setQueryInfo] = useState(searchQuery);

  const [state, setState] = useState({
    loading: true,
    users: [],
  });
  const { loading, users } = state;

  const keys = ["name", "email"];
  const search = (data, q) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q)),
    );
  };

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push("/");
    }

    const fetchUsers = async () => {
      try {
        setState({ loading: true });

        let { data } = await axios.get(`/api/users/all`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        searchQuery !== "" ? (data = search(data, searchQuery)) : "";

        setState({ users: data, loading: false });
      } catch (err) {
        toast.error(err.message);
        setState({ loading: false });
      }
    };
    if (userInfo?.isAdmin) fetchUsers();
  }, [router, userInfo, searchQuery]);

  if (!userInfo?.isAdmin) return null;

  const handleQuerySearch = (e) => {
    e.preventDefault();

    const path = router.pathname;
    const { query } = router;

    if (queryInfo) query.searchQuery = queryInfo;

    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <div className="users-wrapper">
      <div className="users-container">
        <h1>User List</h1>
        <div className="filter-container">
          <div className="users-filter">
            <form onSubmit={handleQuerySearch}>
              <input
                type="text"
                name="query"
                placeholder="Search..."
                onChange={(e) => {
                  setQueryInfo(e.target.value.toLowerCase());
                }}
              />
              <button className="btn" type="submit">
                <GrSearch />
              </button>
            </form>
          </div>
          <div className="result">
            {users && users?.length !== 0 ? users.length : "No"} Results
            {searchQuery !== "" && " : " + searchQuery}
            {searchQuery !== "all" && searchQuery !== "" ? (
              <div className="clear">
                <AiOutlineCloseCircle
                  size={20}
                  onClick={() => router.push("/dashboard")}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="users-list">
          {loading ? (
            <GrInProgress size={30} />
          ) : (
            <table>
              <thead>
                {users?.length !== 0 && (
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <p>{user.name}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <p>{user.isAdmin ? "True" : "False"}</p>
                    </td>
                    <td>
                      <p>{user._createdAt?.slice(0, 7)}</p>
                    </td>
                    <td>
                      <p>{user._updatedAt?.slice(0, 7)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
