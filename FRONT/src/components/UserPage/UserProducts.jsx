import { useEffect, useState } from "react";
import UserProductList from "./UserProductList.jsx";
import bufferToUrl from "../../utils/BufferToUrl.js";

export default function UserProducts({
  rendered,
  setRendered,
  userProducts,
  setSelectedId,
}) {
  useEffect(() => {
    userProducts.forEach((product) => {
      product.picture = bufferToUrl(product.picture.data);
    });
  }, [userProducts]);

  return (
    <div className="">
      <div className="userProducts">
        <h5>Your Models</h5>
        <h6 onClick={() => setRendered("ProductAdd")}>Add new model</h6>

        {userProducts.map((product) => {
          return (
            <UserProductList
              rendered={rendered}
              setRendered={setRendered}
              setSelectedId={setSelectedId}
              name={product.name}
              key={product.id}
              id={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}
