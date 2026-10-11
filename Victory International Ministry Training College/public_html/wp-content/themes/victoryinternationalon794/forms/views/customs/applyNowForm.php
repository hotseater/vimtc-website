<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
@session_start();

$formname = 'Apply Now Form';
$prompt_message = '<span class="required-info">* Required Information</span>';
if ($_POST) {

	$result_recaptcha = Main::recaptcha($recaptcha_privite, $_POST);

	if (
		empty($_POST['First_Name']) ||
		empty($_POST['Last_Name'])

	) {


		$asterisk = '<span style="color:#FF0000; font-weight:bold;">*&nbsp;</span>';
		$prompt_message = '<div id="error-msg"><div class="message"><span>Required Fields are empty</span><br/><p class="error-close">x</p></div></div>';
	} else if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", stripslashes(trim($_POST['Student_Email'])))) {
		$prompt_message = '<div id="recaptcha-error"><div class="message"><span>Please enter a valid email address</span><br/><p class="rclose">x</p></div></div>';
	} else if (!$result_recaptcha->success) {
		$prompt_message = '<div id="recaptcha-error"><div class="message"><span>Invalid <br>Recaptcha</span><p class="rclose">x</p></div></div>';
	} else {

	require_once('readSignature.php');

		// fields input
		$esignaturedata  =  $_POST['Students_Signature'];
		

		// Where to save image
		$sig = 'assets/assets/Signature_image/Students_Signature'.time().'.png';
		


		// Save file as image
		imagepng(sigJsonToImage($esignaturedata), $sig);
		



		if (MAIL_TYPE == 1) {
			$formdisclaimer = '<div style="position: relative; top: 10px; background: #eef5f8; padding: 15px 20px; border-radius: 5px; width: 660px; margin: 0 auto; text-align: center; font-family: Poppins,sans-serif; border: 1px solid #f9f9f9;  color: #6a6a6a !important;">  
					<span style="border-radius: 50%; height: 19px; display: inline-block; color: #f49d2c; font-size: 15px;   text-align: center;"></span> Please do not reply to this email. This is only a notification from your website online forms. 
					<br>To contact the person who filled out your online form, kindly use the email which is inside the form below.</div>';
		} else
			$formdisclaimer = '';

		// Include privacy policy text for email output
    ob_start();
    include 'config/includes/privacy.php';
    ob_end_clean(); // Clear the output buffer but keep the variable

		$body = '
		<div class="form_table" style="width:700px; height:auto; font-size:12px; color:#6a6a6a; letter-spacing:1px; margin: 0 auto; font-family: Poppins,sans-serif;">' . $formdisclaimer . '
		<div class="container" style="background: #fff; margin-top: 30px; font-family: Poppins,sans-serif; color:#6a6a6a; box-shadow: 10px 10px 31px -7px rgba(38,38,38,0.11); -webkit-box-shadow: 10px 10px 31px -7px rgba(38,38,38,0.11); -moz-box-shadow: 10px 10px 31px -7px rgba(38,38,38,0.11);  border-radius: 5px 5px 5px 5px; border: 1px solid #eee;">
			<div class="header" style="background: #a3c7d6; padding: 30px; border-radius: 5px 5px 0px 0px; ">
				<div align="left" style="font-size:22px; font-family: Poppins,sans-serif; color:#fff; font-weight: 900;">' . $formname . '</div>
				<div align="left" style=" color: #11465E;  font-size:19px; font-family: Poppins,sans-serif;  font-style: italic; margin-top: 6px; font-weight: 900;">' . COMP_NAME . '</div>
			</div>
		<div style="padding: 13px 30px 25px 30px;">
		<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="font-family: Poppins,sans-serif;font-size:14px; padding-bottom: 20px;"> 

					';
		foreach ($_POST as $key => $value) {
			if ($key == 'secode')
				continue;
			elseif ($key == 'submit')
				continue;
			elseif ($key == 'g-recaptcha-response')
				continue;
			elseif ($key == 'checkboxVal')
				continue;

			if (!empty($value)) {
				$key2 = str_replace('_', ' ', $key);
				if ($value == ':') {
					$body .= ' <tr margin-bottom="10px"> <td colspan="5" height="28" class="OFDPHeading" width="100%" style=" background:#F0F0F0; margin-bottom:5px;"><b style="padding-left: 4px;">' . $key2 . '</b></td></tr>';
				}
				
				elseif($key === 'Students_Signature'){
					$body .= '<tr><td class="Values1"colspan="2" height="28" align="left" width="40%" padding="100" style="line-height: normal; padding-left: 4px;text-justify: inter-word; word-wrap: anywhere; padding-right: 28px;">
					<span style="position:relative !important;"><b>' . $key2 . '</b></span >:</td> <td class="Values2"colspan="2" height="28" align="left" width="50%" padding="10" style="line-height: normal; word-wrap: anywhere; "><span style="margin-top: 7px; position:relative;margin-left: 7px; border-collapse: collapse; display: inline-block;margin-bottom: 5px;margin-right: 7px;"><img src="/wp-content/themes/victoryinternationalon794/forms/'.$sig.'" alt="signature" /></span> </td></tr>';
				}

				else if (($key == "Text01")) {
					$body .= '<tr><td colspan="5" line-height:30px">

					If you are applying for Advance Studies, please arrange for your transcripts to be sent directly to
							 dean@vimtc.org. 
						

					</td></tr>';
                }
				else if ($key == "Privacy_Notice") {
						$body .= $privacy_notice_output;
					} else {
					$body .= '<tr><td class="Values1"colspan="2" height="28" align="left" width="40%" padding="100" style="line-height: normal; padding-left: 4px;text-justify: inter-word; word-wrap: anywhere; padding-right: 28px;">
								<span style="position:relative !important;"><b>' . $key2 . '</b></span >:</td> <td class="Values2"colspan="2" height="28" align="left" width="50%" padding="10" style="line-height: normal; word-wrap: anywhere; "><span style="margin-top: 7px; position:relative;margin-left: 7px; border-collapse: collapse; display: inline-block;margin-bottom: 5px;margin-right: 7px;">' . htmlspecialchars(trim($value), ENT_QUOTES) . '</span> </td></tr>';
				}
			}
		}
		$body .= '
		' . $form_version_output . '
					</table>
					</div>
					</div>';

		// save data form on database
		$subject = $formname;
		$attachments = array();

		//name of sender
		$name = $_POST['First_Name'] .' '. $_POST['Last_Name'];
		$result = insertDB($name, $subject, $body, $attachments);

		$parameter = array(
			'body' => $body,
			'from' => $from_email,
			'from_name' => $from_name,
			'to' => $to_email,
			'subject' => 'New Message Notification',
			'attachment' => $attachments
		);

		$prompt_message = send_email($parameter);
		unset($_POST);

	}

}
/*************declaration starts here************/
$state = array('Please select state.', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');
$best_time_to_call = array('- Please select -', 'Anytime', 'Morning at Home', 'Morning at Work', 'Afternoon at Home', 'Afternoon at Work', 'Evening at Home', 'Evening at Work')
	?>
<!DOCTYPE html>
<html class="no-js" lang="en-US">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>
		<?php echo $formname; ?>
	</title>

	<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
	<link rel="stylesheet" href="../assets/style.min.css?ver23asas">
	<link rel="stylesheet" href="../assets/css/font-awesome.min.css">
	<link rel="stylesheet" href="../assets/css/media.min.css?ver24as">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../assets/css/dd.min.css" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
	<link rel="stylesheet" href="../assets/css/datepicker.min.css">
	<link rel="stylesheet" href="../assets/css/jquery.datepick.min.css" type="text/css" media="screen" />

	<link rel="stylesheet" type="text/css" href="../assets/assets/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../assets/dist/bootstrap-clockpicker.min.css">
	<link rel="stylesheet" type="text/css" href="../assets/assets/css/github.min.css">
	<link rel="stylesheet" href="../assets/css/jquery.signaturepad.css" type="text/css" media="screen" />

	<link rel="stylesheet" href="../assets/css/proweaverPhone.css?ver=<?php echo time(); ?>">
	<link rel="stylesheet" href="../assets/css/flag.min.css" type="text/css" />

	<script src='https://www.google.com/recaptcha/api.js'></script>
	<style>

		fieldset{
		border: 2px solid #c9c9c9;
		padding: 25px;
		border-radius: 10px;
		margin-bottom: 10px;
		margin-top:10px;
		}

	legend{
	  color: #484646;
		font-weight:bold; font-size:17px;
		text-transform:uppercase;
		padding: 0 10px;
		max-width: 100%;
		border-bottom: 0;
		margin-bottom: unset !important;
		width: unset !important;
	}
		.load_holder {
			position: fixed;
			z-index: 2;
			background: rgba(0, 0, 0, 0.3);
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}

		[type="radio"]:checked+label,
		[type="radio"]:not(:checked)+label {
			padding-left: 40px;
			color: #3e3e3e;
		}

		[type="radio"]:checked+label::before,
		[type="radio"]:not(:checked)+label:before {
			left: 0;
		}

		[type="radio"]:checked+label::after,
		[type="radio"]:not(:checked)+label:after {
			left: 3px;
		}

		.close {
			font-size: unset;
			font-weight: unset;
			line-height: unset !important;
			color: #fff !important;
			text-shadow: unset !important;
			filter: unset !important;
			opacity: unset !important;
		}

		input[type="radio"]+label.error+label {
			padding-left: 40px;
		}

		.radio tr td {
			border: 0px !important;
			box-shadow: none;
		}

		hr {
			border: 0;
			border-top: 2px solid #eee;
			margin: 0px;
			margin-bottom: 15px;
		}

		.ctext {
			margin-top: 11px;
		}

		label.error+label {
			color: #3e3e3e !important;
			bottom: 22px;
		}

		@media only screen and (max-width: 780px) {
			.ctext {
				margin-top: 0px;
			}

			hr {
				margin-bottom: 4px;
			}
		}

		.enrollment-form-header {
			display: flex;
			width: 100%;
			border-top: 3px solid #000;
			margin-bottom: 20px;
			font-family: Poppins, sans-serif;
		}

		.enrollment-form-header__logo {
			flex: 0 0 28%;
			background: #1a3356;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 25px 15px 20px;
		}

		.enrollment-form-header__logo img {
			width: 130px;
			height: auto;
			display: block;
			margin-bottom: 12px;
		}

		.enrollment-form-header__logo span {
			color: #fff;
			font-size: 22px;
			font-weight: 700;
			letter-spacing: 2px;
		}

		.enrollment-form-header__title {
			flex: 1;
			background: #6d8496;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 30px 35px;
		}

		.enrollment-form-header__title h1 {
			color: #fff;
			font-size: 36px;
			font-weight: 700;
			margin: 0 0 8px;
			line-height: 1.2;
		}

		.enrollment-form-header__title p {
			color: #fff;
			font-size: 17px;
			font-weight: 400;
			margin: 0;
			line-height: 1.4;
		}

		@media only screen and (max-width: 780px) {
			.enrollment-form-header {
				flex-direction: column;
			}

			.enrollment-form-header__logo {
				flex: none;
				padding: 20px 15px 15px;
			}

			.enrollment-form-header__logo img {
				width: 100px;
			}

			.enrollment-form-header__title {
				padding: 20px 25px;
			}

			.enrollment-form-header__title h1 {
				font-size: 26px;
			}

			.enrollment-form-header__title p {
				font-size: 15px;
			}
		}
	</style>
</head>

<body>
	<div class="clearfix">
		<div class="wrapper">
			<div id="contact_us_form_1" class="template_form">
				<div class="form_frame_b">
					<div class="form_content">
						<div class="enrollment-form-header">
							<div class="enrollment-form-header__logo">
								<img src="../assets/images/main-logo.png" alt="Victory International Ministry Training College Logo">
								<span>VIMTC</span>
							</div>
							<div class="enrollment-form-header__title">
								<h1>College Enrollment Form</h1>
								<p>Complete the registration form with attention to detail</p>
							</div>
						</div>

						<?php if ($testform): ?>
							<div class="test-mode"><i class="fas fa-info-circle"></i><span>You are in test mode!</span>
							</div>
						<?php endif; ?>

						<form id="submitform" name="contact" method="post" enctype="multipart/form-data" action="">
							<?php echo $prompt_message; ?>

							<fieldset>

							<legend>Full Name</legend>
							<div class="form_box">
								<div class="form_box_col2">
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('First Name', '*');
										// @param field name, class, id and attribute
										$input->fields('First_Name', 'form_field', 'First_Name', 'placeholder="Enter first name here"');
										?>
									</div>
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Last Name', '*');
										// @param field name, class, id and attribute
										$input->fields('Last_Name', 'form_field', 'Last_Name', 'placeholder="Enter last name here"');
										?>
									</div>
								</div>
							</div>

						</fieldset>

						<fieldset>

							<legend>Address</legend>

							<div class="form_box">
								<div class="form_box_col1">
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Street Address', '*');
										// @param field name, class, id and attribute
										$input->fields('Street_Address', 'form_field', 'Street_Address', 'placeholder="Enter treet address here"');
										?>
									</div>
								</div>
							</div>

							<div class="form_box">
								<div class="form_box_col3">
									<div class="group">
										<?php
										$input->label('City', '*');
										// @param field name, class, id and attribute
										$input->fields('City', 'form_field', 'City', 'placeholder="Enter city here"');
										?>
									</div>
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('State', '');
										// @param field name, class, id and attribute
										$input->select('State', 'form_field', $state);
										?>
									</div>

									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Zip Code', '*');
										// @param field name, class, id and attribute
										$input->fields('Zip_Code', 'form_field', 'Zip_Code', 'placeholder="Enter zip code here"');
										?>
									</div>
								</div>
							</div>

						</fieldset>

						<div class="form_box">
								<div class="form_box_col2">


									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Birthdate', '*');
										// @param field name, class, id and attribute
										$input->fields('Birthdate', 'form_field Date1 DisableFuture', 'Birthdate', 'placeholder="Enter birthdate here"');
										?>
									</div>
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Status', '');
										?>
									</div>
									<div class="group">
										<?php
										// @param field name, class, id and attribute
										$input->radio('Status', array('Single', 'Married', 'Divorced'), 'Status', '', '3');
										?>
									</div>
								</div>
							</div>


							<div class="form_box">
								<div class="form_box_col1">
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Gender', '*');
										?>
									</div>
									<div class="group">
										<?php
										// @param field name, class, id and attribute
										$input->radio('Gender', array('Male', 'Female', 'N/A'), 'Gender', '', '3');
										?>
									</div>
								</div>
							</div>

							
							<div class="form_box">
								<div class="form_box_col3">
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Student Phone Number', '*');
										// @param field name, class, id and attribute
										$input->phoneInput('Student_Phone_Number', 'form_field', 'Student_Phone_Number', 'placeholder="Enter student phone number here"');
										?>
									</div>
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('Student Email', '*');
										// @param field name, class, id and attribute
										$input->fields('Student_Email', 'form_field', 'Student_Email', 'placeholder="example@domain.com"');
										?>
									</div>
									<div class="group">
										<?php
										// @param label-name, if required
										$input->label('$50 Application Fee', '');
										// @param field name, class, id and attribute
										$input->amount('Application_Fee', 'form_field', 'Application_Fee', 'placeholder="Enter application fee here"');
										?>
									</div>
								</div>
							</div>
							

							<div class="form_box">

								<div class="form_box_col1">

									<div class="group">

										<?php

										$input->label('I\'m Applying For', '');

										$input->chkboxVal('I_am_Applying_For', array('Certificate', 'Diploma', 'Associate', 'Bachelors'), 'I_am_Applying_For', '', '4');

										?>

									</div>

								</div>

							</div>


							<div class="form_box">
								<div class="form_box_col1">
									<div class="group ctext">
										<?php
										// @param label-name, if required
										$input->label('Preferred Learning Setup', '');
										?>
									</div>
									<div class="group">
										<?php
										// @param field name, class, id and attribute
										$input->radio('Preferred Learning Setup', array('Online', 'In-Person'), 'Preferred Learning Setup', '', '3');
										?>
									</div>
								</div>
							</div>

								<div class="form_box">
								<div class="form_box_col1">
									<div class="group ctext">
										<?php
										// @param label-name, if required
										$input->label('What is Your Highest Level of Education?', '');
										?>
									</div>
									<div class="group">
										<?php
										// @param field name, class, id and attribute
										$input->radio('What_is_Your_Highest_Level_of_Education', array('High School/GED', 'College', 'Advance Education'), 'What_is_Your_Highest_Level_of_Education', '', '3');
										?>
									</div>
								</div>
							</div>

							<p><input type="checkbox" name="Text01" hidden checked>
							
							
                           <i>If you are applying for Advance Studies, please arrange for your transcripts to be sent directly to
							 <a href="mailto:dean@vimtc.org">dean@vimtc.org</a>. </i>
						
							</p>


							
						<div class="form_box my_signature">
								<div class="form_box_col2">
									<div class="group">
										<?php $input->label('Students Signature'); ?>
											<div class="sigPad" style="margin-top:5px;">
												<div class="sig sigWrapper">
													<div class="typed"></div>
														<canvas class="pad" width="196" height="50"></canvas>
													<input type="hidden" name="Students_Signature" class="output">
												</div>
											<p class="clearButton"><a  style="color:#24bec8;" href="#clear">Clear</a></p>
										</div>
									</div>
									<div class="group">
										<?php
											// @param label-name, if required
											$input->label('Date', '');
										?>
										<input type="text" class="form_field"  name="Date_" value="<?php echo date('F d, Y'); ?>" style="background: #f1f1f1;" readonly />
									</div>
								</div>
							</div>

						

						

							<?php
							include 'config/includes/privacy.php';
							echo $privacy_notice_text;
							?>

							<div class="form_box5 secode_box">
								<div class="group">
									<div class="inner_form_box1 recapBtn">
										<div class="g-recaptcha" data-sitekey="<?php echo $recaptcha_sitekey; ?>"></div>
										<div class="btn-submit"><input type="submit" class="form_button"
												value="SUBMIT" /></div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php $input->phone(true); ?>
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	<script type="text/javascript" src="../assets/js/city_state.min.js"></script>
	<script type="text/javascript" src="../assets/js/addressFunctionality.min.js"></script>
	<script type="text/javascript" src="../assets/assets/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../assets/dist/jquery-clockpicker-customized.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.datepick.min.js"></script>
	<script src="../assets/js/datepicker.js"></script>
	<script src="../assets/js/plugins.min.js"></script>
	<script src="../assets/js/jquery.mask.min.js"></script>
	<script src="../assets/js/proweaverPhone.js"></script>
	<script src="../assets/js/jquery.signaturepad.js"></script>

	<script type="text/javascript">
		$(document).ready(function () {
			// validate signup form on keyup and submit
			$("#submitform").validate({
				rules: {
					First_Name: "required",
					Last_Name: "required",
					Street_Address: "required",
					Student_Phone_Number: "required",
					City: "required",
					Zip_Code: "required",
					Gender: "required",
					Birthdate: "required",
					
					Student_Email: {
						required: true,
						email: true
					},
					Privacy_Notice: "required"
				},
				messages: {
					First_Name: "",
					Last_Name: "",
					Street_Address: "",
					Student_Phone_Number: "",
					City: "",
					Zip_Code: "",
					Gender: "",

					Birthdate: "",
					
					Student_Email: "",
					Privacy_Notice: ""
				}
			});


			checkboxValues('I_am_Applying_For');


			function checkboxValues(inputAttrName) {

				var inputAttrName = inputAttrName;

				var inputHidden = $('input[name="' + inputAttrName + '"]').attr('value');

				var checkedValues = '';

				var checkboxClass = $('input.' + inputAttrName + '');



				$.each(checkboxClass, function (index) {

					$(this).on('change', function () {

						var x = $(this).attr('value') + ', ';

						if ($(this).is(':checked')) {

							inputHidden += x;

							checkedValues = inputHidden.replace(/,\s*$/, "");

							$('input[name="' + inputAttrName + '"]').attr('value', checkedValues);

						} else {

							inputHidden = inputHidden.replace(x, '');

							checkedValues = inputHidden.replace(/,\s*$/, "");

							$('input[name="' + inputAttrName + '"]').attr('value', checkedValues);

						}

					});

				});

			}



			$("#submitform").submit(function () {
				if ($(this).valid()) {
					$('.load_holder').css('display', 'block');
					self.parent.$('html, body').animate(
						{ scrollTop: self.parent.$('#myframe').offset().top },
						500
					);
				}
				if (grecaptcha.getResponse() == "") {
					var $recaptcha = document.querySelector('#g-recaptcha-response');
					$recaptcha.setAttribute("required", "required");
					$('.g-recaptcha').addClass('errors').attr('id', 'recaptcha');
				}
			});

			$("input").keypress(function (event) {
				if (grecaptcha.getResponse() == "") {
					var $recaptcha = document.querySelector('#g-recaptcha-response');
					$recaptcha.setAttribute("required", "required");
				}
			});


			$('.Date').datepicker();
			$('.Date').attr('autocomplete', 'off');


		});

		$(function () {
			$('.Date, .date').datepicker({
				autoHide: true,
				zIndex: 2048,
			});

			$('.clockpicker').clockpicker()
				.find('input').change(function () {
					console.log(this.value);
				});
		});

		function isNumberKey(evt) {
			var charCode = (evt.which) ? evt.which : event.keyCode
			if (charCode > 31 && (charCode < 48 || charCode > 57))
				return false;

			return true;
		}

		$('.sigPad').signaturePad({
		drawOnly: true,
		errorMessageDraw: "Signature is Required",
	});






	</script>
</body>

</html>