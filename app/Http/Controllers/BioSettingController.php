<?php

namespace App\Http\Controllers;

use App\Models\BioSetting;
use Illuminate\Http\Request;

class BioSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $rootComponent = 'Admin/BioSettings/';
    protected $index_url = 'admin.bio-settings.index';

    public function index()
    {
        //
        $data = BioSetting::first();
        return inertia($this->rootComponent.'Index',['data'=>$data]);
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
            'introduction'=>'required',
            'profile_picture'=>'image',
            'cover_picture'=>'image',
        ]);

        $image_path = ''; 
        if ($request->hasFile('profile_picture')) {
            // dd($request->file('image')->store('images', 'public'));
            // $profile_picture = $request->file('profile_picture')->storeAs('images','profile_pic.jpg');  
            $image = $request->file('profile_picture');
            $image_name = 'profile_pic.jpg';
            $image->move(public_path('/images'),$image_name); 
            $profile_picture = "/images/" . $image_name;
        }
        if ($request->hasFile('cover_picture')) {
            // dd($request->file('image')->store('images', 'public'));
            // $cover_picture = $request->file('cover_picture')->storeAs('images','cover_pic.jpg');  
            $image = $request->file('cover_picture');
            $image_name = 'cover_picture.jpg';
            $image->move(public_path('/images'),$image_name); 
            $cover_picture = "/images/" . $image_name;
        }

 

 
        try {
            //code...
            // $car = Car::create($attr);
            //     CarImage::create([
            //         'car_id'=> $car->id,
            //         'filename'=>asset('storage/'.$image_path)
            //     ]);

            $data = BioSetting::first();
            if($data){
                $data->profile_picture = $profile_picture ?? $data->profile_picture;
                $data->cover_picture =  $cover_picture ?? $data->cover_picture;
                $data->introduction =   $request->introduction;
                $data->save();
            }else{

                BioSetting::create([
                    'introduction'=>$request->introduction, 
                    'profile_picture' => $profile_picture,
                    'cover_picture' => $cover_picture,
                ]);
 
            }



            \DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            \DB::rollback();
            return $th;
        }

    
        return \Redirect::back()->with([
            'type' => 'success',
            'message' => 'Car has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BioSetting  $bioSetting
     * @return \Illuminate\Http\Response
     */
    public function show(BioSetting $bioSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BioSetting  $bioSetting
     * @return \Illuminate\Http\Response
     */
    public function edit(BioSetting $bioSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BioSetting  $bioSetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BioSetting $bioSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BioSetting  $bioSetting
     * @return \Illuminate\Http\Response
     */
    public function destroy(BioSetting $bioSetting)
    {
        //
    }
}
