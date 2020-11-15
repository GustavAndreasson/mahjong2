import React from "react";

const TransactionRow = ({ points }) => (
    <div className="transaction-row">
        { points &&  points.map((point, i) => (
            <div key={i}>
                { point }
            </div>
        ))}
    </div>
)

export default TransactionRow;
