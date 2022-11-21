FROM ubuntu:latest

# install enviroment dependencies G++ python3 nodejs npm 
RUN apt update && \
    apt install curl wget -y &&\
    curl -sL https://deb.nodesource.com/setup_14.x &&\
    apt -y install gcc g++ python3 python3-pip nodejs npm && \
    pip3 install numpy 

# install enviroment dependencies java jdk-17
RUN   wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb &&\
    apt install ./jdk-17_linux-x64_bin.deb -y &&\ 
    update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk-17/bin/java" 1 &&\
    apt remove wget curl -y && \
    rm ./jdk-17_linux-x64_bin.deb 

RUN apt install gnupg ca-certificates && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF && \
    echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list && \
    apt update && \
    apt install mono-devel


RUN apt autoremove -y &&\
    rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3240

CMD ["npm", "run", "dev"]

