# 🚀 Jaxtina E-Learning Platform — Frontend Test

Đây là bài **Frontend Developer Test (Junior–Middle)** do **Jaxtina** cung cấp.  
Mục tiêu: xây dựng một ứng dụng E-Learning mini với đầy đủ tính năng core, trong **5 ngày làm việc**.

> 👨‍💻 Ứng viên: Nguyễn Xuân Bảo Toàn
> 🧩 Vị trí: Frontend Developer (1–3 năm kinh nghiệm)  
> 🕐 Thời gian thực hiện: 5 ngày  
> 🌐 Live Demo: https://jaxtina-elearning.vercel.app/auth/login
> 📦 Source Code: https://github.com/nxbtoan/jaxtina-elearning.git

---

## ✨ Tính năng đã hoàn thành

### 🧱 Core Features (Theo yêu cầu)
- **Đăng nhập / Đăng xuất**:  
  + Form validation (email, password ≥ 6 ký tự).  
  + Tự động redirect & bảo vệ route (`middleware`).  
- **Danh sách khóa học (Course List)**:  
  + Lấy dữ liệu từ API mock, hiển thị **9 khóa học/trang**.  
  + Responsive grid, thumbnail 16:9, mô tả rút gọn 2 dòng.  
- **Chi tiết khóa học (Course Detail)**:  
  + Hiển thị đầy đủ mô tả, danh sách bài học, tiến độ học.  
- **Chi tiết bài học (Lesson Detail)**:  
  + Hiển thị tên, thứ tự, mô tả, thời lượng.  
  + Nút “Đánh dấu đã hoàn thành” thay đổi trạng thái realtime.  
- **Theo dõi tiến độ (Progress Tracking)**:  
  + Lưu trạng thái hoàn thành bài học trong `localStorage`.  
  + Thanh tiến độ cập nhật động.  
- **Tìm kiếm & Lọc khóa học (Search & Filter)**:  
  + Tìm theo Tên, Mô tả.  
  + Lọc theo Level và Loại khóa học.  
  + Xử lý hoàn toàn phía Server (SSR Pagination + Filter).  
- **Responsive Design**: Mobile-first, hỗ trợ tablet & desktop.

### 🌟 Bonus Features
- **Dark/Light Mode**: Sử dụng `next-themes`, lưu trạng thái người dùng.  
- **Framer Motion Animations**: Animation khi chuyển trang và hover.  
- **Loading Skeletons**: Khi fetch dữ liệu Course & Lesson.  
- **UI Clean & Consistent**: Sử dụng CSS Variables + Tailwind.  
- **Video Placeholder**: Hiển thị player mô phỏng trong Lesson Detail khi không có dữ liệu video.

---

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|------------|-----------|
| **Next.js 15 (App Router)** | Framework chính |
| **TypeScript** | Static typing & maintainability |
| **Tailwind CSS** | Styling (với `darkMode: 'class'`) |
| **Framer Motion** | Animation & transition |
| **React Context + Custom Hooks** | State management cho Auth & Progress |
| **LocalStorage API** | Lưu trạng thái học |
| **Vercel** | Triển khai (deployment) |

---

## ⚙️ Cấu trúc thư mục chính
```bash
src
├── app
│   ├── auth
│   │   └── login
│   │       └── page.tsx
│   ├── courses
│   │   ├── CourseListClient.tsx
│   │   ├── CoursesClientWrapper.tsx
│   │   ├── page.tsx
│   │   ├── SearchAndFilter.tsx
│   │   └── [id]
│   │       ├── CourseDetailClientWrapper.tsx
│   │       ├── CourseDetailClientWrapperAnimated.tsx
│   │       ├── lessons
│   │       │   └── [lessonId]
│   │       │       └── page.tsx
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── CourseCard.tsx
│   ├── Header.tsx
│   ├── LessonItem.tsx
│   ├── LoadingSkeleton.tsx
│   ├── Pagination.tsx
│   ├── ProgressBar.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── contexts
│   ├── AuthContext.tsx
│   └── ProgressContext.tsx
├── courses
│   └── page.tsx
├── hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useProgress.ts
├── lib
│   ├── api.ts
│   └── auth.ts
├── middleware.ts
├── types
│   ├── course.ts
│   ├── index.ts
│   ├── lesson.ts
│   └── user.ts
└── utils
│   ├── truncate.ts
│   └── validate.ts
├── tailwind.config.ts
└── tsconfig.json
````

## 🚀 Hướng dẫn cài đặt & chạy dự án

```bash
# 1️⃣ Clone repository
git clone [link-github]

# 2️⃣ Cài đặt dependencies
npm install

# 3️⃣ Chạy ở chế độ development
npm run dev

# 4️⃣ Mở trình duyệt
http://localhost:3000
```
