<?php

class Login extends MY_Controller{

    public function index(){
        
        // this codes get the number of users from database to determine if the page will redirect to registration page
        $users = getrow('formdatabase_users');

        $data = array();
        
        if(count($users) < 1){
            $data['reg'] = true;
            $this->login_load_page('register_user',$data);
        }else{
            $data['reg'] = false;
            $this->login_load_page('index', $data);
        }

    }
    
    public function authLogin(){
        
        $response = array();
        
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        
        $param['where'] = array("user_name" => $username, "user_pass" => $password);
        
        $data = getrow("formdatabase_users", $param, "row");
        
        if($data):
            $sessionArray = array("username" => $username, "logged_in" => true, "user_id" => $data->user_id) ;
            setcookie("logged_in", "true", time() + (10 * 365 * 24 * 60 * 60), "/", "", false, true);
            
            $this->session->set_userdata($sessionArray);
            
            $response["message"] = "";
            $response["success"] = true;
            
        else:
            $response["message"] = '<p class="warning">Username and password is incorrect</p>';
            $response["success"] = false;
        endif;
        
        json($response);
    }
    
    public function registerUser(){
        
        $users = getrow('formdatabase_users');
    
        $data = array();
        
        $this->login_load_page('register_user', $data);
        
    }
    
    public function forgotPassword(){
        
        $this->login_load_page('forgot_password', $data);
        
    }
    
    public function loginUser(){
    
        $users = getrow('formdatabase_users');
    
        $data = array();
        
        $data['reg'] = true;
        $this->login_load_page('index', $data);
        
    }
    
    public function updatePassword(){
        
        $response = array();
        
        $param['where'] = array('user_name' => $_POST['username']);
        
        $data = getrow('formdatabase_users', $param, 'row');
        
        if($data){
            
            $password = $this->generate_code(10);
            $set['user_pass'] = $password;
            
            $where = "user_name = '".$_POST['username']."'";
            
            if(update('formdatabase_users', $set, $where)){
                $response['message'] = 'Temporary password: '.$password;
                $response['success'] = true;
            }else{
                $response['message'] = 'Fail to update password';
                $response['success'] = false;
            }
            
        }else{
            
            $response['message'] = 'Username does not exist.';
            $response['success'] = false;
            
        }
        
        json($response);
    }
    
    public function createUser(){
        
        $response = array();
        
        $set['user_email'] = $_POST['email'] ?? '' ;
        $set['user_name'] = $_POST['username'] ?? '';
        $set['user_pass'] = $_POST['password'] ?? '';
        
        $data = getrow('formdatabase_users');
        
        foreach($data as $key => $value):
            
            if(strcmp($value, $_POST['username']) == 0){
                $response['success'] = true;
                $response['message'] = '<p style="color:red;">User already exist.</p>';
                json($response);
                exit;
            }
            
        endforeach;
        
        if(insert('formdatabase_users', $set)){
            $response['success'] = true;
            $response['message'] = '<p style="color:green;">User created. Click Login to proceed.</p>';
        }else{
            $response['success'] = false;
            $response['message'] = '<p style="color:red;">Failed to create user.</p>';
        }
        
        json($response);
        
    }

}