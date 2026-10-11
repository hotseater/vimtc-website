<!DOCTYPE html>
<html>

<?php
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    require '../../wp-systcon/wp-load.php';
} else {
    require '../wp-systcon/wp-load.php';
}
?>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href='https://fonts.googleapis.com/css?family=Urbanist' rel='stylesheet'>
    <link rel="stylesheet" href="assets/css/view_email.css?ver=<?= time(); ?>">
    <link rel="shortcut icon" href="assets/images/logo.png" type="image/x-icon">
    <title>Email | Online Forms Database</title>

</head>

<body class="hold-transition">
    <div class="login-box">

        <?php

        ini_set('display_errors', '0');
        function removeInlineCssUsingDOM($html)
        {
            $dom = new DOMDocument();
            $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

            $xpath = new DOMXPath($dom);
            $nodes = $xpath->query('//*[@style]');

            foreach ($nodes as $node) {
                $node->removeAttribute('style');
            }

            return $dom->saveHTML();
        }

        $data = $_GET['token'];
        $filter_id = substr($data, strpos($data, "@") + 1);
        $form_id = strtok($filter_id, '&');

        $db = $wpdb->get_results('SELECT * FROM formdatabase_emails WHERE form_id =' . $form_id)[0];

        $response = array();

        // $update = update(prefix_table, array("status" => "read"), "form_id = " . $id);
        
        $date = new DateTime($db->date_sent);

        $response['subject'] = "
            <div class='subject-wrapper'>
                <h1>" . $db->form_subject . "</h1>
                <span style='font-size: 16px;'>From: " . $db->form_from . "</span>
				<br>
                <small style='font-size: 16px;'>Sent: " . $date->format("F d, Y") . " at " . $date->format("g:i A") . "</small>
                <p>Please do not reply to this email. This is only a notification from your website online forms. To contact the person who filled out your online form, kindly use the email which is inside the form below.</p>
            </div>";

        $response['print_subject'] = "
        <div class='subject-wrapper'>
            <h1>" . $db->form_subject . "</h1>
            <span style='font-size: 16px;'>From: " . $db->form_from . "</span>
            <br>
            <small style='font-size: 16px;'>Sent: " . $date->format("F d, Y") . " at " . $date->format("g:i A") . "</small>
        </div>";

        $response['attachment'] = "";

        if (!empty($db->attachments)) {

            $response['attachment'] .= '<div class="attachment-wrapper">
        
                <p><img class="attachment" alt="attachment" src="assets/images/attachment-icon.png" width="16" height="16"/> ';

            $arr = explode('***', $db->attachments);

            $lastkey = end(array_keys($arr));

            foreach ($arr as $key => $value) {

                if ($key != $lastkey) {

                    $response['attachment'] .= '<a href="attachments/' . $value . '" download> ' . $value . '</a> , ';

                } else {

                    $response['attachment'] .= '<a href="attachments/' . $value . '" download>' . $value . '</a>';
                }
            }

            $response['attachment'] .= '</p></div>';
        } else {
        }

        $response['current_email'] = '
            <tr class="' . $db->status . ' email">
                <td class="subject">
                    <span><input type="checkbox" checkbox-type="1" email-id="' . $db->form_id . '" name="email_' . $db->form_id . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $db->form_id . '">
                        <a href="javascript:;">

                            <img class="image-status" src="">

                        </a>
                    </label>
                    <div class="subject-inline">

                        <span>' . $db->form_from . '</span>

                        <span>' . $db->form_subject . '</span>

                    </div>
                </td>
                <td class="table-date">
                    <span>' . convertDate($db->date_sent) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $db->form_id . '" title="Print">

                            <img src="assets/images/print-icon.png" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $db->form_id . '" title="Delete">

                            <img src="assets/images/delete-icon.png" alt="Delete">

                        </a>
                    </span>
                </td>
            </tr>';



        $response['form_details'] = preg_replace('/<div[^>]*>(?:(?!<table).)*<\/div>/is', '', removeInlineCssUsingDOM($db->form_content));
        $response['success'] = true;

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

        ?>

        <!--wrapper-->

        <div id="wrapper">

            <div id="main" class="clearfix">

                <div class="container">



                    <div class="back-btn" id="back-panel" style="display: block;">

                        <a href="index.php" id="go-panel"><img src="assets/images/prev-btn.png" alt="Back">&nbsp;Go to
                            Panel</a>

                    </div>


                    <?php if (!$db): ?>
                        <div class="form_pane" style="width: auto; height: auto; padding: 30px;">

                            <h1 style="text-align:center;">No Content Found</h1>

                        </div>
                    <?php else: ?>
                        <div class="form_pane" style="width: auto; height: auto; padding: 30px;">

                            <div class="print" style="text-align:right">

                                <a href="javascript:;" id="printform" data-id="66" title="Print">
                                    <img src="assets/images/print-icon.png" alt="Print" style="vertical-align:top"> Print
                                </a>
                            </div>

                            <div class="show-subject">
                                <?= $response['subject'] ?>
                            </div>

                            <hr class="border-line" style="display: block;">

                            <div class="show-attachment">
                                <?= $response['attachment'] ?>
                            </div>



                            <div class="showtable">

                                <div class="form_table view-form">
                                    <div class="container">
                                        <div class="header">

                                        </div>
                                        <div
                                            style="border: 1px solid #f3f3f3 !important; background-color:#fff; border-radius:10px;">

                                            <?= $response['form_details']; ?>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <?php endif; ?>



                </div>

            </div>

        </div>

    </div>

</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    $(document).on('click', '#printform', function (e) {

        e.stopPropagation();

        const data = `<?= $response['print_subject'] . $response['form_details'] ?>`;

        const w = 900;

        const h = 1000;

        const left = Number((screen.width / 2) - (w / 2));

        const tops = Number((screen.height / 2) - (h / 2));

        const a = window.open('', '', 'width=900,height=900,scrollbars=yes');

        a.document.write(data);

        a.print();

        a.close();

    });
</script>

<script src="assets/js/global.js"></script>

</html>