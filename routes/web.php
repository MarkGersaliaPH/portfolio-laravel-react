<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\BioSettingController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');


    Route::get('/messages', function () {
        return Inertia::render('Admin/Messages/Index');
    })->name('messages');




    Route::resource('bio-settings', BioSettingController::class); 
    Route::resource('companies', CompanyController::class); 
    Route::resource('projects', ProjectController::class); 
});
 


require __DIR__.'/auth.php';
