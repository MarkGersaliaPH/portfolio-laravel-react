<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BioSetting extends Model
{
    use HasFactory;

    protected $fillable =['introduction','cover_picture','profile_picture'];
}
