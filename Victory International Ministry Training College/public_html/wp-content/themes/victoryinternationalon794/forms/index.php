<?php
define('ACCESSIBLE', true);

$url = @explode("/", ltrim($_SERVER['PATH_INFO'], '/'));
//require 'config/database.php';
require 'config/routes.php';
$controller = (!empty($url[0])) ? ucfirst($url[0]) : ucfirst($routes['default_controller']);
$method = (!empty($url[1])) ? ucfirst($url[1]) : 'index';
$url_parametrs = array();

if (!empty($url[2])) {
   for ($i = 2; $i < count($url); $i++) {
      $url_parametrs[] = $url[$i];
   }
}

define('CLASS_DIR', 'core/');
set_include_path(get_include_path() . PATH_SEPARATOR . CLASS_DIR);
spl_autoload_register();
require 'controllers/' . $controller . '.php';
$controller = new $controller();
call_user_func_array(array($controller, $method), $url_parametrs);