<?php
session_start();

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// echo '<pre>';
// print_r($_COOKIE);
// echo '</pre>';
// exit;

if (isset($_COOKIE['logged_in']) || isset($_SESSION['login_status']) && $_SESSION['login_status'] == 1 || isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == 1) {
    // Sanitize inputs
    $fileName      = $_GET['file'];
    $fileExtension = $_GET['ext'];

    if ($fileName && $fileExtension) {
        $completeName = $fileName . '.' . $fileExtension;
        $fileDirectory = $_SERVER['DOCUMENT_ROOT'].'/onlineforms/attachments/';
        // Adjust this to the actual directory where your files are stored
        $filePath = $fileDirectory . $completeName;

        // Check if the file exists
        if (file_exists($filePath)) {
            $mimeTypes = [
                'pdf'  => 'application/pdf',
                'jpg'  => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png'  => 'image/png',
                'gif'  => 'image/gif',
                'txt'  => 'text/plain',
                'doc'  => 'application/msword',
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            $mimeType = isset($mimeTypes[$fileExtension]) ? $mimeTypes[$fileExtension] : 'application/octet-stream';

            header('Content-Type: ' . $mimeType);
            header('Content-Disposition: inline; filename="' . htmlspecialchars(basename($completeName), ENT_QUOTES, 'UTF-8') . '"');
            readfile($filePath);
            
            exit;
        } else {
            error_log("Error: File not found at $filePath");
            http_response_code(404);
            exit;
        }
    } else {
        error_log("Error: Invalid file parameters!");
        http_response_code(400);
        exit;
    }
} else {
    ?>
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>403 Forbidden error</title>
    <style type="text/css">
    
    ::selection { background-color: #E13300; color: white; }
    ::-moz-selection { background-color: #E13300; color: white; }
    
    body {
        background-color: #fff;
        margin: 40px;
        font: 13px/20px normal Helvetica, Arial, sans-serif;
        color: #4F5155;
    }
    
    a {
        color: #003399;
        background-color: transparent;
        font-weight: normal;
    }
    
    h1 {
        color: #444;
        background-color: transparent;
        border-bottom: 1px solid #D0D0D0;
        font-size: 19px;
        font-weight: normal;
        margin: 0 0 14px 0;
        padding: 14px 15px 10px 15px;
    }
    
    code {
        font-family: Consolas, Monaco, Courier New, Courier, monospace;
        font-size: 12px;
        background-color: #f9f9f9;
        border: 1px solid #D0D0D0;
        color: #002166;
        display: block;
        margin: 14px 0 14px 0;
        padding: 12px 10px 12px 10px;
    }
    
    #container {
        margin: 10px;
        border: 1px solid #D0D0D0;
        box-shadow: 0 0 8px #D0D0D0;
    }
    
    p {
        margin: 12px 15px 12px 15px;
    }
    </style>
    </head>
    <body>
        <div id="container">
            <h1>Forbidden Page</h1>
            <p>Directory access is forbidden.</p>	</div>
    </body>
    </html>
    <?php 
}
?>
