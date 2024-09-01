<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InventoryController extends Controller
{
    use CommonTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();
        $inventories = Inventory::where('user_id', $user_id)->latest()->get();
        return $this->sendResponse(['data' => $inventories]);
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
        $inventory = Inventory::create($input);
        return $this->sendResponse(['data' => $inventory, 'message' => 'Inventory Saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $inventory = Inventory::find($id);
        return $this->sendResponse(['data' => $inventory]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $inventory = Inventory::find($id);
        $inventory->update($input);
        return $this->sendResponse(['data' => $inventory, 'message' => 'Inventory updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Inventory::destroy($id);
        return $this->sendResponse(['message' => 'Inventory deleted successfully']);
    }
}
