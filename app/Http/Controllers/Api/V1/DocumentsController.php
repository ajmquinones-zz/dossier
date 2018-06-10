<?php

/**
 * DocumentsController.php
 *
 * @author Alvin Quinones <ajmquinones@gmail.com>
 *
 */

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller as BaseController;
use App\Http\Controllers\Api\SendsResponse;
use App\Model\Document;
use App\Model\DocumentRepositoryContract;
use Illuminate\Contracts\Encryption\Encrypter as EncrypterContract;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Ramsey\Uuid\Uuid;

/**
 *
 * Description of DocumentsController
 *
 */

class DocumentsController extends BaseController
{
    use SendsResponse;

    /**
     *
     */
    public function test()
    {
        $this->respondWithArray(['hello' => 'world']);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function list(Request $request)
    {
        $data = [];

        Document::chunk(100, function($documents) use (&$data) {
            foreach ($documents as $document) {
                $data[] = $document->toArray();
            }
        });
        
        return $this->respondWithArray([
            'status' => 'success',
            'data' => $data,
        ]);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function upload(Request $request)
    {
        try {
            $diskName = 'local';
            $uploadDir = 'documents/';
            $disk = \Storage::disk($diskName);
            $uid = Uuid::uuid4()->toString();

            $title = $request->post('title');
            $file = $request->file('document');

            if ($file->getClientSize() > env('MIX_MAX_UPLOAD_SIZE', 1000000)) {
                throw new \Exception('Document exceeds allowed file size');
            }

            if (strpos(env('MIX_ALLOWED_DOCUMENT_EXT', 'pdf'), $file->extension()) === false) {
                throw new \Exception('Document file type is not allowed');
            }

            // Check if we want to keep raw file content
            // if (config('app.keep_raw_uploads', false)) {
            //     $ext = '.raw';
            //     $file->storeAs($uploadDir, $uid . $ext, [
            //         'disk' => $diskName,
            //         'visibility' => 'private'
            //     ]);
            // }
            
            $contents = @file_get_contents($file->path());
            $contents = Crypt::encryptString($contents);

            // Copy encrypted file to disk
            $disk->put(
                $uploadDir.$uid,
                $contents,
                [ 'visibility' => 'public' ]
            );

            $document = new Document([
                'storage_uid' => $uid,
                'title' => $title,
                'document_type' => $file->extension(),
                'file_size' => $file->getClientSize(),
                'public_path' => url('/document/'.$uid)
            ]);

            $document->save();

            return $this->respondWithArray([
                'status' => 'success',
                'data' => $document->toArray(),
            ]);

        } catch (\Exception $e) {
            return  $this->respondWithArray([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * 
     * @param string $uid
     * @param Request $request
     * @return Response
     */
    public function delete(string $uid, Request $request)
    {
        try {
            $document = Document::where('storage_uid', $uid)->firstOrFail();
            $document->delete();
            
            $diskName = 'local';
            $uploadDir = 'documents/';
            $disk = \Storage::disk($diskName);

            $disk->delete($uploadDir . $uid);

            return $this->respondWithArray([
                'status' => 'success',
                'data' => $document->toArray()
            ]);
        } catch (\Exception $e) {
            return  $this->respondWithArray([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * @param string $uid
     * @param Request $request
     *
     * @return Response
     */
    public function download(string $uid, Request $request)
    {
        $document = Document::where('storage_uid', $uid)->firstOrFail();

        $diskName = 'local';
        $uploadDir = 'documents/';
        $disk = \Storage::disk($diskName);
        $contents = $disk->read($uploadDir . $uid);
        $contents = Crypt::decryptString($contents);
        $destPath = tempnam(sys_get_temp_dir(), 'doc');
        @file_put_contents($destPath, $contents);
        return response()->download($destPath, $document->title . "." . $document->document_type);
    }
}