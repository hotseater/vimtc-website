<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
ini_set('display_errors', 'off');
error_reporting(E_ALL);
define('COMP_EMAIL', 'dean@vimtc.org'); // clients email

define('SMTP_ENCRYPTION', 'off'); // TLS, SSL or off
define('SMTP_PORT', 587); // SMPT port number 587 or default
define('COMP_NAME', 'Victory International Ministry Training College'); // company name
define('MAIL_TYPE', 2); // 1 - html, 2 - txt
define('MAIL_DOMAIN', 'www.vimtc.org'); // company domain
define('TEMPLATE_TEST', false); //if false = launched account , true = pages account
define('Ecommerce', false); //if false = non-ecommerce, true = ecommerce sites
define('FORM_VERSION', 'V3.0'); // 'V1.0 - v1','V2.0 - v2','V3.0 - v3','V4.0 - Modern Forms (text transition)','V5.0 - Bootstrap Forms (with themes)'

// Update it using a working google Site key
$recaptcha_sitekey = '6Lfp03wpAAAAAPGULAnlPJS8nB7dx3h4YgXS6CKf';
// Update it using a working google Privite key
$recaptcha_privite = '6Lfp03wpAAAAAHBtlm8td5oly7pMy-_38yCSneLz';

// do not edit
$subject = COMP_NAME . " [" . $formname . "]";
$template = 'template';
$to_name = NULL;
$from_email = NULL;
$from_name = 'Message From Your Site';
$attachments = array();

// testing here
$testform = false;
if ($testform) {
	$to_email = array('webtest2g@gmail.com');
	$cc = '';
	$bcc = '';
} else {
	$to_email = array('dean@vimtc.org');
	$cc = '';
	$bcc = '';
}