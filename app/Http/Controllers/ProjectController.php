<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectSkills;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Image;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     
    protected $rootComponent = 'Admin/Projects/';
    protected $index_url = 'admin.projects.index';

  
    public function index()
    {
        //
        $data['data'] = Project::with(['skills'=>function($q){
            $q->select('project_id','display');
        }])->latest()->get();   
        
        // $data['data'] = Project::with('')->latest()->get();   
 
        return inertia($this->rootComponent.'Index',$data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // $request->validate([
        //     'title'=>'required',
        //     'image'=>'required|image',
        //     'description'=>'required',
        //     'skills'=>'required',
        //     'link'=>'required',
        // ]);


        
      
       
        try {

            if($request->hasFile('image')){   
                $image = $this->processImage($request); 
             }
     
           $project = Project::create([
                'title' => $request->title,
                'link' => $request->link,
                'image'=>  $image,
                'description'=>$request->description
            ]);
 

            if($request->has('skills')){ 
                $skills = $request->get('skills'); 
                $skills_with_id=[];
               foreach ($skills as $key => $value) {
                 array_push($skills_with_id,[
                    'project_id'=>$project->id,
                    'display'=>$value
                ]); 
               } 
               ProjectSkills::insert($skills_with_id); 
            }
    

            \DB::commit();
        } catch (\Throwable $th) {
            throw $th;
            
            \DB::rollback();
        }

        
        return \Redirect::route($this->index_url)->with([
            'type' => 'success',
            'message' => 'Data has been created',
        ]);


    }


    public function processImage($request){
        $image = $request->file('image');
        $filename = Str::slug($request->title).'.'.$image->extension();
     
        $filePath = public_path('/images/projects');
        $img = Image::make($image->path());
         // resize the image to a height of 200 and constrain aspect ratio (auto width)
            $img->resize(null, 500, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->resizeCanvas(1000, 500); 
        $img->save($filePath.'/'.$filename); 
        return $image = '/images/projects/'.$filename;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
        
        try { 
        
            if($request->hasFile('image')){   
                $image = $this->processImage($request);   
                $project->image = $image;
             }
 
        
            $allRequest = $request->except('image');
            // $allRequest['link'] = 'http://'.$allRequest['link']; 
            $project->update($allRequest);
 

            if($request->has('skills')){ 
            ProjectSkills::where('project_id',$project->id)->delete();

                $skills = $request->get('skills'); 
                $skills_with_id=[];
               foreach ($skills as $key => $value) {
                 array_push($skills_with_id,[
                    'project_id'=>$project->id,
                    'display'=>$value
                ]); 
               } 
               ProjectSkills::insert($skills_with_id); 
            }
    
             
            \DB::commit();
        } catch (\Throwable $th) {
            throw $th;
            
            \DB::rollback();
        }

        
        return \Redirect::route($this->index_url)->with([
            'type' => 'success',
            'message' => 'Data has been created',
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return \Redirect::route($this->index_url)->with([
            'type' => 'success',
            'message' => 'Data has been deleted',
        ]);
    }
}
