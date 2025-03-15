# 🚀 Study Notion - ED Tech Web Application

Study Notion is an advanced **Education Technology (ED Tech)** web application built using the **MERN Stack**. It provides a seamless learning experience for students and powerful course management tools for instructors.

---

## 🌟 Features

### 🔑 User Authentication
- Secure **user registration & login** with **JWT (JSON Web Tokens)**.
- Profile management for **students, instructors, and admins**.

### 📚 Courses & Lessons
- **Instructors** can **create, edit, and manage** courses.
- **Students** can **enroll, access course materials, and track progress**.

### 📊 Progress Tracking
- View **completed lessons, quizzes, assignments, and overall progress**.

### 💳 Payment Integration
- Secure **Razorpay integration** for **hassle-free payments**.
- Multiple payment methods supported.

### 🔍 Search Functionality
- Quickly **find courses, lessons, and resources**.

### 🏫 Instructor Dashboard
- **Visual charts & insights** into courses, students, and revenue.
- Monitor **enrollments & income generated** from courses.

---

## ⚠️ Important Notes

🔹 **Backend is in the `server` folder**
🔹 **Categories must be created before adding courses** (e.g., Web Development, Python, etc.)
🔹 **Creating an Admin Account:**
   - First, **sign up** as a **Student** or **Instructor**.
   - Go to your **Database (`users` model)**.
   - Change `accountType` to `Admin`.

---

## 🛠️ Installation Guide

### **1️⃣ Clone the Repository**
```sh
  git clone https://github.com/codder077/ED-TECH.git
```

### **2️⃣ Install Dependencies**
```sh
  cd server
  npm install
```

### **3️⃣ Set Up Environment Variables**
- Create a **`.env`** file in the root directory and **inside `/server`**.
- Add the required **database connection details, JWT secret**, etc.
- Check `.env.example` files for reference.

### **4️⃣ Start the Development Server**
```sh
  npm run dev
```

### **5️⃣ Open in Browser**
📌 Visit: [`http://localhost:3000`](http://localhost:3000)

---

## 🎨 Styling & Customization
- Uses **PostCSS** and `postcss-cli` for CSS processing.
- Customize Tailwind with your own `tailwind.config.js` file.

---

🚀 **Happy Learning with Study Notion!** 🎓✨

