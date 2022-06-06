import React from 'react'
import ListOrder from '../QuanLyHoaDon/ListOrder';

function ListOrderCTT(props) {
  const { listOrders } = props;
  return (
    <div>
      <ListOrder list={listOrders} />
    </div>
  );
}

export default ListOrderCTT