# User Management React App

## **Live Demo**
🔗 [Deployed Link](https://lively-nougat-ad03c7.netlify.app/)

## **Features**

### **Level 1: Authentication**
- Users can log in with credentials.
- Uses **POST /api/login** for authentication.
- On successful login, stores the **token** and redirects to the User List page.

### **Level 2: User Listing**
- Fetches user data from **GET /api/users?page=1**.
- Displays user **first name, last name, avatar** in a structured format (table or cards).
- Implements **pagination or lazy loading**.

### **Level 3: User Management (Edit/Delete/Update)**
- **Edit:**
  - Clicking **Edit** opens a pre-filled form.
  - Users can update **first name, last name, and email**.
  - Uses **PUT /api/users/{id}** for updates.
- **Delete:**
  - Clicking **Delete** removes the user from the list.
  - Uses **DELETE /api/users/{id}** for deletion.
- Displays success/error messages based on the operation.

## **Getting Started**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/kruthickragu/employwise.git
   cd user-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### **Running the App**
```bash
npm start
```
The app will be available at **[http://localhost:3000](http://localhost:3000/)**.

### **Building for Production**
```bash
npm run build
```

### **Running Tests**
```bash
npm test
```

## **API Endpoints Used**
- **Login:** `POST /api/login`
- **Fetch Users:** `GET /api/users?page=1`
- **Update User:** `PUT /api/users/{id}`
- **Delete User:** `DELETE /api/users/{id}`

## **Technologies Used**
- React.js (CRA - Create React App)
- React Router
- Axios (API Requests)
- Bootstrap / Tailwind CSS (Styling)

## **Contributing**
Feel free to open issues or submit PRs to enhance the project!

## **License**
This project is licensed under the [MIT License](LICENSE).

