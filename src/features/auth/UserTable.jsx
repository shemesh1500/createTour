import React from "react";
import { Table, Checkbox } from "semantic-ui-react";

const UserTable = (props) => {
  console.log("date ", props.users);

  return (
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Registration Date</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell>Last Login</Table.HeaderCell>
          <Table.HeaderCell>Premium Plan</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.users.map((user) => (
          <Table.Row id={user.email}>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>
              {user.displayName
                ? user.displayName
                : `${user.firstname}${user.lastname}`}
            </Table.Cell>
            <Table.Cell>
              {user.creationTime && user.creationTime.toDate().toDateString()}
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              {user.lastSignIn && user.lastSignIn.toDate().toDateString()}
            </Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserTable;
