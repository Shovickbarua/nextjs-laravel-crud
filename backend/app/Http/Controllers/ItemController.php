<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
class ItemController extends Controller
{
    use CommonTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();
        $items = Item::where('user_id', $user_id)->with('inventory')->latest()->get();
        return $this->sendResponse(['data' => $items]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user_id = Auth::id();
        $input = $request->all();
        $input['user_id'] = $user_id;

        if ($request->has('image')) {
            $image = $request->file('image');

            $name = time() . uniqid() . '.' . $image->extension();
            // Store the image in the storage/app/public directory
            $path = $image->storeAs('public', $name);

            // Create a public URL using the storage link
            $imageUrl = Storage::url($path);
            $input['image'] = $imageUrl;
        }

        $item = Item::create($input);
        return $this->sendResponse(['data' => $item, 'message' => 'Item Saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $items = Item::find($id);
        return $this->sendResponse(['data' => $items]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        $user_id = Auth::id();
        $input = $request->all();
        $input['user_id'] = $user_id;

        if ($request->has('image') && $request->file('image')) {
            $image = $request->file('image');

            $name = time() . uniqid() . '.' . $image->extension();
            // Store the image in the storage/app/public directory
            $path = $image->storeAs('public', $name);

            // Create a public URL using the storage link
            $imageUrl = Storage::url($path);
            $input['image'] = $imageUrl;
        }else{
            $input['image'] = $item->image;
        }

        $item->update($input);

        return $this->sendResponse(['data' => $item, 'message' => 'Item updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Item::destroy($id);
        return $this->sendResponse(['message' => 'Item deleted successfully']);
    }
}
