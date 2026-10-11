<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends MY_Controller {

    public function index(){
        // Clear session data
        $session_data = array('user_id', 'name', 'username', 'logged_in');
        $this->session->unset_userdata($session_data);

        // Clear the "logged_in" cookie
        setcookie("logged_in", "", time() - 3600, "/"); // Expire the cookie

        // Redirect to login page
        redirect(base_url('login'));
    }
}
