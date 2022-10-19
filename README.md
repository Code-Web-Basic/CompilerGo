Tên đề tài: "Xây dựng trang web viết code online cho Java, C#, Python, C++"
----------------------------
Project use ReactJS + NodeJS + MongoDB + Redux
Project Name : CompilerGo
Thành Viên: 
+Nguyễn Đình Hiếu 20142498
+Vũ Thanh Sang 20110555
+Nguyễn Văn Tú 20110591
API 
User
Sign Up: Post http://localhost:3240/v1/users/signUp (truyền vào email, password (firstName,lastName không bắt buộc ))
Sign In: Post http://localhost:3240/v1/users/signIn (truyền vào email , password)
Google authentication: Get http://localhost:3240/v1/users/auth/google/
Github authentication: Get http://localhost:3240/v1/users/auth/github/
Data trả về khi authentication(google,github) : get http://localhost:3240/v1/users/signIn/success
