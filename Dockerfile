FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev libicu-dev libpq-dev \
 && docker-php-ext-install pdo_mysql bcmath intl zip gd \
 && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
RUN docker-php-ext-enable opcache || true

# PHP upload limits
RUN echo "upload_max_filesize = 10M" >> /usr/local/etc/php/conf.d/uploads.ini \
 && echo "post_max_size = 12M" >> /usr/local/etc/php/conf.d/uploads.ini

