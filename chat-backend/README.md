# LaravelChatRoom
composer create-project laravel/laravel mi-proyecto-laravel
php artisan install:broadcasting
php artisan make:event MessageSent
composer require laravel/prompts
php artisan make:command MessageSentCommand

## revisar .env
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

#documentacion
https://redberry.international/laravel-reverb-real-time-communication/
https://laravel.com/docs/11.x/reverb