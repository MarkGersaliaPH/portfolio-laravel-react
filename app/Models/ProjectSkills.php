<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectSkills extends Model
{
    use HasFactory;
    protected $fillable = ['display','project_id'];

    public function project(){
        return $this->belongsTo(Project::class);
    }
}
