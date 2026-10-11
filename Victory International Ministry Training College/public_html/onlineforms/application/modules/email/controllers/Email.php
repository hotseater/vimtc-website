<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Email extends MY_Controller
{

    public function index()
    {
    }

    public function searchEmails()
    {

        $search_value = $_POST['search'] ?? '';

        $search_type = $_POST['instance'] ?? 'inbox';

        $emails = raw("SELECT * FROM formdatabase_emails WHERE (email_type = '" . $search_type . "') AND (form_from LIKE '%$search_value%' OR form_content LIKE '%$search_value%' OR form_subject LIKE '%$search_value%') ORDER BY date_sent DESC");

        $email_list['result'] = '';
        $email_list['counter'] = 0;
        foreach ($emails as $row) :

            $email_list['counter']++;
            $mail_status = $row['status'] != 'read' ? 'unread_msg' : 'read_msg';
            $mail_active = $row['status'] == 'read' ? 'circle-inactive.png' : 'circle-active.png';
            $mail_print = $row['status'] != 'read' ? 'active-print-icon.png' : 'print-icon.png';
            $mail_trash = $row['status'] != 'read' ? 'active-trash-icon.png' : 'delete-icon.png';

            $attachment = (!empty($row['attachments'])) ? '<img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="14" height="14"/>' : "";

            $email_list['result'] .= '
            <tr class="' . $row['status'] . ' email">
                <td class="subject">
                    <span><input class="email-checkbox" type="checkbox" checkbox-type="1" email-id="' . $row['form_id'] . '" name="email_' . $row['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $row['form_id'] . '">
                        <a href="javascript:;">

                            <img class="email-circle-status" src="' . $this->fileLocation . $mail_active . '">

                        </a>
                    </label>
                    <div class="subject-inline">
                        <span style="padding-top: 4px;">' . $row['form_from'] . '</span>
                        
                        <span>' . $attachment . ' ' . $row['form_subject'] . '</span>
                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($row['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $row['form_id'] . '" title="Print">

                            <img class="print-icon" src="' . $this->fileLocation . $mail_print . '" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $row['form_id'] . '" title="Delete">

                            <img class="trash-icon" src="' . $this->fileLocation . $mail_trash . '" alt="Delete">

                        </a>
                    </span>
                    
                </td>
            </tr>';

        endforeach;

        json($email_list);
    }

    public function getE()
    {

        // print_r($_POST);

        $email['limit'] = 20;
        $email['offset'] = $_POST['offset'] ?? 0;

        $search_type = $_POST['instance'] ?? 'inbox';

        $emails = raw("SELECT * FROM formdatabase_emails WHERE email_type = '$search_type' ORDER BY date_sent DESC LIMIT " . $email['limit'] . " OFFSET " . $email['offset']);

        $email['total'] = raw("SELECT COUNT(*) as total FROM formdatabase_emails WHERE email_type = 'inbox'")[0]['total'];

        $email['result'] = '';
        $email['counter'] = 0;
        foreach ($emails as $row) :

            $email['counter']++;
            $mail_status = $row['status'] != 'read' ? 'unread_msg' : 'read_msg';
            $mail_active = $row['status'] == 'read' ? 'circle-inactive.png' : 'circle-active.png';
            $mail_print = $row['status'] != 'read' ? 'active-print-icon.png' : 'print-icon.png';
            $mail_trash = $row['status'] != 'read' ? 'active-trash-icon.png' : 'delete-icon.png';

            $attachment = (!empty($row['attachments'])) ? '<img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="14" height="14"/>' : "";

            $email['result'] .= '
            <tr class="' . $row['status'] . ' email">
                <td class="subject">
                    <span><input class="email-checkbox" type="checkbox" checkbox-type="1" email-id="' . $row['form_id'] . '" name="email_' . $row['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $row['form_id'] . '">
                        <a href="javascript:;">

                            <img class="email-circle-status" src="' . $this->fileLocation . $mail_active . '">

                        </a>
                    </label>
                    <div class="subject-inline">
                        <span style="padding-top: 4px;">' . $row['form_from'] . '</span>
                        
                        <span>' . $attachment . ' ' . $row['form_subject'] . '</span>
                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($row['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $row['form_id'] . '" title="Print">

                            <img class="print-icon" src="' . $this->fileLocation . $mail_print . '" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $row['form_id'] . '" title="Delete">

                            <img class="trash-icon" src="' . $this->fileLocation . $mail_trash . '" alt="Delete">

                        </a>
                    </span>
                    
                </td>
            </tr>';

        endforeach;

        json($email);
    }

    public function getEmails()
    {

        $emails = raw('SELECT * FROM ' . prefix_table . ' WHERE email_type = "inbox"  ORDER BY date_sent DESC');

        $email_list = '';

        foreach ($emails as $row) :

            $mail_status = $row['status'] != 'read' ? 'unread_msg' : 'read_msg';
            $mail_active = $row['status'] == 'read' ? 'circle-inactive.png' : 'circle-active.png';
            $mail_print = $row['status'] != 'read' ? 'active-print-icon.png' : 'print-icon.png';
            $mail_trash = $row['status'] != 'read' ? 'active-trash-icon.png' : 'delete-icon.png';

            $attachment = (!empty($row['attachments'])) ? '<img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="14" height="14"/>' : "";

            $email_list .= '
            <tr class="' . $row['status'] . ' email">
                <td class="subject">
                    <span><input class="email-checkbox" type="checkbox" checkbox-type="1" email-id="' . $row['form_id'] . '" name="email_' . $row['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $row['form_id'] . '">
                        <a href="javascript:;">

                            <img class="email-circle-status" src="' . $this->fileLocation . $mail_active . '">

                        </a>
                    </label>
                    <div class="subject-inline">
                        <span style="padding-top: 4px;">' . $row['form_from'] . '</span>
                        
                        <span>' . $attachment . ' ' . $row['form_subject'] . '</span>
                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($row['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $row['form_id'] . '" title="Print">

                            <img class="print-icon" src="' . $this->fileLocation . $mail_print . '" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $row['form_id'] . '" title="Delete">

                            <img class="trash-icon" src="' . $this->fileLocation . $mail_trash . '" alt="Delete">

                        </a>
                    </span>
                    
                </td>
            </tr>';

        endforeach;

        return $email_list;
    }

    public function getTrashEmails()
    {

        $emails = raw('SELECT * FROM ' . prefix_table . ' WHERE email_type = "trash"  ORDER BY date_sent DESC');

        $email_list['result'] = '';

        $email_list['counter'] = count(raw('SELECT * FROM ' . prefix_table . ' WHERE email_type = "inbox"  ORDER BY date_sent DESC'));

        $email_list['deleted_counter'] = count(raw('SELECT * FROM ' . prefix_table . ' WHERE email_type = "trash"  ORDER BY date_sent DESC'));

        foreach ($emails as $row) :

            $mail_status = $row['status'] != 'read' ? 'unread_msg' : 'read_msg';
            $mail_active = $row['status'] == 'read' ? 'circle-inactive.png' : 'circle-active.png';
            $mail_print = $row['status'] != 'read' ? 'active-print-icon.png' : 'print-icon.png';
            $mail_trash = $row['status'] != 'read' ? 'active-trash-icon.png' : 'delete-icon.png';

            $attachment = (!empty($row['attachments'])) ? '<img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="14" height="14"/>' : "";

            $email_list['result'] .= '
            <tr class="' . $row['status'] . ' email">
                <td class="subject">
                    <span><input class="email-checkbox" type="checkbox" checkbox-type="1" email-id="' . $row['form_id'] . '" name="email_' . $row['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $row['form_id'] . '">
                        <a href="javascript:;">

                            <img class="email-circle-status" src="' . $this->fileLocation . $mail_active . '">

                        </a>
                    </label>
                    <div class="subject-inline">
                        <span style="padding-top: 4px;">' . $row['form_from'] . '</span>
                        
                        <span>' . $attachment . ' ' . $row['form_subject'] . '</span>
                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($row['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $row['form_id'] . '" title="Print">

                            <img class="print-icon" src="' . $this->fileLocation . $mail_print . '" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $row['form_id'] . '" title="Delete">

                            <img class="trash-icon" src="' . $this->fileLocation . $mail_trash . '" alt="Delete">

                        </a>
                    </span>
                    
                </td>
            </tr>';

        endforeach;

        json($email_list);
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

    function getEmailDetails($id, $status = "read")
    {

        $response = array();

        $db = raw("SELECT * FROM " . prefix_table . " WHERE form_id = " . $id)[0];

        $update = update(prefix_table, array("status" => $status), "form_id = " . $id);

        if ($db && $update) :

            $date = new DateTime($db['date_sent']);

            $response['subject'] = "
            <div class='subject-wrapper'>
                <h1>" . $db['form_subject'] . "</h1>
                <p><span>From: " . $db['form_from'] . "</span>
         <br>
                <small>Sent: " . $date->format("F d, Y") . " at " . $date->format("g:i A") . "</small></p>
                <p class='email-note'>Please do not reply to this email. This is only a notification from your website online forms. To contact the person who filled out your online form, kindly use the email which is inside the form below.</p>
            </div>";

            $response['print_subject'] = "
            <div class='subject-wrapper'>
                <h1>" . $db['form_subject'] . "</h1>
                <span>" . $db['form_from'] . "</span>
                <br>
                <small>" . $date->format("F d, Y") . " at " . $date->format("g:i A") . "</small>
            </div>";

            $response['attachment'] = "";

            if (!empty($db['attachments'])) {

                $response['attachment'] .= '<div class="attachment-wrapper">
        
                <p><img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="16" height="16"/> ';

                $arr = explode('***', $db['attachments']);

                $keys = array_keys($arr);
                $lastkey = end($keys);

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
            <tr class="' . $db['status'] . ' email">
                <td class="subject">
                    <span><input type="checkbox" checkbox-type="1" email-id="' . $db['form_id'] . '" name="email_' . $db['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="'  . '" data-id="' . $db['form_id'] . '">
                        <a href="javascript:;">

                            <img class="image-status" src="' . $this->fileLocation  . '">

                        </a>
                    </label>
                    <div class="subject-inline">

                        <span style="padding-top: 4px;">' . $db['form_from'] . '</span>

                        <span>' . $db['form_subject'] . '</span>

                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($db['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $db['form_id'] . '" title="Print">

                            <img src="' . $this->fileLocation . 'print-icon.png" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $db['form_id'] . '" title="Delete">

                            <img src="' . $this->fileLocation . 'delete-icon.png" alt="Delete">

                        </a>
                    </span>
                </td>
            </tr>';
            $response['form_details'] = preg_replace('/<div[^>]*>(?:(?!<table).)*<\/div>/is', '', $this->removeInlineCssUsingDOM($db['form_content']));
            $response['success'] = true;
        else :
            $response['success'] = false;
        endif;

        json($response);
    }

    function removeInlineCssUsingDOM($html)
    {

        try {

            $dom = new DOMDocument();
            $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

            $xpath = new DOMXPath($dom);
            $nodes = $xpath->query('//*[@style]');

            foreach ($nodes as $node) {
                $node->removeAttribute('style');
            }

            return $dom->saveHTML();
        } catch (Exception $e) {
            return $html;
        }
    }

    public function trashEmail_Bulk()
    {

        $response = array();

        foreach ($_POST['emails'] as $email_id) {

            $where = 'form_id = ' . $email_id;
            $set['email_type'] = 'trash';

            if (update(prefix_table, $set, $where)) {
                $response['success'] = true;
            } else {
                $response['success'] = false;
            }

            $response['ids'][] = $email_id;
        }

        json($response);
    }

    public function deleteEmail_Bulk()
    {

        $response = array();

        foreach ($_POST['emails'] as $email_id) {

            $where = 'form_id = ' . $email_id;

            if (delete(prefix_table, $where)) {
                $response['success'] = true;
            } else {
                $response['success'] = false;
            }

            $response['ids'][] = $email_id;
        }

        json($response);
    }

    public function printEmail_Bulk()
    {

        $response = array();

        $response['form_details'] = '';

        foreach ($_POST['emails'] as $email_id) {

            $where = 'form_id = ' . $email_id;

            $db = raw("SELECT * FROM " . prefix_table . " WHERE " . $where)[0];

            $date = new DateTime($db['date_sent']);

            $response['form_details'] .= "
    <div class='subject-wrapper' style='font: 16px new times roman;'>
        <h1 style='font: 16px new times roman; color:#180087; font-weight:bold; line-height: 0.5;'>" . $db['form_subject'] . "</h1>
        <p style='font: 16px new times roman; font-weight:bold; line-height: 0.5;'>From: " . $db['form_from'] . "</p>
        <p style='font: 16px new times roman; font-weight:bold; line-height: 0.5;'>Sent: " . $date->format("F d, Y") . " at " . $date->format("g:i A") . "</p>
    </div><br>";


            // <p>Please do not reply to this email. This is only a notification from your website online forms. To contact the person who filled out your online form, kindly use the email which is inside the form below.</p>

            $response['form_details'] .= "<div style='font-size: 16px !important; Open Sans,sans-serif !important; font-weight:bold;'>" . preg_replace('/<div[^>]*>(?:(?!<table).)*<\/div>/is', '', $this->removeInlineCssUsingDOM($db['form_content'])) . "</div>";
            $response['form_details'] .= '<br><hr><br>';

            $response['success'] = true;
        }

        json($response);
    }
}
