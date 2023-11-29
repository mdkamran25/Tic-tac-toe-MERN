import React from "react";

const PreviousDataTable = ({ user, previousGameData }) => {
  return (
    <>
      <table class="table table-responsive table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Opponent</th>
            <th scope="col">Result</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {previousGameData?.map((item, index) => {
            return (
              <tr>
                <th scope="row" key={index}>
                  {index}
                </th>
                {user?._id !== item?.playerX?._id ? (
                  <td>{item?.playerX?.name}</td>
                ) : item?.playerO?._id ? (
                  <td>{item?.playerO?.name}</td>
                ) : (
                  <td>Not Joined</td>
                )}

                {!item?.winner ? (
                  <td>Match not completed</td>
                ) : item?.winner === "none" ? (
                  <td>Match Tied</td>
                ) : (item?.winner === "X" &&
                    user?._id === item?.playerX?._id) ||
                  (item?.winner === "O" && user?._id === item?.playerO?._id) ? (
                  <td>You won</td>
                ) : (
                  <td>You lost</td>
                )}

                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PreviousDataTable;
