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