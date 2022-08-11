<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Image;
use Illuminate\Support\Str;


class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     
 
    protected $rootComponent = 'Admin/Companies/';
    protected $index_url = 'admin.companies.index';

  

    public function index()
    {
        //
        $data['data'] = Company::latest()->get();
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
        $request->validate([
            'name'=>'required',
            'logo'=>'required|image'
        ]);

        if($request->hasFile('logo')){   
           $logo = $this->processImage($request); 
        }

        try {
            Company::create([
                'name' => $request->name,
                'logo'=>  $logo,
                'description'=>$request->description
            ]);
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
        $image = $request->file('logo');
        $filename = Str::slug($request->name).'.'.$image->extension();
     
        $filePath = public_path('/images/companies');
        $img = Image::make($image->path());
         // resize the image to a height of 200 and constrain aspect ratio (auto width)
            $img->resize(null, 200, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->resizeCanvas(300, 200); 
        $img->save($filePath.'/'.$filename); 
        return $logo = '/images/companies/'.$filename;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        //

 
        try { 
            if($request->hasFile('logo')){ 
                $logo = $this->processImage($request); 
                $company->logo = $logo;
            }
 
        
            $allRequest = $request->except('logo');

            $company->update($allRequest);
             
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
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return \Redirect::route($this->index_url)->with([
            'type' => 'success',
            'message' => 'Data has been deleted',
        ]);
        //
    }
}
