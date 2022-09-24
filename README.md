Project ReactJS + NodeJS + MongoDB + Redux
Project Name : CompilerGo
Author : VuThanhSang, Nguyen Dinh Hieu, Nguyen Van Tu

API 
User
Sign Up: Post http://localhost:3240/v1/users/signUp (truyền vào email, password (firstName,lastName không bắt buộc ))
Sign In: Post http://localhost:3240/v1/users/signIn (truyền vào email , password)
Google authentication: Get http://localhost:3240/v1/users/auth/google/
Github authentication: Get http://localhost:3240/v1/users/auth/github/
Data trả về khi authentication(google,github) : get http://localhost:3240/v1/users/signIn/success
