# Stage 1

# Notification System REST API Design

## Base URL

```
http://localhost:5000/api
```

## Headers

```
Content-Type: application/json
Accept: application/json
```
---

## 1. Get All Notifications

**Endpoint**

```
GET /notifications
```

**Response**

```json
[
  {
    "id": 1,
    "title": "Placement Drive",
    "message": "TCS placement drive tomorrow",
    "type": "Placement",
    "isRead": false
  }
]
```

---

## 2. Get Notification by ID

**Endpoint**

```
GET /notifications/:id
```

**Response**

```json
{
  "id": 1,
  "title": "Placement Drive",
  "message": "TCS placement drive tomorrow",
  "type": "Placement",
  "isRead": false
}
```

---

## 3. Create Notification

**Endpoint**

```
POST /notifications
```

**Request**

```json
{
  "title": "Placement Drive",
  "message": "TCS placement drive tomorrow",
  "type": "Placement"
}
```

**Response**

```json
{
  "message": "Notification created successfully"
}
```

---

## 4. Mark Notification as Read

**Endpoint**

```
PUT /notifications/:id
```

**Response**

```json
{
  "message": "Notification marked as read"
}
```

---

## 5. Delete Notification

**Endpoint**

```
DELETE /notifications/:id
```

**Response**

```json
{
  "message": "Notification deleted successfully"
}
```

---

# Notification Schema

```json
{
  "id": "number",
  "title": "string",
  "message": "string",
  "type": "Placement | Event | Result",
  "isRead": "boolean"
}
```

---

# Stage 2

## Database Choice

I will use **MySQL** because it is reliable, and suitable for structured data. It also provides good performance for searching, filtering, and sorting notifications.

---

## Database Schema

### notifications

id -> integer (Primary Key)
std_id -> integer
title -> varchar(255)
message -> text
type -> enum(Placement, Event, Result)
isRead -> boolean
createdAt -> timestamp

---

## Problems When Data Increases

- Queries and performance become slower.
- Database size increases.

---

## Solutions

- Create indexes on studentId, isRead, and createdAt.
- Use pagination to fetch notifications in smaller batches.

---

# Stage 3

## Given Query

```sql
SELECT * FROM notifications WHERE studentID = 1042 AND isRead = false ORDER BY createdAt ASC;
```

This query is accurate as it fetches all the notificatoin which are unread for the student with the id = 1042

## It is very slow

- The table contains a huge number of notifications and query to get results will traverse through all the records.
- for Example in my table if it have more than 5000 records then if i write a query to select a record or to check a condition it will iterate over those entire 5000 records
- if this 5000 records grown to millions or even trillions, the speed will definitely comes too slow which affects the performance of the system

## Improvements

- Create a composite index on (studentID, isRead, createdAt)
- so that when we try to access these fields it will return the records in minimal time
- for Eg, a normal query without index will scan the table for O(n) time whereas using the index to fetch or scan the records will take O(log n) time to return as it have B+ tree indexing
- then the optimised query will be as follows
Example:

```sql
SELECT id, title, message, notificationType, createdAt FROM notifications WHERE studentID = 1042 AND isRead = false ORDER BY createdAt ASC;
```

## adding indexes on every column?

- No We should not do that because adding index to all the columns will give it the property like executing the query without indexes
- it slow down the update and insert operations
- affects the performance of the system

## Query to find students who received a Placement notification in the last 7 days

```sql
SELECT DISTINCT studentID FROM notifications WHERE notificationType = 'Placement' AND createdAt >= NOW() - INTERVAL 7 DAY;
```
