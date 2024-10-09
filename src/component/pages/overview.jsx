import React from "react";
import "./overview.css";
import HeaderTop from "../headertop";


export default function Overview(){
    return(
        <div className="over">
            <div className="dashboard">
            <div className="cards-row">
                <div className="card">
                    <h2>Total Sales</h2>
                    <p>$480K</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                    <h2>Total Profit</h2>
                    <p>$48.8K</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                <h2>AOV</h2>
                    <p>$64.6</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                    <h2>New vs Repeat Customers</h2>
                    <p>New: 30%, Repeat: 70%</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                    <h2>Profit vs Loss</h2>
                    <p>Profit: 72%, Loss: 28%</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
            </div>
            
            <div className="cards-row">
                <div className="card">
                    <h2>Top Selling Products</h2>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                    <h2>Segment-wise Sales</h2>
                    <p>Consumer: 55%, Corporate: 27%, Home Office: 18%</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
                <div className="card">
                    <h2>Category-wise Sales</h2>
                    <p>Technology: 36%, Furniture: 33%, Office Supplies: 31%</p>
                    <div className="graph-placeholder">
                        Graph Placeholder
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}