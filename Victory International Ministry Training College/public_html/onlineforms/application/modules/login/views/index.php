<div id="main" class="clearfix">
	<div class="login-background"></div>
	<div class="box clearfix">

		<div id="loginpage">

			<div class="head-title">

			<a href="<?=base_url() ?>"><img width="50px" height="50px" src="<?=base_url() ?>assets/images/logo.png"></a>

			<div class="title">

					<h1>ONLINE FORM</h1>

					<h2>DATABASE</h2>

				</div>

			</div>

			<form id="loginform" action="" method="post">

				<input type="text" id="username" name="username" placeholder="Username"required>

				<input type="password" id="password" name="password" placeholder="Password" required>

				<input type="submit" id="loginbtn" name="login" value="Login">

			</form>

			<p class="forgot_pass"><a href="<?=base_url().'login/forgotPassword'; ?>">Forgot your password?</a></p>
			<?php if($reg): ?>
			<p class="create_user"><a href="<?=base_url().'login/registerUser'; ?>"><span>&laquo;</span> Create User</a></p>
			<?php endif; ?>
			<div class="msg"></div>

			<div class="se-pre-con"></div>

		</div>

	</div>

</div>