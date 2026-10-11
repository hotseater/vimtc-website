<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
require_once 'core/Controller.php';
class Main extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public static function recaptcha($recaptcha_privite, $post = array()){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "secret={$recaptcha_privite}&response={$post['g-recaptcha-response']}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        $result_recaptcha = json_decode($server_output);
        curl_close($ch);

        return $result_recaptcha;
    }
}