# LaravelChatRoom
composer create-project laravel/laravel mi-proyecto-laravel
php artisan install:broadcasting
php artisan make:event MessageSent
composer require laravel/prompts
php artisan make:command MessageSentCommand
php artisan migrate

## descargar los recursos para usar api
php artisan install:api

## revisar .env
cambiar de DB_CONNECTION=sqlite a DB_CONNECTION=mysql
si no esta esto BROADCAST_DRIVER=reverb, solo se debe agregar

## agregar en el view.blade.php
@vite(['resources/css/app.css'])
@vite(['resources/js/app.js'])

## levantar el servicio del frontend
npm run dev

## levantar el servicio de reverb
php artisan reverb:start

## levantar el proyecto laravel
php artisan serve 

## levantar el servicio de websocket
php artisan queue:work
php artisan queue:listen

## prueba de websocket
php artisan send:message


` 
## crea todos los recursos
php artisan make:model ModelChat -a 

## Creando middleware para CORS
php artisan make:middleware Cors

#documentacion
https://redberry.international/laravel-reverb-real-time-communication/
https://laravel.com/docs/11.x/reverb