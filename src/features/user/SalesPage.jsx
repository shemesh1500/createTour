import React from "react";
import { Table, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import "./salesPage.css";

const mapState = (state) => ({
  auth: state.firebase.auth,
  sales: [],
});

const SalesPage = (props) => {
  console.log("date ", props);

  return (
    <div className="salesTable">
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Tour name</Table.HeaderCell>
            <Table.HeaderCell>Purchase Dafe</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Coupon</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.sales.map((sale) => (
            <Table.Row id={sale.id}>
              <Table.Cell>{sale.name}</Table.Cell>
              <Table.Cell>
                {sale.purchaseDate.toDate().toDateString()}
              </Table.Cell>
              <Table.Cell>{sale.price}</Table.Cell>
              <Table.Cell>{sale.rating}</Table.Cell>
              <Table.Cell>{sale.coupon}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default connect(mapState)(SalesPage);
