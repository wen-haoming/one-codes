FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-20.04

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install required base packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y curl cron \
    ca-certificates zip unzip supervisor libcap2-bin libpng-dev \
    software-properties-common libonig-dev libxml2-dev openssl libbz2-dev \
    zlib1g-dev libzip-dev libcurl4-openssl-dev libffi-dev libssl-dev vim zsh \
    tar wget python2 build-essential apt-transport-https apt-utils \
    openssh-client gnupg2 dirmngr iproute2 procps lsof htop net-tools psmisc \
    tree rsync bzip2 nano vim less jq lsb-release dialog libkrb5-3 locales \
    man-db strace manpages manpages-dev init-system-helpers mariadb-client

# Install omz for pretty terminal
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p 'history-substring-search'

# Add PPA respository for installing PHP 8.1
RUN add-apt-repository ppa:ondrej/php -y && apt-get update

# Install required PHP 8.1 packages
RUN apt-get --fix-missing install -y php8.1 php8.1-common php8.1-cli \
    php8.1-cgi php-phpseclib php8.1-bcmath php8.1-bz2 php8.1-curl \
    php8.1-decimal php8.1-dev php8.1-gd php8.1-gmp php8.1-grpc \
    php8.1-igbinary php8.1-imagick php8.1-imap php8.1-intl php8.1-ldap \
    php8.1-mbstring php8.1-mcrypt php8.1-msgpack php8.1-mysql php8.1-opcache \
    php8.1-pcov php8.1-redis php8.1-soap php8.1-ssh2 php8.1-vips \
    php8.1-xdebug php8.1-xml php8.1-xmlrpc php8.1-xsl php8.1-yaml php8.1-zip

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer

# Install and setup node and yarn
RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh \
    && bash /tmp/nodesource_setup.sh \
    && apt install -y nodejs \
    && npm i -g yarn \
    && yarn global add @nestjs/cli @angular/cli firebase-tools

# Install python
RUN apt install -y python3 python3-dev python3-venv python3-pip

# Remove unnecessary packages to reduce image size
RUN apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
