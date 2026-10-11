<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
class Model
{

    private $db;
    private $query;


    public function __construct()
    {
        // $this->dbConnect();
    }

    public function dbConnect()
    {
        global $database;
        $this->db = new mysqli($database['host'], $database['username'], $database['password'], $database['dbname']);
    }

    public function query($query)
    {
        $this->query = $query;
        return $this;
    }

    public function row()
    {
        return $this->query;
        exit;
        $result = $this->db->query($this->query);
        return $result->fetch_assoc();
    }

    public function result_array()
    {
        $result = $this->db->query($this->query);
        while ($row = $result->fetch_assoc()) {
            $result_array[] = $row;
        }
        return $result_array;
    }

    public function select_db($query, $res = 'array')
    {
        $result_array = array();
        $result = $this->db->query($query);
        switch ($res) {
            case 'array':
                while ($row = $result->fetch_assoc()) {
                    $result_array[] = $row;
                }
                return $result_array;
                break;
            case 'row':
                return $result->fetch_assoc();
                break;
        }
    }
}
?>