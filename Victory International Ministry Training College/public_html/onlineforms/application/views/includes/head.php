<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href='https://fonts.googleapis.com/css?family=Urbanist' rel='stylesheet'>
    <link rel="stylesheet" href="<?= base_url() ?>/assets/css/my_style.css?ver='<?= time(); ?>'">

    <link rel="shortcut icon" href="<?= base_url() . 'assets/images/logo.png' ?>" type="image/x-icon">
    <title><?= get_bloginfo('name'); ?> | Online Forms Database</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="keywords" content="">

    <meta name="description" content="">
    <style>
        .showtable div {
            background: #fff;
        }
    </style>

    <?php
    __load_assets__($__assets__, 'css');
    ?>
</head>

<body class="hold-transition login-page">
    <div class="login-box">