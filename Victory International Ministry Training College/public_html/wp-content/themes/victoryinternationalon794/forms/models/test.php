<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
class Test extends Model
{

    public function get_users()
    {
        return $this->select_db('SELECT * FROM tbl_users');
    }

    public function get_users_test()
    {
        $this->query('SELECT * FROM tbl_users');
        $this->result_array();
    }
}
?>