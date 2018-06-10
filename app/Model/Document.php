<?php

/**
 * DocumentsController.php
 *
 * @author Alvin Quinones <ajmquinones@gmail.com>
 *
 */

 namespace App\Model;

 use Illuminate\Database\Eloquent\Model;


 /**
  * Class Document
  */
 class Document extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'storage_uid',
        'title',
        'document_type',
        'file_size',
        'public_path',
    ];

    /**
     * Undocumented function
     *
     * @return array
     */
    public function toArray() : array
    {
        return [
            'uid' => (string) $this->storage_uid,
            'documentType' => (string) $this->document_type,
            'title' => (string) $this->title,
            'fileSize' => (string) $this->file_size,
            'publicPath' => (string) $this->public_path,
            'createdAt' => (string) $this->created_at,
            'updatedAt' => (string) $this->updated_at,
        ];
    }

 }
 