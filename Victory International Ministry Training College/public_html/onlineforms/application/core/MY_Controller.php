<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MY_Controller extends MX_Controller
{

	public $fileLocation;

	public $assets_ = array(
		'login' => array(
			'css' => array('login.css'),
			'js' => array('login.js'),
		),
		'panel' => array(
			'css' => array('panel.css'),
			'js' => array('panel.js'),
		),
		'email' => array(
			'css' => array('email.css'),
			'js' => array('email.js'),
		)
	);

	public function __construct()
	{

		$this->fileLocation = base_url() . 'assets/images/';

		$route = $this->router->fetch_class();

		if (empty($_GET['token'])) {
			if ($route == 'login') {

				if (isset($_SESSION['logged_in'])) {
					redirect(base_url('panel'));
				}
			} else {

				if (!isset($_SESSION['logged_in'])) {
					redirect(base_url('login'));
				}
			}
		}
	}

	public function load_page($page, $data = array())
	{
		$data['__assets__'] = $this->assets_;
		$this->load->view('includes/head', $data);
		$this->load->view($page, $data);
		$this->load->view('includes/footer', $data);
	}

	public function login_load_page($page, $data = array())
	{
		$data['__assets__'] = $this->assets_;
		$this->load->view('includes/login_head', $data);
		$this->load->view($page, $data);
		$this->load->view('includes/login_footer', $data);
	}

	public function load_wp_page($page, $data = array())
	{
		$data['isCIPage'] = true;
		$data['base_url'] = base_url();
		$this->load->view('../../../wp-load.php');
		$this->load->view('../../../wp-content/themes/themefolder/includes/head', $data);
		$this->load->view('../../../wp-content/themes/themefolder/includes/header');
		$this->load->view('../../../wp-content/themes/themefolder/includes/nav');
		$this->load->view('../../../wp-content/themes/themefolder/includes/banner', $data);
		$this->load->view('includes/wp-head', $data);
		$this->load->view($page, $data);
		$this->load->view('includes/wp-footer', $data);
		$this->load->view('../../../wp-content/themes/themefolder/includes/footer', $data);
	}

	protected function generate_num($strength = 4)
	{
		$permitted_chars = '0123456789';
		$input_length = strlen($permitted_chars);
		$random_string = '';
		for ($i = 0; $i < $strength; $i++) {
			$random_character = $permitted_chars[mt_rand(0, $input_length - 1)];
			$random_string .= $random_character;
		}
		return $random_string;
	}

	protected function generate_code($strength = 20)
	{
		$permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$input_length = strlen($permitted_chars);
		$random_string = '';
		for ($i = 0; $i < $strength; $i++) {
			$random_character = $permitted_chars[mt_rand(0, $input_length - 1)];
			$random_string .= $random_character;
		}
		return strtolower($random_string);
	}

	function convertDate($date)
	{

		$year = date('Y');

		$month_date = date('M d');

		$converted = '';

		if (date('Y', strtotime($date)) == $year) {

			if (date('M d', strtotime($date)) != $month_date) {

				$converted .= date('d M', strtotime($date));
			} else {

				$converted .= "<small>Today</small>&nbsp;" . date('h:i A', strtotime($date));
			}
		} else {

			$converted .= date('m/d/Y', strtotime($date));
		}

		return $converted;
	}

	public function set_rules_from_post($data, $unrequired_fields = array())
	{
		$email = '';
		$uname = '';
		if (isset($_POST['email_address'])) {
			if (isset($_POST['orig_email_address'])) {
				$email = ($_POST['orig_email_address'] != $_POST['email_address']) ? '|is_unique[ecl_users.email_address]' : '';
			} else {
				$email = '|is_unique[ecl_users.email_address]';
			}
		}
		if (isset($_POST['username'])) {
			if (isset($_POST['orig_username'])) {
				$uname = ($_POST['orig_username'] != $_POST['username']) ? '|is_unique[ecl_users.username]' : '';
			} else {
				$uname = '|is_unique[ecl_users.username]';
			}
		}
		foreach ($data as $key => $value) {
			if (!empty($unrequired_fields) && in_array($key, $unrequired_fields)) continue;
			$this->form_validation->set_rules($key, ucfirst(str_replace('_', ' ', $key)), 'trim|required', array('required' => '{field} is required'));
			if ($key == 'username') {
				$rule = $this->form_validation->set_rules($key, 'Username', 'trim|required' . $uname, array('is_unique' => 'The Username already exists.'));
				$rule;
			}
			if ($key == 'email_address') {
				$rule = $this->form_validation->set_rules($key, 'Email Address', 'trim|required|valid_email' . $email, array('valid_email' => 'Please provide a valid {field}', 'is_unique' => 'The Email Address already exists.'));
				$rule;
			}
			if ($key == 'confirm_password') {
				$rule = $this->form_validation->set_rules($key, 'Password Confirmation', 'trim|required|matches[password]');
				$rule;
			}
		}
	}
}
