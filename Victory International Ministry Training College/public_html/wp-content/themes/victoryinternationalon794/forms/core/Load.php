<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
require_once 'controllers/Main.php';
class Load
{
    public function template($page, $data = array())
    {
        foreach ($data as $key => $value) {
            ${$key} = $value;
        }
        require_once 'config.php';
        include 'send_email_curl.php';
        include 'savedb.php';
        include_once 'views/templates/' . $page . '.php';
    }

    public function custom($page, $data = array())
    {
        foreach ($data as $key => $value) {
            ${$key} = $value;
        }
        require_once 'config.php';
        include 'send_email_curl.php';
        include 'savedb.php';
        include 'views/customs/' . $page . '.php';
    }

    public function model($model)
    {
        include 'models/' . $model . '.php';
        $this->{$model} = new $model;
    }

}
?>