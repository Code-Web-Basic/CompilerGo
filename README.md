<h1>Tên đề tài: "Xây dựng trang web viết code online cho Java, C#, Python, C++"</h1>
<h2>Project Name : CompilerGo</h2>
<h3>Project use ReactJS + NodeJS + DynamoDB + Redux </h3>
<ul><h3>Thành Viên:</h3> 
    <li>Nguyễn Đình Hiếu - 20142498</li>
    <li>Vũ Thanh Sang - 20110555</li>
    <li>Nguyễn Văn Tú - 20110591</li>
</ul>
<h2>Hướng Dẫn Chạy</h2>
<h3>Tạo dịch vụ EC2</h3>
<p>Lựa chọn dịch vụ EC2 của AWS chọn launch instances và nhập thông tin như hình.</p>
<img src="https://user-images.githubusercontent.com/76199378/206432772-a4842333-dc8c-4ada-8343-a3ee226462b3.png" />
<img src="https://user-images.githubusercontent.com/76199378/206432792-b39dfe99-4a36-4c5b-84a7-c66784a842a0.png" />
<img src="https://user-images.githubusercontent.com/76199378/206432823-7749bdab-4e8d-4f83-9360-916c2c3651fa.png" />
<img src="https://user-images.githubusercontent.com/76199378/206432834-a3a1a15d-5ad1-4516-92ac-82743f87f856.png" />
<p>Sau đó nhấn launch instance</p>
<img src="https://user-images.githubusercontent.com/76199378/206433262-ed362611-a144-43f2-b56d-4256c5b5efb4.png" />
<p>Nhấn vào connect hiển thị trang như hình nhấn vào connect</p>
<img src="https://user-images.githubusercontent.com/76199378/206433396-3a3617fc-492d-456c-aa0e-d80ac876ae81.png" />
<img src="https://user-images.githubusercontent.com/76199378/206433471-82168d5c-d4a8-4c15-a225-94226c6e554b.png" />
<p>Sau khi hiển thị lên màn hình console thì cài docker và tải đồ án trên git về bằng những lệnh sau:</p>
<p>sudo apt-get update</p>
<p>sudo apt-get upgrade</p>
<p>sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common</p>
<p>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -</p>
<p>sudo apt-get install docker-ce docker-ce-cli containerd.io</p>
<p>apt-cache madison docker-ce</p>
<p>sudo apt-get install docker-ce docker-ce-cli containerd.io</p>
<p>sudo apt install docker.io</p>
<p>sudo apt install docker-compose</p>
<p>git clone https://github.com/Code-App-HCMUTE/CompilerGo</p>
<p>cd CompilerGo</p>
<p>cd server</p>
<p>mkdir temp</p>
<p>nano .env sẽ hiển thị như hình sau đó thay đổi APP_HOST thành Public IPv4 DNS</p>
<img src="https://user-images.githubusercontent.com/76199378/206434063-d80017b4-fb02-4643-8071-4d9dfb034dad.png" />
<p>Sau đó lưu file</p>
<p>Sau đó dùng lệnh:</p>
<p>cd ..</p>
<p>cd client</p>
<p>nano .env => sau đó thay đổi giá trị trong ngoặc thành Public IPv4 DNS:3240/v1</p>
<img src="https://user-images.githubusercontent.com/76199378/206434392-32809b6d-5092-4e28-a8bb-9ac4704aafad.png" />
<p>Lưu file sau đó thực hiện tiếp tục lệnh:</p>
<p>cd ..</p>
<p>Sau đó dùng lệnh:</p>
sudo docker-compose build</p>
<p>sudo docker-compose up</p>
<p>Sau đó truy cập vào đường link “http://Public IPv4 DNS:3000” ví dụ </p>
<p>Public IPv4 DNS = ec2-54-236-53-130.compute-1.amazonaws.com</p>
<p>Thì nhập vào đường link “http://ec2-54-236-53-130.compute-1.amazonaws.com:3000” để truy cập vào trang web và sử dụng.</p>

