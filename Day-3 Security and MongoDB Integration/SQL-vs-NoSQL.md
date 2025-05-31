# NoSQL vs SQL: When to Use Which

## 📘 What is SQL (Relational Database)?
SQL databases are **`relational`**, table-based systems like **MySQL, PostgreSQL, Oracle, SQL Server**.

- **Data is structured**, with predefined schemas (columns, types).
- Uses **SQL (Structured Query Language)** to manage data.
- Great for **ACID** compliance (Atomicity, Consistency, Isolation, Durability).

## 🔶 What is NoSQL (Non-Relational Database)?
NoSQL databases are **`non-relational`**, and can be `document-based`, `key-value` pairs, or `graph` databases like **MongoDB, Cassandra, Redis, Neo4j**.

- **Flexible schema** — good for `unstructured`/`semi-structured` data.
- Designed for **horizontal scaling**, high throughput.
- Favors **availability and partition tolerance** (`CAP theorem`).

    ## 🔁 Horizontal Scaling vs Vertical Scaling
    ### **Horizontal Scaling (NoSQL databases)**
    - Also called "scale out".
    - Means adding more servers to handle increased load.
    - Each server (node) stores part of the data — this is called sharding.
    - Common in NoSQL systems like MongoDB, Cassandra, DynamoDB.

    Example:
    If your app becomes popular and you need to store more data or handle more users, you simply add more `machines` to the cluster.

    Benefits:
    - Cost-effective with commodity hardware
    - High availability (even if one node fails)
    - Handles huge datasets and traffic


    ### **🧱 Vertical Scaling (SQL databases traditionally)**
    - Also called "scale up".
    - Means adding more resources (CPU, RAM, SSD) to your existing server.
    - Works well when the data and workload can be handled by a single powerful machine.
    - Traditional SQL databases like MySQL, PostgreSQL, Oracle are optimized for this.

    Example:
    If your database slows down, you upgrade to a bigger, more powerful server.

    Limits:
    - There's a hardware limit — you can't upgrade forever.
    - More expensive than horizontal scaling at large scale.
    - Downtime may be needed for upgrades.

    <br>

    ## ⚖️ CAP Theorem (Brewer’s Theorem)
    `CAP` Theorem is a fundamental concept in **distributed systems**, especially important when comparing SQL vs NoSQL databases.

    🔺 It states that a distributed system can only `guarantee` 2 out of the following 3 things/properties at the same time:

    | Term                        | Meaning                                                                                                                                                          |
    | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **C – Consistency**         | Every read gets the most recent write or an error.                                                                                                               |
    | **A – Availability**        | Every request gets a non-error response, even if it's not the most recent data.                                                                                  |
    | **P – Partition Tolerance** | The system continues working even if network issues that prevent some parts (nodes) of the system from communicating with each other. (nodes can't communicate). |


    ### 📡 Imagine This Scenario:
    - You have a distributed database running on 3 servers (nodes) — in `Mumbai`, `Delhi`, and `Bangalore`.
    - Due to a network failure, the Mumbai server can't talk to Delhi and Bangalore anymore.
    - This situation is called a **network partition**.
    - Can the system still serve requests even though parts of it can't talk to each other? If `yes`, then the system is Partition Tolerant.


## 💎 ACID Propery of a Transaction in **`SQL`** Databases
ACID ensures `reliable` transactions in relational databases like MySQL, PostgreSQL, etc.

| Property            | Meaning                                                                                                                                                                                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A – Atomicity**   | **All-or-nothing**: A transaction either completes fully or doesn’t happen at all. <br> **Example**: You transfer ₹100 from Account A to B. If the debit from A succeeds but the credit to B fails, the entire transaction is `rolled back`. No money is lost.                                                 |
| **C – Consistency** | A transaction brings the database from **one valid state to another**, following **rules** and **constraints**. <br> **Example**: A column has a rule age > 0. If a transaction tries to insert age = -5, it will fail, ensuring the database stays `valid` and `consistent`.                                  |
| **I – Isolation**   | **Concurrent transactions **do not interfere with each other. It’s as if transactions run one after another, even if they’re running in parallel. <br> **Example**: Two users buy the last movie ticket at the same time. Only one transaction completes; the other waits or fails, preventing double booking. |
| **D – Durability**  | Once a transaction is `committed`, the data is permanently saved, even if the system crashes. <br> **Example**: You successfully place an order, and the system crashes immediately. When it restarts, your order is still there — because it was durably written to disk.                                     |


## ⚖️ BASE Model in NoSQL
BASE stands for: `Basically` `Available` `Soft` state `Eventual` consistency

This model was designed as a more **flexible alternative to ACID**, particularly for highly `scalable`, `distributed` systems.

| Property                      | Meaning                                                                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **B – Basically Available**   | The system guarantees availability, meaning it will always respond to requests (even if some nodes are down). <br> **Example:** You query a NoSQL database during a node failure — it still returns a response, even if it’s slightly outdated. |
| **S – Soft State**            | The system's state may change over time, even without new inputs, due to eventual updates and **background syncs**. <br> **Example:** A data node might auto-correct itself later through synchronization with other nodes.                         |
| **E – Eventually Consistent** | The system allows **temporary inconsistency**, with the guarantee that data will become consistent over time. <br> **Example:** You update your profile picture — it appears instantly for you, but may take a few seconds to reflect for others.   |


#### What are Nodes?
  - In **distributed databases** (like most NoSQL systems), a node is an **individual server** or **machine** that stores a portion of the data and handles requests.
  - A `cluster` is made up of **multiple nodes** working together.
  - Each node can **operate independently** but also communicates with others to keep data updated and consistent.
  - If some nodes go `down` or become `unreachable`, the system may still continue working by using the other nodes.



<br>


## ⚖️ When to Use SQL vs NoSQL?

| Criteria               | SQL (Relational DB)                        | NoSQL (Non-Relational DB)              |
| ---------------------- | ------------------------------------------ | -------------------------------------- |
| **Data Structure**     | Structured (fixed schema)                  | Semi/Unstructured (flexible schema)    |
| **Schema Flexibility** | `Rigid` or `inflexible` schema — needs ALTER for changes     | Dynamic — can evolve without migration |
| **Scalability**        | Vertical (scale-up: bigger machine)        | Horizontal (scale-out: more machines)  |
| **Use Case Examples**  | Banking, ERP systems, Inventory management | Real-time analytics, IoT, Chat apps    |
| **Transactions**       | Strong ACID support                        | BASE model (Eventually consistent)     |
| **Joins/Relations**    | Excellent support                          | Limited or manual implementation       |
| **Examples**           | MySQL, PostgreSQL, Oracle                  | MongoDB, Cassandra, Redis, DynamoDB    |

## ✅ When to Choose SQL?
- Data integrity is critical (banking, ledgers)
- Complex queries, joins, transactions
- You need structured data and clear relationships

## ✅ When to Choose NoSQL?
- Handling large volumes of unstructured data
- Fast development and iteration
- High throughput or distributed systems
- Evolving schemas (e.g., user-generated content, logs)
