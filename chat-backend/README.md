# LaravelChatRoom
composer create-project laravel/laravel mi-proyecto-laravel
php artisan install:broadcasting
composer require laravel/prompts
npm install

## descargar los recursos para usar api
php artisan install:api

## crea todos los recursos
php artisan make:model ModelChat -a 
php artisan migrate

## crear
php artisan make:event MessageSent
php artisan make:command MessageSentCommand

## revisar .env
cambiar de DB_CONNECTION=sqlite a DB_CONNECTION=mysql
si no esta esto BROADCAST_DRIVER=reverb, solo se debe agregar

## config php.ini
cambiar de ;extension=sockets a extension=sockets

## agregar en el view.blade.php
@vite(['resources/css/app.css'])
@vite(['resources/js/app.js'])

## levantar el servicio del frontend
npm run dev

## levantar el proyecto laravel
php artisan serve

## levantar el servicio de reverb
php artisan reverb:start

## levantar el servicio de websocket
php artisan queue:work
php artisan queue:listen

## prueba de websocket
php artisan send:message

## Creando middleware para CORS
php artisan make:middleware Cors

#documentacion
https://redberry.international/laravel-reverb-real-time-communication/
https://laravel.com/docs/11.x/reverb